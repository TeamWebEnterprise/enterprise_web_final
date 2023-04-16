import { Box, Stack } from "@mui/material";
import Navbar from "../../components/Navbar/NavBar";
import Sidebar from "../../components/Sidebar/Siderbar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import DialogSlide from "../../components/CreatePost/CreateIdiea";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Home = ({ mode, setMode }) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      setMode={setMode}
      mode={mode}
      bgcolor={"background.default"}
      color={"text.primary"}
    >
      {user == null ? (
        <></>
      ) : (
        <>
          <Navbar />
          <Stack direction="row" justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode} />
            <Feed />
            <Rightbar />
          </Stack>
          <DialogSlide />
        </>
      )}
    </Box>
  );
};
