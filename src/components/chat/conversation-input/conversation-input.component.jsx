import { RiSendPlaneLine } from "react-icons/ri";
import { MdOutlineAttachFile } from "react-icons/md";
import UseChatContext from "../../../context/chat/useChatContext";
import useUserContext from "../../../context/user/useUserContext";


const ConversationInput = ({sendMessage,messageBody, setMessage}) => {

    const {chosenUser } =  UseChatContext()
    const { currentUser } = useUserContext()
    const handleSendMessage = () =>{
        sendMessage();
        setMessage({
            messageBody: "",
            receiver: chosenUser.uid,
            sender: currentUser?.uid,
            date: "",
        });
    }

    const setMsg = (event) => {
        setMessage(prev => ({...prev, messageBody: event.target.value}));
    };

    return (
      <div className="p-4">
          <div className="bg-black rounded-full flex p-2">
            <div className="btn border-none bg-grey hover:bg-opacity-40 bg-opacity-20 rounded-3xl items-center p-3">
              <MdOutlineAttachFile className="text-white w-7 h-7 transform rotate-45" />
            </div>
            <input
              value={messageBody}
              onChange={setMsg}
              className="input mx-2 border-none bg-black text-white flex-grow"
              placeholder="Type something..."
            />
            <div className="btn bg-grey bg-opacity-20 border-none hover:bg-opacity-40 rounded-3xl p-3 items-center">
              <RiSendPlaneLine
                className="text-white w-5 h-5"
                onClick={handleSendMessage}
              />
            </div>
        </div>
      </div>
    )
}

export default ConversationInput