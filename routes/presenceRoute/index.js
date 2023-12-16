const express = require('express');

const { handleGetPresences } = require('./handler');
const validateSchema = require('../../middlewares/validateSchema');
const authenticateAdmin = require('../../middlewares/authenticateAdmin');
const { getPresencesSchema } = require('./schema');

const router = express.Router();

router.route('/presences')
  .get(
    authenticateAdmin,
    validateSchema(getPresencesSchema),
    handleGetPresences
  );

module.exports = router;
