import PrivateCallContext from "./private-call.context";
import { useContext } from "react"
const UsePrivateCallContext = () => {
    const {
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
    } = useContext(PrivateCallContext)

    return {
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
    }
}

export default UsePrivateCallContext;