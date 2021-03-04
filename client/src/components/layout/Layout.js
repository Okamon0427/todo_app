import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Navbar from './Navbar';
import AddCategoryForm from './AddCategoryForm';
import CategoriesList from './CategoriesList';
import { userDataAuth, logoutAuth } from '../../actions/auth';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../../actions/category';
import { PATH_URL } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: props => props.drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: props => props.drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles(props);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);
  const { isAuthenticated } = useSelector(state => state.auth);
  const { currentCategoryId } = useParams();
  const history = useHistory();
  const [editCategory, setEditCategory] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      dispatch(userDataAuth());
    }
    dispatch(getCategories());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
    e.target.reset();
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
      history.push(PATH_URL.DASHBOARD);
    }
  }

  const onLogout = () => {
    dispatch(logoutAuth());
  }

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <CategoriesList
        categories={categories}
        onEdit={onEdit}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onDelete={onDelete}
        editCategory={editCategory}
      />
      <AddCategoryForm
        onSubmit={onSubmit}
      />
    </>
  );

  const container = window !== undefined
    ? () => window().document.body
    : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        handleDrawerToggle={handleDrawerToggle}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        drawerWidth={props.drawerWidth}
      />
      <nav
        className={classes.drawer}
        aria-label="mailbox folders"
      >
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;