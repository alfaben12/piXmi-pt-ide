const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');

router.post(
	'/drivers',
	LoginController.loginDriver
);

router.post(
	'/users',
	LoginController.loginUser
);

router.post(
	'/admins',
	LoginController.loginAdmin
);

module.exports = router;
