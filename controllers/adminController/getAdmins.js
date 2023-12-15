const asyncHandler = require('express-async-handler');

const Admin = require('../../models/admin');

const getAdmin = asyncHandler(async (req, res) => {
  const admins = await Admin.find();

  const mappedAdmins = admins.map((admin) => ({
    id: admin._id,
    name: admin.name,
    email: admin.email
  }));
  res.status(200).json(mappedAdmins);
});

module.exports = getAdmin;
