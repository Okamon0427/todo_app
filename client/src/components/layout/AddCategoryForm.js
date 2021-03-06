import React from 'react';
import { useForm } from "react-hook-form";
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { ERROR_MESSAGE } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginLeft: theme.spacing(2)
    },
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const {
  TITLE_REQUIRED,
  TITLE_CATEGORY_MAX_LENGTH,
} = ERROR_MESSAGE;

const AddCategoryForm = ({
  onSubmit,
}) => {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        name="title"
        label="Category Title"
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
      <br />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        Add New Category
      </Button>
    </form>
  );
};

export default AddCategoryForm;