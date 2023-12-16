const express = require('express');

const {
  handleCreateAdmin, handleGetAdmins, handleGetAdmin, handleDeleteAdmin, handleUpdateAdmin,
  handleLoginAdmin
} = require('./handler');
const authenticateApiKey = require('../../middlewares/authenticateApiKey');
const validateSchema = require('../../middlewares/validateSchema');
const {
  createAdminSchema, getAdminSchema, deleteAdminSchema, updateAdminSchema,
  loginAdminSchema
} = require('./schema');

const router = express.Router();

router.route('/admins')
  .post(
    authenticateApiKey,
    validateSchema(createAdminSchema),
    handleCreateAdmin
  )
  .get(
    authenticateApiKey,
    handleGetAdmins
  );

router.route('/admins/login')
  .post(
    validateSchema(loginAdminSchema),
    handleLoginAdmin
  );

router.route('/admins/:adminId')
  .get(
    authenticateApiKey,
    validateSchema(getAdminSchema),
    handleGetAdmin
  )
  .patch(
    authenticateApiKey,
    validateSchema(updateAdminSchema),
    handleUpdateAdmin
  )
  .delete(
    authenticateApiKey,
    validateSchema(deleteAdminSchema),
    handleDeleteAdmin
  );

module.exports = router;
