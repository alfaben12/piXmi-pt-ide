const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/admin/JWT');
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

router.post(
    '/generates',
    JWT.JWTverify,
	VoucherController.generatesInsertVoucher
);

router.delete(
    '/:voucherid',
    JWT.JWTverify,
	VoucherController.deleteVoucher
);

router.get(
	'/used/all',
	VoucherController.getVoucherUsed
);

router.get(
	'/:voucherid/remaining',
	VoucherController.getVoucherRemaining
);

module.exports = router;
