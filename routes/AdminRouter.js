const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/admin/JWT');
const AdminController = require('../controllers/AdminController');

router.get(
    '/',
    JWT.JWTverify,
	AdminController.getAdmin
);

router.get(
	'/:adminid',
	AdminController.detailAdmin
);

router.put(
    '/:adminid',
    JWT.JWTverify,
	AdminController.updateAdmin
);

router.post(
    '/',
    JWT.JWTverify,
	AdminController.insertAdmin
);

router.delete(
    '/:adminid',
    JWT.JWTverify,
	AdminController.deleteAdmin
);

module.exports = router;
