import { Box,Stack,ThemeProvider } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Siderbar";
import React from 'react'
export const Home = ({mode,setMode}) => {
  return (
    <Box setMode={setMode} mode={mode} bgcolor={"background.default"} color={"text.primary"}>
        <Navbar/>
        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode}/>
          {/* <Feed />
          <Rightbar /> */}
        </Stack>
        {/* <Add /> */}
      </Box>
  )
}
