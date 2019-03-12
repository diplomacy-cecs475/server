const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.get('/test', AuthController.test);

module.exports = router;
