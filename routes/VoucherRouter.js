const express = require('express');
const router = express.Router();
const JWT = require('../helpers/admin/JWT');
const VoucherController = require('../controllers/VoucherController');

router.get(
	'/',
	VoucherController.getVoucher
);

router.get(
	'/:voucherid',
	VoucherController.detailVoucher
);

router.put(
    '/:voucherid',
    JWT.JWTverify,
	VoucherController.updateVoucher
);

router.post(
    '/',
    JWT.JWTverify,
	VoucherController.insertVoucher
);

router.delete(
    '/:voucherid',
    JWT.JWTverify,
	VoucherController.deleteVoucher
);

module.exports = router;
