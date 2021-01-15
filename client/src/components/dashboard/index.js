import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { Input } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import EditTodoForm from './EditTodoForm';
import Spinner from '../layout/Spinner';
import { initialTodos } from '../../utils/data';
import { DATE_FORMAT } from '../../utils/constants';
import { formattedDate } from '../../utils/functions';

// const useStyles = makeStyles((theme) => ({}));

const { numberDate } = DATE_FORMAT;

const Dashboard = () => {
  // const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    dueDate: formattedDate(numberDate, new Date()),
    status: ''
  });
  const [isEditMode, setIsEditMode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const { categoryId } = useParams();

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

  const onDateChange = date => {
    setFormData({
      ...formData,
      dueDate: formattedDate(numberDate, date._d)
    })
  }

  const onSubmit = (data, e) => {
    if (!isEditMode) {
      console.log(data);
      const newTodos = [...todos]
      newTodos.push({
        id: newTodos.length,
        title: data.title,
        dueDate: formData.dueDate,
        status: data.status
      })
      setTodos(newTodos);
      e.target.reset();
    } else {
      const prevTodos = [...todos];
      const newTodos = prevTodos.map(todo => {
        if (todo.id === formData.id) {
          const editTodo = {
            ...todo,
            title: data.title,
            dueDate: formData.dueDate,
            status: data.status
          };
          return editTodo;
        } else {
          return todo;
        }
      });
      setTodos(newTodos);
    }
    setFormData({
      id: '',
      title: '',
      dueDate: formattedDate(numberDate, new Date()),
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
      id: editTodo.id,
      title: editTodo.title,
      dueDate: editTodo.dueDate,
      status: editTodo.status
    });
    setIsEditMode(id);
  }

  const onCancel = () => {
    setFormData({
      id: '',
      title: '',
      dueDate: formattedDate(numberDate, new Date()),
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
      {isEditMode ? (
        <EditTodoForm
          onSubmit={onSubmit}
          onDateChange={onDateChange}
          formData={formData}
          onCancel={onCancel}
        />
      ) : (
        <AddTodoForm
          onSubmit={onSubmit}
          onDateChange={onDateChange}
          formData={formData}
        />
      )}
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