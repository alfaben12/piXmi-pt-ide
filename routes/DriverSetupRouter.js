const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/admin/JWT');
const DriverSetupControllers = require('../controllers/DriverSetupControllers');
const AccessDriver = require('../middlewares/admin/AccessDriver');

router.post(
    '/setup/:driverid',
    JWT.JWTverify,
    AccessDriver.accessCheckWithParam,
	DriverSetupControllers.setupDriver
);

router.post(
    '/setup/cost/:driverid',
    JWT.JWTverify,
    AccessDriver.accessCheckWithParam,
	DriverSetupControllers.insertCost
);

router.put(
    '/:driversetupid/driverid/:driverid',
    JWT.JWTverify,
    AccessDriver.accessCheckWithParam,
	DriverSetupControllers.updateCost
);


router.get(
    '/:driverid',
    JWT.JWTverify,
	DriverSetupControllers.getAccountDriver
);

router.delete(
    '/:driversetupid/driverid/:driverid',
    JWT.JWTverify,
    AccessDriver.accessCheckWithParam,
	DriverSetupControllers.deleteCost
);

module.exports = router;
