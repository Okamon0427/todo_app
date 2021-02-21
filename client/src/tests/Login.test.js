import { render } from '@testing-library/react';

import Login from '../components/auth/Login';

it('check text field render', () => {
  const { queryByTestId } = render(<Login />);
  const email = queryByTestId('email');
  const password = queryByTestId('password');
  expect(email).toBeTruthy();
  expect(password).toBeTruthy();
});

it('check login button render', () => {
  const { queryByRole } = render(<Login />);
  const button = queryByRole('button');
  expect(button).toBeTruthy();
});