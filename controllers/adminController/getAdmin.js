const asyncHandler = require('express-async-handler');

const createError = require('../../utils/createError');
const Admin = require('../../models/admin');
const { ADMIN_NOT_FOUND } = require('../../errors');
const mapAdmin = require('../../mapper/mapAdmin');

const getAdmin = asyncHandler(async (adminId) => {
  const admin = await Admin.findOne({ _id: adminId });
  if (!admin) throw createError(ADMIN_NOT_FOUND);

  return mapAdmin(admin);
});

module.exports = getAdmin;
