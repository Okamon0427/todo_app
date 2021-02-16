const request = require('supertest');
const User = require('../models/User');
const app = require('../index');
const { VALIDATION_MESSAGE, ERROR_MESSAGE } = require('../utils/constants');

require('dotenv').config();

const {
  CURRENT_PASSWORD_MIN_LENGTH,
  NEW_PASSWORD_MIN_LENGTH,
  PASSWORD_MATCH,
} = VALIDATION_MESSAGE;
const {
  INVALID_CURRENT_PASSWORD,
  EMAIL_EXISTS,
  USER_DELETED,
} = ERROR_MESSAGE;

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
});

describe('Edit User test', () => {
  const editUserPath = '/api/user/abc'; // :userId

  const user = {
    name: 'Test',
    email: 'test1@gmail.com',
  }

  const user2 = {
    name: 'Test',
    email: 'test2@gmail.com',
  }
  
  test('should success to edit user', async () => {
    const res = await request(app)
      .put(editUserPath)
      .send(user)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test');
    expect(res.body.email).toBe('test1@gmail.com');
    expect(res.body.password).toBeUndefined();
  });

  test('should success to edit user without changing anything', async () => {
    const res = await request(app)
      .put(editUserPath)
      .send(user)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test');
    expect(res.body.email).toBe('test1@gmail.com');
    expect(res.body.password).toBeUndefined();
  });
  
  // test('should fail to edit user with not exisiting user ID', async () => {
  //   const res = await request(app)
  //     .put(editUserPath)
  //     .send(user)
  //     .set('Accept', 'application/json')
  //     .set('x-auth-token', token);
  //   expect(res.status).toBe(404);
  //   expect(res.body.msg).toBe(TOKEN_INVALID);
  // });

  test('should fail to edit user with exisiting email', async () => {
    const res = await request(app)
      .put(editUserPath)
      .send(user2)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(404);
    expect(res.body.msg).toBe(EMAIL_EXISTS);
  });
});

describe('Edit User Password test', () => {
  const editPasswordPath = '/api/user/abc/password'; // :userId

  const user = {
    currentPassword: '123456',
    newPassword: '1234567',
    newPassword2: '1234567'
  }

  const user2 = {
    currentPassword: '',
    newPassword: '123456',
    newPassword2: '123456'
  }

  const user3 = {
    currentPassword: '12345',
    newPassword: '123456',
    newPassword2: '123456'
  }

  const user4 = {
    currentPassword: '1234567',
    newPassword: '12345',
    newPassword2: '12345'
  }

  const user5 = {
    currentPassword: '1234567',
    newPassword: '123456',
    newPassword2: '1234560'
  }

  const user6 = {
    currentPassword: '1234560',
    newPassword: '123456',
    newPassword2: '123456'
  }
  
  test('should success to edit password', async () => {
    const res = await request(app)
      .put(editPasswordPath)
      .send(user)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test');
    expect(res.body.email).toBe('test1@gmail.com');
    expect(res.body.password).toBeUndefined();
  });

  test('should fail to edit password with the empty password', async () => {
    const res = await request(app)
      .put(editPasswordPath)
      .send(user2)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(CURRENT_PASSWORD_MIN_LENGTH);
  });

  test('should fail to edit password with the password of less than 6 letters', async () => {
    const res = await request(app)
      .put(editPasswordPath)
      .send(user3)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(CURRENT_PASSWORD_MIN_LENGTH);
  });

  test('should fail to edit password with the new password of less than 6 letters', async () => {
    const res = await request(app)
      .put(editPasswordPath)
      .send(user4)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(NEW_PASSWORD_MIN_LENGTH);
  });

  test('should fail to edit password with the difference between current password and confirm password', async () => {
    const res = await request(app)
      .put(editPasswordPath)
      .send(user5)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(PASSWORD_MATCH);
  });

  test('should fail to edit password with the the incorrect password', async () => {
    const res = await request(app)
      .put(editPasswordPath)
      .send(user6)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(INVALID_CURRENT_PASSWORD);
  });
});

describe('Delete User test', () => {
  const deleteUserPath = '/api/user/abc'; // :userId
  
  test('should success to delete user', async () => {
    const res = await request(app)
      .delete(deleteUserPath)
      .set('Accept', 'application/json')
      .set('x-auth-token', token);
    expect(res.status).toBe(200);
    expect(res.body.msg).toBe(USER_DELETED);
  });
});