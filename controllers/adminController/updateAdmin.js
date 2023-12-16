const asyncHandler = require('express-async-handler');

const Admin = require('../../models/admin');
const createError = require('../../utils/createError');
const { ADMIN_NOT_FOUND, ADMIN_UPDATE_FAILED } = require('../../errors');
const mapAdmin = require('../../mapper/mapAdmin');

const updateAdmin = asyncHandler(async (adminId, payload) => {
  const admin = await Admin.findOne({ _id: adminId });
  if (!admin) throw createError(ADMIN_NOT_FOUND);

  const updatedAdmin = await Admin.findByIdAndUpdate(
    adminId,
    payload,
    { new: true }
  );
  if (!updatedAdmin) throw createError(ADMIN_UPDATE_FAILED);
  return mapAdmin(updatedAdmin);
});

module.exports = updateAdmin;
