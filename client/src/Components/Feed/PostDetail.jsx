import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import InfoIcon from "@mui/icons-material/Info";
import LockClockIcon from "@mui/icons-material/LockClock";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import formatDate from "../../utils/formatDate";
import JSZip from "jszip";
import { useState } from "react";
import { saveAs } from "file-saver";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import LinearProgress from "@mui/material/LinearProgress";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 15,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus({
  idieaId,
  closeIdieaAt,
  closeComment,
  documents,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [loading, setLoading] = useState(false);

  const downloadResourcesOnClick = async () => {
    setLoading(true);
    setTimeout(2000);
    try {
      const zip = new JSZip();
      const remoteZips = documents.map(async (file) => {
        const response = await fetch(file.url);
        const data = await response.blob();
        zip.file(`${file.key}`, data);

        return data;
      });

      Promise.all(remoteZips)
        .then(async () => {
          await zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "documents.zip");
          });
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
      setAnchorEl(null);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <IconButton
        sx={{ opacity: "0.3", borderRadius: "10px" }}
        aria-label="infor"
        onClick={handleClick}
      >
        <InfoIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <HighlightOffIcon />
          Delete
        </MenuItem>
        <MenuItem onClick={downloadResourcesOnClick} disableRipple>
          <DownloadForOfflineIcon />
          Download documents
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <LockClockIcon />
          {closeIdieaAt
            ? `Edit before ${formatDate(closeIdieaAt)}`
            : "This post haven't set close edit time"}
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <SpeakerNotesOffIcon />
          {closeComment
            ? `Comment before ${formatDate(closeComment)}`
            : "This post haven't set close comment time"}
        </MenuItem>
      </StyledMenu>
      {loading == true ? (
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
      ) : (
        <></>
      )}
    </div>
  );
}
