import { useEffect, useState } from "react";
import ChatBubble from "../chat-bubble/chat-bubble.component";
import UseChatContext from "../../../context/chat/useChatContext";

const MessagesList = ({ user, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const { groupedMessages } = UseChatContext();
 

  useEffect(() => {
    if (groupedMessages) {
      const keys = Object.keys(groupedMessages);
      if (keys.includes(user)) {
        setMessages(groupedMessages[user]);
      } else {
        setMessages([])
      }
    } else {
      setMessages([])
    }
  }, [groupedMessages]);

 

  return (
    <div className="flex flex-col h-full items-center max-h-full overflow-y-auto overflow-x-hidden">
      {messages.map((msg, index) => (
          <ChatBubble
          key={index}
            isSender={msg.sender === currentUser}
            message={msg}
          />
          

      ))}
    </div>
  );
};

export default MessagesList;
