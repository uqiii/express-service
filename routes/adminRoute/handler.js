const asyncHandler = require('express-async-handler');
const {
  createAdmin, getAdmins, getAdmin, deleteAdmin, updateAdmin, loginAdmin
} = require('../../controllers/adminController');

const handleCreateAdmin = asyncHandler(async (req, res) => {
  const createdAdmin = await createAdmin(req.body);
  res.status(201).json(createdAdmin);
});

const handleGetAdmins = asyncHandler(async (req, res) => {
  const { query: { page, limit } } = req;
  const pagination = { page, limit };
  const admins = await getAdmins(pagination);
  res.status(200).json(admins);
});

const handleGetAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  const foundAdmin = await getAdmin(adminId);
  res.status(200).json(foundAdmin);
});

const handleGetCurrentAdmin = asyncHandler(async (req, res) => {
  const adminId = req.user.id;
  const foundAdmin = await getAdmin(adminId);
  res.status(200).json(foundAdmin);
});

const handleDeleteAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  await deleteAdmin(adminId);
  res.status(200).json('Admin deleted');
});

const handleUpdateAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  const updatePayload = req.body;
  const updatedAdmin = await updateAdmin(adminId, updatePayload);
  res.status(200).json(updatedAdmin);
});

const handleUpdateCurrentAdmin = asyncHandler(async (req, res) => {
  const adminId = req.user.id;
  const updatePayload = req.body;
  const updatedAdmin = await updateAdmin(adminId, updatePayload);
  res.status(200).json(updatedAdmin);
});

const handleLoginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const accessToken = await loginAdmin(email, password);
  res.status(200).json({ accessToken });
});

module.exports = {
  handleCreateAdmin,
  handleGetAdmins,
  handleGetAdmin,
  handleDeleteAdmin,
  handleUpdateAdmin,
  handleLoginAdmin,
  handleGetCurrentAdmin,
  handleUpdateCurrentAdmin
};
