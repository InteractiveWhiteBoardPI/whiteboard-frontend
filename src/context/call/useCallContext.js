import { useContext } from "react"
import CallContext from "./call.context"

const useCallContext = () => {
    const {
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
        
    } = useContext(CallContext)

    return {
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
    }
}
export default useCallContext