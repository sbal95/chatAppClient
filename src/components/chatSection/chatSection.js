import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatCard from "../chatCard/ChatCard";

const ChatSection = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const messageTo = useSelector((state) => state.messageTo);
  const [userMessage, setUserMessage] = useState();
  const [messages, setMessages] = useState([]);

  const fetchMessage = () => {
    fetch("https://chat-app-server-fawn.vercel.app/api/messages/get-all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMessages(data);
      });
  };
  useEffect(() => {
    fetchMessage();
  }, [messages]);

  const userMessages = messages.filter(
    (message) => message.to === currentUser || message.from === currentUser
  );

  const filteredMessages = userMessages.filter(
    (message) =>
      (message.from === messageTo) & (message.to === currentUser) ||
      (message.from === currentUser) & (message.to === messageTo)
  );

  function handleChange(event) {
    setUserMessage(event.target.value);
  }

  const sendMessage = () => {
    fetch("https://chat-app-server-fawn.vercel.app/api/messages/add-message", {
      method: "POST",
      body: JSON.stringify({
        to: messageTo,
        from: currentUser,
        text: userMessage,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((err) => {
      console.log(err.message);
    });
    setUserMessage("");
  };

  return (
    <div className="w-[75%] h-[92vh] container mx-auto border-2 border-gray-500  m-[4vh]  rounded-xl flex flex-col overflow-hidden relative shadow-chatPage">
      <div className="w-full p-3 uppercase text-white border border-slate-600 ">
        {messageTo}
      </div>
      <div className="w-full h-full flex flex-col overflow-scroll">
        {filteredMessages.map((message, i) => (
          <ChatCard
            from={message.from}
            text={message.text}
            time={message.updatedAt}
            key={i}
          />
        ))}
      </div>
      <div className="w-full flex">
        <input
          className="border border-white w-full h-16 p-2 px-3 overflow-scroll"
          placeholder="Text"
          value={userMessage}
          onChange={handleChange}
        />
        <button
          className="w-20 text-white bg-[rgba(8,_112,_184,_0.7)] hover:bg-red-900"
          onClick={() => sendMessage()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
