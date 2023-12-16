const asyncHandler = require('express-async-handler');

const User = require('../../models/user');

const getUser = asyncHandler(async () => {
  const users = await User.find();

  const mappedUsers = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email
  }));
  return mappedUsers;
});

module.exports = getUser;
