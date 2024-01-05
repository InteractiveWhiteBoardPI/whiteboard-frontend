import { createContext, useEffect, useState } from "react";

const UserContext = createContext({})

export default UserContext

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [imageByte , setImageByte] = useState(null) ;
    useEffect(
        () => {
            if(currentUser){
                const saveUser = async () => {
                    await fetch("http://localhost:8080/user/save", {
                        method: 'POST',
                        mode:'cors',
                        body: JSON.stringify(currentUser),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }
                saveUser()
            }
        }, [currentUser]
    )

    const value = {
      currentUser: {
        ...currentUser,
        imageByte
      },
      setCurrentUser,
      setImageByte,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}



