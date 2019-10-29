const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');
const JWTAuthDriver = require('../middlewares/driver/JWT');
const JWTAuthUser = require('../middlewares/user/JWT');
const JWTAuthAdmin = require('../middlewares/admin/JWT');

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

router.get(
    '/alldrivers',
    JWTAuthAdmin.JWTverify,
	AccountController.getAllDriver
);

router.get(
    '/allusers',
    JWTAuthAdmin.JWTverify,
	AccountController.getAllUser
);

module.exports = router;
