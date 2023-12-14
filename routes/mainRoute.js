const express = require('express');
const { getHandler } = require('../controllers/mainController');

const router = express.Router();

router.route('/main').get(getHandler);

module.exports = router;
