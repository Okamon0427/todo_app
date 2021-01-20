import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';
import { ERROR_MESSAGE } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
}));

const {
  titleRequired
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

  return (
    <List>
      <ListItem
        button
        component={Link}
        to="/dashboard"
      >
        <ListItemText primary="All" />
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
                inputRef={register({ required: true })}
                error={errors.title}
                helperText={(
                  errors.title && titleRequired
                )}
              />
              <IconButton
                type="submit"
                edge="end"
                aria-label="submit"
              >
                <PublishIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="cancel"
                onClick={onCancel}
              >
                <ClearIcon />
              </IconButton>
            </form>
          </ListItem>
        ) : (
          <ListItem
            button
            key={category._id}
            component={Link}
            to={`/dashboard/${category._id}`}
          >
            <ListItemText primary={category.title} />
            <ListItemSecondaryAction>
              <IconButton
                type="submit"
                edge="end"
                aria-label="submit"
                onClick={() => onEdit(category._id, category.user)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="cancel"
                onClick={() => onDelete(category._id)}
              >
                <ClearIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      ))}
    </List>
  )
}

export default CategoriesList;