import React from 'react';
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
  formControl: {
    minWidth: 120
  }
}));

const {
  TITLE_REQUIRED,
  TITLE_TODO_MAX_LENGTH,
} = ERROR_MESSAGE;

const AddTodoForm = ({
  onSubmit,
  onDateChange,
  formData: { dueDate },
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
        Add New Todo
      </Button>
    </form>
  );
};

export default AddTodoForm;