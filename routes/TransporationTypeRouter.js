const express = require('express');
const router = express.Router();
const JWT = require('../helpers/admin/JWT');
const TransportationTypeController = require('../controllers/TransportationTypeController');

router.get(
	'/',
	TransportationTypeController.getTransportationType
);

router.get(
	'/:transportationtypeid',
	TransportationTypeController.detailTransportationType
);

router.put(
    '/:transportationtypeid',
    JWT.JWTverify,
	TransportationTypeController.updateTransportationType
);

router.post(
    '/',
    JWT.JWTverify,
	TransportationTypeController.insertTransportationType
);

router.delete(
    '/:transportationtypeid',
    JWT.JWTverify,
	TransportationTypeController.deleteTransportationType
);

module.exports = router;
