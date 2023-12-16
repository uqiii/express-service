const asyncHandler = require('express-async-handler');

const Admin = require('../../models/admin');

const getAdmins = asyncHandler(async () => {
  const admins = await Admin.find();

  const mappedAdmins = admins.map((admin) => ({
    id: admin._id,
    name: admin.name,
    email: admin.email
  }));
  return mappedAdmins;
});

module.exports = getAdmins;
