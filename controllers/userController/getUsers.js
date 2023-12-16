const asyncHandler = require('express-async-handler');

const User = require('../../models/user');
const mapUser = require('../../mapper/mapUser');

const getUsers = asyncHandler(async (pagination) => {
  const { page = 1, limit = 10 } = pagination;
  const users = await User
    .find()
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  return users.map(mapUser);
});

module.exports = getUsers;
