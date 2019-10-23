const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const JWT = require('../helpers/driver/JWT');

router.post(
	'/drivers',
	RegisterController.insertDriver
);

router.post(
	'/users',
	RegisterController.insertUser
);

router.put(
	'/verify',
	JWT.JWTverify,
	RegisterController.verifyDriver
);

module.exports = router;
