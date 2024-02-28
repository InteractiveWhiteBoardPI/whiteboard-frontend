import { useContext } from "react";
import UserContext from "./user.context";

const useUserContext = () => {
    const {
        currentUser,
        setCurrentUser,
    } = useContext(UserContext)

    return {
        currentUser,
        setCurrentUser,
    }
}

export default useUserContext