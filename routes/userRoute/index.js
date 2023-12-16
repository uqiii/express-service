const express = require('express');

const {
  createUser, getUsers, getUser, deleteUser, updateUser, loginUser
} = require('../../controllers/userController');
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
    createUser
  )
  .get(
    authenticateAdmin,
    getUsers
  );

router.route('/users/login')
  .post(
    validateSchema(loginUserSchema),
    loginUser
  );

router.route('/users/:userId')
  .get(
    authenticateAdmin,
    validateSchema(getUserSchema),
    getUser
  )
  .patch(
    authenticateAdmin,
    validateSchema(updateUserSchema),
    updateUser
  )
  .delete(
    authenticateAdmin,
    validateSchema(deleteUserSchema),
    deleteUser
  );

module.exports = router;
