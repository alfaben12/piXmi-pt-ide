const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/user/JWT');
const TransactionController = require('../controllers/TransactionController');

router.post(
    '/ngojek',
    JWT.JWTverify,
	TransactionController.ngojek
);

module.exports = router;
