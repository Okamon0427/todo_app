import { render, fireEvent, screen } from '@testing-library/react';

import Login from '../components/auth/Login';

describe('Check render', () => {
  it('render text field', () => {
    const { queryByTestId } = render(<Login />);
    const email = queryByTestId('email');
    const password = queryByTestId('password');

    expect(email).toBeTruthy();
    expect(password).toBeTruthy();
  });

  it('render login button', () => {
    const { queryByRole } = render(<Login />);
    const button = queryByRole('button');

    expect(button).toBeTruthy();
  });
});

describe('Submit form', () => {
  it('should display required error when no value is submitted', async () => {
    const onSubmit = jest.fn();
    const { queryByRole } = render(<Login onSubmit={onSubmit} />);
  
    fireEvent.submit(queryByRole('button'));
    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(onSubmit).not.toBeCalled();
  });
})