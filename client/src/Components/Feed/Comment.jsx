import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import formatDate from "../../utils/formatDate";

const Comment = ({ comment }) => {
  return (
    <Card sx={{ boxShadow: "none" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "puple" }} aria-label="recipe">
            C
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={`${comment.user.firstName} ${comment.user.lastName}`}
        subheader={`${formatDate(comment.createdAt)}`}
      />
      <CardContent padding={4} sx={{ paddingY: "0" }}>
        <Typography fontSize="18px" color="text.secondary">
          {comment.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
