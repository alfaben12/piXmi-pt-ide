const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');
const JWT = require('../middlewares/driver/JWT');
// const formValidation = require('../middlewares/formvalidations/RegistersFormValidation');

router.post(
	'/drivers',
	// formValidation.bodySend(),
	RegisterController.insertDriver
);

router.post(
	'/users',
	RegisterController.insertUser
);

router.put(
	'/verify',
	JWT.JWTverify,
	RegisterController.verifyDriver
);

router.post(
	'/sendCodeVerify',
	JWT.JWTverify,
	RegisterController.sendCodeVerify
);

module.exports = router;
