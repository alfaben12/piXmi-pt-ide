const AccountHelper = require('../helpers/AccountHelper');

module.exports = {
    getDriver: async function(req, res){
        /* JWT PAYLOAD */
        let accountid = req.payload.accountid;
		
        /* BODY */
        let token = req.body.token;

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
		
        /* BODY */
        let token = req.body.token;

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
		
        /* BODY */
        let token = req.body.token;

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
    }
}