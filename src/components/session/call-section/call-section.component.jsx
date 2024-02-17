import {
    FaMicrophone,
    FaMicrophoneSlash,
    FaThumbtack,
    FaVideoSlash,
  } from "react-icons/fa";
  import useSessionContext from "../../../context/session/useSessionContext";
  import { useEffect, useState } from "react";
  import useUserContext from "../../../context/user/useUserContext";
  import useCallContext from "../../../context/call/useCallContext";
  import { TbHeadphonesOff } from "react-icons/tb";
  import UserVideo from "./user-video.component";
  
  const CallSection = () => {
    const { session } = useSessionContext()
    const { currentUser } = useUserContext()
    const {
      initializeCall,
      myStream,
      usersVideos, userMedia } = useCallContext()
    const [usernames, setUsernames] = useState({});
  
    useEffect(
      () => {
        if (!session.uid || !currentUser) return
        initializeCall(session.uid, currentUser.uid)
      }, [session, currentUser]
    )
  
    useEffect(() => {
      Object.keys(usersVideos).forEach((userId) => {
        fetch(`http://localhost:8080/user/username/${userId}`)
          .then((res) => res.json())
          .then((data) => {
            setUsernames((prev) => ({
              ...prev,
              [userId]: data.username,
            }));
          });
      } )
    } , [usersVideos])
  
    return (
      <div className="flex flex-col h-full w-3/4 p-4 justify-evenly">
        <div className="h-3/4 w-full rounded-lg relative">
          <div className="absolute top-2 left-2 z-10 bg-light-clr-20 py-1 px-2 rounded-full text-sm">
            You
          </div>
          <div
            className="absolute top-2 right-2 z-10 w-10 h-10 bg-light-clr-20 py-1 px-2 rounded-full text-2xl flex items-center">
            <FaThumbtack />
          </div>
          <video
            ref={(ref) => {
              if (!ref) return;
              ref.srcObject = myStream;
            }}
            playsInline
            autoPlay
            muted
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
  
        <div className="flex h-32 mt-4 rounded-3xl gap-7 ">
          {
            Object.entries(usersVideos).map(([userId, {stream , media}]) => (
              <div className="w-1/4 h-full relative" key={userId}>
                <UserVideo 
                  userName={usernames[userId]}
                  media={media}
                  stream={stream}
                  mute={userMedia.mute}
                  />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
  
  export default CallSection;