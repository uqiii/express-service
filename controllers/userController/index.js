const createUser = require('./createUser');
const getUser = require('./getUser');
const getUsers = require('./getUsers');
const deleteUser = require('./deleteUser');
const updateUser = require('./updateUser');
const updateUserPassword = require('./updateUserPassword');
const loginUser = require('./loginUser');

module.exports = {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  loginUser,
  updateUserPassword
};
