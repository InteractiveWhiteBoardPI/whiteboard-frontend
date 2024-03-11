import { useEffect, useState } from "react";
import ChatBubble from "../chat-bubble/chat-bubble.component";
import UseChatContext from "../../../context/chat/useChatContext";
import getSessionMembers from "../../../utils/get-session-members";

const MessagesList = ({ user, currentUser}) => {
  const [messages, setMessages] = useState([]);
  const { groupedMessages } = UseChatContext();


  useEffect(() => {
    if (groupedMessages) {
      const userMessages = groupedMessages[user];
      if (userMessages) {
        setMessages(userMessages);
      } else {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }
  }, [groupedMessages, user]);


  return (
    <div className="flex flex-col w-full h-full items-center overflow-y-auto overflow-x-hidden">
      {messages.map((msg, index) => (
          <ChatBubble
          key={msg.id}
            isSender={msg.sender === currentUser}
            message={msg}
          isSession={false}
          />
      ))}
    </div>
  );
};

export default MessagesList;