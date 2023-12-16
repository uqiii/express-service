const express = require('express');

const {
  handleCreateUser, handleGetUsers, handleGetUser, handleDeleteUser,
  handleUpdateUser, handleLoginUser
} = require('./handler');
const validateSchema = require('../../middlewares/validateSchema');
const authenticateAdmin = require('../../middlewares/authenticateAdmin');
const {
  createUserSchema, getUserSchema, deleteUserSchema, updateUserSchema,
  loginUserSchema
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
    handleGetUsers
  );

router.route('/users/login')
  .post(
    validateSchema(loginUserSchema),
    handleLoginUser
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

module.exports = router;
