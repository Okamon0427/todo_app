import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
// import { makeStyles } from '@material-ui/core/styles';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import moment from 'moment';

const todos = [
  {
    id: 0,
    title: 'Buy eggs',
    dueDate: '01/25/2021',
    status: 'In Progress'
  },
  {
    id: 1,
    title: 'Study English',
    dueDate: '01/18/2021',
    status: 'In Progress'
  },
  {
    id: 2,
    title: 'Fix table',
    dueDate: '01/11/2021',
    status: 'Done'
  },
];

// const useStyles = makeStyles((theme) => ({}));

const Dashboard = () => {
  // const classes = useStyles();
  const [formData, setFormData] = useState({
    title: '',
    dueDate: moment(new Date()).format('MM/DD/YYYY, hh:mm a'),
    status: ''
  });

  const {
    title,
    dueDate,
    status
  } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const onDateChange = date => {
    setFormData({
      ...formData,
      dueDate: moment(date._d).format('MM/DD/YYYY, hh:mm a')
    })
  }

  const onSubmit = e => {
    e.preventDefault();
    todos.push({
      id: todos.length,
      title,
      dueDate,
      status
    })
    setFormData({
      title: '',
      dueDate: moment(new Date()).format('MM/DD/YYYY, hh:mm a'),
      status: ''
    })
  }

  return (
    <>
      <Input
        placeholder="Search Todo"
        inputProps={{ 'aria-label': 'description' }}
      />
      <AddTodoForm
        onSubmit={onSubmit}
        onChange={onChange}
        onDateChange={onDateChange}
        formData={formData}
      />
      {todos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />
      })}
    </>
  )
}

export default Dashboard;