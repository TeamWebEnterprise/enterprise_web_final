import { Mail, Notifications } from "@mui/icons-material";
import TryRoundedIcon from "@mui/icons-material/TryRounded";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";
import { logout } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    logout(dispatch, navigate, accessToken, axiosJWT);
  };
  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Box display='flex'>
          <Typography
            variant='h6'
            fontWeight='bold'
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Inspiration Station
          </Typography>
          <TryRoundedIcon />
        </Box>
        <Icons>
          <Badge badgeContent={4} color='error'>
            <Mail />
          </Badge>
          <Badge badgeContent={2} color='error'>
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
          />
          <Typography variant='span'>Name</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
