import { setTokenToHeader, searchTodos } from '../utils/functions';
import axios from 'axios';

describe('Check set or not axios header', () => {
  const token = 'abc';

  it('set axios headers if token is passed', () => {
    setTokenToHeader(token);
    expect(axios.defaults.headers.common['x-auth-token']).toBe('abc');
  });
  
  it('delete axios headers if no token is passed', () => {
    setTokenToHeader(token);
    expect(axios.defaults.headers.common['x-auth-token']).toBe('abc');
    setTokenToHeader();
    expect(axios.defaults.headers.common['x-auth-token']).toBeUndefined();
  });
});

describe('Check search bar works or not', () => {
  const array = [
    { title: 'Good morning' },
    { title: 'Hello' },
    { title: 'Good night' }
  ];
  let event;

  it('return filtered array regardless of case', () => {
    event = { target: { value: 'good' } };
    const expected = [{"title": "Good morning"}, {"title": "Good night"}];
  
    expect(searchTodos(array, event)).toEqual(expect.arrayContaining(expected));
  });
  
  it('return empty array if no matched', () => {
    event = { target: { value: 'hi!' } };
  
    expect(searchTodos(array, event)).toEqual([]);
  });
})