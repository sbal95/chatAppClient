import React, { useEffect, useState } from "react";
import UserCard from "../userCard/UserCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [users, setUsers] = useState([]);
  const fetchUserData = () => {
    fetch("https://chat-app-server-fawn.vercel.app/api/users/get-all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [users]);

  const activeUserName = useSelector((state) => state.currentUser);
  const onlineUsers = users.filter(
    (user) => user.isOnline === true && user.username !== activeUserName
  );
  const offlineUsers = users.filter((user) => user.isOnline === false);
  const onlineUser = users.filter((user) => user.username === activeUserName);

  const logOut = () => {
    users.map((user) => {
      if (user.username === activeUserName) {
        const userId = user._id;
        fetch("https://chat-app-server-fawn.vercel.app/api/users/update-user", {
          method: "PUT",
          body: JSON.stringify({
            userId: userId,
            username: activeUserName,
            isOnline: false,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).catch((err) => {
          console.log(err.message);
        });
      }
    });
    navigate("/");
  };

  return (
    <div className="min-w-[288px] w-72 bg-slate-800 h-screen flex flex-col gap-5 py-10 px-3 text-white shadow-chatPage">
      <div className="flex flex-col gap-1">
        <span className="text-xl">User</span>
        <hr></hr>
        {onlineUser.map((user, i) => (
          <UserCard
            username={user.username}
            img={user.img}
            isOnline={user.isOnline}
            key={i}
          />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Online Users</span>
        <hr></hr>
        <div className="flex flex-col gap-1 h-[32vh] overflow-y-scroll">
          {onlineUsers.map((user, i) => (
            <UserCard
              username={user.username}
              img={user.img}
              isOnline={user.isOnline}
              key={i}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Offline Users</span>
        <hr></hr>
        <div className="flex flex-col gap-1 h-[32vh] overflow-y-scroll">
          {offlineUsers.map((user, i) => (
            <UserCard
              username={user.username}
              img={user.img}
              isOnline={user.isOnline}
              key={i}
            />
          ))}
        </div>
      </div>
      <button
        className="border border-slate-600 text-xl mb-3 flex justify-center items-center gap-2 p-2 rounded-xl hover:bg-slate-600"
        onClick={() => logOut()}
      >
        <span className="material-symbols-outlined">logout</span> LOGOUT
      </button>
    </div>
  );
};

export default SideBar;
