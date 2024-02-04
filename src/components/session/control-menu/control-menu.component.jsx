import { useCallback, useEffect } from "react";
import {
    FaMicrophone,
    FaMicrophoneSlash,
    FaPen,
    FaVideo,
    FaVideoSlash,
} from "react-icons/fa";

import { MdOutlineStopScreenShare } from "react-icons/md";

import LeaveCall from "./leave-call.component";
import { TbHeadphonesFilled,TbHeadphonesOff } from "react-icons/tb";
import { FaDisplay, FaPhoneFlip } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useCallContext from "../../../context/call/useCallContext";


const ControlMenu = () => {

    const navigate = useNavigate();

    const openWhiteboard = useCallback(() => {
        navigate("whiteboard");
    },[])

    const { userMedia, toggleMedia, screenSharing } = useCallContext();

    return (
        
        <div className="w-full h-[10%] flex items-center justify-center">
            <div className="flex rounded-full w-4/6 bg-dark-clr-70 justify-between text-2xl text-white">
                <button className="bg-black w-14 h-14 rounded-full flex justify-center items-center" onClick={openWhiteboard}>
                    <FaPen style={{ color: "#ffffff" }} className="text-2xl" />
                </button>
                    <button
                        onClick={toggleMedia.bind(null, "mute")}
                        className=" bg-black w-14 h-14 rounded-full flex justify-center items-center">
                        {
                            !userMedia.mute ? (
                                <TbHeadphonesFilled />
                            ) : (
                                <TbHeadphonesOff style={{ color: "#f00" }}/>
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
                            <FaVideoSlash style={{ color: "#f00" }}/>
                        )}
                    </button>
                    <button
                        className="bg-black w-14 h-14 rounded-full flex justify-center items-center"
                        onClick={toggleMedia.bind(null, "screen")}
                        >
                        {screenSharing ?
                        ( <MdOutlineStopScreenShare /> )
                        : (
                             <FaDisplay />)}
                    </button>
                    <LeaveCall/>
                </div>
                <button className="bg-red-500 w-32 h-14 rounded-full text-white font-semibold">
                    End Meeting
                </button>
        </div>
    );
}

export default ControlMenu;