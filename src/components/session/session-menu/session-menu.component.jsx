import {
    FaCommentDots,
    FaComments,
    FaShare ,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import MenuSelector from "./menu-selector.component";
import MenuBody from "../session-chat/session-public-chat.component";
import {useState} from "react";
import useSessionContext from "../../../context/session/useSessionContext";
import InviteMenu from "../../button/InviteMenu";


const SessionMenu = () => {
    const [color,setColor] = useState("text-white")
    const [showOptions, setShowOptions] = useState(false);
    const { session } = useSessionContext()

    const handleSessionChatCLick = () => {
        setColor("text-selected")
    }

    const handleInvite = () => {
        setShowOptions(!showOptions);
        if (showOptions) {
            setColor("text-white")
        } else {
            setColor("text-selected")
        }
    }


    return (
        <div className="flex justify-between flex-col p-4 w-1/4">
            <div className="flex h-[10%] w-full justify-between  items-center text-white text-2xl">
                <MenuSelector icon={<FaCommentDots/>}/>
                <MenuSelector icon={<FaPeopleGroup/>}/>
                <MenuSelector icon={<FaComments className={color}/>} onClick={handleSessionChatCLick}/>
                {localStorage.getItem("hostId") && <MenuSelector icon={<FaShare className={color}/>} onClick={handleInvite}/>}
                
            </div>
            {showOptions && (
                <InviteMenu sessionId={session.uid} handleButtonClick={handleInvite}></InviteMenu>
            )}

            <MenuBody />            
        </div>
    );
}

export default SessionMenu;