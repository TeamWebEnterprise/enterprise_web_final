import { MoreVert } from "@mui/icons-material";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useState } from "react";
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
const Post = () => {
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
        title="User Name"
        subheader="September 14, 2023"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          If you’re interested in clothing and sales, you might consider
          starting an online reseller business. Although it takes time,
          dedication and an eye for fashion, you can start your business as a
          side hustle and turn it into a full-time resale business. You could
          start by using online store websites like Poshmark and Mercari to sell
          your unwanted clothing and items, then expand to your own resale
          website. Consider shopping estate sales and flea markets for hidden
          finds at a low cost and then listing them for a profit online. You may
          be able to collect a substantial inventory of items that are in good
          shape for very little overhead if you’re diligent enough and search
          the right places.
        </Typography>
        <Typography sx={{ color: "primary.light", margin: "5px" }}>
          #Blockchain, #Web
        </Typography>
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
            15k
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
            12
          </Typography>
        </Box>

        <Box marginX={2}>
          <Typography fontSize="13px" color="text">
            5 Comments
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

      <Accordion>
        <AccordionSummary
          sx={{ border: "none" }}
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography fontSize="14px" color="text.secondary">
            Show comments...{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0" }}>
          <Card>
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
              title="User Name"
              subheader="September 14, 2023"
            />
            <CardContent padding={4} sx={{ paddingY: "0" }}>
              <Typography fontSize="14px" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nostrum error, eius aspernatur.
              </Typography>
            </CardContent>
          </Card>
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
