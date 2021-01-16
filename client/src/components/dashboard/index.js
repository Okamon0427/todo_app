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
// import { formattedDate } from '../../utils/functions';
import { addTodo, getTodos, editTodo, deleteTodo } from '../../actions/todo';

// const useStyles = makeStyles((theme) => ({}));

// const { numberDate } = DATE_FORMAT;

const Dashboard = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const { todos, loading } = useSelector(state => state.todo);

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
  }, [dispatch])

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
    const convertedData = { ...data };
    convertedData.dueDate = formData.dueDate;
    convertedData.id = formData.id;

    isEditMode ? (
      dispatch(editTodo(convertedData))
    ) : (
      dispatch(addTodo(convertedData))
    );

    e.target.reset();
    setFormData({
      id: '',
      title: '',
      dueDate: new Date(),
      status: ''
    });
    setIsEditMode(null);
  }

  const onEdit = (key) => {
    const editTodo = todos.find(todo => {
      return todo._id === key;
    });
    setFormData({
      ...formData,
      id: editTodo._id,
      title: editTodo.title,
      dueDate: editTodo.dueDate,
      status: editTodo.status
    });
    setIsEditMode(key);
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

  const onDelete = (key) => {
    dispatch(deleteTodo(key));
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