import {
  Box,
  Stack,
  Skeleton,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import React, { useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Post from "./Post";

const Feed = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [200]);

  const [value, setValue] = React.useState(0);

  return (
    <Box flex={4}>
      <Box marginY={2}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction
            label="Department"
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      </Box>
      <Box>
        {loading ? (
          <Stack spacing={1}>
            <Skeleton variant="text" height={100} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="rectangular" height={300} />
          </Stack>
        ) : (
          <>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Feed;
