const asyncHandler = require('express-async-handler');
const {
  createUser, getUsers, getUser, deleteUser, updateUser, loginUser
} = require('../../controllers/userController');

const handleCreateUser = asyncHandler(async (req, res) => {
  const createdUser = await createUser(req.body);
  res.status(201).json(createdUser);
});

const handleGetUsers = asyncHandler(async (_, res) => {
  const users = await getUsers();
  res.status(200).json(users);
});

const handleGetUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const foundUser = await getUser(userId);
  res.status(200).json(foundUser);
});

const handleDeleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  await deleteUser(userId);
  res.status(200).json('User deleted');
});

const handleUpdateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updatePayload = req.body;
  const updatedUser = await updateUser(userId, updatePayload);
  res.status(200).json(updatedUser);
});

const handleLoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const accessToken = await loginUser(email, password);
  res.status(200).json({ accessToken });
});

module.exports = {
  handleCreateUser,
  handleGetUsers,
  handleGetUser,
  handleDeleteUser,
  handleUpdateUser,
  handleLoginUser
};
