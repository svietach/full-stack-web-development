const express = require('express')
const app = express()
const cors = require('cors');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const tokenExtractor = require('./utils/token-extractor');

app.use(cors())
app.use(express.json())
app.use(tokenExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

module.exports = app;