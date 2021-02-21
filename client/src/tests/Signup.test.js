import { render, fireEvent, screen } from '@testing-library/react';

import Signup from '../components/auth/Signup';

describe('Check render', () => {
  it('render text field', () => {
    const { queryByTestId } = render(<Signup />);
    const name = queryByTestId('name');
    const email = queryByTestId('email');
    const password = queryByTestId('password');
    const password2 = queryByTestId('password2');

    expect(name).toBeTruthy();
    expect(email).toBeTruthy();
    expect(password).toBeTruthy();
    expect(password2).toBeTruthy();
  });

  it('render login button', () => {
    const { queryByRole } = render(<Signup />);
    const button = queryByRole('button');

    expect(button).toBeTruthy();
  });
});

describe('Submit form', () => {
  it('should display required error when no value is submitted', async () => {
    const onSubmit = jest.fn();
    const { queryByRole } = render(<Signup onSubmit={onSubmit} />);
  
    fireEvent.submit(queryByRole('button'));
    expect(await screen.findAllByRole('alert')).toHaveLength(4);
    expect(onSubmit).not.toBeCalled();
  });
})