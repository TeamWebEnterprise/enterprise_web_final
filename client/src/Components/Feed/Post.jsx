import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import Comment from "../../components/Feed/Comment";
import formatDate from "../../utils/formatDate";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
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

const Post = ({
  content,
  name,
  createAt,
  categories,
  comments,
  numberOfLike,
  id,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [alignment, setAlignment] = useState("");
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
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={`${name}`}
        subheader={`${formatDate(createAt)}`}
      />
      <CardContent>
        <Typography fontSize="20px" variant="body2" color="text.secondary">
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
              height: "16px",
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
          <Typography fontSize="13px" color="text">
            {`${comments.length} Comments`}
          </Typography>{" "}
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
            <ToggleButton sx={{ border: "none" }} value="like">
              <ThumbUpRoundedIcon />
            </ToggleButton>

            <ToggleButton sx={{ border: "none" }} value="unlike">
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

      <Accordion sx={{ boxShadow: "0", marginX: "20px" }}>
        <AccordionSummary
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
            />
            <Checkbox
              sx={{ height: "50px", width: "60px", marginTop: "10px" }}
              icon={<AdminPanelSettingsIcon />}
              checkedIcon={<AdminPanelSettingsIcon />}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Send</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Post;
