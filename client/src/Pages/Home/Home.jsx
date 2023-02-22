import React, { useEffect, useState } from "react";
import { useContext, useNavigate } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import axios
 from "../../api/axios";
export const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers ] =useState();
  const refresh = useRefreshToken();

  useEffect(()=>{
    const isMounted = true;
    const controller = new AbortController();

    const getUsers = async ()=>{
      try{
        const response = await axios.post('/auth/login',{
          signal: controller.signal
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      }catch(err){
        console.error(err)
      }
    }
    getUsers();
    return ()=>{
      isMounted = false;
      controller.abort();
    }
  },[])
  return (
    <article>
    {users?.length?(
      <ul>
        {users.map((user,i)=><li key={i}>{user?.username}</li>)}
      </ul>
    ):<p>no U</p>}
      <button onClick={() => refresh()}>refresh</button>
    </article>
  );
};
