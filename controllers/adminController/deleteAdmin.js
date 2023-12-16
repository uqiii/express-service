const asyncHandler = require('express-async-handler');

const Admin = require('../../models/admin');
const createError = require('../../utils/createError');
const { ADMIN_NOT_FOUND, ADMIN_DELETE_FAILED } = require('../../errors');

const deleteAdmin = asyncHandler(async (adminId) => {
  const admin = await Admin.findOne({ _id: adminId });
  if (!admin) throw createError(ADMIN_NOT_FOUND);

  const result = await Admin.deleteOne({ _id: adminId });
  if (result.deletedCount !== 1) throw createError(ADMIN_DELETE_FAILED);
});

module.exports = deleteAdmin;
