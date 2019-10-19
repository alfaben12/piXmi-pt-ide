const ZSequelize = require('../libraries/ZSequelize');
const JWTAuth = require('../helpers/JWT');

module.exports = {
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
			let jwtToken = await JWTAuth.JWTsign(accountid);
		
			/* SET RESPONSE */
			return res.status(200).json({
				result: true,
				data : {
					code: 200,
					message: 'OK',
					data: jwtToken
				}
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
			let jwtToken = await JWTAuth.JWTsign(accountid);
		
			/* SET RESPONSE */
			return res.status(200).json({
				result: true,
				data : {
					code: 200,
					message: 'OK',
					data: jwtToken
				}
			});
		}else{
			return res.status(404).json({
				result : accountData.result,
				message: 'FAIL'
			});
		}
	}
}