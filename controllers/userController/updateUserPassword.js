const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const User = require('../../models/user');
const createError = require('../../utils/createError');
const { USER_NOT_FOUND, USER_UPDATE_FAILED, USER_INVALID_PASSWORD } = require('../../errors');

const updateUserPassword = asyncHandler(async (userId, payload) => {
  const { oldPassword, newPassword } = payload;

  const user = await User.findOne({
    _id: userId
  });
  if (!user) throw createError(USER_NOT_FOUND);

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    throw createError(USER_INVALID_PASSWORD);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true }
  );
  if (!updatedUser) throw createError(USER_UPDATE_FAILED);

  return {
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email
  };
});

module.exports = updateUserPassword;
