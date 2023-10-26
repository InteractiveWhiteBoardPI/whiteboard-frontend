import { createContext, useReducer } from "react";
import sessionReducer, { INITIAL_STATE } from "./session.reducer";

const SessionContext = createContext({})

export default SessionContext

export const SessionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sessionReducer, INITIAL_STATE)

    const value = { state ,dispatch }

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
