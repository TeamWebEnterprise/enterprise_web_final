import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import * as api from "../../utils/idieasApi";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Rightbar = () => {
  const { data, isLoading } = useQuery(["topIdieas"], () => api.getTopIdieas());
  return (
    <Box flex={3} p={2} sx={{ display: { xs: "none", sm: "flex" } }}>
      {isLoading == true ? (
        <Stack width={300} spacing={1}>
          <Skeleton variant="text" height={50} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={60} />
        </Stack>
      ) : (
        <Box position="fixed" width={300} marginX={4}>
          <Typography variant="h6" fontWeight={100} mt={2}>
            Top Idieas
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="1"
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    bgcolor: "#EEC900",
                    boxShadow: "0px 0px 15px #EEC900",
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${data.idieas[0].user.firstName} ${data.idieas[0].user.lastName}`}
                secondary={
                  <React.Fragment>{data.idieas[0].content}</React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="2"
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    bgcolor: "#8B3A3A",
                    boxShadow: "0px 0px 5px #8B3A3A",
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${data.idieas[1].user.firstName} ${data.idieas[1].user.lastName}`}
                secondary={
                  <React.Fragment>{data.idieas[1].content}</React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="3" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={`${data.idieas[2].user.firstName} ${data.idieas[2].user.lastName}`}
                secondary={
                  <React.Fragment>{data.idieas[2].content}</React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Rightbar;
