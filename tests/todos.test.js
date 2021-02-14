const request = require('supertest');
const express = require('express');
const app = express();

beforeAll(() => console.log("Todos test start"));
afterAll(() => console.log("Todos test finish"));

// routing test
describe('Routing test', () => {
  test('Should get 200', async () => {
    await request(app)
      .get('/api/todos/')
      .expect(200);
  });

  test('Should get 200', async () => {
    await request(app)
      .get('/api/todos/abc')
      .expect(200);
  });
});