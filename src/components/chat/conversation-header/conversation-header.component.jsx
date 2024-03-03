import { RxAvatar } from "react-icons/rx";
import { HiDotsVertical } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { useState } from "react";
import ConversationHeaderMenu from "../conversation-header-menu/conversation-header-menu.component";
import UsePrivateCallContext from "../../../context/private-call/usePrivateCallContext";
import useUserContext from "../../../context/user/useUserContext";
import ChatCall from "../chat-call/chat-call.component";


const ConversationHeader = ({ username, chosenUserId }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const {initializePrivateCall, setIsVideoCall, isVideoCall} = UsePrivateCallContext();
  const {currentUser} = useUserContext();

  const handleDotsClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleVoiceCallClick = () => {
    initializePrivateCall(currentUser.uid,chosenUserId, false);


  }

  const handleVideoCallClick = () => {
    initializePrivateCall(currentUser.uid,chosenUserId, true);
  }



  return (
    <div>

      <div className="flex items-center w-full text-white rounded-r-2xl py-2 px-2 justify-between rounded-b-2xl bg-dark-clr-30">
        <div className="flex items-center">
          <RxAvatar className="text-6xl" />
          <div className="ml-2">{username}</div>
        </div>
        <div className="flex space-x-2 text-2xl">
          <div className="bg-black bg-opacity-50 rounded-3xl p-2">
            <FaVideo className="text-white cursor-pointer" onClick={handleVideoCallClick} />
          </div>
          <div className="bg-black bg-opacity-50 rounded-3xl p-2">
            <MdCall className="text-white cursor-pointer" onClick={handleVoiceCallClick} />
          </div>
          <div className="rounded-3xl p-2">
            <HiDotsVertical
              className="text-white cursor-pointer"
              onClick={handleDotsClick}
            />
          </div>
        </div>
      </div>
      <ChatCall username={username} chosenUserId={chosenUserId}/>

      {showDropdown && <ConversationHeaderMenu className="absolute top-[50px] right-3"/>}
    </div>
  
  );
};

export default ConversationHeader;
