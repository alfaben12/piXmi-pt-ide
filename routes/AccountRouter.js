const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');
const JWTAuthDriver = require('../helpers/driver/JWT');
const JWTAuthUser = require('../helpers/user/JWT');
const JWTAuthAdmin = require('../helpers/admin/JWT');

router.get(
    '/drivers',
    JWTAuthDriver.JWTverify,
	AccountController.getDriver
);

router.get(
    '/users',
    JWTAuthUser.JWTverify,
	AccountController.getUser
);

router.get(
    '/admins',
    JWTAuthAdmin.JWTverify,
	AccountController.getAdmin
);

module.exports = router;
