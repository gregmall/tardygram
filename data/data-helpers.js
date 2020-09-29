const fs = require('fs');
const pool = require('../lib/utils/pool');
const seed = require('./seed');
const request = require('supertest');
const app = require('../lib/app');

beforeEarch(() => {
  return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
});

beforeEach(() => {
  return seed();
});
