const asyncHandler = require('express-async-handler');

const User = require('../../models/user');
const mapUser = require('../../mapper/mapUser');

const getUsers = asyncHandler(async (pagination) => {
  const {
    page = 1, limit = 10, sortBy = 'createdAt', orderBy = -1
  } = pagination;
  const users = await User
    .find()
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ [sortBy]: orderBy });

  return users.map(mapUser);
});

module.exports = getUsers;
