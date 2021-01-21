import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Divider, Drawer, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Navbar from './Navbar';
import AddCategoryForm from './AddCategoryForm';
import CategoriesList from './CategoriesList';
import { userDataAuth } from '../../actions/auth';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../../actions/category';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MiniDrawer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);
  const { currentCategoryId } = useParams();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    if (localStorage.token) {
      dispatch(userDataAuth());
    }
    dispatch(getCategories());
  }, [dispatch]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onSubmit = (data, e) => {
    if (!editCategory) {
      dispatch(addCategory(data));
    } else {
      const convertedData = {
        ...data,
        categoryId: editCategory.categoryId,
        userId: editCategory.userId
      }
      dispatch(updateCategory(convertedData));
      setEditCategory(null);
    }
  };

  const onEdit = (categoryId, userId) => {
    setEditCategory({
      categoryId,
      userId
    });
  };

  const onCancel = () => {
    setEditCategory(null);
  }

  const onDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId));
    if (categoryId === currentCategoryId) {
      history.push('/dashboard');
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <CategoriesList
          categories={categories}
          onEdit={onEdit}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onDelete={onDelete}
          editCategory={editCategory}
        />
        <AddCategoryForm onSubmit={onSubmit} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default MiniDrawer;