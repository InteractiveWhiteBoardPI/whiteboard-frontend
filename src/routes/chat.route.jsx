import Conversation from "../components/chat/conversation/conversation.component";
import Users from "../components/chat/users/users.component";
import UseChatContext from "../context/chat/useChatContext";


const Chat = () => {
  const { chosenUser } = UseChatContext()
  return (
    <div className="w-4/5 h-full pr-4 pb-4">
      <h1 className="h-[10%] text-2xl font-bold">Chat</h1>
      <div className="flex h-[90%] relative rounded-2xl bg-light-clr-10">
        <Users />
        {
          chosenUser != null ? (
            <div className="flex flex-col w-3/4">
              <Conversation />
            </div>
          ) : (
            <div className="w-3/4 flex flex-col justify-center items-center text-white text-2xl">
              <div className="mb-4">Start Chatting</div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Chat;
