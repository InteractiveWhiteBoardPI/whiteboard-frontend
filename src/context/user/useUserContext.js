import { useContext } from "react";
import UserContext from "./user.context";

const useUserContext = () => useContext(UserContext)

export default useUserContext