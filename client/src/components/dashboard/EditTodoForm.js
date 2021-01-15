import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import MomentUtils from '@date-io/moment';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { STATUS_ARRAY } from '../../utils/constants';

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
        inputRef={register({ required: true })}
        error={errors.title}
        helperText={(
          errors.title && "Title is required"
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
          rules={{ required: "Status is required" }}
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