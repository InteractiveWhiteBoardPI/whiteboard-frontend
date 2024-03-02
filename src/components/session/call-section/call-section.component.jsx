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
  const [pinnedUser, setPinnedUser] = useState(null);

  useEffect(() => {
    if (!session.uid || !currentUser) return;
    initializeCall(session.uid, currentUser?.uid);
    handleThumbtackClick(currentUser.uid)
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

  useEffect(
    () => {
      if (!pinnedUser) return
    }, [pinnedUser]
  )

  const handleThumbtackClick = (userId) => {
    if (!currentUser) return
    if (userId === currentUser.uid) {
      setPinnedUser({
        uid: currentUser.uid,
        stream: myStream,
        media: userMedia,
        username: currentUser.username,
        mute: userMedia.mute,
      })
    } else {
      setPinnedUser({
        uid: userId,
        stream: usersVideos[userId].stream,
        media: usersVideos[userId].media,
        mute: userMedia.mute,
        username: usernames[userId]
      })
    }
  };

  // const renderUserVideos = () => {
  //   const userVideoElements = Object.entries(usersVideos).map(([userId, { stream, media }]) => {
  //     if (pinnedUser === userId) {
  //       return null;
  //     }

  //     const isPinned = pinnedUser === userId;
  //     const videoStyle = isPinned ? "w-full" : "w-1/4";

  //     return (
  //       <div className={`h-full relative ${videoStyle}`} key={userId}>

  //       </div>
  //     );
  //   });


  //   const currentUserVideo = (
  //     <div className={`h-full relative w-1/4`} key={currentUser?.uid}>

  //       <UserVideo
  //         username={pinnedUser.username}
  //         media={userMedia}
  //         stream={myStream}
  //         mute={userMedia.mute}
  //         pinned={pinnedUser === currentUser?.uid}
  //         onThumbtackClick={() => handleThumbtackClick(currentUser?.uid)}
  //       />
  //     </div>
  //   );

  //   if (pinnedUser === currentUser?.uid) {
  //     return [userVideoElements];
  //   }

  //   return [currentUserVideo, ...userVideoElements].filter(Boolean);
  // };


  const currentVideoStyle = pinnedUser === currentUser?.uid ? "w-full" : "hidden";

  return (
    <div className="flex flex-col h-full w-3/4 p-4 justify-evenly">
      <div className="h-3/4 w-full rounded-lg relative">
        <div className="w-full h-full relative">
          {
            pinnedUser && (
              <UserVideo
                username={pinnedUser.username}
                media={pinnedUser.media}
                stream={pinnedUser.stream}
                mute={pinnedUser.mute}
                pinned={true}
                onThumbtackClick={handleThumbtackClick.bind(null, pinnedUser.uid)}
              />
            )
          }
        </div>
      </div>

      <div className="flex h-32 mt-4 rounded-3xl gap-7">

      </div>
    </div>
  );
};

export default CallSection;