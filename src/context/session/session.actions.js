import createAction from "../../utils/createAction";
import useSessionContext from "./useSessionContext";

const useSessionDispatch = () => {
  const { dispatch } = useSessionContext()
  return dispatch
}
export default useSessionDispatch

export const setSessionId = (id) =>
  createAction(SESSION_ACTION_TYPES.SET_SESSION_ID, id);

export const setSessionPassword = (password) =>
  createAction(SESSION_ACTION_TYPES.SET_SESSION_PASSWORD, password);

export const setSessionLink = (link) =>
  createAction(SESSION_ACTION_TYPES.SET_SESSION_LINK, link);

export const setSessionHost = (host) =>
  createAction(SESSION_ACTION_TYPES.SET_SESSION_HOST, host);

export const setSessionMembers = (members) =>
  createAction(SESSION_ACTION_TYPES.SET_SESSION_MEMBERS, members);