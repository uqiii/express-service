const express = require('express');

const {
  handleCreateAdmin, handleGetAdmins, handleGetAdmin, handleDeleteAdmin, handleUpdateAdmin,
  handleLoginAdmin, handleGetCurrentAdmin, handleUpdateCurrentAdmin
} = require('./handler');
const authenticateApiKey = require('../../middlewares/authenticateApiKey');
const authenticateAdmin = require('../../middlewares/authenticateAdmin');
const validateSchema = require('../../middlewares/validateSchema');
const {
  createAdminSchema, getAdminSchema, deleteAdminSchema, updateAdminSchema,
  loginAdminSchema, updateCurrentAdminSchema
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

router.route('/admins/current')
  .get(
    authenticateAdmin,
    handleGetCurrentAdmin
  )
  .patch(
    authenticateAdmin,
    validateSchema(updateCurrentAdminSchema),
    handleUpdateCurrentAdmin
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
