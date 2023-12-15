const asyncHandler = require('express-async-handler');

const User = require('../../models/user');

const getUser = asyncHandler(async (req, res) => {
  const users = await User.find();

  const mappedUsers = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email
  }));
  res.status(200).json(mappedUsers);
});

module.exports = getUser;
