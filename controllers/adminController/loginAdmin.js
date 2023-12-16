const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createError = require('../../utils/createError');
const Admin = require('../../models/admin');
const { INVALID_ADMIN_LOGIN } = require('../../errors');

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });
  const isAdminFoundAndPasswordMatch = user && await bcrypt.compare(password, user.password);

  if (!isAdminFoundAndPasswordMatch) {
    throw createError(INVALID_ADMIN_LOGIN);
  }
  const accessToken = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
        role: 'ADMIN'
      }
    },
    process.env.ADMIN_ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  res.status(200).json({ accessToken });
});

module.exports = loginAdmin;
