const request = require('supertest');
const User = require('../models/User');
const Category = require('../models/Category');
const Todo = require('../models/Todo');
const app = require('../index');
const { VALIDATION_MESSAGE, ERROR_MESSAGE } = require('../utils/constants');

require('dotenv').config();

const {
  TITLE_REQUIRED,
  TITLE_CATEGORY_MAX_LENGTH
} = VALIDATION_MESSAGE;
const {
  CATEGORY_EXISTS
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

describe('Post Category test', () => {
  const postCategoryPath = '/api/categories';

  const category = {
    title: 'TestCategory'
  };

  const category2 = {
    title: ''
  };

  const category3 = {
    title: 'TestCategoryTestCategory'
  };

  test('should success to post category', async () => {
    const res = await request(app)
      .post(postCategoryPath)
      .send(category)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('TestCategory');
  });

  test('should fail to post category without title', async () => {
    const res = await request(app)
      .post(postCategoryPath)
      .send(category2)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(TITLE_REQUIRED);
  });

  test('should fail to post category with the title of more than 15 letters', async () => {
    const res = await request(app)
      .post(postCategoryPath)
      .send(category3)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(TITLE_CATEGORY_MAX_LENGTH);
  });

  test('should fail to post category with the existing title of category', async () => {
    const res = await request(app)
      .post(postCategoryPath)
      .send(category)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe(CATEGORY_EXISTS);
  });
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

// describe('Get Category test', () => {
//   const getCategoryPath = '/api/categories'; // :category

//   test('should success to get category', async () => {
//     const res = await request(app)
//       .get(getCategoryPath)
//       .set('x-auth-token', token);
//     expect(res.status).toBe(200);
//     expect(res.body).toBe('hello');
//   });
// });