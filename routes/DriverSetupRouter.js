const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/admin/JWT');
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

router.put(
    '/:driversetupid',
    JWT.JWTverify,
	DriverSetupControllers.updateCost
);

module.exports = router;
