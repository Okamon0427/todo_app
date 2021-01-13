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

const statusArray = [
  {
    key: 0,
    value: 'Not Started',
  },
  {
    key: 1,
    value: 'In Progress',
  },
  {
    key: 2,
    value: 'Done',
  },
];

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
  formData: { title, dueDate, status }
}) => {
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
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
          {statusArray.map((option) => (
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
        ADD NEW TODO
      </Button>
    </form>
  );
};

export default AddTodoForm;