import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchUserData();
  }, [users]);

  const usernames = users.map((user) => user.username);

  function handleChange(event) {
    setUserName(event.target.value);
  }
  const checkUserName = () => {
    if (userName.length > 1) {
      dispatch(setCurrentUser(userName));
      if (usernames.includes(userName)) {
        users.map((user) => {
          if (user.username === userName) {
            const userId = user._id;
            fetch("https://chat-app-server-fawn.vercel.app/api/users/update-user", {
              method: "PUT",
              body: JSON.stringify({
                userId: userId,
                username: userName,
                isOnline: true,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }).catch((err) => {
              console.log(err.message);
            });
          }
        });
        navigate("/chat");
      } else {
        fetch("https://chat-app-server-fawn.vercel.app/api/users/add-user", {
          method: "POST",
          body: JSON.stringify({
            username: userName,
            isOnline: true,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).catch((err) => {
          console.log(err.message);
        });
        navigate("/chat");
      }
    } else {
      alert("Please enter a username !!!");
    }
  };
  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <div className="w-96 h-96 border bg-cyan-950  border-cyan-900 flex justify-center pt-10 items-center mx-auto flex-col align-items-center rounded-xl gap-10 relative shadow-login">
        <div className="absolute -top-14 text-white bg-cyan-950 p-3 rounded-full h-28 w-28 text-center flex justify-center items-center shadow-login">
          <span class="material-symbols-outlined text-6xl">person</span>
        </div>
        <div className="flex justify-start items-center mx-auto flex-col align-items-centerrounded-xl gap-5 w-full -mt-10">
          <input
            className="text-sm h-12 px-4 py-2 border border-solid w-10/12 border-cyan-900 rounded-xl"
            type="text"
            placeholder="User Name"
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        className="bg-cyan-950 w-60 h-16 rounded-b-3xl font-semibold text-2xl text-green-400 hover:text-green-200 shadow-login"
        type="submit"
        onClick={() => {
          checkUserName();
        }}
      >
        Login
      </button>
    </section>
  );
};

export default Login;
