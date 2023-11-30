import { createContext, useEffect, useState } from "react";

const UserContext = createContext({})

export default UserContext

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(
        () => {
            if(currentUser){

                console.log(currentUser)
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
        currentUser,
        setCurrentUser,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}



