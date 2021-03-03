const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const { ERROR_MESSAGE } = require('./utils/constants');
const { SERVER_ERROR, INVALID_ROUTE } = ERROR_MESSAGE;

const app = express();
connectDB();
app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/todos', require('./routes/todos'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(
      __dirname, 'client', 'build', 'index.html'
    ));
  });
}

// Error Handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  if (err.kind === 'ObjectId') {
    err.statusCode = 400;
    err.message = INVALID_ROUTE;
  }

  return res
    .status(err.statusCode || 500)
    .json({ msg: err.message || SERVER_ERROR });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  () => console.log(`Server started on port ${PORT}`)
);

module.exports = app;