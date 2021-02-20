import { setTokenToHeader } from '../utils/functions';
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