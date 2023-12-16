const asyncHandler = require('express-async-handler');

const Admin = require('../../models/admin');
const mapAdmin = require('../../mapper/mapAdmin');

const getAdmins = asyncHandler(async (pagination) => {
  const {
    page = 1, limit = 10, sortBy = 'createdAt', orderBy = -1
  } = pagination;
  const admins = await Admin
    .find()
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ [sortBy]: orderBy });

  return admins.map(mapAdmin);
});

module.exports = getAdmins;
