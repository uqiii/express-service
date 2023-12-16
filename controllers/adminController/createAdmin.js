const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const createError = require('../../utils/createError');
const Admin = require('../../models/admin');
const { ADMIN_ALREADY_REGISTERED, ADMIN_INVALID_DATA } = require('../../errors');
const mapAdmin = require('../../mapper/mapAdmin');

const createAdmin = asyncHandler(async (payload) => {
  const { name, email, password } = payload;
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
  if (!admin) throw createError(ADMIN_INVALID_DATA);

  return mapAdmin(admin);
});

module.exports = createAdmin;
