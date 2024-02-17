import { createContext, useEffect, useState } from "react";

const UserContext = createContext({})

export default UserContext

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [imageByte , setImageByte] = useState(null) ;
    useEffect(() => {
    const getUser = async () => {
        const response = await fetch(`http://localhost:8080/user/get/${localStorage.uid}`, {
          method: 'GET',
          mode:'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.ok) {
          const userData = await response.json();
          setImageByte(userData.imageByte);
          currentUser.username=userData.username;
          setCurrentUser(currentUser);
        }
      };

      
    
      getUser();
    }, [currentUser]); 
    

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



