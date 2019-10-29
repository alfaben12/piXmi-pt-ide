const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/driver/JWT');
const DriverPaymentController = require('../controllers/DriverPaymentController');

router.post(
    '/drivers/vouchers',
    JWT.JWTverify,
	DriverPaymentController.paymentWithVoucher
);

router.post(
    '/drivers/vouchers/finish',
    JWT.JWTverify,
	DriverPaymentController.finishPayment
);

router.get(
    '/mutation/point',
    JWT.JWTverify,
    DriverPaymentController.getMutationPoint
);

router.get(
    '/',
    JWT.JWTverify,
    DriverPaymentController.getDriverPayment
);

module.exports = router;
