import { createContext, useReducer } from "react";
import userReducer, { INITIAL_STATE } from "./user.reducer";

const UserContext = createContext({})

export default UserContext

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const value = { state, dispatch };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}



