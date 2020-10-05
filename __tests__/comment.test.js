const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const userService = require('../lib/services/user-service');
const { getAgent } = require('../data/data-helpers');
const Comment = require('../lib/models/comment');