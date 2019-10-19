const ZSequelize = require('../libraries/ZSequelize');
const JWTAuthDriver = require('../helpers/driver/JWT');
const JWTAuthUser = require('../helpers/user/JWT');
const JWTAuthAdmin = require('../helpers/admin/JWT');

module.exports = {
	loginAdmin: async function(req, res) {
		/* POST BODY */
		let username = req.body.username;
        let password = req.body.password;
        
		/* PARAMETER ZSequelize */
		let field = ['*'];
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
				data: jwtToken,
				loginType: 'ADMIN'
			});
		}else{
			return res.status(404).json({
				result : accountData.result,
				message: 'FAIL'
			});
		}
	},
	
    loginDriver: async function(req, res) {
		/* POST BODY */
		let username = req.body.username;
        let password = req.body.password;
        
		/* PARAMETER ZSequelize */
		let field = ['*'];
		let where = {
			username: username,
			password: password
		};
		let orderBy = false;
		let groupBy = false;
		let model = 'DriverModel';

		/* FETCH ZSequelize */
		let accountData = await ZSequelize.fetch(false, field, where, orderBy, groupBy, model);

		/* FETCTH RESULT & CONDITION & RESPONSE */
		if (accountData.result) {
			let accountid = accountData.dataValues.id;
			let jwtToken = await JWTAuthDriver.JWTsign(accountid);
		
			/* SET RESPONSE */
			return res.status(200).json({
				result: true,
				message: 'OK',
				data: jwtToken,
				loginType: 'DRIVER'
			});
		}else{
			return res.status(404).json({
				result : accountData.result,
				message: 'FAIL'
			});
		}
    },
    
    loginUser: async function(req, res) {
		/* POST BODY */
		let username = req.body.username;
        let password = req.body.password;
        
		/* PARAMETER ZSequelize */
		let field = ['*'];
		let where = {
			username: username,
			password: password
		};
		let orderBy = false;
		let groupBy = false;
		let model = 'UserModel';

		/* FETCH ZSequelize */
		let accountData = await ZSequelize.fetch(false, field, where, orderBy, groupBy, model);

		/* FETCTH RESULT & CONDITION & RESPONSE */
		if (accountData.result) {
			let accountid = accountData.dataValues.id;
			let jwtToken = await JWTAuthUser.JWTsign(accountid);
		
			/* SET RESPONSE */
			return res.status(200).json({
				result: true,
				message: 'OK',
				data: jwtToken,
				loginType: 'USER'
			});
		}else{
			return res.status(404).json({
				result : accountData.result,
				message: 'FAIL'
			});
		}
	}
}