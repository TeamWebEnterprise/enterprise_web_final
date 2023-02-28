import { Box, Stack } from "@mui/material";
import Navbar from "../../components/NavBar/NavBar";
import Sidebar from "../../components/Sidebar/Siderbar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import DialogSlide from "../../components/CreatePost/CreateIdiea";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
      <Navbar />
      <Stack direction="row" justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode} />
        <Feed />
        <Rightbar />
      </Stack>
      <DialogSlide />
    </Box>
  );
};
