const request = require('supertest');
const express = require('express');
const router = require('./Router');
const db = require('./db')
const bcrypt = require('bcrypt')

// Mocking bcrypt and db modules
jest.mock('bcrypt', () => ({
  genSalt: jest.fn().mockResolvedValue('mockedSalt'),
  hash: jest.fn().mockResolvedValue('mockedHashedPassword'),
}));

jest.mock('./db', () => ({
  query: jest.fn((sql, values, callback) => callback(null, 'mockedResult')),
}));

describe('POST /postLogin', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api', router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should insert user into database and return 200', async () => {
    const userData = {
      username: 'testuser',
      password: 'testpassword',
      email: 'test@example.com',
    };

    const response = await request(app)
      .post('/api/postLogin')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.text).toBe('inserted values');

    // Assertions for bcrypt and db calls
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 'mockedSalt');
    expect(db.query).toHaveBeenCalledWith(
      expect.any(String), // SQL query
      [userData.username, 'mockedSalt', 'mockedHashedPassword', userData.email],
      expect.any(Function)
    );
  });

  it('should handle error and return 500', async () => {
    // Mocking db.query to simulate an error
    db.query.mockImplementation((sql, values, callback) => {
      callback(new Error('Database error'));
    });

    const userData = {
      username: 'testuser',
      password: 'testpassword',
      email: 'test@example.com',
    };

    const response = await request(app)
      .post('/api/postLogin')
      .send(userData);

    expect(response.status).toBe(500);
    expect(response.text).toBe('error during inserting usersname and password');
  });
});
