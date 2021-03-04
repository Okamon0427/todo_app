import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { PATH_URL } from '../../utils/constants';
import { cyan } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  naviLink: {
    marginLeft: 'auto'
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth => `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth => drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  hide: {
    display: 'none',
  },
  customColor: {
    backgroundColor: cyan[500]
  },
  username: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(2),
      lineHeight: '48px',
      display: 'inline-block',
    },
  }
}));

const Navbar = ({
  handleDrawerToggle,
  onLogout,
  isAuthenticated,
  drawerWidth,
  user
}) => {
  const classes = useStyles(drawerWidth);

  return (
    <AppBar
      position="fixed"
      className={`${classes.appBar} ${classes.customColor}`}
    >
      <Toolbar>
        {isAuthenticated && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap>
          Todo App
        </Typography>
        {isAuthenticated && (
          <div className={classes.naviLink}>
            <Typography
              variant="h6"
              className={classes.username}
            >
              Hello, {user && user.name}
            </Typography>
            <Tooltip title="User Setting">
              <IconButton
                color="inherit"
                component={Link}
                to={PATH_URL.USER}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton
                color="inherit"
                component={Link}
                to={PATH_URL.LANDING}
                onClick={onLogout}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;