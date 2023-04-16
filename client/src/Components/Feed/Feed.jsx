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
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useSelector } from "react-redux";
import PortraitIcon from "@mui/icons-material/Portrait";

import { useQuery } from "@tanstack/react-query";
import * as api from "../../utils/idieasApi";
import countLike from "../../utils/countLike";
import Post from "./Post";

const Feed = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [orderField, setOrderField] = useState("createdAt");
  const [orderBy, setOrderBy] = useState("desc");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    ["idieas", orderField, orderBy, page, user.id],
    () => api.getIdieas(orderField, orderBy, page, user.id)
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
            label="Trending"
            icon={<WhatshotIcon />}
          />
          <BottomNavigationAction
            value={"point"}
            label="Top"
            icon={<AutoGraphIcon />}
          />
          <BottomNavigationAction
            value={"comments"}
            label="Comments"
            icon={<CommentBankIcon />}
          />
          <BottomNavigationAction
            value={"own"}
            label="Own"
            icon={<PortraitIcon />}
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
            {data.idieas?.map((item) => (
              <Post
                key={item.id}
                content={item.content}
                name={`${item.user.firstName} ${item.user.lastName}`}
                createAt={item.createdAt}
                categories={item.categories}
                numberOfLike={countLike(item.likes)}
                comments={item.comments}
                id={item.id}
                userId={item.userId}
                likes={item.likes}
                closeIdieaAt={item.closeIdieaAt}
                closeCommentAt={item.closeCommentAt}
                files={item.documents}
                documents={item.documents}
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
                  count={data.pages}
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
