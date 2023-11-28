import { RiSendPlaneLine } from "react-icons/ri";
import { MdOutlineAttachFile } from "react-icons/md";

const ConversationInput = ({sendMessage,messageBody, setMsg}) => {
    return (
        <div className="m-4 flex ">
        <div className="join bg-black rounded-full flex-grow p-2">
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
              onClick={sendMessage}
            />
          </div>
        </div>
      </div>
    )
}

export default ConversationInput