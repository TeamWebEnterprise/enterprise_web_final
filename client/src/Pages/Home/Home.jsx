import { Box,Stack } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Siderbar";
import Feed from "../../components/Feed/Feed"
import React from 'react'
export const Home = ({mode,setMode}) => {
  return (
    <Box setMode={setMode} mode={mode} bgcolor={"background.default"} color={"text.primary"}>
        <Navbar/>
        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode}/>
          <Feed/>
          <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>Rightbar</Box>
         {/*  <Rightbar /> */}
        </Stack>
        {/* <Add /> */}
      </Box>
  )
}
