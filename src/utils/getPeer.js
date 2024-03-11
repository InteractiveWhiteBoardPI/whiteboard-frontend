import Peer from "peerjs"
import socket from "./Socket";
import { toast } from "react-toastify";

const getPeer  = (stream, setUsersVideos, setCalls, sessionId, userId) => {
    const peer = new Peer();
    socket.connect()

    peer.on("call", async call => {
        try {
            const res = await fetch(`http://localhost:8080/user/peer/${call.peer}`);
            if(res.status === 404) {
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
                        username : user.username,
                        media: {
                            video: remoteStream.getVideoTracks()[0]?.enabled,
                            audio: remoteStream.getAudioTracks()[0]?.enabled,
                        }
                    }
                }))
                setCalls(prev => ({
                    ...prev,
                    [user.uid]: call
                }))
            });
            
        } catch (error) {
            toast.error(error.message);
        }
    })
    peer.on("error", (e) => {
        toast.error(e.message);
    })
    peer.on("open", async id => {
        const res = await fetch(`http://localhost:8080/user/update-peer/${userId}/${id}`,{
            method: "PUT",
            cors: "cors",
        });
        if (res.status === 200) {
            socket.send(`/app/session/user-join/${sessionId}`, JSON.stringify({ id, userId }));
        } else {
            setErrorState(true);
            toast.error("Failed to connect to the server");
        }
    })
    peer.on("disconnected", () => {
        peer.destroy();
    });

    return peer
}

export default getPeer;