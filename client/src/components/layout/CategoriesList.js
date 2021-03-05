import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, TextField, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { PATH_URL, ERROR_MESSAGE } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    maxWidth: 160
  },
  currentCategory: {
    backgroundColor: 'rgba(0, 0, 0, 0.10)'
  }
}));

const {
  TITLE_REQUIRED,
  TITLE_CATEGORY_MAX_LENGTH
} = ERROR_MESSAGE;

const CategoriesList = ({
  categories,
  onEdit,
  onCancel,
  onSubmit,
  onDelete,
  editCategory
}) => {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();
  const { currentCategoryId } = useParams();
  
  return (
    <List>
      <ListItem
        button
        component={Link}
        to={PATH_URL.DASHBOARD}
        className={
          (currentCategoryId === undefined)
          ? classes.currentCategory : null
        }
      >
        <ListItemText primary="All Todos" />
      </ListItem>
      {categories && categories.map((category, index) => (
        editCategory && editCategory.categoryId === category._id ? (
          <ListItem key={category._id}>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                name="title"
                label="title"
                className={classes.textField}
                defaultValue={category.title}
                inputRef={register({ required: true, maxLength: 15 })}
                error={errors.title}
                helperText={(
                  errors.title && errors.title.type === "required" &&
                  TITLE_REQUIRED
                ) || (
                  errors.title && errors.title.type === "maxLength" &&
                  TITLE_CATEGORY_MAX_LENGTH
                )}
              />
              <Tooltip title="Update">
                <IconButton
                  type="submit"
                  edge="end"
                  aria-label="submit"
                >
                  <PublishIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel">
                <IconButton
                  edge="end"
                  aria-label="cancel"
                  onClick={onCancel}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </form>
          </ListItem>
        ) : (
          <ListItem
            button
            key={category._id}
            component={Link}
            to={PATH_URL.DASHBOARD + `/${category._id}`}
            className={
              (currentCategoryId === category._id)
              ? classes.currentCategory : null
            }
          >
            <ListItemText primary={category.title} />
            <ListItemSecondaryAction>
              <Tooltip title="Edit">
                <IconButton
                  type="submit"
                  edge="end"
                  aria-label="submit"
                  onClick={() => onEdit(category._id, category.user)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  edge="end"
                  aria-label="cancel"
                  onClick={() => onDelete(category._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        )
      ))}
    </List>
  )
}

export default CategoriesList;