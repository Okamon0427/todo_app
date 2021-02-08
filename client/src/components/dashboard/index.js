import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import EditTodoForm from './EditTodoForm';
import Spinner from '../UI/Spinner';
// import { DATE_FORMAT } from '../../utils/constants';
// import { formattedDate } from '../../utils/functions';
import { searchTodos } from '../../utils/functions';
import { addTodo, getTodos, getTodosByCategory, editTodo, deleteTodo } from '../../actions/todo';

const useStyles = makeStyles((theme) => ({
  searchBar: {
    margin: theme.spacing(1),
  }
}));

// const { numberDate } = DATE_FORMAT;

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { todos, loading } = useSelector(state => state.todo);
  const { currentCategoryId } = useParams();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    dueDate: new Date(),
  });
  const [isEditMode, setIsEditMode] = useState(null);
  const [isFilterMode, setIsFilterMode] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState(null);

  useEffect(() => {
    if (!currentCategoryId) {
      dispatch(getTodos());
    } else {
      dispatch(getTodosByCategory(currentCategoryId));
    }
  }, [dispatch, currentCategoryId])

  const onSearchBarChange = e => {
    if (e.target.value === '') {
      setIsFilterMode(false);
      setFilteredTodos(null);
    } else {
      setIsFilterMode(true);
      setFilteredTodos(searchTodos(todos, e));
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
    if (currentCategoryId) {
      convertedData.category = currentCategoryId;
    }

    if (isEditMode) {
      dispatch(editTodo(convertedData));
    } else {
      dispatch(addTodo(convertedData));
    }

    e.target.reset();
    setFormData({
      id: '',
      title: '',
      dueDate: new Date(),
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
    });
    setIsEditMode(key);
  }

  const onCancel = () => {
    setFormData({
      id: '',
      title: '',
      dueDate: new Date(),
    });
    setIsEditMode(null);
  }

  const onDelete = (key) => {
    dispatch(deleteTodo(key));
  }

  let todosArray = todos;
  if (
    (filteredTodos && filteredTodos.length > 0) ||
    isFilterMode
  ) {
    todosArray = filteredTodos;
  }

  return (
    <>
      <Input
        className={classes.searchBar}
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
        todosArray.length === 0 ? <h1>No Todo</h1> : (
          todosArray && todosArray.map(todo => {
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