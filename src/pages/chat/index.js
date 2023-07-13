import React from "react";
import SideBar from "../../components/sideBar/SideBar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChatSection from "../../components/chatSection/chatSection";
const Chat = () => {
  const currentUser = useSelector((state) => state.currentUser);
  if (currentUser.length > 1) {
    return (
      <div className="flex gap-0">
        <SideBar />
        <ChatSection/>
      </div>
    );
  }
  if (currentUser.length < 1) {
    return (
      <div className="w-screen h-screen flex  justify-center items-center">
        <Link to={"/"} className="p-10 bg-gray-800 rounded-xl border border-gray-500 font-bold text-xl" > Click For Login...  </Link>
      </div>
    );
  }
};

export default Chat;
