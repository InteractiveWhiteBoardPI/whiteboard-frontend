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
    } = useContext(CallContext)

    return {
        myStream,
        initializeCall,
        usersVideos,
        setUsersVideos,
        toggleMedia,
        userMedia,
    }
}
export default useCallContext