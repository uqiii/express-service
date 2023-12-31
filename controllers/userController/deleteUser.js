const asyncHandler = require('express-async-handler');

const User = require('../../models/user');
const createError = require('../../utils/createError');
const { USER_NOT_FOUND, USER_DELETE_FAILED } = require('../../errors');

const deleteUser = asyncHandler(async (userId) => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw createError(USER_NOT_FOUND);

  const result = await User.deleteOne({ _id: userId });
  if (result.deletedCount !== 1) throw createError(USER_DELETE_FAILED);
});

module.exports = deleteUser;
