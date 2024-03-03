import {FaMicrophone, FaVideoSlash} from "react-icons/fa";
import UsePrivateCallContext from "../../../context/private-call/usePrivateCallContext";
import {IoMdCall} from "react-icons/io";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import {TbHeadphonesFilled, TbHeadphonesOff} from "react-icons/tb";

const Call = ({chosenUserId}) => {
    const {myStream, userStream, endCall, toggleMedia, userMedia} = UsePrivateCallContext();

    console.log("myStream", myStream?.getTracks());
    console.log("userStream", userStream.stream?.getTracks());

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row rounded w-1/2 h-2/3">
                <div className="m-2">
                    {userStream && (
                        <video
                            autoPlay
                            playsInline
                            ref={(videoRef) => {
                                if (videoRef) {
                                    videoRef.srcObject = userStream.stream;
                                }
                            }}
                            className="rounded"
                        />
                    )}
                </div>
                <div className="m-2">
                    {myStream && (
                            <video
                                autoPlay
                                playsInline
                                ref={(videoRef) => {
                                    if (videoRef) {
                                        videoRef.srcObject = myStream;
                                    }
                                }}
                                className="rounded"
                            />
                    )}
                </div>

            </div>
            <div className="flex flex-row space-x-4 bg-black bg-opacity-30 p-2  rounded-3xl">
                <button className="bg-black bg-opacity-50 rounded-3xl p-2 hover:bg-opacity-30 cursor-pointer" onClick={toggleMedia.bind(null, "mute")}>
                    {
                        !userMedia.mute ? (
                            <TbHeadphonesFilled className="text-white cursor-pointer"/>
                        ) : (
                            <TbHeadphonesOff style={{ color: "#f00" }} className="text-white cursor-pointer"/>
                        )
                    }

                </button>
                <button className="bg-black bg-opacity-50 rounded-3xl p-2 hover:bg-opacity-30 cursor-pointer" onClick={toggleMedia.bind(null, "video")}>
                    {
                        userMedia.video ? (
                            <FaVideo className="text-white cursor-pointer"/>
                        ) : (
                            <FaVideoSlash style={{ color: "#f00" }} className="text-white cursor-pointer"/>
                        )
                    }

                </button>
                <button className="bg-black bg-opacity-50 rounded-3xl p-2 hover:bg-opacity-30 cursor-pointer" onClick={toggleMedia.bind(null, "audio")}>
                    {userMedia.audio ? (
                        <FaMicrophone className="text-white cursor-pointer"/>
                        ) : (
                        <FaMicrophoneSlash  style={{ color: "#f00" }} className="text-white cursor-pointer"/>
                    )
                    }
                </button>
            <div className="bg-red-500  rounded-3xl p-2 hover:bg-opacity-90 cursor-pointer"
                     onClick={endCall.bind(null, chosenUserId)}>
                    <IoMdCall className="text-white cursor-pointer"/>
            </div>
            </div>

        </div>
    );
}

export default Call;