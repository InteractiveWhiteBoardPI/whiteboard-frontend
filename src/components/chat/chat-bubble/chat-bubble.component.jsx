import { useEffect, useRef, useState } from "react";
import { formatDateForDisplay } from "../../../utils/format-date";
import DeleteSingleMessageModal from "../delete-single-message-modal/delete-single-message-modal.component";

const ChatBubble = ({ message, isSender }) => {
  const [username, setUsername] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const chatBubbleRef = useRef(null);
  

  const handleClickOutside = (event) => {
    if (
      chatBubbleRef.current &&
      !chatBubbleRef.current.contains(event.target)
    ) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    if (isClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClicked]);

  useEffect(() => {
    const getUsername = async () => {
      const res = await fetch(
        "http://localhost:8080/user/get/" + message.sender
      );

      const user = await res.json();

      if (user) {
        setUsername(user.username);
      }
    };
    getUsername();
  }, []);

  const handleEnter = () => {
    setIsClicked(true);
    console.log({ isClicked });
  };

  return (
    <div className="flex w-full h-full">
      <div
        className={`chat w-full flex items-center ${
          isSender ? "chat-end justify-end" : "chat-start"
        }`}
      >
        {isClicked && isSender && <DeleteSingleMessageModal messageId={message.id} className={""}/>}
        <div className={`${isSender && "flex flex-col items-end pr-4 "}`}>
          <div className="chat-header ml-4">{username}</div>
          <div className="chat-bubble bg-black items-center ml-4 " onMouseEnter={handleEnter}>
            {message.messageBody}
          </div>
          <time className="text-xs opacity-50 ml-4">
            {formatDateForDisplay(message.date)}
          </time>
        </div>
        {isClicked && !isSender && <DeleteSingleMessageModal messageId={message.id} className={""} />}
      </div>
    </div>
  );
};

export default ChatBubble;
