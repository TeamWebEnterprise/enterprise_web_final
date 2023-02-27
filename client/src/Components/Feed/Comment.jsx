import React from "react";
import { Card, Avatar, CardContent, Typography, Box } from "@mui/material";
import formatDate from "../../utils/formatDate";
import BasicMenu from "./CommentMenu";

const Comment = ({ comment }) => {
  return (
    <Box display="flex" marginLeft={2}>
      <Avatar sx={{ bgcolor: "blue" }} aria-label="recipe">
        C
      </Avatar>
      <Card
        sx={{ margin: "0 20px 9px 9px", borderRadius: "20px", width: "100%" }}
      >
        <Box display="flex">
          <Box flex={1} marginX={2} marginTop={1}>
            <Typography fontSize="12px" color="text.primary" fontWeight="bold">
              {`${comment.user.firstName} ${comment.user.lastName}`}
            </Typography>
            <Typography fontSize="10px" color="text.secondary">
              {`${formatDate(comment.createdAt)}`}
            </Typography>
          </Box>
          <BasicMenu />
        </Box>
        <CardContent sx={{ paddingY: "0" }}>
          <Typography fontSize="14px" color="text.primary" paddingBottom={0}>
            {comment.content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Comment;
