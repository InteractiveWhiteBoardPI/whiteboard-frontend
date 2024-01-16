import { createContext, useState } from "react";

const SessionContext = createContext({})

export default SessionContext


const INITIAL_STATE = {
    uid : "",
    id: "",
    password: "",
    host : {}
}
export const SessionProvider = ({ children }) => {
    const [session , setSession] = useState(INITIAL_STATE)


    const value = {
        session,
        setSession
    }

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
