import {
    FaCommentDots,
    FaComments,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import MenuSelector from "./menu-selector.component";
import MenuBody from "./menu-body.component";
import InviteButton from "../../button/invite-button";
import useUserContext from "../../../context/user/useUserContext";
import useSessionContext from "../../../context/session/useSessionContext";
import {useState,useEffect} from "react";

const SessionMenu = () => {

    const { currentUser } = useUserContext();
    const { session } = useSessionContext();

    const [isHost, setIsHost] = useState(true);

    const handleSetIsHost = () => {
        setIsHost(false);
    };

    useEffect(() => {
        if (currentUser.uid !== session?.host.uid) {
            handleSetIsHost();
			console.log("this is current user :",currentUser,"this is host user :",session?.host)
        }
    }, [currentUser, session?.host]);


    return (
        <div className="flex justify-between flex-col p-4 w-1/4">
            <div className="flex h-[10%] w-full justify-between  items-center text-white text-2xl">
                <MenuSelector icon={<FaCommentDots/>}/>
                <MenuSelector icon={<FaPeopleGroup/>}/>
                <MenuSelector icon={<FaComments/>}/>
                {isHost && (<InviteButton sessionId={"localhost:3000/session/"+session?.id}></InviteButton>)}
            </div>

            <MenuBody />            
        </div>
    );
}

export default SessionMenu;