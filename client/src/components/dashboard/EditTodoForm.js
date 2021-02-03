import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { ERROR_MESSAGE, STATUS_ARRAY } from '../../utils/constants';

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
  titleRequired,
  titleTodoMaxLength,
  statusRequired
} = ERROR_MESSAGE;

const EditTodoForm = ({
  onSubmit,
  onDateChange,
  formData: { title, dueDate, status },
  onCancel
}) => {
  const classes = useStyles();
  const { register, errors, handleSubmit, control, reset } = useForm();

  const initialValues = {
    title,
    dueDate,
    status
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
          titleRequired
        ) || (
          errors.title && errors.title.type === "maxLength" &&
          titleTodoMaxLength
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
            inputRef={register}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
      <FormControl error={errors.status}>
        <InputLabel id="status">
          Select Status
        </InputLabel>
        <Controller
          name="status"
          rules={{ required: statusRequired }}
          control={control}
          defaultValue=""
          as={
            <Select>
              {STATUS_ARRAY.map((item) => (
                <MenuItem key={item.key} value={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </Select>
          }
        >
        </Controller>
        <FormHelperText>
          {errors.status && errors.status.message}
        </FormHelperText>
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