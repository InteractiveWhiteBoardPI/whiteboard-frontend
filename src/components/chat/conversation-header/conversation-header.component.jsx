import { RxAvatar } from "react-icons/rx";
import { HiDotsVertical } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa";

const ConversationHeader = ({ username }) => {
  return (
    <div className="flex items-center w-full text-white rounded-r-2xl py-2 px-2 justify-between rounded-b-2xl bg-dark-clr-30">
      <div className="flex items-center">
        <RxAvatar className="text-6xl" />
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
          <HiDotsVertical className="text-white cursor-pointer " />
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
