
const request = require('supertest');
const app = require('./index.js'); // Adjust the path to your Express app

describe('GET /users', () => {
    it('should fetch all users', async () => {
      const res = await request(app).get('/users');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  
    // Additional tests can include error scenarios, such as database connection errors.
  });
  

describe('POST /users', () => {
    it('should not create user with duplicate email', async () => {
      const duplicateUser = { username: 'testuser2', passwordhash: 'testhash2', email: 'test@test.com' };
      const res = await request(app).post('/users').send(duplicateUser);
      expect(res.statusCode).toEqual(400);
      // Check for your specific error message
    });
  
    // Additional tests for validation errors, etc.
  });

  
describe('POST /questionnaire', () => {
    it('should create a new questionnaire entry', async () => {
      const newEntry = { userid: '2', question1: '2', question2: '3', question3: '4', question4: '5', question5: '1'};
      const res = await request(app).post('/questionnaire').send(newEntry);
      expect(res.statusCode).toEqual(200);
      // Add assertions based on your response structure
    });
  
    // Tests for error scenarios like missing fields
  });

describe('POST /userinteractionfeedback', () => {
    it('should create new user interaction feedback', async () => {
      const feedback = { userid: '2', mediaid:'1', reaction: 'uncertain'};
      const res = await request(app).post('/userinteractionfeedback').send(feedback);
      expect(res.statusCode).toEqual(200);
      // Add more assertions as necessary
    });
  
    // Tests for error scenarios
  });
  
  