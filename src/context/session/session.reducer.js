import SESSION_ACTION_TYPES from "./session.types";

export const INITIAL_STATE = {
  sessionId: null,
  sessionPassword: null,
  sessionLink: null,
  sessionHost: null,
  sessionMembers: [],
};

const sessionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SESSION_ACTION_TYPES.SET_SESSION_ID:
      return {
        ...state,
        sessionId: payload,
      };
    case SESSION_ACTION_TYPES.SET_SESSION_PASSWORD:
      return {
        ...state,
        sessionPassword: payload,
      };
    case SESSION_ACTION_TYPES.SET_SESSION_LINK:
      return {
        ...state,
        sessionPassword: payload,
      };
    case SESSION_ACTION_TYPES.SET_SESSION_HOST:
      return {
        ...state,
        sessionHost: payload,
      };
    case SESSION_ACTION_TYPES.SET_SESSION_MEMBERS:
      return {
        ...state,
        sessionMembers: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in sessionReducer`);
  }
};

export default sessionReducer
