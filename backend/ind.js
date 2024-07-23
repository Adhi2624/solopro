// server.js or app.js
require('dotenv').config();
const express = require('express');
const app = express();

// Use environment variables
const ademail = process.env.EMAIL_USERNAME;
const adpw = process.env.EMAIL_PASSWORD;

console.log('Email:', adpw);

// Other configurations and routes
