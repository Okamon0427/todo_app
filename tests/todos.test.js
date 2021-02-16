const request = require('supertest');
const User = require('../models/User');
const Category = require('../models/Category');
const Todo = require('../models/Todo');
const app = require('../index');
const { VALIDATION_MESSAGE, ERROR_MESSAGE } = require('../utils/constants');

require('dotenv').config();

const {
  TITLE_REQUIRED,
  TITLE_TODO_MAX_LENGTH
} = VALIDATION_MESSAGE;
const {
  INVALID_CURRENT_PASSWORD,
  EMAIL_EXISTS,
  USER_DELETED,
} = ERROR_MESSAGE;

let token;

beforeAll((done) => {
  console.log("Todos test start");
  process.env.NODE_ENV = 'test';

  request(app)
    .post('/api/auth/register')
    .send({
      name: 'Test',
      email: 'test@gmail.com',
      password: '123456'
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      token = res.body.token;
      done();
    });
});

afterAll(async () => {
  await User.deleteMany({});
  await Category.deleteMany({});
  await Todo.deleteMany({});
  console.log("Todos test finish");
});

describe('Get All Todos test', () => {
  const getTodosPath = '/api/todos';

  test('should success to get all todos', async () => {
    const res = await request(app)
      .get(getTodosPath)
      .set('x-auth-token', token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.any(Array));
  });
});

// describe('Get Todos by Category test', () => {
//   const getTodosPath = '/api/todos';

//   test('should success to get all todos', async () => {
//     const res = await request(app)
//       .get(getTodosPath)
//       .set('x-auth-token', token);
//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(expect.any(Array));
//   });
// });

describe('Post Todo test', () => {
  const postTodoPath = '/api/todos';

  const todo = {
    title: 'TestTodo',
    dueDate: '2021-02-09T13:29:38.547Z',
    category: 'TestCategory'
  };

  const todo2 = {
    ...todo,
    title: ''
  };

  const todo3 = {
    ...todo,
    title: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'
  };

  const todo4 = {
    ...todo,
    dueDate: ''
  };

  const todo5 = {
    ...todo,
    category: null
  };

  test('should success to post todo', async () => {
    const res = await request(app)
      .post(postTodoPath)
      .send(todo)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('TestTodo');
    expect(res.body.dueDate).toBe('2021-02-09T13:29:38.547Z');
    // expect(res.body.category).toBe('TestCategory');
  });

  test('should fail to post todo without title', async () => {
    const res = await request(app)
      .post(postTodoPath)
      .send(todo2)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(TITLE_REQUIRED);
  });

  test('should fail to post todo with the title of more than 50 letters', async () => {
    const res = await request(app)
      .post(postTodoPath)
      .send(todo3)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(TITLE_TODO_MAX_LENGTH);
  });

  test('should success to post todo without the due date', async () => {
    const res = await request(app)
      .post(postTodoPath)
      .send(todo4)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('TestTodo');
      expect(res.body.dueDate).toBeNull();
      // expect(res.body.category).toBe('TestCategory');
  });

  test('should success to post todo without the category', async () => {
    const res = await request(app)
      .post(postTodoPath)
      .send(todo5)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('TestTodo');
      expect(res.body.dueDate).toBe('2021-02-09T13:29:38.547Z');
      expect(res.body.category).toBeNull();
  });
});