import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";
import { logout } from "../../redux/apiRequest";
export const Home = () => {

  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const refreshToken = user?.refreshToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  useEffect(() => {
    if (!user) {
      navigate("login");
    }
  }, []);
  const handleLogOut = () => {
    logout(dispatch, navigate, accessToken,axiosJWT);
  };
  return (
    <div>
      {user ? (
        <>
          <Link to='/login' onClick={handleLogOut}>Logout</Link>
        </>
      ) : (
        <>
          <Link to='/login'>Login</Link>
        </>
      )}
    </div>
  );
};
