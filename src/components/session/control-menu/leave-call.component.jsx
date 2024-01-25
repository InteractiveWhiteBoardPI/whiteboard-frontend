import { FaPhoneFlip } from "react-icons/fa6";
import UseSessionContext from "../../../context/session/useSessionContext";
import UseUserContext from "../../../context/user/useUserContext";
import { useNavigate } from "react-router-dom";
import useCallContext from "../../../context/call/useCallContext";
import { INITIAL_SESSION } from "../../../context/session/session.context";

const LeaveCall = () => {
    const { currentUser } = UseUserContext();
    const { session, setSession } = UseSessionContext();
    const navigate = useNavigate();
    const { leaveCall } = useCallContext()

    const handleLeaveCall = () => {
        fetch(`http://localhost:8080/user/${currentUser?.uid}/leave/${session?.uid}`, {
            method: "POST",
        }).then(() => {
            leaveCall(currentUser?.uid, session?.uid);
            setSession(INITIAL_SESSION)
            navigate("/home")
        })
    };

    return (
        <button className="bg-black w-14 h-14 rounded-full flex justify-center items-center cursor-pointer" onClick={handleLeaveCall}>
            <FaPhoneFlip style={{ color: "#FF0000" }} className="text-2xl" />
        </button>
    );
};

export default LeaveCall;
