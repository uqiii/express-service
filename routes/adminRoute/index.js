const express = require('express');

const {
  createAdmin, getAdmins, getAdmin, deleteAdmin, updateAdmin
} = require('../../controllers/adminController');
const authenticateApiKey = require('../../middlewares/authenticateApiKey');
const validateSchema = require('../../middlewares/validateSchema');
const {
  createAdminSchema, getAdminSchema, deleteAdminSchema, updateAdminSchema
} = require('./schema');

const router = express.Router();

router.route('/admins')
  .post(
    authenticateApiKey,
    validateSchema(createAdminSchema),
    createAdmin
  )
  .get(
    authenticateApiKey,
    getAdmins
  );

router.route('/admins/:adminId')
  .get(
    authenticateApiKey,
    validateSchema(getAdminSchema),
    getAdmin
  )
  .patch(
    authenticateApiKey,
    validateSchema(updateAdminSchema),
    updateAdmin
  )
  .delete(
    authenticateApiKey,
    validateSchema(deleteAdminSchema),
    deleteAdmin
  );

module.exports = router;
