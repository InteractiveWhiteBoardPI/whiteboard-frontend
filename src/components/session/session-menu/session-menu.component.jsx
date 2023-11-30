import {
    FaCommentDots,
    FaComments,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import MenuSelector from "./menu-selector.component";
import MenuBody from "./menu-body.component";

const SessionMenu = () => {
    return (
        <div className="flex justify-between flex-col p-4 w-1/4">
            <div className="flex h-[10%] w-full justify-between  items-center text-white text-2xl">
                <MenuSelector icon={<FaCommentDots/>}/>
                <MenuSelector icon={<FaPeopleGroup/>}/>
                <MenuSelector icon={<FaComments/>}/>
            </div>

            <MenuBody />            
        </div>
    );
}

export default SessionMenu;