const express = require('express');

const {
  createUser, getUsers, getUser, deleteUser, updateUser
} = require('../../controllers/userController');
const validateSchema = require('../../middlewares/validateSchema');
const {
  createUserSchema, getUserSchema, deleteUserSchema, updateUserSchema
} = require('./schema');

const router = express.Router();

router.route('/users')
  .post(
    validateSchema(createUserSchema),
    createUser
  )
  .get(
    getUsers
  );

router.route('/users/:userId')
  .get(
    validateSchema(getUserSchema),
    getUser
  )
  .patch(
    validateSchema(updateUserSchema),
    updateUser
  )
  .delete(
    validateSchema(deleteUserSchema),
    deleteUser
  );

module.exports = router;
