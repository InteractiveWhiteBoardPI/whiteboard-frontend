import createAction from "../../utils/createAction";
import useUserContext from "./useUserContext";
import USER_ACTION_TYPES from "./user.types";

const useUserDispatch = () => {
    const { dispatch } = useUserContext()
    return dispatch
}
export default useUserDispatch

export const setCurrentUser = (user) => {
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
};