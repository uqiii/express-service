const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const createError = require('../../utils/createError');
const Admin = require('../../models/admin');
const { ADMIN_ALREADY_REGISTERED, INVALID_ADMIN_DATA } = require('../../errors');

const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const adminAvailable = await Admin.findOne({ email });
  if (adminAvailable) throw createError(ADMIN_ALREADY_REGISTERED);

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password: ', hashedPassword);
  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword
  });

  console.log(`Admin created ${admin}`);
  if (!admin) throw createError(INVALID_ADMIN_DATA);

  res.status(201).json({ id: admin.id, email: admin.email });
});

module.exports = createAdmin;
