const jwt = require('jsonwebtoken');

const sendJWTToken = (user, res) => {
  const payload = {
    user: {
      id: user.id
    }
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
}

module.exports = sendJWTToken;