import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SET_AUTH_ERROR,
} from "../Actions/authActions";

const initialState = {
  user: null,
  isCreated: false,
  errorMSG: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...state, user: action.payload, isCreated: false, errorMSG: "" };
    case SIGN_OUT_SUCCESS:
      return { ...state, user: null };
    case SIGN_UP_SUCCESS:
      return { ...state, isCreated: true };
    case SET_AUTH_ERROR:
      return { ...state, errorMSG: action.payload };
    default:
      return state;
  }
};

export default authReducer;
