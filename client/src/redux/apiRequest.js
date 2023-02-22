import axios from "../api/axios";

import {  loginStart, loginFailed, loginSuccess,logOutStart, logOutFailed, logOutSuccess } from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const response = await axios.post("/auth/login", user);
    dispatch(loginSuccess(response.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const logOut = async (dispatch, navigate,accessToken,axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post("/auth/logout", {
      headers : {body:accessToken},})
      
    dispatch(logOutSuccess());
    navigate('/login');
  } catch (err) {
    dispatch(logOutFailed());
  }
};
