import {createContext, useEffect, useRef, useState} from "react";
import useUserContext from "../user/useUserContext";
import Peer from "peerjs";
import socket from "../../utils/Socket";

const PrivateCallContext = createContext()
export default PrivateCallContext;

export const PrivateCallProvider = ({children}) =>{
    const [isVideoCall, setIsVideoCall] = useState(false);
    const [userMedia, setUserMedia] = useState({
        video: true,
        audio: true,
        mute: false,
    });
    const {currentUser} = useUserContext();
    const [userStream, setUserStream] = useState({});
    const [myStream, setMyStream] = useState(null);
    const [currentCall, setCurrentCall] = useState({});
    const peerRef = useRef();
    const [incomingCall, setIncomingCall] = useState(null);
    const [callInitiated, setCallInitiated] = useState(false);
    const [callAccepted, setCallAccepted] = useState(false);


    useEffect(() => {
        if(!currentUser?.uid) return
        const handleIncomingCall = (message) => {
            const callType = JSON.parse(message.body);
            console.log({callType})

            setIncomingCall({
                callerId: callType.userId,
                calledUserId: currentUser?.uid,
            });
            setIsVideoCall(callType.videoCall);
            setCallInitiated(true);
        };

        socket.subscribe(`/user/${currentUser?.uid}/incoming-call`, handleIncomingCall);

        return () => {
            socket.unsubscribe(`/user/${currentUser?.uid}/incoming-call`, handleIncomingCall);
        };
    }, [currentUser?.uid]);

    useEffect(() => {
        if (!currentUser) return;
        socket.subscribe(`/user/${currentUser.uid}/chat/toggle-media`, (message) => {
            const { video, audio, mute } = JSON.parse(message.body);
            console.log({video, audio, mute})
            setUserStream(prev => ({
                ...prev,
                media: {
                    video,
                    audio,
                    mute,
                }
            }))
        })

    }, [currentUser]);

    useEffect(() => {
        if (!myStream) return;
        setMyStream(prev => {
            const videoTrack = prev.getVideoTracks()[0];
            videoTrack.enabled = userMedia.video;

            const audioTrack = prev.getAudioTracks()[0];
            audioTrack.enabled = userMedia.audio;

            return prev;
        })
        if (currentCall) {
            const userId = currentCall.peer;
            socket.send(`/app/chat/toggle-media/${currentUser.uid}/${userId}`, JSON.stringify(userMedia));
        }


    }, [userMedia]);


    useEffect(() => {
        socket.subscribe(`/user/${currentUser?.uid}/chat/stop-call`, (message) => {
            const userId = message.body;
            stopCall();

        })
    }, [currentUser]);


    const initializePrivateCall = (currentUserId, calledUserId, isItVideoCall) => {

        let callTimeout;
        const TIMEOUT_DURATION = 15000;

        callTimeout = setTimeout(() => {

            if (!callAccepted) {
                endCall(calledUserId);
            }
        }, TIMEOUT_DURATION);

        navigator.mediaDevices.getUserMedia({video: isItVideoCall, audio: true})
            .then((stream) => {

                setMyStream(stream);
                const peer = new Peer(currentUserId);
                socket.send(`/app/${currentUserId}/initiate-call/${calledUserId}`,isItVideoCall);

                socket.subscribe(`/user/${currentUserId}/call-rejected`, (message) => {
                    clearTimeout(callTimeout);
                    setCallInitiated(false);
                    setCallAccepted(false);
                    peer.disconnect()
                    stream.getTracks().forEach((track) => {
                        track.stop();
                    })
                })
                setCallInitiated(true);

                peer.on('call',(call) => {
                    call.answer(stream);
                    call.on('stream',(remoteStream) => {
                        setUserStream(prev => ({
                            ...prev,
                            stream: remoteStream,
                            media: {
                                video: remoteStream.getVideoTracks()[0]?.enabled,
                                audio: remoteStream.getAudioTracks()[0]?.enabled,

                            }
                        }))
                    })
                    setCurrentCall(call)
                    setCallAccepted(true);
                    clearTimeout(callTimeout);

                });

                peer.on('disconnected', () => {
                    peer.destroy();
                });

                peerRef.current = peer;
                setIsVideoCall(isItVideoCall);

            }).catch((error) => {
            console.log("Error getting user media", error);
            setUserMedia({
                video: false,
                audio: false,
            })
            })

        setUserMedia(prevState => ({
            ...prevState,
            video: isItVideoCall,
        }))
    }
    const acceptCall = (userId) => {
        setCallInitiated(false);
        setIncomingCall(null);
        console.log({isVideoCall})
        navigator.mediaDevices.getUserMedia({video: isVideoCall, audio: true})
            .then((stream) => {
                setMyStream(stream);
                const peer = new Peer(currentUser.uid);
                peer.on("open", () => {
                    const call = peer.call(userId, stream);
                    call.on("stream", (remoteStream) => {
                        setUserStream(prev => ({
                            ...prev,
                            stream: remoteStream,
                            media: {
                                video: remoteStream.getVideoTracks()[0]?.enabled,
                                audio: remoteStream.getAudioTracks()[0]?.enabled,

                            }
                        }))
                        setCallAccepted(true);

                    });

                    setCurrentCall(call)
                })
                peerRef.current = peer;
            })
            .catch((error) => {
                console.log("Error getting user media", error);
                setUserMedia({
                    video: false,
                    audio: false,
                })
            });

    }
    const rejectCall = (userId) => {
        socket.send(`/app/reject-call/${userId}`, currentUser.uid);
        setCallInitiated(false);
        setCallAccepted(false);
        setIncomingCall(null);
    }

    const endCall = (userId) => {
        console.log("peerRef.current", peerRef.current)
        stopCall();
        socket.send(`/app/chat/end-call/${currentUser?.uid}`, userId);
        socket.send(`/app/chat/end-call/${userId}`, currentUser?.uid);


    }

    const stopCall = () => {
        if(peerRef.current) peerRef.current.disconnect();
        if (myStream) {
            myStream.getTracks().forEach(track => track.stop());
        }
        setCallInitiated(false);
        setCallAccepted(false);
        setUserStream({})
        setCurrentCall({})
        setMyStream(null);
        setIncomingCall(null);
        setIsVideoCall(false);
        setUserMedia({
            video: false,
            audio: false,
        })
    }

    const toggleMedia = (type) => {
        setUserMedia(prev => ({
            ...prev,
            [type]: !prev[type]
        }))
    }

    const value = {
        userMedia,
        userStream,
        myStream,
        initializePrivateCall,
        incomingCall,
        callInitiated,
        callAccepted,
        acceptCall,
        rejectCall,
        endCall,
        setIsVideoCall,
        isVideoCall,
        toggleMedia,
    };



    return (
        <PrivateCallContext.Provider value={value}>
            {children}
        </PrivateCallContext.Provider>
    );
}