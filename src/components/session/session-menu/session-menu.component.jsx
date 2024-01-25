import {
    FaCommentDots,
    FaComments,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import MenuSelector from "./menu-selector.component";
import MenuBody from "../session-chat/session-public-chat.component";
import {useState} from "react";

const SessionMenu = () => {
    const [color,setColor] = useState("text-white")

    const handleSessionChatCLick = () => {
        setColor("text-selected")
    }

    return (
        <div className="flex justify-between flex-col p-4 w-1/4">
            <div className="flex h-[10%] w-full justify-between  items-center text-white text-2xl">
                <MenuSelector icon={<FaCommentDots/>}/>
                <MenuSelector icon={<FaPeopleGroup/>}/>
                <MenuSelector icon={<FaComments className={color}/>} onClick={handleSessionChatCLick}/>
            </div>

            <MenuBody />            
        </div>
    );
}

export default SessionMenu;