const express = require('express');
const router = express.Router();
const JWT = require('../helpers/driver/JWT');
const DriverPaymentController = require('../controllers/DriverPaymentController');

router.post(
    '/drivers/vouchers',
    JWT.JWTverify,
	DriverPaymentController.paymentWithVoucher
);

router.post(
    '/drivers/vouchers/completed',
    JWT.JWTverify,
	DriverPaymentController.completedPayment
);

module.exports = router;
