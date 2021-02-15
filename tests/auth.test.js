const request = require('supertest');
const User = require('../models/User');
const app = require('../index');
const { VALIDATION_MESSAGE, ERROR_MESSAGE } = require('../utils/constants');

const {
  USER_NAME_REQUIRED,
  EMAIL_VALID,
  PASSWORD_MIN_LENGTH
} = VALIDATION_MESSAGE;
const { INVALID_CREDENTIALS, USER_EXISTS } = ERROR_MESSAGE;

beforeAll(() => {
  console.log("Todos test start");
  process.env.NODE_ENV = 'test';
});

afterAll(async () => {
  await User.deleteMany({});
  console.log("Todos test finish");
});

describe('Register test', () => {
  const registerPath = '/api/auth/register';

  const user = {
    name: 'Test',
    email: 'test@gmail.com',
    password: '123456'
  };

  const user2 = {
    ...user,
    name: '',
  }

  const user3 = {
    ...user,
    email: '',
  }

  const user4 = {
    ...user,
    email: 'test',
  }

  const user5 = {
    ...user,
    password: '',
  }

  const user6 = {
    ...user,
    password: '12345',
  }

  test('should success to register', async () => {
    const res = await request(app)
      .post(registerPath)
      .send(user)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
  });

  test('should fail to register with the empty name', async () => {
    const res = await request(app)
      .post(registerPath)
      .send(user2)
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(USER_NAME_REQUIRED);
  });

  test('should fail to register with the empty email', async () => {
    const res = await request(app)
      .post(registerPath)
      .send(user3)
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(EMAIL_VALID);
  });

  test('should fail to register with the invalid email', async () => {
    const res = await request(app)
      .post(registerPath)
      .send(user4)
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(EMAIL_VALID);
  });

  test('should fail to register with the exisiting email', async () => {
    const res = await request(app)
      .post(registerPath)
      .send(user)
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(USER_EXISTS); 
  });

  test('should fail to register with the empty password', async () => {
    const res = await request(app)
      .post(registerPath)
      .send(user5)
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(PASSWORD_MIN_LENGTH);
  });

  test('should fail to register with the password of less than 6 letters', async () => {
    const res = await request(app)
      .post(registerPath)
      .send(user6)
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(PASSWORD_MIN_LENGTH);
  });
});

describe('Login test', () => {
  const loginPath = '/api/auth/login';

  const user = {
    email: 'test@gmail.com',
    password: '123456'
  };

  const user2 = {
    ...user,
    email: '',
  }

  const user3 = {
    ...user,
    email: 'test',
  }

  const user4 = {
    email: 'test2@gmail.com',
    password: '123456'
  }

  const user5 = {
    ...user,
    password: '',
  }

  const user6 = {
    ...user,
    password: '12345',
  }

  const user7 = {
    ...user,
    password: '1234567'
  }

  test('should success to login', async () => {
    const res = await request(app)
      .post(loginPath)
      .send(user)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
  });

  test('should fail to login with the empty email', async () => {
    const res = await request(app)
      .post(loginPath)
      .send(user2)
      .set('Accept', 'application/json')
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(EMAIL_VALID);
  });

  test('should fail to login with the invalid email', async () => {
    const res = await request(app)
      .post(loginPath)
      .send(user3)
      .set('Accept', 'application/json')
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(EMAIL_VALID);
  });

  test('should fail to login with not existing email', async () => {
    const res = await request(app)
      .post(loginPath)
      .send(user4)
      .set('Accept', 'application/json')
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(INVALID_CREDENTIALS);
  });

  test('should fail to login with the empty password', async () => {
    const res = await request(app)
      .post(loginPath)
      .send(user5)
      .set('Accept', 'application/json')
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(INVALID_CREDENTIALS);
  });

  test('should fail to login with the password of less than 6 letters', async () => {
    const res = await request(app)
      .post(loginPath)
      .send(user6)
      .set('Accept', 'application/json')
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(INVALID_CREDENTIALS);
  });

  test('should fail to login with the incorrect password', async () => {
    const res = await request(app)
      .post(loginPath)
      .send(user7)
      .set('Accept', 'application/json')
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe(INVALID_CREDENTIALS);
  });
});