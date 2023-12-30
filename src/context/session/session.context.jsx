import { createContext, useState } from "react";

const SessionContext = createContext({})

export default SessionContext


const INITIAL_STATE = {
    uid : "",
    id: "",
    password: "",
    host : {},
    members:[]
}
export const SessionProvider = ({ children }) => {
    const [session , setSession] = useState(INITIAL_STATE)
    const [memebers, setMemebers] = useState([])

    const value = {
        session,
        setSession
    }

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
