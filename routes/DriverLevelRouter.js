const express = require('express');
const router = express.Router();
const JWT = require('../helpers/admin/JWT');
const DriverLevelController = require('../controllers/DriverLevelController');

router.get(
	'/',
	DriverLevelController.getDriverLevel
);

router.get(
	'/:levelid',
	DriverLevelController.detailDriverLevel
);

router.put(
    '/:levelid',
    JWT.JWTverify,
	DriverLevelController.updateDriverLevel
);

router.post(
    '/',
    JWT.JWTverify,
	DriverLevelController.insertDriverLevel
);

router.delete(
    '/:levelid',
    JWT.JWTverify,
	DriverLevelController.deleteDriverLevel
);

module.exports = router;
