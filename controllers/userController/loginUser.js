const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createError = require('../../utils/createError');
const User = require('../../models/user');
const { INVALID_USER_LOGIN } = require('../../errors');

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isUserFoundAndPasswordMatch = user && await bcrypt.compare(password, user.password);

  if (!isUserFoundAndPasswordMatch) {
    throw createError(INVALID_USER_LOGIN);
  }
  const accessToken = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
        role: 'USER'
      }
    },
    process.env.USER_ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  res.status(200).json({ accessToken });
});

module.exports = loginUser;
