const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/admin/JWT');
const ShelterController = require('../controllers/ShelterController');

router.get(
	'/',
	ShelterController.getShelter
);

router.get(
	'/:shelterid',
	ShelterController.detailShelter
);

router.put(
    '/:shelterid',
    JWT.JWTverify,
	ShelterController.updateShelter
);

router.post(
    '/',
    JWT.JWTverify,
	ShelterController.insertShelter
);

router.delete(
    '/:shelterid',
    JWT.JWTverify,
	ShelterController.deleteShelter
);

router.put(
    '/drivers/:driverid/',
    JWT.JWTverify,
	ShelterController.verifyShelterDriver
);

module.exports = router;
