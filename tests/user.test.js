const request = require('supertest');
const User = require('../models/User');
const app = require('../index');
const { VALIDATION_MESSAGE, ERROR_MESSAGE } = require('../utils/constants');

require('dotenv').config();

const { AUTH_ERROR, TOKEN_INVALID } = ERROR_MESSAGE;

let token;

beforeAll((done) => {
  console.log("User test start");
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
  console.log("User test finish");
});

describe('Get User test', () => {
  const getUserPath = '/api/user';

  test('should success to get user information', async () => {
    const res = await request(app)
      .get(getUserPath)
      .set('x-auth-token', token);
    expect(res.status).toBe(200);
  });

  test('should fail to get user information without request token', async () => {
    const res = await request(app)
      .get(getUserPath);
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe(AUTH_ERROR);
  });

  test('should fail to get user information with invalid token', async () => {
    const res = await request(app)
      .get(getUserPath)
      .set('x-auth-token', token + 1);
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe(TOKEN_INVALID);
  });
});

describe('Post User test', () => {
  const postUserPath = '/api/user';

  const user2 = {
    name: 'Test2',
    email: 'test2@gmail.com',
    password: '123456'
  }
  
  test('should success to post user', async () => {
    const res = await request(app)
      .post(postUserPath)
      .send(user2)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test2');
    expect(res.body.email).toBe('test2@gmail.com');
    expect(res.body.password).toBeUndefined();
  });
  
  test('should fail to post user without request token', async () => {
    const res = await request(app)
      .post(postUserPath)
      .send(user2)
      .set('Accept', 'application/json');
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe(AUTH_ERROR);
  });

  test('should fail to post user with invalid token', async () => {
    const res = await request(app)
      .post(postUserPath)
      .send(user2)
      .set('Accept', 'application/json')
      .set('x-auth-token', token + 1);
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe(TOKEN_INVALID);
  });
});