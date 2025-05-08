const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const syncEventRoutes = require('./routes/syncEventRoutes');
const { handleError, notFoundHandler } = require('./utils/errorHandlers');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', syncEventRoutes);
app.use(notFoundHandler);
app.use(handleError);

module.exports = app;
