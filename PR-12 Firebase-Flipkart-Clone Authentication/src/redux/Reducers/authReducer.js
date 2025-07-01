// src/redux/Reducers/authReducer.js

import {
  AUTH_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  SET_AUTH_STATE, // Import the new action type
} from '../Actions/authActions'; // Adjust path based on your structure

const initialState = {
  currentUser: null, // Stores the Firebase user object
  loading: false,    // True when an auth operation is in progress
  error: null,       // Stores any error messages
  authChecked: false, // Indicates if the initial Firebase auth state has been checked
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Clear any previous errors on a new request
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload, // payload is the user object
        error: null,
        authChecked: true, // Auth state determined
      };
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        currentUser: null, // Ensure no user if auth failed
        error: action.payload, // payload is the error message
        authChecked: true, // Auth state determined (failed)
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: null, // Clear user on logout
        error: null,
        authChecked: true, // Auth state determined
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload, // Store logout error if any
        // currentUser remains as is, as logout failed
      };
    case SET_AUTH_STATE: // Handle the state from onAuthStateChanged
      return {
        ...state,
        currentUser: action.payload, // user object or null
        loading: false, // Ensure loading is false after initial check
        authChecked: true, // Mark as checked
        error: null, // Clear any errors if a user is found/not found initially
      };
    default:
      return state;
  }
};

export default authReducer;