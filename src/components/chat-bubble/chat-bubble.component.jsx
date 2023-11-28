import { formatDateForDisplay } from "../../utils/format-date";

const ChatBubble = ({ message, isSender }) => {
  return (
    <div
      className={`chat w-full flex ${
        isSender ? "chat-end justify-end" : "chat-start"
      }`}
    >
      <div className={`px-4 ${isSender && "flex flex-col items-end"}`}>
        <div className="chat-header">{message.sender}</div>
        <div className="chat-bubble bg-black">{message.messageBody}</div>
        <time className="text-xs opacity-50">
          {formatDateForDisplay(message.date)}
        </time>
      </div>
    </div>
  );
};

export default ChatBubble;
