import React from 'react';
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
  statusRequired
} = ERROR_MESSAGE;

const AddTodoForm = ({
  onSubmit,
  onDateChange,
  formData: { dueDate },
}) => {
  const classes = useStyles();
  const { register, errors, handleSubmit, control } = useForm();

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
        inputRef={register({ required: true })}
        error={errors.title}
        helperText={(
          errors.title && titleRequired
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