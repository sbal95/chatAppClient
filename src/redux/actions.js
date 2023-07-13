import * as actionTypes from "./ActionTypes";

export const setCurrentUser = (username) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: username,
  };
};

export const setMessageTo = (username) => {
  return {
    type: actionTypes.SET_Message_TO,
    payload: username,
  };
};
