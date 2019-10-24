const AccountHelper = require('../helpers/AccountHelper');
const ZSequelize = require('../libraries/ZSequelize');

module.exports = {
    getDriver: async function(req, res){
        /* JWT PAYLOAD */
        let accountid = req.payload.accountid;

		let account = await AccountHelper.getDriverAccount(accountid);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (account.result) {
			return res.status(200).json({
				result : true,
                message : 'OK',
				data: account.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },

    getUser: async function(req, res){
        /* JWT PAYLOAD */
        let accountid = req.payload.accountid;

		let account = await AccountHelper.getUserAccount(accountid);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (account.result) {
			return res.status(200).json({
				result : true,
                message : 'OK',
				data: account.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },

    getAdmin: async function(req, res){
        /* JWT PAYLOAD */
        let accountid = req.payload.accountid;

		let account = await AccountHelper.getAdminAccount(accountid);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (account.result) {
			return res.status(200).json({
				result : true,
                message : 'OK',
				data: account.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
	},

	getAllDriver: async function(req, res){
		let field = ['*'];
        let where = false;
        let orderBy = false;
        let groupBy = false;
        let model = 'DriverModel'

        let account = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (account.result) {
			return res.status(200).json({
				result : true,
                message : 'OK',
				data: account.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },

    getAllUser: async function(req, res){
        let field = ['*'];
        let where = false;
        let orderBy = false;
        let groupBy = false;
        let model = 'UserModel'

        let account = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (account.result) {
			return res.status(200).json({
				result : true,
                message : 'OK',
				data: account.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },
}