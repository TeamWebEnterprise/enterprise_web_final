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
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import * as api from "../../utils/idieasApi.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateAxiosNoDispatch } from "../../createInstance";
import { Box } from "@mui/material";
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
  userId,
  content,
}) {
  const currentId = useSelector((state) => state.auth.login.currentUser.id);
  const user = useSelector((state) => state.auth.login.currentUser);
  const axiosJWT = CreateAxiosNoDispatch(user);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.accessToken
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [newContent, setNewContent] = React.useState(content);
  const handleClickOpenEdit = () => {
    if (currentId === userId) {
      setOpenEdit(true);
    } else {
      toast.warning("you don't have permission to delete this idea !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ({ axiosJWT, accessToken, idieaId, content }) => {
      return api.editIdiea(axiosJWT, accessToken, idieaId, content);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["idieas"]);
        setAnchorEl(null);
      },
    }
  );

  const { mutate: mutateDelete } = useMutation(
    ({ axiosJWT, accessToken, idieaId }) => {
      return api.deleteIdiea(axiosJWT, accessToken, idieaId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["idieas"]);
        setAnchorEl(null);
      },
    }
  );

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async (e) => {
    // "http://localhost:3001/idieas/delete"
    if (currentId === userId) {
      try {
        mutateDelete({
          idieaId: idieaId,
          accessToken: accessToken,
          axiosJWT: axiosJWT,
        });
        toast.success("Delete your idea success !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch {
        toast.error("Delete your idea false !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.warning("you don't have permission to delete this idea !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    handleClose();
  };

  const handleEdit = async (e) => {
    try {
      mutate({
        idieaId: idieaId,
        accessToken: accessToken,
        content: newContent,
        axiosJWT: axiosJWT,
      });
      handleCloseEdit();
    } catch {}
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
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit your post content</DialogTitle>
        <DialogContent>
          <DialogContentText>
            welcome come to edit idiea if your finish click save to done change
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="content"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewContent(e.target.value)}
            value={newContent}
            defaultValue="Default Value"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleEdit}>Save</Button>
        </DialogActions>
      </Dialog>
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
        <MenuItem onClick={handleClickOpenEdit} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} disableRipple>
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
