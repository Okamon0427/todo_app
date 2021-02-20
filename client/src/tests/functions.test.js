import { setTokenToHeader, searchTodos } from '../utils/functions';
import axios from 'axios';

it('set axios headers if token is passed', () => {
  const token = 'abc';
  setTokenToHeader(token);
  expect(axios.defaults.headers.common['x-auth-token']).toBe('abc');
});

it('delete axios headers if no token is passed', () => {
  const token = 'abc';
  setTokenToHeader(token);
  expect(axios.defaults.headers.common['x-auth-token']).toBe('abc');
  setTokenToHeader();
  expect(axios.defaults.headers.common['x-auth-token']).toBeUndefined();
});

it('return filtered array regardless of case', () => {
  const todos = [
    { title: 'Good morning' },
    { title: 'Hello' },
    { title: 'Good night' }
  ];
  const event = { target: { value: 'hello' } };
  const expected = [{"title": "Hello"}];

  expect(searchTodos(todos, event)).toEqual(expect.arrayContaining(expected));
});