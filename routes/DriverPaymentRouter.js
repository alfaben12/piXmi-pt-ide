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

router.get(
    '/driver/:payment_number/payment_number',
    JWT.JWTverify,
    DriverPaymentController.getDriverPaymentByTransactionNumber
);

router.post(
    '/driver/check_total',
    JWT.JWTverify,
    DriverPaymentController.getDriverPaymentTotal
);

module.exports = router;
