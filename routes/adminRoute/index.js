const express = require('express');

const {
  createAdmin, getAdmins, getAdmin, deleteAdmin, updateAdmin
} = require('../../controllers/adminController');
const validateSchema = require('../../middlewares/validateSchema');
const {
  createAdminSchema, getAdminSchema, deleteAdminSchema, updateAdminSchema
} = require('./schema');

const router = express.Router();

router.route('/admins')
  .post(
    validateSchema(createAdminSchema),
    createAdmin
  )
  .get(
    getAdmins
  );

router.route('/admins/:adminId')
  .get(
    validateSchema(getAdminSchema),
    getAdmin
  )
  .patch(
    validateSchema(updateAdminSchema),
    updateAdmin
  )
  .delete(
    validateSchema(deleteAdminSchema),
    deleteAdmin
  );

module.exports = router;
