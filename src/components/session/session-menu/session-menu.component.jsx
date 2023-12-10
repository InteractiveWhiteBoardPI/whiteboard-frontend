import {
    FaCommentDots,
    FaComments,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import MenuSelector from "./menu-selector.component";
import MenuBody from "./menu-body.component";
import InviteButton from "../../button/invite-button";

const SessionMenu = () => {
    const sessionId = 'http://localhost:3000/session/abdo';
    return (
        <div className="flex justify-between flex-col p-4 w-1/4">
            <div className="flex h-[10%] w-full justify-between  items-center text-white text-2xl">
                <MenuSelector icon={<FaCommentDots/>}/>
                <MenuSelector icon={<FaPeopleGroup/>}/>
                <MenuSelector icon={<FaComments/>}/>
                <InviteButton sessionId={sessionId}></InviteButton>
            </div>

            <MenuBody />            
        </div>
    );
}

export default SessionMenu;