import UseChatContext from "../../../context/chat/useChatContext";
import ChatBubble from "../../chat/chat-bubble/chat-bubble.component";

const DisplaySessionMessages = ({currentUser}) => {

   const {sessionMessages} = UseChatContext();


    return (
        <div className="flex flex-col w-full h-full items-center overflow-y-auto overflow-x-auto">
            {sessionMessages.map((msg, index) => (
                <ChatBubble
                    key={msg.id}
                    isSender={msg.sender === currentUser}
                    message={msg}
                    isSession={true}
                />
            ))}

        </div>
    )
}
export default DisplaySessionMessages;