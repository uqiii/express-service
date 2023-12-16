const express = require('express');

const {
  handleCreateUser, handleGetUsers, handleGetUser, handleDeleteUser,
  handleUpdateUser, handleLoginUser, handleUpdateCurrentUser,
  handleGetCurrentUser, handleUpdateCurrentUserPassword,
  handleAddCurrentUserPresence, handleGetUserPresences,
  handleGetCurrentUserPresences
} = require('./handler');
const validateSchema = require('../../middlewares/validateSchema');
const authenticateAdmin = require('../../middlewares/authenticateAdmin');
const authenticateUser = require('../../middlewares/authenticateUser');
const {
  createUserSchema, getUserSchema, deleteUserSchema, updateUserSchema,
  loginUserSchema, updateCurrentUserSchema, updateCurrentUserPasswordSchema,
  addCurrentUserPresenceSchema, getUsersSchema, getCurrentUserPresenceSchema,
  getUserPresenceSchema
} = require('./schema');

const router = express.Router();

router.route('/users')
  .post(
    authenticateAdmin,
    validateSchema(createUserSchema),
    handleCreateUser
  )
  .get(
    authenticateAdmin,
    validateSchema(getUsersSchema),
    handleGetUsers
  );

router.route('/users/login')
  .post(
    validateSchema(loginUserSchema),
    handleLoginUser
  );

router.route('/users/current')
  .get(
    authenticateUser,
    handleGetCurrentUser
  )
  .patch(
    authenticateUser,
    validateSchema(updateCurrentUserSchema),
    handleUpdateCurrentUser
  );

router.route('/users/current/presences')
  .get(
    authenticateUser,
    validateSchema(getCurrentUserPresenceSchema),
    handleGetCurrentUserPresences
  )
  .post(
    authenticateUser,
    validateSchema(addCurrentUserPresenceSchema),
    handleAddCurrentUserPresence
  );

router.route('/users/current/update-password')
  .post(
    authenticateUser,
    validateSchema(updateCurrentUserPasswordSchema),
    handleUpdateCurrentUserPassword
  );

router.route('/users/:userId')
  .get(
    authenticateAdmin,
    validateSchema(getUserSchema),
    handleGetUser
  )
  .patch(
    authenticateAdmin,
    validateSchema(updateUserSchema),
    handleUpdateUser
  )
  .delete(
    authenticateAdmin,
    validateSchema(deleteUserSchema),
    handleDeleteUser
  );

router.route('/users/:userId/presences')
  .get(
    authenticateAdmin,
    validateSchema(getUserPresenceSchema),
    handleGetUserPresences
  );

module.exports = router;
