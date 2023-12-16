const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createError = require('../../utils/createError');
const Admin = require('../../models/admin');
const { INVALID_ADMIN_LOGIN } = require('../../errors');

const loginAdmin = asyncHandler(async (email, password) => {
  const admin = await Admin.findOne({ email });
  const isAdminFoundAndPasswordMatch = admin && await bcrypt.compare(password, admin.password);

  if (!isAdminFoundAndPasswordMatch) {
    throw createError(INVALID_ADMIN_LOGIN);
  }
  const accessToken = jwt.sign(
    {
      user: {
        username: admin.username,
        email: admin.email,
        id: admin.id,
        role: 'ADMIN'
      }
    },
    process.env.ADMIN_ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  return accessToken;
});

module.exports = loginAdmin;
