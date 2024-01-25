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
        leaveCall
    } = useContext(CallContext)

    return {
        myStream,
        initializeCall,
        usersVideos,
        setUsersVideos,
        toggleMedia,
        userMedia,
        leaveCall
    }
}
export default useCallContext