import { createContext, useState } from "react";

const SessionContext = createContext({})

export default SessionContext


export const INITIAL_SESSION = {
    uid : "",
    id: "",
    password: "",
    host : {}
}
export const SessionProvider = ({ children }) => {
    const [session , setSession] = useState(INITIAL_SESSION)
    
    const value = {
        session,
        setSession
    }

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
