import {
    FaMicrophone,
    FaMicrophoneSlash,
    FaThumbtack,
    FaVideoSlash,
} from "react-icons/fa";
import { TbHeadphonesOff } from "react-icons/tb";
import useCallContext from "../../../context/call/useCallContext";

const UserVideo = ({ username, media, stream, pinned = false, pinUser }) => {
    const { userMedia } = useCallContext()
    return (
        <>
            <div className="absolute top-2 left-2 z-10 bg-light-clr-20 py-1 px-2 rounded-full text-sm">
                {username}
            </div>
            <div
                className="absolute bottom-2 left-2 z-10 w-10 h-10 bg-light-clr-20 py-1 px-2 rounded-full text-2xl flex items-center">
                {
                    media.audio ? (
                        <FaMicrophone />
                    ) : (
                        <FaMicrophoneSlash className="text-red-500" />
                    )
                }
            </div>
            {
                !media.video && (
                    <div className="absolute w-full h-full grid place-items-center bg-black">
                        <div className="z-10 w-10 h-10 bg-light-clr-20 py-1 px-2 rounded-full text-2xl flex items-center">
                            <FaVideoSlash className="text-red-500" />
                        </div>
                    </div>
                )
            }
            {
                media.mute && (
                    <div className="absolute bottom-2 right-2 z-10 w-10 h-10 bg-light-clr-20 py-1 px-2 rounded-full text-2xl flex items-center">
                        <TbHeadphonesOff className="text-red-500" />
                    </div>
                )
            }
            <div
                onClick={pinUser}
                className="absolute top-2 right-2 z-10 w-10 h-10 bg-light-clr-20 py-1 px-2 rounded-full text-2xl flex items-center cursor-pointer">
                <FaThumbtack className={pinned && "text-selected"}/>
            </div>
            <video
                ref={(videoRef) => {
                    if (videoRef) {
                        videoRef.style.transform = 'scaleX(-1)';
                        videoRef.style.transformOrigin = 'center';
                        videoRef.srcObject = stream
                    };
                }}
                className="w-full h-full object-cover rounded-lg"
                playsInline
                autoPlay
                muted={userMedia.mute}
            ></video>
        </>
    );
}

export default UserVideo;