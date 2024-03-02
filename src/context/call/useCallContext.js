import { useContext } from "react"
import CallContext from "./call.context"

const useCallContext = () => {
    const {
        myStream,
        initializeCall,
        usersVideos,
        setUsersVideos,
        toggleMedia,
        userMedia,
        leaveCall,
        screenSharing,
        pinnedUser,  
        setPinnedUser, 
    } = useContext(CallContext)

    return {
        myStream,
        initializeCall,
        usersVideos,
        setUsersVideos,
        toggleMedia,
        userMedia,
        leaveCall,
        screenSharing ,
        pinnedUser,  
        setPinnedUser, 
    }
}
export default useCallContext