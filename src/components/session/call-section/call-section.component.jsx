import { FaThumbtack } from "react-icons/fa";
import useSessionContext from "../../../context/session/useSessionContext";
import { useEffect, useState } from "react";
import useUserContext from "../../../context/user/useUserContext";
import useCallContext from "../../../context/call/useCallContext";
import UserVideo from "./user-video.component";

const CallSection = () => {
  const { session } = useSessionContext();
  const { currentUser } = useUserContext();
  const {
    initializeCall,
    myStream,
    usersVideos,
    userMedia
  } = useCallContext();
  const [usernames, setUsernames] = useState({});
  const [pinnedUser, setPinnedUser] = useState(currentUser.uid);
  

  useEffect(() => {
    if (!session.uid || !currentUser) return;
    initializeCall(session.uid, currentUser.uid);
  }, [session, currentUser]);

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
    });
  }, [usersVideos]);

  const handleThumbtackClick = (userId) => {
    setPinnedUser((prevPinnedUser) => {
   
      if (prevPinnedUser === currentUser.uid) {
        return userId;
      } else {
        return currentUser.uid;
      }
    });
  };

  const renderPinnedVideo = () => {
    const pinnedUserData = usersVideos[pinnedUser];
    if (!pinnedUserData) return null;
    

    return (
      <div className="w-full h-full relative">
        <UserVideo
          userName={usernames[pinnedUser]}
          media={pinnedUserData.media}
          stream={pinnedUserData.stream}
          mute={userMedia.mute}
          pinned={true}
          onThumbtackClick={() => handleThumbtackClick(pinnedUser.uid)}
        />
      </div>
    );
  };
  const renderUserVideos = () => {
    const userVideoElements = Object.entries(usersVideos).map(([userId, { stream, media }]) => {
      if (pinnedUser === userId) {
        return null;
      }
  
      const isPinned = pinnedUser === userId;
      const videoStyle = isPinned ? "w-full" : "w-1/4";
  
      return (
        <div className={`h-full relative ${videoStyle}`} key={userId}>
          <UserVideo
            userName={usernames[userId]}
            media={media}
            stream={stream}
            mute={userMedia.mute}
            pinned={isPinned}
            onThumbtackClick={() => handleThumbtackClick(userId)}
          />
        </div>
      );
    });
  
   
    const currentUserVideo = (
      <div className={`h-full relative w-1/4`} key={currentUser.uid}>
       
        <UserVideo
          userName={usernames[currentUser.uid]}
          media={userMedia}
          stream={myStream}
          mute={userMedia.mute}
          pinned={pinnedUser === currentUser.uid}
          onThumbtackClick={() => handleThumbtackClick(currentUser.uid)}
        />
      </div>
    );
  
    if (pinnedUser === currentUser.uid) {
      return [userVideoElements];
    }
  
    return [currentUserVideo, ...userVideoElements].filter(Boolean);
  };


  const currentVideoStyle = pinnedUser === currentUser.uid ? "w-full" : "hidden";

  return (
    <div className="flex flex-col h-full w-3/4 p-4 justify-evenly">
      <div className="h-3/4 w-full rounded-lg relative">
        {renderPinnedVideo()}
        <div
          className="absolute top-2 right-2 z-10 w-10 h-10 bg-light-clr-20 py-1 px-2 rounded-full text-2xl flex items-center"
          onClick={() =>
            handleThumbtackClick(
              pinnedUser === currentUser.uid
                ? Object.keys(usersVideos)[0]
                : currentUser.uid
            )
          }
        >
          <FaThumbtack />
        </div>
        <video
          ref={(ref) => {
            if (!ref)return;
            ref.srcObject = myStream;
          }}
          playsInline
          autoPlay
          muted
          className={`h-full object-cover rounded-lg ${currentVideoStyle}`}
        />
      </div>

      <div className="flex h-32 mt-4 rounded-3xl gap-7">{renderUserVideos()}</div>
    </div>
  );
};

export default CallSection;