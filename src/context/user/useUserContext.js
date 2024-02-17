import { useContext } from "react";
import UserContext from "./user.context";

const useUserContext = () => {
    const {
        currentUser,
        setCurrentUser,
        setImageByte,
    } = useContext(UserContext)

    return {
        currentUser,
        setCurrentUser,
        setImageByte,
    }
}

export default useUserContext