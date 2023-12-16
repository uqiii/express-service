const asyncHandler = require('express-async-handler');

const User = require('../../models/user');
const createError = require('../../utils/createError');
const { USER_NOT_FOUND, USER_UPDATE_FAILED } = require('../../errors');
const mapUser = require('../../mapper/mapUser');

const updateUser = asyncHandler(async (userId, payload) => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw createError(USER_NOT_FOUND);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    payload,
    { new: true }
  );
  if (!updatedUser) throw createError(USER_UPDATE_FAILED);

  return mapUser(user);
});

module.exports = updateUser;
