const asyncHandler = require('express-async-handler');

const Admin = require('../../models/admin');
const mapAdmin = require('../../mapper/mapAdmin');

const getAdmins = asyncHandler(async () => {
  const admins = await Admin.find();

  return admins.map(mapAdmin);
});

module.exports = getAdmins;
