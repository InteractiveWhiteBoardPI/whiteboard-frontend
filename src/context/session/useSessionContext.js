import { useContext } from "react"
import SessionContext from "./session.context"

const useSessionContext = () => useContext(SessionContext)

export default useSessionContext