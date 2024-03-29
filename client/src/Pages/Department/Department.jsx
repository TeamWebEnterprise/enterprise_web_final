import React from "react";
import { Box, Stack } from "@mui/material";
import Navbar from "../../components/NavBar/NavBar";
import Sidebar from "../../components/Sidebar/Siderbar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import DialogSlide from "../../components/CreatePost/CreateIdiea";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableIdieas from "../Department/TableIdieas";
import { useQuery } from "@tanstack/react-query";
import { CreateAxiosNoDispatch } from "../../createInstance";
import LinearProgress from "@mui/material/LinearProgress";

export const Department = ({ mode, setMode }) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const axiosJWT = CreateAxiosNoDispatch(user);
  const accessToken = user?.accessToken;

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const { data, isLoading, error } = useQuery(
    ["idieasUnpublish", accessToken],
    () =>
      axiosJWT
        .get("/department/all-department-un-published", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data),
  );

  return (
    <Box
      setMode={setMode}
      mode={mode}
      bgcolor={"background.default"}
      color={"text.primary"}
    >
      {user.roles.some((role) => {
        return ["QA Coordinator"].includes(role);
      }) == true ? (
        <>
          <Navbar />
          <Stack direction="row" justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode} />
            <Box flex={6} sx={{ minHeight: "100vh", margin: "50px 0px" }}>
              {isLoading ? (
                <>
                  <Box
                    sx={{
                      width: "100%",
                      position: "fixed",
                      top: "64px",
                      left: "0px",
                      zIndex: "100",
                    }}
                  >
                    <LinearProgress />
                  </Box>
                </>
              ) : (
                <>
                  <TableIdieas data={data} />
                </>
              )}
            </Box>
            <Rightbar />
          </Stack>
          <DialogSlide />
        </>
      ) : (
        <>
          <Navbar />
          <Stack direction="row" justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode} />
            <Box flex={6} sx={{ minHeight: "100vh", margin: "50px 0px" }}>
              Sorry, This feature only publish for QA Coordinator!
            </Box>
            <Rightbar />
          </Stack>
          <DialogSlide />
        </>
      )}
    </Box>
  );
};

export default Department;
