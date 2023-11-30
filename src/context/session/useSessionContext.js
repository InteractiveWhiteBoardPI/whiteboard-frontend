import { useContext } from "react"
import SessionContext from "./session.context"

const useSessionContext = () => {
    const {
        session,
        setSession
    } = useContext(SessionContext)

    return {
        session,
        setSession
    }
}

export default useSessionContext