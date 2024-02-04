import { createContext, useEffect, useRef, useState } from "react";
import socket from "../../utils/Socket";
import useUserContext from "../user/useUserContext";
import Peer from "peerjs";
import useSessionContext from "../session/useSessionContext";

const CallContext = createContext();
export default CallContext;

export const CallProvider = ({ children }) => {
    const [userMedia, setUserMedia] = useState({
        video: true,
        audio: true,
        mute: false,
    });
    const { currentUser } = useUserContext();
    const { session } = useSessionContext();
    const [usersVideos, setUsersVideos] = useState({});
    const [myStream, setMyStream] = useState(null);
    const [calls, setCalls] = useState({});
    const peerRef = useRef();
    const [screenSharing, setScreenSharing] = useState(false);
   

  

    useEffect(() => {
        if (!currentUser) return;
        if (!session.uid) return;
        socket.subscribe(`/user/${currentUser.uid}/session/toggle-media`, (message) => {
            const { video, audio, userId, mute } = JSON.parse(message.body);
            setUsersVideos(prev => ({
                ...prev,
                [userId]: {
                    ...prev[userId],
                    media: {
                        video,
                        audio,
                        mute,
                    }
                }
            }))
        })
    }, [currentUser,session]);

    useEffect(() => {
        if (!session.uid) return;
        socket.subscribe(`/user/${session.uid}/session/user-leaved`, (message) => {
            const userId = message.body;
            setUsersVideos((prev) => {
                const updatedUsers = { ...prev };
                delete updatedUsers[userId];
                return updatedUsers;
            });
    
            setCalls((prev) => {
                const updatedCalls = { ...prev };
                delete updatedCalls[userId];
                return updatedCalls;
            });
        })
    }, [session]);

    useEffect(() => {
        if (!myStream) return;
        setMyStream(prev => {
            const videoTrack = prev.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = userMedia.video;
            }
    
            const audioTrack = prev.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = userMedia.audio;
            }
    
            return prev;
        })
        Object.keys(calls).forEach((userId) => {
            socket.send(`/app/session/toggle-media/${currentUser.uid}/${userId}`, JSON.stringify(userMedia));
        })
    }, [userMedia]);

    useEffect(() => {
  
        const supportsWeb = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    
        if (!supportsWeb) {
          setUserMedia((prev) => ({
            ...prev,
            video: false,
            audio: false,
            mute: true,
          }));
        }
      }, []);

    const initializeCall = (sessionId, currentUserId) => {
        const getUserMediaConfig = screenSharing
            ? { video: { mediaSource: "screen" }, audio: true }
            : { video: true, audio: true };

        navigator.mediaDevices.getUserMedia(getUserMediaConfig)
            .then((stream) => {
                setMyStream(stream);
                const peer = new Peer(currentUserId);

                socket.subscribe(`/user/${sessionId}/session/user-joined`, (message) => {
                    const userId = message.body;
                    if (userId === currentUserId) return;
                    handleNewUserConnection(userId, stream);
                });

                peer.on("call", (call) => {
                    call.answer(stream);
                    call.on("stream", (remoteStream) => {
                        setUsersVideos(prev => ({
                            ...prev,
                            [call.peer]: {
                                stream: remoteStream,
                                media: {
                                    video: remoteStream.getVideoTracks()[0].enabled,
                                    audio: remoteStream.getAudioTracks()[0].enabled,
                                }
                            }
                        }))
                    });

                    setCalls(prev => ({
                        ...prev,
                        [call.peer]: call
                    }))
                })

                peer.on("open", id => {
                    socket.send(`/app/session/user-join/${sessionId}`, id);
                })

                peer.on("disconnected", () => {
                    peer.destroy();
                });

                peer.call(currentUserId, stream)

                peerRef.current = peer;
            })
            .catch((err) => {
                console.log("Error getting user media", err);
                setUserMedia({
                    video: false,
                    audio: false,
                })
            })
    };

    const handleNewUserConnection = (userId, stream) => {
        const call = peerRef.current.call(userId, stream);


        call.on("stream", (remoteStream) => {
            setUsersVideos(prev => ({
                ...prev,
                [userId]: {
                    stream: remoteStream,
                    media: {
                        video: remoteStream.getVideoTracks()[0].enabled,
                        audio: remoteStream.getAudioTracks()[0].enabled,
                    }
                }
            }))
        })

        setCalls(prev => ({
            ...prev,
            [userId]: call
        }))
    };


    const leaveCall = (userId, sessionId) => {
        peerRef.current.disconnect();
        if (myStream) {
            myStream.getTracks().forEach(track => track.stop());
        }

        peerRef.current = {};
        setUsersVideos({});
        setCalls({});
        setMyStream(null);
        setUserMedia({
            video: true,
            audio: true,
        })
        socket.clearSubscriptions();
        socket.send(`/app/session/user-leave/${sessionId}`, userId);
    };


    const toggleMedia = async (type) => {
        setUserMedia((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    
        if (type === "screen") {
            const newScreenSharingState = !screenSharing;
    
            try {
                if (newScreenSharingState) {
                    const screenStream = await navigator.mediaDevices.getDisplayMedia({
                      video: { mediaSource: "screen" },
                      audio: true,
                    });
                  
                    setMyStream(screenStream);
                    setScreenSharing(true);
                  
                    Object.values(calls).forEach((call) => {
                      call.peerConnection.getSenders().forEach((sender) => {
                        const track = screenStream.getTracks().find((t) => t.kind === sender.track.kind);
                        if (track) {
                          sender.replaceTrack(track);
                        }
                      });
                    });
                  } else {
                    stopScreenSharing();
                }
            } catch (error) {
                console.error("Error toggling screen sharing:", error);
            }
        }
    };
    
    const stopScreenSharing = () => {
        if (myStream) {
          myStream.getTracks().forEach((track) => track.stop());
      
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((cameraStream) => {
              setMyStream(cameraStream);
              setScreenSharing(false);
      
              Object.values(calls).forEach((call) => {
                call.peerConnection.getSenders().forEach((sender) => {
                  const track = cameraStream.getTracks().find((t) => t.kind === sender.track.kind);
                  if (track) {
                    sender.replaceTrack(track);
                  }
                });
              });
            })
            .catch((error) => {
              console.error("Error resuming camera stream:", error);
            });
        }
      };

    const value = {
        myStream,
        initializeCall,
        usersVideos,
        toggleMedia,
        userMedia,
        leaveCall,screenSharing
    };

    return (
        <CallContext.Provider value={value}>
            {children}
        </CallContext.Provider>
    );
};
