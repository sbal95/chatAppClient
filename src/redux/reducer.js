import * as actionTypes from "./ActionTypes";

const initialState = {
  currentUser: "",
  messageTo: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      const forSetCurrentUser = {...state};
      forSetCurrentUser.currentUser = action.payload;
      return forSetCurrentUser;
    case actionTypes.SET_Message_TO:
      const forSetMessageTo = {...state};
      forSetMessageTo.messageTo = action.payload;
      console.log(action.payload);
      return forSetMessageTo;
    default:
      return state;
  }
};
