import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Button, FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { ERROR_MESSAGE } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const {
  TITLE_REQUIRED,
  TITLE_TODO_MAX_LENGTH,
} = ERROR_MESSAGE;

const EditTodoForm = ({
  onSubmit,
  onDateChange,
  formData: { title, dueDate },
  onCancel
}) => {
  const classes = useStyles();
  const { register, errors, handleSubmit, reset } = useForm();

  const initialValues = {
    title,
  };

  useEffect(() => {
    reset(initialValues);
    //eslint-disable-next-line
  }, []);

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        name="title"
        label="Title"
        inputRef={register({ required: true, maxLength: 50 })}
        error={errors.title}
        helperText={(
          errors.title && errors.title.type === "required" &&
          TITLE_REQUIRED
        ) || (
          errors.title && errors.title.type === "maxLength" &&
          TITLE_TODO_MAX_LENGTH
        )}
      />
      <FormControl margin="normal">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            id="dueDate"
            name="dueDate"
            label="Due Date"
            value={dueDate}
            onChange={date => onDateChange(date)}
            minutesStep={5}
            inputRef={register}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
      <br />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        Edit Todo
      </Button>
      <Button
        variant="contained"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </form>
  );
};

export default EditTodoForm;