import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
// import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import { initialTodos } from '../../utils/data';
import Spinner from '../layout/Spinner';

// const useStyles = makeStyles((theme) => ({}));

const Dashboard = () => {
  // const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    dueDate: moment(new Date()).format('MM/DD/YYYY, hh:mm a'),
    status: ''
  });
  const [isEditMode, setIsEditMode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    title,
    dueDate,
    status
  } = formData;

  useEffect(() => {
    setIsLoading(true);
    setTodos(initialTodos);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const onSearchBarChange = e => {
    if (e.target.value === '') {
      setTodos(initialTodos);
    } else {
      const filtered = todos.filter(todo => {
        return (
          todo.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
      });
      setTodos(filtered);
    }
  }

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

  const onSubmit = (e, id) => {
    e.preventDefault();
    if (!isEditMode) {
      todos.push({
        id: todos.length,
        title,
        dueDate,
        status
      })
    } else {
      const prevTodos = [...todos];
      const newTodos = prevTodos.map(todo => {
        if (todo.id === id) {
          const editTodo = {
            ...todo,
            title,
            dueDate,
            status
          };
          return editTodo;
        } else {
          return todo;
        }
      });
      setTodos(newTodos);
    }
    setFormData({
      title: '',
      dueDate: moment(new Date()).format('MM/DD/YYYY, hh:mm a'),
      status: ''
    });
    setIsEditMode(null);
  }

  const onEdit = (id) => {
    const editTodo = todos.find(todo => {
      return todo.id === id;
    });
    setFormData({
      ...formData,
      title: editTodo.title,
      dueDate: editTodo.dueDate,
      status: editTodo.status
    });
    setIsEditMode(id);
  }

  const onCancel = () => {
    setFormData({
      title: '',
      dueDate: moment(new Date()).format('MM/DD/YYYY, hh:mm a'),
      status: ''
    });
    setIsEditMode(null);
  }

  const onDelete = (id) => {
    const prevTodos = [...todos];
    const newTodos = prevTodos.filter(todo => {
      return todo.id !== id
    })
    setTodos(newTodos);
  }

  return (
    <>
      <Input
        placeholder="Search Todo"
        inputProps={{ 'aria-label': 'description' }}
        onChange={e => onSearchBarChange(e)}
      />
      <AddTodoForm
        onSubmit={onSubmit}
        onChange={onChange}
        onDateChange={onDateChange}
        formData={formData}
        isEditMode={isEditMode}
        onCancel={onCancel}
      />
      {isLoading ? <Spinner /> : (
        todos.length === 0 ? <h1>No Todo</h1> : (
          todos && todos.map(todo => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={onEdit}
                isEditMode={isEditMode}
                onDelete={onDelete}
              />
            )
          })
        )
      )}
    </>
  )
}

export default Dashboard;