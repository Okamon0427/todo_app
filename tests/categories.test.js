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
  console.log("Categories test start");
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
  console.log("Categories test finish");
});

describe('Get Categories test', () => {
  const getCategoriesPath = '/api/categories';

  test('should success to get all categories', async () => {
    const res = await request(app)
      .get(getCategoriesPath)
      .set('x-auth-token', token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.any(Array));
  });
});