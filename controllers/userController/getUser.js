const asyncHandler = require('express-async-handler');

const createError = require('../../utils/createError');
const User = require('../../models/user');
const { USER_NOT_FOUND } = require('../../errors');

const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) throw createError(USER_NOT_FOUND);

  const mappedUser = {
    id: user._id,
    name: user.name,
    email: user.email
  };
  res.status(200).json(mappedUser);
});

module.exports = getUser;
