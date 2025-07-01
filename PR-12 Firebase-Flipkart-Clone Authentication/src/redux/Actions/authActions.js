import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';

// --- Action Types ---
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const SET_AUTH_STATE = 'SET_AUTH_STATE';



export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const setAuthState = (user) => ({
  type: SET_AUTH_STATE,
  payload: user,
});

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: userCredential.user,
    });
    return true;
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
    return false;
  }
};

export const signupUser = (email, password) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: userCredential.user,
    });
    return true;
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: error.message,
    });
    return false;
  }
};

export const loginWithGoogle = () => async (dispatch) => {
  dispatch(authRequest());
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: userCredential.user,
    });
    return true;
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
    return false;
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(authRequest());
  try {
    await signOut(auth);
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    return true;
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.message,
    });
    return false;
  }
};