import { createSlice } from "@reduxjs/toolkit";

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
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    logoutStart: (state) => {
      state.login.isFetching = true;
    },
    logoutSuccess: (state,action) => {
      state.login.currentUser = null;
    },
    logoutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
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
} = authSlice.actions;
export default authSlice.reducer;
