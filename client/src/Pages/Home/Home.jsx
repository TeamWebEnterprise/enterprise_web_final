import { Box, Stack } from "@mui/material";
import Navbar from "../../components/NavBar/NavBar";
import Sidebar from "../../components/Sidebar/Siderbar";
import Feed from "../../components/Feed/Feed";
import CreatePost from "../../components/CreatePost/CreatePost";
import Rightbar from "../../components/Rightbar/Rightbar";
import React from "react";
export const Home = ({ mode, setMode }) => {
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
      <CreatePost />
    </Box>
  );
};
