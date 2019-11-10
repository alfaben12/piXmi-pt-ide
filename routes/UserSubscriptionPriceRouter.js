const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/admin/JWT');
const UserSubscriptionPriceController = require('../controllers/UserSubscriptionPriceController');

router.get(
	'/',
	UserSubscriptionPriceController.getUSP
);

router.get(
	'/:uspid',
	UserSubscriptionPriceController.detailUSP
);

router.put(
    '/:uspid',
    JWT.JWTverify,
	UserSubscriptionPriceController.updateUSP
);

router.post(
    '/',
    JWT.JWTverify,
	UserSubscriptionPriceController.insertUSP
);

router.delete(
    '/:uspid',
    JWT.JWTverify,
	UserSubscriptionPriceController.deleteUSP
);

module.exports = router;
