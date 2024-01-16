import { useState } from "react";
import {
    FaExpand,
    FaMicrophone,
    FaMicrophoneSlash,
    FaPen,
    FaSmile,
    FaVideo,
    FaVideoSlash,
} from "react-icons/fa";
import { FaDisplay } from "react-icons/fa6";
import LeaveCall from "./leave-call.component";

const ControlMenu = () => {
    const [micClicked, setMicClicked] = useState(false);
    const [vidClicked, setVidClicked] = useState(false);

    const handleMicClick = () => {
        setMicClicked((prevMicState) => !prevMicState);
    };
    const handleCamClicked = () => {
        setVidClicked((prevVidState) => !prevVidState);
    };
    return (
        <div className=" flex rounded-full w-4/6 bg-dark-clr-70 justify-between">
            <div
                className="bg-cover bg-no-repeat w-14 h-14 rounded-full"
                style={{
                    backgroundImage:
                        "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrwXfuGTN059UjTXRHrkig0YZxKE2Wm2_mR0ppaPfVDG4hruRfhVhby4xpRLzgz2YE8w&usqp=CAU)",
                }}
            ></div>
            <button className="bg-black w-14 h-14 rounded-full flex justify-center items-center">
                <FaExpand style={{ color: "#ffffff" }} className="text-2xl" />
            </button>
            <div className=" h-14 flex rounded-full gap-10">
                <button className="bg-black w-14 h-14 rounded-full flex justify-center items-center">
                    <FaPen style={{ color: "#ffffff" }} className="text-2xl" />
                </button>
                <div className="bg-black w-14 h-14 rounded-full flex justify-center items-center">
                    <FaSmile style={{ color: "#ffffff" }} className="text-2xl" />
                </div>
                <button
                    className="bg-black w-14 h-14 rounded-full flex justify-center items-center"
                    onClick={handleMicClick}
                >
                    {micClicked ? (
                        <FaMicrophone style={{ color: "#ffffff" }} className="text-2xl" />
                    ) : (
                        <FaMicrophoneSlash
                            style={{ color: "#ffffff" }}
                            className="text-2xl"
                        />
                    )}
                </button>
                <button
                    className="bg-black w-14 h-14 rounded-full flex justify-center items-center"
                    onClick={handleCamClicked}
                >
                    {vidClicked ? (
                        <FaVideo style={{ color: "#ffffff" }} className="text-2xl" />
                    ) : (
                        <FaVideoSlash style={{ color: "#ffffff" }} className="text-2xl" />
                    )}
                </button>
                <button className="bg-black w-14 h-14 rounded-full flex justify-center items-center">
                    <FaDisplay style={{ color: "#ffffff" }} className="text-2xl" />
                </button>
                <LeaveCall/>
            </div>
            <button className="w-32 h-14 rounded-full text-white font-semibold">
                End Meeting
            </button>
        </div>
    );
}

export default ControlMenu;