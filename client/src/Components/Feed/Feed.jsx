import {
  Box,
  Stack,
  Skeleton,
  BottomNavigation,
  BottomNavigationAction,
  Pagination,
} from "@mui/material";
import React, { useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useQuery } from "@tanstack/react-query";
import * as api from "../../utils/idieasApi";
import countLike from "../../utils/countLike";
import Post from "./Post";

const Feed = () => {
  const [orderField, setOrderField] = useState("createdAt");
  const [orderBy, setOrderBy] = useState("desc");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    ["idieas", orderField, orderBy, page],
    () => api.getIdieas(orderField, orderBy, page)
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      duration: 500,
    });
  };

  if (error) {
    return <p>Error!!</p>;
  }
  return (
    <Box flex={4} minHeight="100vh">
      <Box marginY={2}>
        <BottomNavigation
          showLabels
          value={orderField}
          onChange={(event, newValue) => {
            setOrderField(newValue);
            setPage(1);
          }}
        >
          <BottomNavigationAction
            value={"createdAt"}
            label="Recents"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            value={"likes"}
            label="Favorites"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            value={"createdAt"}
            label="Department"
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      </Box>
      <Box>
        {isLoading || data === null ? (
          <Stack spacing={1}>
            <Skeleton variant="text" height={100} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="rectangular" height={300} />
          </Stack>
        ) : (
          <>
            {data?.map((item) => (
              <Post
                key={item.id}
                content={item.content}
                name={`${item.user.firstName} ${item.user.lastName}`}
                createAt={item.createdAt}
                categories={item.categories}
                numberOfLike={countLike(item.likes)}
                comments={item.comments}
                id={item.id}
                likes={item.likes}
              />
            ))}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              marginY={4}
            >
              <Stack spacing={2}>
                <Pagination
                  onChange={(event, newValue) => {
                    setPage(newValue);
                  }}
                  onClick={scrollToTop}
                  page={page}
                  count={10}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Feed;
