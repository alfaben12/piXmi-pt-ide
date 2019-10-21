const express = require('express');
const router = express.Router();
const JWT = require('../helpers/admin/JWT');
const DriverSetupControllers = require('../controllers/DriverSetupControllers');

router.post(
    '/setup/:driverid',
    JWT.JWTverify,
	DriverSetupControllers.setupDriver
);

router.post(
    '/setup/cost/:driverid',
    JWT.JWTverify,
	DriverSetupControllers.insertCost
);

module.exports = router;
