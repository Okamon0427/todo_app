import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  naviLink: {
    marginLeft: 'auto'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
}));

const Navbar = ({
  open,
  handleDrawerOpen,
  onLogout,
  isAuthenticated
}) => {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        {isAuthenticated && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap>
          Todo App
        </Typography>
        {isAuthenticated && (
          <div className={classes.naviLink}>
            <Tooltip title="User Setting">
              <IconButton
                color="inherit"
                component={Link}
                to="/user"
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton
                color="inherit"
                component={Link}
                to="/"
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