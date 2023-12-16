const asyncHandler = require('express-async-handler');

const createError = require('../../utils/createError');
const User = require('../../models/user');
const { USER_NOT_FOUND } = require('../../errors');
const mapUser = require('../../mapper/mapUser');

const getUser = asyncHandler(async (userId) => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw createError(USER_NOT_FOUND);

  return mapUser(user);
});

module.exports = getUser;
