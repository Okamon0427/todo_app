import axios from 'axios';

export const setTokenToHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

export const searchTodos = (todos, e) => {
  const filteredArray = todos.filter(todo => {
    return (
      todo.title.toLowerCase().includes(
        e.target.value.toLowerCase()
      )
    );
  });
  return filteredArray;
}