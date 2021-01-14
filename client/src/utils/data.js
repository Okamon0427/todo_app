import { v4 as uuidv4 } from 'uuid';

export const initialCategories = [
  {
    id: uuidv4(),
    name: 'Buy'
  },
  {
    id: uuidv4(),
    name: 'Study'
  },
  {
    id: uuidv4(),
    name: 'Hobby'
  },
]

export const initialTodos = [
  {
    id: uuidv4(),
    title: 'Buy eggs',
    dueDate: '01/25/2021',
    status: 'In Progress',
  },
  {
    id: uuidv4(),
    title: 'Buy honey',
    dueDate: '01/22/2021',
    status: 'Done',
  },
  {
    id: uuidv4(),
    title: 'Buy carrot',
    dueDate: '01/28/2021',
    status: 'In Progress',
  },
  {
    id: uuidv4(),
    title: 'Study English',
    dueDate: '01/18/2021',
    status: 'Not Started',
  },
  {
    id: uuidv4(),
    title: 'Do homework',
    dueDate: '01/18/2021',
    status: 'In Progress',
  },
  {
    id: uuidv4(),
    title: 'Play guitar',
    dueDate: '01/11/2021',
    status: 'Done',
  },
  {
    id: uuidv4(),
    title: 'Watch movie',
    dueDate: '01/30/2021',
    status: 'In Progress',
  },
];