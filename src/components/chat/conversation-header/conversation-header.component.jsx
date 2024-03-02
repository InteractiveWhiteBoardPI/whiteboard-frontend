import { RxAvatar } from "react-icons/rx";
import { HiDotsVertical } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { useEffect, useState } from "react";
import ConversationHeaderMenu from "../conversation-header-menu/conversation-header-menu.component"
import useUserContext from "../../../context/user/useUserContext";

const ConversationHeader = ({ username , imageUrl }) => {


  const [showDropdown, setShowDropdown] = useState(false);


  const handleDotsClick = () => {
    setShowDropdown(!showDropdown);
  };



  return (
    <div>
      <div className="flex items-center w-full text-white rounded-r-2xl py-2 px-2 justify-between rounded-b-2xl bg-dark-clr-30">
        <div className="flex items-center">
                {imageUrl==='data:image/png;base64,null' && <RxAvatar className="text-6xl" />}
                {imageUrl!=='data:image/png;base64,null' && <img 
                            src={imageUrl}
                            className="w-[4vw] h-[8vh] rounded-full ml-2 mr-2"
                        />
                    }
          <div className="ml-2">{username}</div>
        </div>
        <div className="flex space-x-2 text-2xl">
          <div className="bg-black bg-opacity-50 rounded-3xl p-2">
            <FaVideo className="text-white cursor-pointer" />
          </div>
          <div className="bg-black bg-opacity-50 rounded-3xl p-2">
            <MdCall className="text-white cursor-pointer" />
          </div>
          <div className="rounded-3xl p-2">
            <HiDotsVertical
              className="text-white cursor-pointer"
              onClick={handleDotsClick}
            />
          </div>
        </div>
      </div>
      {showDropdown && <ConversationHeaderMenu className="absolute top-[50px] right-3"/>}
    </div>
  );
};

export default ConversationHeader;
