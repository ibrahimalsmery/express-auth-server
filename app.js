require('dotenv').config();
require('./config/database').connect();
// (async () => await require('./config/database').connect())()
const express = require('express');
const routes = require('./routes');
const app = express();
app.use(express.json());
// include routes 
app.use(routes);
module.exports = app;