const asyncHandler = require('express-async-handler');

const Admin = require('../../models/admin');
const createError = require('../../utils/createError');
const { ADMIN_NOT_FOUND } = require('../../errors');

const updateAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  const admin = await Admin.findOne({ _id: adminId });
  if (!admin) throw createError(ADMIN_NOT_FOUND);

  const updatedAdmin = await Admin.findByIdAndUpdate(
    adminId,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedAdmin);
});

module.exports = updateAdmin;
