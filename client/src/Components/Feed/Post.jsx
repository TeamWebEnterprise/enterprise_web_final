import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useState } from "react";
import Comment from "../../components/Feed/Comment";
import formatDate from "../../utils/formatDate";

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Divider,
  Checkbox,
} from "@mui/material";
import { useSelector } from "react-redux";
import { CreateAxiosNoDispatch } from "../../createInstance";
import { comment, like } from "../../utils/idieasApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomizedMenus from "./PostDetail";
import FilesDisplay from "./FilesDisplay";

const Post = ({
  content,
  name,
  createAt,
  categories,
  comments,
  numberOfLike,
  closeIdieaAt,
  closeCommentAt,
  id,
  userId,
  likes,
  files,
  documents,
}) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const axiosJWT = CreateAxiosNoDispatch(user);
  const queryClient = useQueryClient();

  //Handle liked
  const { mutate: mutationLike } = useMutation(
    ({ id, positive }) => {
      return like(axiosJWT, accessToken, id, positive);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["idieas"]);
      },
    }
  );
  let check;
  let positiveCheck;
  let resultCheck;
  check = likes.some((like) => {
    if (like.userId === user.id) {
      positiveCheck = Boolean(like.positive === true);
      return true;
    }
    return false;
  });
  if (check === true) {
    if (positiveCheck === true) {
      resultCheck = true;
    } else {
      resultCheck = false;
    }
  }
  const handleLike = () => {
    mutationLike({ id: id, positive: "true" });
  };
  const handleDislike = () => {
    mutationLike({ id: id, positive: "false" });
  };

  //Handle Comment
  const [inputComment, setInputComment] = useState("");
  const [commentAnonymous, setCommentAnonymous] = useState(false);

  const { mutate: mutationComment } = useMutation(
    ({ anonymous, content, idieaId }) =>
      comment(axiosJWT, accessToken, anonymous, content, idieaId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["idieas"]);
      },
    }
  );
  const handleCheckAnonymousComment = () => {
    setCommentAnonymous(!commentAnonymous);
  };

  const handleCommentSubmit = () => {
    mutationComment({
      anonymous: commentAnonymous,
      content: inputComment,
      idieaId: id,
    });
    setOpenListComment(true);
    setOpen(false);
    setCommentAnonymous(false);
    setInputComment("");
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openListComment, setOpenListComment] = useState(false);
  const handleClickListComments = () => {
    setOpenListComment(!openListComment);
  };

  const [alignment, setAlignment] = useState(resultCheck);
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Card sx={{ marginBottom: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            U
          </Avatar>
        }
        action={
          <CustomizedMenus
            userId={userId}
            idieaId={id}
            closeIdieaAt={closeIdieaAt}
            closeComment={closeCommentAt}
            documents={documents}
            content={content}
          />
        }
        title={`${name}`}
        subheader={`${formatDate(createAt)}`}
      />
      <CardContent>
        <Typography fontSize="20px" variant="body2" color="text.primary">
          {`${content}`}
        </Typography>
        <Box marginY={1} display="flex">
          {categories.map((item) => (
            <Typography
              fontSize="14px"
              color="primary.light"
              marginRight={1}
              key={item.id}
            >{`#${item.categoryName}`}</Typography>
          ))}
        </Box>
      </CardContent>

      {files.length > 0 ? <FilesDisplay files={files} /> : <></>}

      <Box sx={{ display: "flex" }}>
        <Box
          flex={1}
          marginX={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <RecommendRoundedIcon color="primary" />
          <Typography
            marginX={0.5}
            fontSize="13px"
            lineHeight="24px"
            color="text"
          >
            {numberOfLike.like}
          </Typography>
          <Box
            sx={{
              backgroundColor: "red",
              color: "white",
              padding: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "100%",
              height: "19px",
            }}
          >
            <ThumbDownAltRoundedIcon fontSize="4px" />
          </Box>
          <Typography
            marginX={0.5}
            fontSize="13px"
            lineHeight="24px"
            color="text"
          >
            {numberOfLike.dislike}
          </Typography>
        </Box>

        <Box marginX={2}>
          {comments.length > 0 ? (
            <Typography fontSize="13px" color="text">
              {`${comments.length} Comments`}
            </Typography>
          ) : (
            <Typography fontSize="13px" color="text">
              Create comment...
            </Typography>
          )}
        </Box>
      </Box>

      <Divider variant="fullWidth" style={{ margin: "20px 20px 0px 20px" }} />

      <Grid container display="flex">
        <Grid item xs={8}>
          <ToggleButtonGroup
            fullWidth="100%"
            color="primary"
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton
              onClick={handleLike}
              sx={{ border: "none" }}
              value={true}
            >
              <ThumbUpRoundedIcon />
            </ToggleButton>

            <ToggleButton
              onClick={handleDislike}
              sx={{ border: "none" }}
              value={false}
            >
              <ThumbDownAltRoundedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex">
            <ToggleButton
              sx={{ border: "none" }}
              fullWidth="100%"
              aria-label="share"
              onClick={handleClickOpen}
            >
              <SmsRoundedIcon />
            </ToggleButton>
          </Box>
        </Grid>
      </Grid>

      {comments.length > 0 ? (
        <Accordion
          expanded={openListComment}
          sx={{ boxShadow: "0", marginX: "20px" }}
        >
          <AccordionSummary
            onClick={handleClickListComments}
            sx={{ border: "none" }}
            expandIcon={<ExpandMoreIcon />}
            id="panel1a-header"
          >
            <Typography fontSize="14px" color="text.secondary">
              Show comments...
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "0" }}>
            {comments.map((comment) => (
              <Comment comment={comment} />
            ))}
          </AccordionDetails>
        </Accordion>
      ) : (
        <></>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Leave your comments in the box below...
          </DialogContentText>
          <Box display="flex">
            <TextField
              fullWidth
              size="small"
              autoFocus
              margin="dense"
              id="name"
              label="Content"
              variant="standard"
              value={inputComment}
              onChange={(e) => {
                setInputComment(e.target.value);
              }}
            />
            <Checkbox
              onClick={handleCheckAnonymousComment}
              sx={{ height: "50px", width: "60px", marginTop: "10px" }}
              icon={<AdminPanelSettingsIcon />}
              checkedIcon={<AdminPanelSettingsIcon />}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCommentSubmit}>Send</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Post;
