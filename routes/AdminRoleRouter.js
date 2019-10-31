const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/admin/JWT');
const AdminRoleController = require('../controllers/AdminRoleController');

router.get(
    '/',
    JWT.JWTverify,
	AdminRoleController.getAdminRole
);

router.get(
	'/:roleid',
	AdminRoleController.detailAdminRole
);

router.put(
    '/:roleid',
    JWT.JWTverify,
	AdminRoleController.updateAdminRole
);

router.post(
    '/',
    JWT.JWTverify,
	AdminRoleController.insertAdminRole
);

router.delete(
    '/:roleid',
    JWT.JWTverify,
	AdminRoleController.deleteAdminRole
);

module.exports = router;
