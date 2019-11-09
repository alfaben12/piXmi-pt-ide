const ZSequelize = require('../libraries/ZSequelize');
const JWTAuthDriver = require('../middlewares/driver/JWT');
const JWTAuthUser = require('../middlewares/user/JWT');
const JWTAuthAdmin = require('../middlewares/admin/JWT');
const bcrypt = require('bcryptjs');

module.exports = {
	loginAdmin: async function(req, res) {
		/* POST BODY */
		let username = req.body.username;
		let password = req.body.password;

		/* PARAMETER ZSequelize */
		let field = [ '*' ];
		let where = {
			username: username,
			password: password
		};
		let orderBy = false;
		let groupBy = false;
		let model = 'AdminModel';

		/* FETCH ZSequelize */
		let accountData = await ZSequelize.fetch(false, field, where, orderBy, groupBy, model);

		/* FETCTH RESULT & CONDITION & RESPONSE */
		if (accountData.result) {
			let accountid = accountData.dataValues.id;
			let jwtToken = await JWTAuthAdmin.JWTsign(accountid);

			/* SET RESPONSE */
			return res.status(200).json({
				result: true,
				message: 'OK',
				data: {
					token: jwtToken,
					loginType: 'ADMIN'
				}
			});
		} else {
			return res.status(404).json({
				result: accountData.result,
				message: 'Gagal, Admin tidak ditemukan'
			});
		}
	},

	loginDriver: async function(req, res) {
		/* POST BODY */
		let username = req.body.username;
		let password = req.body.password;

		/* PARAMETER ZSequelize */
		let field = [ '*' ];
		let where = {
			username: username
		};
		let orderBy = false;
		let groupBy = false;
		let model = 'DriverModel';

		/* FETCH ZSequelize */
		let accountData = await ZSequelize.fetch(false, field, where, orderBy, groupBy, model);
		if (accountData.dataValues == null) {
			return res.status(404).json({
				result: false,
				message: 'Akun tidak ditemukan'
			});
		}

		let hashPasswordAccount = accountData.dataValues.password;

		let passwordCompare;
		if (bcrypt.compareSync(password, hashPasswordAccount)) {
			passwordCompare = true;
		} else {
			passwordCompare = false;
		}

		if (!passwordCompare) {
			return res.status(404).json({
				result: false,
				message: 'Password salah'
			});
		}

		/* FETCTH RESULT & CONDITION & RESPONSE */
		if (accountData.result) {
			let accountid = accountData.dataValues.id;
			let jwtToken = await JWTAuthDriver.JWTsign(accountid);

			/* SET RESPONSE */
			return res.status(200).json({
				result: true,
				message: 'OK',
				data: {
					token: jwtToken,
					loginType: 'DRIVER'
				}
			});
		} else {
			return res.status(404).json({
				result: accountData.result,
				message: 'Akun tidak ditemukan'
			});
		}
	},

	loginUser: async function(req, res) {
		/* POST BODY */
		let username = req.body.username;
		let password = req.body.password;

		/* PARAMETER ZSequelize */
		let field = [ '*' ];
		let where = {
			username: username
		};
		let orderBy = false;
		let groupBy = false;
		let model = 'UserModel';

		/* FETCH ZSequelize */
		let accountData = await ZSequelize.fetch(false, field, where, orderBy, groupBy, model);
		if (accountData.dataValues == null) {
			return res.status(404).json({
				result: false,
				message: 'Akun tidak ditemukan'
			});
		}

		let hashPasswordAccount = accountData.dataValues.password;

		let passwordCompare;
		if (bcrypt.compareSync(password, hashPasswordAccount)) {
			passwordCompare = true;
		} else {
			passwordCompare = false;
		}

		if (!passwordCompare) {
			return res.status(404).json({
				result: false,
				message: 'Password salah'
			});
		}

		/* FETCTH RESULT & CONDITION & RESPONSE */
		if (accountData.result) {
			let accountid = accountData.dataValues.id;
			let jwtToken = await JWTAuthUser.JWTsign(accountid);

			/* SET RESPONSE */
			return res.status(200).json({
				result: true,
				message: 'Berhasil login',
				data: {
					token: jwtToken,
					loginType: 'USER'
				}
			});
		} else {
			return res.status(404).json({
				result: accountData.result,
				message: 'Akun tidak ditemukan'
			});
		}
	}
};
