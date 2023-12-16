const asyncHandler = require('express-async-handler');

const User = require('../../models/user');
const mapUser = require('../../mapper/mapUser');

const getUser = asyncHandler(async () => {
  const users = await User.find();

  return users.map(mapUser);
});

module.exports = getUser;
