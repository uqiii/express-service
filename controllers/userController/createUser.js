const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const createError = require('../../utils/createError');
const User = require('../../models/user');
const { USER_ALREADY_REGISTERED, USER_INVALID_DATA } = require('../../errors');
const mapUser = require('../../mapper/mapUser');

const sanitizePayload = (payload) => ({
  ...payload,
  email: payload.email.toLowerCase()
});

const createUser = asyncHandler(async (payload) => {
  const sanitizedPayload = sanitizePayload(payload);
  const {
    name, email, phone, password, position, avatar
  } = sanitizedPayload;
  const userExist = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExist) throw createError(USER_ALREADY_REGISTERED);

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password: ', hashedPassword);
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    position,
    avatar
  });

  console.log(`User created ${user}`);
  if (!user) throw createError(USER_INVALID_DATA);

  return mapUser(user);
});

module.exports = createUser;
