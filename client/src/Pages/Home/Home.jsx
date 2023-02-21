import React from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
export const Home = () => {
  const refresh = useRefreshToken();
  return (
    <>
      <main>
        <Outlet />
      </main>
      <button onClick={() => refresh()}>refresg</button>
    </>
  );
};
