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
            videoTrack.enabled = userMedia.video;

            const audioTrack = prev.getAudioTracks()[0];
            audioTrack.enabled = userMedia.audio;

            return prev;
        })
        //for each user in the session we send them the new userMedia
        Object.keys(calls).forEach((userId) => {
            socket.send(`/app/session/toggle-media/${currentUser.uid}/${userId}`, JSON.stringify(userMedia));
        })
    }, [userMedia]);

    const initializeCall = (sessionId, currentUserId) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setMyStream(stream);
                const peer = new Peer(currentUserId);

                socket.subscribe(`/user/${sessionId}/session/user-joined`, (message) => {
                    const userId = message.body;
                    if (userId === currentUserId) return;
                    handleNewUserConnection(userId, stream);
                });

                //upcoming call
                peer.on("call", (call) => {
                    call.answer(stream);
                    call.on("stream", (remoteStream) => {
                        setUsersVideos(prev => ({
                            ...prev,
                            [call.peer]: {
                                stream: remoteStream,
                                media: {
                                    video: remoteStream.getVideoTracks()[0]?.enabled,
                                    audio: remoteStream.getAudioTracks()[0]?.enabled,
                                }
                            }
                        }))
                    });

                    setCalls(prev => ({
                        ...prev,
                        [call.peer]: call
                    }))

                })

                //when u create a peer there is a delay for it to be created so we wait for it
                //id de celui qui a creer la peer currentUserId ( id utilisée dans le constructor de la peer)
                peer.on("open", id => {
                    socket.send(`/app/session/user-join/${sessionId}`, id);
                })

                peer.on("disconnected", () => {
                    peer.destroy();
                });

                peer.call(currentUserId, stream)

                peerRef.current = peer;
            }).catch((err) => {
                console.log("Error getting user media", err);
                setUserMedia({
                    video: false,
                    audio: false,
                })
            })

    };

    //userId of the newly joined user, and the stream of the current user
    const handleNewUserConnection = (userId, stream) => { //peerRef.current to access the object saved in the ref
        const call = peerRef.current.call(userId, stream);

        //listening on the event , stream of the other user and u add it to ur videos
        call.on("stream", (remoteStream) => {
            setUsersVideos(prev => ({
                ...prev,
                [userId]: {
                    stream: remoteStream,
                    //saving the state of my media , current
                    media: {
                        video: remoteStream.getVideoTracks()[0].enabled,
                        audio: remoteStream.getAudioTracks()[0].enabled,
                    }
                }
            }))
        })

        //saving the call object
        setCalls(prev => ({
            ...prev,
            [userId]: call
        }))
    };

    const leaveCall = (userId, sessionId) => {
        peerRef.current.disconnect();
        if (myStream) {
            myStream.getTracks().forEach(track => track.stop()); //browser stops reading ur media
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
        setUserMedia(prev => ({
            ...prev,
            [type]: !prev[type]
        }))
    }

    const value = {
        myStream,
        initializeCall,
        usersVideos,
        toggleMedia,
        userMedia,
        leaveCall
    };

    return (
        <CallContext.Provider value={value}>
            {children}
        </CallContext.Provider>
    );
};
