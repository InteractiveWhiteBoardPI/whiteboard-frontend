import { createContext, useEffect, useRef, useState } from "react";
import socket from "../../utils/Socket";
import useUserContext from "../user/useUserContext";
import Peer from "peerjs";
import useSessionContext from "../session/useSessionContext";
import { toast } from "react-toastify";
import ToastDisplayer from "../../components/toast-displayer/toast-displayer.component";

const CallContext = createContext();
export default CallContext;

export const CallProvider = ({ children }) => {
    const [userMedia, setUserMedia] = useState({
        video: true,
        audio: true,
        mute: true,
    });
    const { currentUser } = useUserContext();
    const { session } = useSessionContext();
    const [usersVideos, setUsersVideos] = useState({});
    const [myStream, setMyStream] = useState(null);
    const [calls, setCalls] = useState({});
    const peerRef = useRef();
    const [errorState, setErrorState] = useState(false);
    const [pinnedUser, setPinnedUser] = useState(null)

    useEffect(
        () => {
            if(!myStream) return;
        }, [ myStream?.getTracks() ]
    )

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
    }, [currentUser, session]);

    useEffect(() => {
        if (!session.uid) return;
        socket.subscribe(`/user/${session.uid}/session/user-left`, (message) => {
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
            videoTrack.enabled = userMedia.video;

            const audioTrack = prev.getAudioTracks()[0];
            audioTrack.enabled = userMedia.audio;

            return prev;
        })
        Object.keys(calls).forEach((userId) => {
            socket.send(`/app/session/toggle-media/${currentUser.uid}/${userId}`, JSON.stringify(userMedia));
        })
    }, [userMedia]);

    const initializeCall = (sessionId, currentUserId) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setMyStream(stream);
                const peer = new Peer();
                socket.subscribe(`/user/${sessionId}/session/user-joined`, (message) => {
                    const peerId = JSON.parse(message.body);
                    if (peerId.userId === currentUserId) return;
                    handleNewUserConnection(peerId, stream);
                });


                peer.on("call", async (call) => {
                    try {
                        const res = await fetch(`http://localhost:8080/user/peer/${call.peer}`);
                        if (res.status === 404) {
                            call.close();
                            return;
                        }
                        const user = await res.json();
                        call.answer(stream);

                        call.on("stream", (remoteStream) => {
                            setUsersVideos(prev => ({
                                ...prev,
                                [user.uid]: {
                                    stream: remoteStream,
                                    username: user.username,
                                    media: {
                                        video: remoteStream.getVideoTracks()[0].enabled,
                                        audio: remoteStream.getAudioTracks()[0].enabled,
                                    }
                                }
                            }))
                        });

                        setCalls(prev => ({
                            ...prev,
                            [user.uid]: call
                        }))
                    } catch (error) {
                        toast.error(error.message);
                        setErrorState(true);
                    }

                })

                peer.on("error", () => {
                    setErrorState(true);
                    toast.error("Could not establish a connection");
                })

                peer.on("open", async id => {
                    const res = await fetch(`http://localhost:8080/user/update-peer/${currentUserId}/${id}`, {
                        method: "PUT",
                        cors: "cors",
                    });
                    if (res.status === 200) {
                        socket.send(`/app/session/user-join/${sessionId}`, JSON.stringify({ id, userId: currentUserId }));
                    } else {
                        setErrorState(true);
                        toast.error("Failed to connect to the server");
                    }
                })

                peer.on("disconnected", () => {
                    peer.destroy();
                });

                peerRef.current = peer;
            }).catch((err) => {
                setErrorState(true)
                toast.error("Failed to get user media");
                setUserMedia({
                    video: false,
                    audio: false,
                })
            })

    };

    const handleNewUserConnection = async (peerId, stream) => {
        const call = peerRef.current.call(peerId.id, stream);
        const res = await fetch(`http://localhost:8080/user/username/${peerId.userId}`);
        if (res.status === 404) {
            call.close();
            return;
        }
        const user = await res.json();

        if (!call) return;
        call.on("stream", (remoteStream) => {
            setUsersVideos(prev => ({
                ...prev,
                [peerId.userId]: {
                    stream: remoteStream,
                    username: user.username,
                    media: {
                        video: remoteStream.getVideoTracks()[0].enabled,
                        audio: remoteStream.getAudioTracks()[0].enabled,
                    }
                }
            }))
        })

        setCalls(prev => ({
            ...prev,
            [peerId.userId]: call
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
    }
    const toggleMedia = (type) => {
        setUserMedia(prev => {
            const updatedMedia = {
                ...prev,
                [type]: !prev[type]
            };
            if(type === "mute") return updatedMedia;
            
            if (updatedMedia[type]) {
                navigator.mediaDevices.getUserMedia({ video: updatedMedia.video, audio: updatedMedia.audio })
                    .then((stream) => {
                        setMyStream(
                            prev => {
                                const track = stream.getTracks().find(track => track.kind === type);
                                prev.removeTrack(prev.getTracks().find(track => track.kind === type))
                                prev.addTrack(track);
                                return prev;
                            }
                        )
                        Object.entries(calls).forEach(([userId, call]) => {
                            call.peerConnection.getSenders().forEach(sender => {
                                if (type === sender.track.kind) {
                                    sender.replaceTrack(stream.getTracks().find(track => track.kind === type));
                                }
                            });
                            socket.send(`/app/session/toggle-media/${currentUser.uid}/${userId}`, JSON.stringify(updatedMedia));
                        });
                    })
                    .catch((err) => {
                        console.error('Failed to get user media: ', err);
                        // Handle error
                    });
            } else {
                if (myStream) {
                    myStream.getTracks().forEach(track => {
                        if (type === track.kind) {
                            track.stop(); // Stop the track to completely turn off the media device
                        }
                    });
                }
                // If turning the media off, send updated media state to other users
                Object.keys(calls).forEach((userId) => {
                    socket.send(`/app/session/toggle-media/${currentUser.uid}/${userId}`, JSON.stringify(updatedMedia));
                });
            }

            return updatedMedia;
        });
    };


    const pinUser = (userId) => {
        if (!currentUser) return
        if (userId === pinnedUser) return
        setPinnedUser(userId)
    };

    const value = {
        myStream,
        initializeCall,
        usersVideos,
        toggleMedia,
        userMedia,
        leaveCall,
        errorState,
        setErrorState,
        pinnedUser,
        pinUser
    };

    return (
        <CallContext.Provider value={value}>
            <ToastDisplayer/>
            {children}
        </CallContext.Provider>
    );
};
