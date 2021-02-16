const request = require('supertest');
const User = require('../models/User');
const app = require('../index');
const { ERROR_MESSAGE } = require('../utils/constants');

require('dotenv').config();

const { AUTH_ERROR, TOKEN_INVALID } = ERROR_MESSAGE;

let token;

beforeAll((done) => {
  console.log("Auth Middleware test start");
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
  console.log("Auth Middleware test finish");
});

describe('Get User test', () => {
  const getUserPath = '/api/user';

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

describe('Edit User test', () => {
  const editUserPath = '/api/user/abc'; // :userId

  const user = {
    name: 'Test',
    email: 'test1@gmail.com',
  }
  
  test('should fail to edit user without request token', async () => {
    const res = await request(app)
      .put(editUserPath)
      .send(user)
      .set('Accept', 'application/json');
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe(AUTH_ERROR);
  });

  test('should fail to edit user with invalid token', async () => {
    const res = await request(app)
      .put(editUserPath)
      .send(user)
      .set('Accept', 'application/json')
      .set('x-auth-token', token + 1);
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe(TOKEN_INVALID);
  });
});

describe('Edit User Password test', () => {
  const editPasswordPath = '/api/user/abc/password'; // :userId

  const user = {
    currentPassword: '123456',
    newPassword: '1234567',
    newPassword2: '1234567'
  }
  
  test('should fail to edit password without request token', async () => {
    const res = await request(app)
      .put(editPasswordPath)
      .send(user)
      .set('Accept', 'application/json')
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe(AUTH_ERROR);
  });

  test('should fail to edit password with invalid token', async () => {
    const res = await request(app)
      .put(editPasswordPath)
      .send(user)
      .set('Accept', 'application/json')
      .set('x-auth-token', token + 1);
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe(TOKEN_INVALID);
  });
});

describe('Delete User test', () => {
  const deleteUserPath = '/api/user/abc'; // :userId
  
  test('should fail to delete user without request token', async () => {
    const res = await request(app)
      .delete(deleteUserPath);
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe(AUTH_ERROR);
  });

  test('should fail to delete user with invalid token', async () => {
    const res = await request(app)
      .delete(deleteUserPath)
      .set('x-auth-token', token + 1);
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe(TOKEN_INVALID);
  });
});