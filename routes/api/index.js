const express = require('express');

const router = express.Router();

router.use('/assets', require('./assets'));
router.use('/auth', require('./auth'));
router.use('/passwords', require('./passwords'));
router.use('/users', require('./users'));
router.use('/housings', require('./housings'));
router.use('/legals', require('./legals'));
router.use('/foods', require('./foods'));

module.exports = router;
