const asyncHandler = require('express-async-handler');

const User = require('../../models/user');
const createError = require('../../utils/createError');
const { USER_NOT_FOUND } = require('../../errors');

const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) throw createError(USER_NOT_FOUND);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedUser);
});

module.exports = updateUser;
