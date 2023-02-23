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
  axios,
) => {
  dispatch(logoutStart());
  console.log(refreshToken);
  try {
    try {
      await axios.post("/auth/logout", {
        data: { refreshToken: String(refreshToken) },
        Headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    } catch (e) {
      console.log(e);
    }

    navigate("/login");
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailed());
  }
};
