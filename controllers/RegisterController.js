const ZSequelize = require('../libraries/ZSequelize');
const AccountHelper = require('../helpers/AccountHelper');
const Op = require('sequelize').Op;
const sequelize = require('../config/db');

module.exports = {
    insertDriver: async function(req, res){
        /* BODY */
        let name = req.body.name;
		let username = req.body.username;
		let password = req.body.password;
		let activity_category = req.body.activity_category;
		let for_woman = req.body.for_woman;
		let transportation_type = req.body.transportation_type;
		let address = req.body.address;
		let ktp_number = req.body.ktp_number;
		let phone = req.body.phone;
		let email = req.body.email;
		let photo_profile = req.upload.photo_profile;
		let photo_stnk = req.upload.photo_stnk;
		let photo_skck = req.upload.photo_skck;
		let photo_sim = req.upload.photo_sim;
		let photo_transportation = req.upload.photo_transportation;
          
        /* VALIDATION */
        /* PARAMETER ZSequelize */
		let validation_field = ['*'];
		let validation_where = {
			[Op.or]: [{username: username}, {email: email}]
		};

		let validation_orderBy = [['id', 'DESC']];
		let validation_groupBy = false;
		let validation_model = 'DriverModel';

		/* FETCH ZSequelize */
		let validation_accountData = await ZSequelize.fetch(false, validation_field, validation_where, validation_orderBy, validation_groupBy, validation_model);

		if (validation_accountData.dataValues != null) {
			return res.status(200).json({
                result : false,
				message: "FAIL {already registered}"
			});
        }
        
        /* PARAMETER ZSequelize  */
        let driver_value = {
            name: name,
			username: username,
			password: password,
			activity_category: activity_category,
			for_woman: for_woman,
			transportation_type: transportation_type,
			address: address,
			ktp_number: ktp_number,
			phone: phone,
			email: email,
			photo_profile: photo_profile,
			photo_stnk: photo_stnk,
			photo_skck: photo_skck,
			photo_sim: photo_sim,
			photo_transportation: photo_transportation
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            await ZSequelize.insertValues(driver_value, "DriverModel", transaction);

            await transaction.commit();

            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(201).json({
                result : true,
                message : 'OK'
            });
        } catch (err) {
            await transaction.rollback();
            return res.status(400).json({
                result : false,
                message : err
            });
        }
	},
	
	insertUser: async function(req, res){
        /* BODY */
        let name = req.body.name;
		let username = req.body.username;
		let password = req.body.password;
		let address = req.body.address;
		let ktp_number = req.body.ktp_number;
		let phone = req.body.phone;
		let email = req.body.email;
		let photo_profile = req.upload.photo_profile;
          
        /* VALIDATION */
        /* PARAMETER ZSequelize */
		let validation_field = ['*'];
		let validation_where = {
			[Op.or]: [{username: username}, {email: email}]
		};

		let validation_orderBy = [['id', 'DESC']];
		let validation_groupBy = false;
		let validation_model = 'UserModel';

		/* FETCH ZSequelize */
		let validation_accountData = await ZSequelize.fetch(false, validation_field, validation_where, validation_orderBy, validation_groupBy, validation_model);

		if (validation_accountData.dataValues != null) {
			return res.status(200).json({
                result : false,
				message: "FAIL {already registered}"
			});
        }

        /* PARAMETER ZSequelize  */
        let driver_value = {
            name: name,
			username: username,
			password: password,
			address: address,
			ktp_number: ktp_number,
			phone: phone,
			email: email,
			photo_profile: photo_profile,
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            await ZSequelize.insertValues(driver_value, "UserModel", transaction);

            await transaction.commit();

            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(201).json({
                result : true,
                message : 'OK'
            });
        } catch (err) {
            await transaction.rollback();
            return res.status(400).json({
                result : false,
                message : err
            });
        }
	},
	
	verifyDriver: async function(req, res){
		/* JWT PAYLOAD */
        let accountid = req.payload.accountid;
		
        /* BODY */
        let token = req.body.token;

		let account = await AccountHelper.getDriverAccount(accountid);
		let driver_token = account.dataValues.token;

		if (token != driver_token) {
			return res.status(201).json({
                result : false,
                message : 'FAIL {invalid token}'
            });
		}

        /* PARAMETER ZSequelize  */
        let driver_value = {
            is_verify: 1
        }

        let driver_where = {
            id: accountid
        };
        
        try {
            transaction = await sequelize.transaction();

            /* UPDATE ZSequelize */
            let driver_result = await ZSequelize.updateValues(driver_value, driver_where, "DriverModel", transaction);

            await transaction.commit();

            /* FETCTH RESULT & CONDITION & RESPONSE */
			return res.status(200).json({
                result : true,
                message : 'OK'
            });
        } catch (err) {
            await transaction.rollback();
            return res.status(400).json({
                result : false,
                message : err
            });
        }
	}
}