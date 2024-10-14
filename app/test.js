// tests.js

const request = require('supertest');
const express = require('express');
const app = require('./app'); // Import your app

describe('DevOps Project API', () => {
  // Test for the health endpoint
  it('should return a 200 status and service message', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Service is up and running!');
  });

  // Test for the root route
  it('should return a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Welcome to the DevOps Project!');
  });

  // Test for the /data POST route
  it('should accept and return JSON data', async () => {
    const sampleData = { name: 'DevOps', status: 'active' };

    const res = await request(app)
      .post('/data')
      .send(sampleData)
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Data received successfully!');
    expect(res.body.data).toEqual(sampleData);
  });

  // Test for invalid route (404)
  it('should return 404 for an unknown route', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toBe(404);
  });
});
