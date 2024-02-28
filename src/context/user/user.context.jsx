import { createContext, useEffect, useState } from "react";

const UserContext = createContext({})

export default UserContext

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}



