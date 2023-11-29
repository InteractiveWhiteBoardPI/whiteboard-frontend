import Conversation from "../components/chat/conversation/conversation.component";
import Users from "../components/chat/users/users.component";
import UseChatContext from "../context/chat/useChatContext";


const Chat = () => {
  const { chosenUser } = UseChatContext()
  return (
    
      <div className="absolute h-full w-full flex justify-center items-center bg-dark-clr-70">
        <div className="flex w-3/4 h-3/4 relative rounded-2xl bg-light-clr-20">
          <Users />
          {
            chosenUser != null ? (
              <div className="flex flex-col w-3/4">
                <Conversation/>
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
