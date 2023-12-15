const asyncHandler = require('express-async-handler');

const Admin = require('../../models/admin');
const createError = require('../../utils/createError');
const { ADMIN_NOT_FOUND, ADMIN_DELETE_FAILED } = require('../../errors');

const deleteAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  const admin = await Admin.findOne({ _id: adminId });
  if (!admin) throw createError(ADMIN_NOT_FOUND);

  const result = await Admin.deleteOne({ _id: adminId });
  if (result.deletedCount > 0) {
    res.status(200).json('Admin deleted');
  }
  throw createError(ADMIN_DELETE_FAILED);
});

module.exports = deleteAdmin;
