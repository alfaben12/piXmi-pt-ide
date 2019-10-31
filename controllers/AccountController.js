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
		let model = 'AdminModel'
		
		let account = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);
		
		let admin_shelterid = account.dataValues[0].shelterid;
		let byShelter_field = ['*'];
		let byShelter_where;
		if (admin_shelterid == null) {
			byShelter_where = false;
		}else{
			byShelter_where = {
				shelterid: admin_shelterid
			};
		}
		let byShelter_orderBy = false;
		let byShelter_groupBy = false;
		let byShelter_model = 'DriverModel'
		
		let byShelter_account = await ZSequelize.fetch(true, byShelter_field, byShelter_where, byShelter_orderBy, byShelter_groupBy, byShelter_model);
		
		/* FETCTH RESULT & CONDITION & RESPONSE */
		if (byShelter_account.result) {
			return res.status(200).json({
				result : true,
				message : 'OK',
				data: byShelter_account.dataValues
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
	
	checkRequirementsDriver: async function(req, res){
		/* JWT PAYLOAD */
		let accountid = req.payload.accountid;
		
		let account = await AccountHelper.getDriverAccount(accountid);
		
		let requirements = [];
		let transportation_type = account.dataValues.transportation_type;
		let shelter = account.dataValues.shelter;
		let driver_setup = account.dataValues.driver_setup;
		let driver_setup_costs = account.dataValues.driver_setup_costs;
		let driver_level = account.dataValues.driver_level;
		
		if(shelter == null){
			let shelter_req = {
				result: false,
				message: 'Shelter dapat ditambahkan di admin.',
				todo: 'Login admin, tambah shelter driver'
			}
			requirements.push(shelter_req);
		}
		
		if(driver_setup == null){
			let driver_setup_req = {
				result: false,
				message: 'Driver setup dapat ditambahkan di admin.',
				todo: 'Login admin, tambah setup akun driver'
			}
			requirements.push(driver_setup_req);
		}
		
		if(driver_setup_costs == null){
			let driver_setup_costs_req = {
				result: false,
				message: 'Driver setup cost dapat ditambahkan di admin, setup cost 24 jam harus ada setinganya dengan range',
				todo: 'Login admin, tambah setup cost akun driver'
			}
			requirements.push(driver_setup_costs_req);
		}
		
		if(driver_level == null){
			let driver_level_req = {
				result: false,
				message: 'Driver level dapat ditambahkan di admin.',
				todo: 'Login admin, tambah level driver'
			}
			requirements.push(driver_level_req);
		}
		
		return res.status(200).json({
			result : true,
			message : 'OK',
			data: requirements
		});
	}
}