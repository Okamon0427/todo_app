import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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

const AddTodoForm = ({
  onSubmit,
  onChange,
  onDateChange,
  formData: { title, dueDate, status },
  isEditMode,
  onCancel
}) => {
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={(e) => onSubmit(e, isEditMode)}
    >
      <FormControl>
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={e => onChange(e)}
        />
      </FormControl>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
          name="dueDate"
          value={dueDate}
          onChange={date => onDateChange(date)}
        />
      </MuiPickersUtilsProvider>
      <FormControl>
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="status"
          name="status"
          value={status}
          onChange={e => onChange(e)}
        >
          {STATUS_ARRAY.map((option) => (
            <MenuItem key={option.key} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        {isEditMode ? 'Edit Todo' : 'Add New Todo'}
      </Button>
      {isEditMode && (
        <Button
          variant="contained"
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}
    </form>
  );
};

export default AddTodoForm;