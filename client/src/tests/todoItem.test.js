import { render } from '@testing-library/react';

import TodoItem from '../components/dashboard/TodoItem';

describe('Todo Item', () => {
  const todo = {
    _id: '123',
    title: 'Test',
    dueDate: '2021-02-09T13:29:38.547Z'
  };
  const onEdit = jest.fn();
  const isEditMode = false;
  const onDelete = jest.fn();

  it('render title', () => {  
    const { queryByText } = render(
      <TodoItem
        todo={todo}
        onEdit={onEdit}
        isEditMode={isEditMode}
        onDelete={onDelete}
      />
    );
    const title = queryByText('Test');

    expect(title).toBeTruthy();
  });
});