import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import EditTodoForm from './EditTodoForm';
import Spinner from '../layout/Spinner';
import { DATE_FORMAT } from '../../utils/constants';
import { formattedDate } from '../../utils/functions';
import { addTodo, getTodos } from '../../actions/todo';

// const useStyles = makeStyles((theme) => ({}));

const { numberDate } = DATE_FORMAT;

const Dashboard = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const { todos, loading } = useSelector(state => state.todo);

  // const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    dueDate: new Date(),
    status: ''
  });
  const [isEditMode, setIsEditMode] = useState(null);

  // const { categoryId } = useParams();

  useEffect(() => {
    dispatch(getTodos());
  }, [])

  const onSearchBarChange = e => {
    if (e.target.value === '') {
      // setTodos(initialTodos);
    } else {
      const filtered = todos.filter(todo => {
        return (
          todo.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
      });
      // setTodos(filtered);
    }
  }

  const onDateChange = date => {
    console.log(date)
    setFormData({
      ...formData,
      dueDate: date._d
    })
  }

  const onSubmit = (data, e) => {
    if (!isEditMode) {
      const convertedData = { ...data };
      convertedData.dueDate = formData.dueDate;
      dispatch(addTodo(convertedData));
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
      // setTodos(newTodos);
    }
    setFormData({
      id: '',
      title: '',
      dueDate: new Date(),
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
      dueDate: new Date(),
      status: ''
    });
    setIsEditMode(null);
  }

  const onDelete = (id) => {
    const prevTodos = [...todos];
    const newTodos = prevTodos.filter(todo => {
      return todo.id !== id
    })
    // setTodos(newTodos);
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
      {loading ? <Spinner /> : (
        todos.length === 0 ? <h1>No Todo</h1> : (
          todos && todos.map(todo => {
            return (
              <TodoItem
                key={todo._id}
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