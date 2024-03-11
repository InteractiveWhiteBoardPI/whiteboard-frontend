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
import UserVideo from "./user-video.component";
import { useNavigate } from "react-router-dom";

const CallSection = () => {
  const { currentUser } = useUserContext()
  const {
    myStream,
    usersVideos, userMedia, errorState, setErrorState, pinUser , pinnedUser } = useCallContext()
  const navigate = useNavigate()
  


  useEffect(() => {
    if (!errorState) return
    navigate("/home")
    setErrorState(false)
  }, [errorState])

  return (
    <div className="flex flex-col h-full w-3/4 p-4 justify-evenly">
      <div className="h-3/4 w-full rounded-lg relative">
        {
          pinnedUser && (
            <UserVideo
              username={pinnedUser === currentUser?.uid ? "You" : usersVideos[pinnedUser].username}
              media={pinnedUser === currentUser?.uid ? userMedia : usersVideos[pinnedUser].media}
              stream={pinnedUser === currentUser?.uid ? myStream : usersVideos[pinnedUser].stream}
              pinUser={pinUser.bind(null, pinnedUser)}
              pinned={true}
            />
          )
        }
      </div>

      <div className="flex h-32 mt-4 rounded-3xl gap-7 ">
        {
          pinnedUser !== currentUser?.uid && (
            <div className="w-1/4 h-full relative">
              <UserVideo
                username="You"
                media={userMedia}
                stream={myStream}
                pinUser={pinUser.bind(null, currentUser?.uid)}
              />
            </div>
          )
        }
        {
          Object.entries(usersVideos).map(([userId, { stream, media, username }]) => userId !== pinnedUser && (
            <div className="w-1/4 h-full relative" key={userId}>
              <UserVideo
                username={username}
                media={media}
                stream={stream}
                pinUser={pinUser.bind(null, userId)}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default CallSection;