const asyncHandler = require('express-async-handler');
const {
  createUser, getUsers, getUser, deleteUser, updateUser, loginUser,
  updateUserPassword
} = require('../../controllers/userController');
const {
  addPresence, getPresences
} = require('../../controllers/presenceController');
const unpackQueryParams = require('../../utils/unpackQueryParams');

const handleCreateUser = asyncHandler(async (req, res) => {
  const createdUser = await createUser(req.body);
  res.status(201).json(createdUser);
});

const handleGetUsers = asyncHandler(async (req, res) => {
  const { pagination } = unpackQueryParams(req);
  const users = await getUsers(pagination);
  res.status(200).json(users);
});

const handleGetUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const foundUser = await getUser(userId);
  res.status(200).json(foundUser);
});

const handleGetCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
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

const handleUpdateCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const updatePayload = req.body;
  const updatedUser = await updateUser(userId, updatePayload);
  res.status(200).json(updatedUser);
});

const handleUpdateCurrentUserPassword = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;
  const updatedUser = await updateUserPassword(userId, payload);
  res.status(200).json(updatedUser);
});

const handleLoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const accessToken = await loginUser(email, password);
  res.status(200).json({ accessToken });
});

const handleAddCurrentUserPresence = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { type } = req.query;
  const message = await addPresence(userId, type);
  res.status(200).json(message);
});

const handleGetPresences = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { pagination, query } = unpackQueryParams(req);
  const enrichedQuery = { ...query, userId };
  const accessToken = await getPresences(enrichedQuery, pagination);
  res.status(200).json(accessToken);
});

module.exports = {
  handleCreateUser,
  handleGetUsers,
  handleGetUser,
  handleDeleteUser,
  handleUpdateUser,
  handleLoginUser,
  handleUpdateCurrentUser,
  handleGetCurrentUser,
  handleUpdateCurrentUserPassword,
  handleAddCurrentUserPresence,
  handleGetPresences
};
