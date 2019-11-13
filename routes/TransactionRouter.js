const express = require('express');
const router = express.Router();
const JWTAuthUser = require('../middlewares/user/JWT');
const JWTAuthDriver = require('../middlewares/driver/JWT');
const TransactionController = require('../controllers/TransactionController');

router.post(
    '/ngojek',
    JWTAuthUser.JWTverify,
	TransactionController.ngojek
);

router.post(
    '/ngojek/pickup',
    JWTAuthDriver.JWTverify,
	TransactionController.pickup
);

router.post(
    '/ngojek/otw',
    JWTAuthDriver.JWTverify,
	TransactionController.otw
);

router.post(
    '/ngojek/finish',
    JWTAuthDriver.JWTverify,
	TransactionController.finish
);

router.post(
    '/ngojek/useract',
    JWTAuthUser.JWTverify,
	TransactionController.userAct
);

router.post(
    '/ngojek/driveract',
    JWTAuthDriver.JWTverify,
	TransactionController.driverAct
);
module.exports = router;
