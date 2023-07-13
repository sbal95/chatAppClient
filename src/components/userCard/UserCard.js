import React from "react";
import { useDispatch } from "react-redux";
import { setMessageTo } from "../../redux/actions";

const UserCard = ({ username, img, isOnline }) => {
  const dispatch = useDispatch();

  return (
    <button
      className="w-full  flex gap-3 items-center border border-slate-700 rounded-md cursor-pointer px-5 py-2 hover:bg-slate-600"
      onClick={() => dispatch(setMessageTo(username))}
    >
      <span> {username} </span>
      <span
        className={`text-2xl ${
          isOnline === true ? "text-green-500" : "text-red-500"
        }  material-symbols-outlined`}
      >
        online_prediction
      </span>
    </button>
  );
};

export default UserCard;
