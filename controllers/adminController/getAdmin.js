const asyncHandler = require('express-async-handler');

const createError = require('../../utils/createError');
const Admin = require('../../models/admin');
const { ADMIN_NOT_FOUND } = require('../../errors');

const getAdmin = asyncHandler(async (adminId) => {
  const admin = await Admin.findOne({ _id: adminId });
  if (!admin) throw createError(ADMIN_NOT_FOUND);

  const mappedAdmin = {
    id: admin._id,
    name: admin.name,
    email: admin.email
  };
  return mappedAdmin;
});

module.exports = getAdmin;
