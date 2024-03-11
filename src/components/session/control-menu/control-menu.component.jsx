import { useCallback, useState } from "react";
import {
    FaMicrophone,
    FaMicrophoneSlash,
    FaPen,
    FaShare,
    FaVideo,
    FaVideoSlash,
} from "react-icons/fa";
import LeaveCall from "./leave-call.component";
import { TbHeadphonesFilled, TbHeadphonesOff } from "react-icons/tb";
import { FaDisplay, FaPhoneFlip } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useCallContext from "../../../context/call/useCallContext";
import InviteMenu from "./invite-menu/invite-menu.component";

const ControlMenu = () => {
    const [showWhiteboard, setShowWhiteboard] = useState(false);
    const { userMedia, toggleMedia } = useCallContext()
    const navigate = useNavigate();

    const openWhiteboard = () => {
        if(showWhiteboard) {
            setShowWhiteboard(false);
            navigate(".");
            return;
        }
        navigate("whiteboard")
        setShowWhiteboard(true);
    }

    return (
        <div className="w-full h-[10%] flex items-center justify-center">
            <div className="flex rounded-full w-4/6 bg-dark-clr-70 justify-between text-2xl text-white">
                <InviteMenu />
                <button className="bg-black w-14 h-14 rounded-full flex justify-center items-center" onClick={openWhiteboard}>
                    <FaPen  style={{ color: showWhiteboard ? "#6AC6FF" : "#ffffff" }} className="text-2xl" />
                </button>
                <button
                    onClick={toggleMedia.bind(null, "mute")}
                    className=" bg-black w-14 h-14 rounded-full flex justify-center items-center">
                    {
                        !userMedia.mute ? (
                            <TbHeadphonesFilled />
                        ) : (
                            <TbHeadphonesOff style={{ color: "#f00" }} />
                        )
                    }

                </button>
                <button
                    className="bg-black w-14 h-14 rounded-full flex justify-center items-center"
                    onClick={toggleMedia.bind(null, "audio")}
                >
                    {userMedia.audio ? (
                        <FaMicrophone />
                    ) : (
                        <FaMicrophoneSlash
                            style={{ color: "#f00" }}
                        />
                    )}
                </button>
                <button
                    className="bg-black w-14 h-14 rounded-full flex justify-center items-center"
                    onClick={toggleMedia.bind(null, "video")}
                >
                    {userMedia.video ? (
                        <FaVideo />
                    ) : (
                        <FaVideoSlash style={{ color: "#f00" }} />
                    )}
                </button>
                <LeaveCall />
            </div>
        </div>
    );
}

export default ControlMenu;