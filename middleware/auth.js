const jwt = require('jsonwebtoken');
const { ERROR_MESSAGE } = require('../utils/constants');

require('dotenv').config();

const { AUTH_ERROR, TOKEN_INVALID } = ERROR_MESSAGE;

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: AUTH_ERROR });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch(err) {
    res.status(401).json({ msg: TOKEN_INVALID });
  }
}