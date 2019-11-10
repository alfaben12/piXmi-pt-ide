const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/admin/JWT');
const UserSubscriptionCategoryController = require('../controllers/UserSubscriptionCategoryController');

router.get(
	'/',
	UserSubscriptionCategoryController.getUSC
);

router.get(
	'/:uscid',
	UserSubscriptionCategoryController.detailUSC
);

router.put(
    '/:uscid',
    JWT.JWTverify,
	UserSubscriptionCategoryController.updateUSC
);

router.post(
    '/',
    JWT.JWTverify,
	UserSubscriptionCategoryController.insertUSC
);

router.delete(
    '/:uscid',
    JWT.JWTverify,
	UserSubscriptionCategoryController.deleteUSC
);

module.exports = router;
