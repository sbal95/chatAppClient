import React from "react";
import { useSelector } from "react-redux";

const ChatCard = ({ from, text, time }) => {
  const currentUser = useSelector((state) => state.currentUser);
  
  return (
    <div className="bg-transparent p-5 text-white">
      <span
        className={`${
          currentUser === from ? "float-right" : "float-left"
        } max-w-[48%] border border-1 border-slate-600 p-3 rounded-lg flex flex-col gap-1`}
      >
        <span
          className={`${
            currentUser === from ? "hidden" : "flex"
          } capitalize  max-w-[48%] `}
        >
          {from}
        </span>
        <hr
          className={`${
            currentUser === from ? "hidden" : "flex"
          } border-b border-white w-full rounded-3xl-`}
        ></hr>
        <span> {text}</span>
        <span className="text-xs text-gray-400 font-thin w-full text-right ">
          {time.split("-")[2].split("T")[1].split(".")[0].split(":")[0]} :{" "}
          {time.split("-")[2].split("T")[1].split(".")[0].split(":")[1]}
        </span>
      </span>
    </div>
  );
};

export default ChatCard;
