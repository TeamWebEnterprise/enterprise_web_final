import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      const userDecode = jwt_decode(action.payload.accessToken);

      state.login.isFetching = false;
      state.login.currentUser = { id: userDecode.userId, ...action.payload };
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    logoutStart: (state) => {
      state.login.isFetching = true;
    },
    logoutSuccess: (state, action) => {
      state.login.currentUser = null;
    },
    logoutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    refreshSucess: (state, action) => {
      state.login.currentUser = action.payload;
    },
  },
});

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  logoutStart,
  logoutFailed,
  logoutSuccess,
  refreshSucess,
} = authSlice.actions;
export default authSlice.reducer;
