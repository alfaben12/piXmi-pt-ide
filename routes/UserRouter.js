const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/user/JWT');
const UserController = require('../controllers/UserController');

router.post(
    '/verify',
    JWT.JWTverify,
	UserController.verifyUser
);

router.post(
    '/uss',
    JWT.JWTverify,
	UserController.USS
);

module.exports = router;
