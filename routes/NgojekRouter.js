const express = require('express');
const router = express.Router();
const JWTAuthUser = require('../middlewares/user/JWT');
const JWTAuthDriver = require('../middlewares/driver/JWT');
const TransactionController = require('../controllers/NgojekController');

router.post(
    '/',
    JWTAuthUser.JWTverify,
	TransactionController.ngojek
);

router.post(
    '/pickup',
    JWTAuthDriver.JWTverify,
	TransactionController.pickup
);

router.post(
    '/otw',
    JWTAuthDriver.JWTverify,
	TransactionController.otw
);

router.post(
    '/finish',
    JWTAuthDriver.JWTverify,
	TransactionController.finish
);

router.post(
    '/useract',
    JWTAuthUser.JWTverify,
	TransactionController.userAct
);

router.post(
    '/driveract',
    JWTAuthDriver.JWTverify,
	TransactionController.driverAct
);

router.get(
    '/:transaction_number',
	TransactionController.getTransaction
);
module.exports = router;
