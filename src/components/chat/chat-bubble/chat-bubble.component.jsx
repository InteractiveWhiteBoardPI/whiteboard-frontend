import { useEffect, useState } from "react";
import { formatDateForDisplay } from "../../../utils/format-date";

const ChatBubble = ({ message, isSender }) => {
  const [ username , setUsername ] = useState("")
  

  useEffect(
    () => {
      const getUsername = async () => {
        const res = await fetch("http://localhost:8080/user/get/"+message.sender)

        const user = await res.json()

        if(user) {
          setUsername(user.username)
        }
      }
      getUsername()
    }, []
  )

  return (
    <div
      className={`chat w-full flex ${
        isSender ? "chat-end justify-end" : "chat-start"
      }`}
    >
      <div className={`px-4 ${isSender && "flex flex-col items-end"}`}>
        <div className="chat-header">{username}</div>
        <div className="chat-bubble bg-black">{message.messageBody}</div>
        <time className="text-xs opacity-50">
          {formatDateForDisplay(message.date)}
        </time>
      </div>
    </div>
  );
};

export default ChatBubble;
