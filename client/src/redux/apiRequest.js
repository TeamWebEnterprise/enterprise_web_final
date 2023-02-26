import { useState } from "react";
import axios from "../api/axios";

import {
  loginStart,
  loginFailed,
  loginSuccess,
  logoutStart,
  logoutFailed,
  logoutSuccess,
} from "./authSlice";

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

export const logout = async (
  dispatch,
  navigate,
  refreshToken,
  accessToken,
  axiosJWT,
) => {
  dispatch(logoutStart());
  console.log(refreshToken);
  try {
    try {
      await axiosJWT.delete("/auth/logout", {
        headers: { token: `Bearer ${accessToken}` },
        data: { refreshToken: String(refreshToken) },
      });
    } catch (e) {
      console.log(e);
    }

    dispatch(logoutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logoutFailed());
  }
};
