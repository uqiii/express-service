const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const createError = require('../../utils/createError');
const User = require('../../models/user');
const { USER_ALREADY_REGISTERED, USER_INVALID_DATA } = require('../../errors');

const createUser = asyncHandler(async (payload) => {
  const { name, email, password } = payload;
  const userAvailable = await User.findOne({ email });
  if (userAvailable) throw createError(USER_ALREADY_REGISTERED);

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password: ', hashedPassword);
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  console.log(`User created ${user}`);
  if (!user) throw createError(USER_INVALID_DATA);

  return { id: user.id, name: user.name, email: user.email };
});

module.exports = createUser;
