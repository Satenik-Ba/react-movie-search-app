import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logout from "../Authenticataion/Logout";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { USER_PAGE } from "../../constants/routes";

const useStyles = makeStyles(() => {
  return {
    root: {
      paddingRight: "0px !important",
    },
    avatar: {
      fontSize: "2.3rem !important",
    },
  };
});

function UserAvatar() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userName = useSelector((state) => state.userInfo.userName);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClick = () => {
    history.push(USER_PAGE);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar className={classes.root}>
          <span>Hello {userName} </span>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle className={classes.avatar} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem>
                <Logout />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </Box>
    </div>
  );
}

export default UserAvatar;
