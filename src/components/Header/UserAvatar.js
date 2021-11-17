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
import { USER_PAGE, ACCOUNT_PAGE } from "../../constants/routes";

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
  const handleAccountClick = () => {
    history.push(ACCOUNT_PAGE)
  }

  return (
    <div className={classes.root}>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <span> {userName} </span>
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
              <MenuItem onClick={handleAccountClick}>Account</MenuItem>

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
