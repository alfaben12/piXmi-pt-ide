const ZSequelize = require('../libraries/ZSequelize');
const sequelize = require('../config/db');

module.exports = {
    getShelter: async function(req, res){
        let field = ['*'];
        let where = false;
        let orderBy = false;
        let groupBy = false;
        let model = 'ShelterModel'

        let shelter_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (shelter_result.result) {
			return res.status(200).json({
				result : true,
                message : 'OK',
				data: shelter_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },

    detailShelter: async function(req, res){
        let shelterid = req.params.shelterid;

        let field = ['*'];
        let where = {
            id: shelterid
        };
        let orderBy = false;
        let groupBy = false;
        let model = 'ShelterModel'

        let shelter_result = await ZSequelize.fetch(false, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (shelter_result.result) {
			return res.status(200).json({
                result : true,
                message : 'OK',
				data: shelter_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },

    updateShelter: async function(req, res){
        /* PARAMS */
        let shelterid = req.params.shelterid;

        let name = req.body.name;
        let branch = req.body.branch;
        let address = req.body.address;
        let phone = req.body.phone;
        let description = req.body.description;

        /* PARAMETER ZSequelize  */
        let shelter_value = {
            name: name,
            branch: branch,
            address: address,
            phone: phone,
            description: description
        }

        let shelter_where = {
            id: shelterid
        };
        
        try {
            transaction = await sequelize.transaction();

            /* UPDATE ZSequelize */
            let shelter_result = await ZSequelize.updateValues(shelter_value, shelter_where, "ShelterModel", transaction);

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

    insertShelter: async function(req, res){
        /* BODY */
        let name = req.body.name;
        let branch = req.body.branch;
        let address = req.body.address;
        let phone = req.body.phone;
        let description = req.body.description;

        /* VALIDATION */
        /* PARAMETER ZSequelize */
		let validation_field = ['*'];
		let validation_where = {
			name: name,
			branch: branch
		};

		let validation_orderBy = [['id', 'DESC']];
		let validation_groupBy = false;
		let validation_model = 'ShelterModel';

		/* FETCH ZSequelize */
		let validation_accountData = await ZSequelize.fetch(false, validation_field, validation_where, validation_orderBy, validation_groupBy, validation_model);

		if (validation_accountData.dataValues != null) {
			return res.status(409).json({
                result : false,
				message: "Maaf, Shelter sudah terdaftar"
			});
        }

        /* PARAMETER ZSequelize  */
        let shelter_value = {
            name: name,
            branch: branch,
            address: address,
            phone: phone,
            description: description
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            let shelter_result = await ZSequelize.insertValues(shelter_value, "ShelterModel", transaction);

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

    deleteShelter: async function(req, res){
        /* PARAMS */
        let shelterid = req.params.shelterid;

        let shelter_where = {
            id: shelterid
        };

        /* UPDATE ZSequelize */
        let shelter_result = await ZSequelize.destroyValues(shelter_where, "ShelterModel");

        if (shelter_result) {
            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(201).json({
                result : true,
                message : 'OK'
            });
        } else {
            await transaction.rollback();
            return res.status(400).json({
                result : false,
                message : err
            });
        }
    },

    verifyShelterDriver: async function(req, res){
        /* BODY */
        let shelterid = req.body.shelterid;
        let driverid = req.params.driverid;

        /* PARAMETER ZSequelize  */
        let driver_value = {
            shelterid: shelterid,
            is_verify: 1
        }

        let driver_where = {
            id: driverid
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