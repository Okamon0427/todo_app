import { v4 as uuidv4 } from 'uuid';

export const initialTodos = [
  {
    id: uuidv4(),
    title: 'Buy eggs',
    dueDate: '01/25/2021',
    status: 'In Progress',
  },
  {
    id: uuidv4(),
    title: 'Study English',
    dueDate: '01/18/2021',
    status: 'In Progress',
  },
  {
    id: uuidv4(),
    title: 'Fix table',
    dueDate: '01/11/2021',
    status: 'Done',
  },
];