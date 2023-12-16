const asyncHandler = require('express-async-handler');

const createError = require('../../utils/createError');
const User = require('../../models/user');
const { USER_NOT_FOUND } = require('../../errors');

const getUser = asyncHandler(async (userId) => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw createError(USER_NOT_FOUND);

  const mappedUser = {
    id: user._id,
    name: user.name,
    email: user.email
  };
  return mappedUser;
});

module.exports = getUser;
