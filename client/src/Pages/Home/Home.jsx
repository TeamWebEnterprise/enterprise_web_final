import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";
import { logOut } from "../../redux/apiRequest";
export const Home = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(user, dispatch, logOutSuccess);
  useEffect(() => {
    if (!user) {
      navigate("login");
    }
    
  }, []);
  const handleLogOut = () => {
    logOut(dispatch ,navigate, accessToken, axiosJWT);
    
  };
  return (
    <div>
      {user?(
        <>
          <Link  onClick={handleLogOut} >Logout</Link>
        </>
      ):(
        <>
        <Link to='/login' >Login</Link>
        </>
        
      )}
    </div>
      
    
  );
};
