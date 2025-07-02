import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../../firebase";

// Action types
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";

// Action creators
export const signInSuccess = (user) => ({ type: SIGN_IN_SUCCESS, payload: user });
export const signOutSuccess = () => ({ type: SIGN_OUT_SUCCESS });
export const signUpSuccess = () => ({ type: SIGN_UP_SUCCESS });
export const setAuthError = (msg) => ({ type: SET_AUTH_ERROR, payload: msg });

// Thunks
export const signUpAsync = ({ email, password }) => async (dispatch) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    dispatch(signUpSuccess());
  } catch (err) {
    dispatch(setAuthError(err.message));
  }
};

export const signInAsync = ({ email, password }) => async (dispatch) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    dispatch(signInSuccess(res.user));
  } catch (err) {
    dispatch(setAuthError(err.message));
  }
};

export const googleSignInAsync = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    dispatch(signInSuccess(res.user));
  } catch (err) {
    dispatch(setAuthError(err.message));
  }
};

export const checkAuthStateAsync = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(signInSuccess(user));
    } else {
      dispatch(signOutSuccess());
    }
  });
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(signOutSuccess());
  } catch (err) {
    console.error("Logout error:", err);
  }
};
