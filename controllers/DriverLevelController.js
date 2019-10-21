const ZSequelize = require('../libraries/ZSequelize');
const sequelize = require('../config/db');

module.exports = {
    getDriverLevel: async function(req, res){
        let field = ['*'];
        let where = false;
        let orderBy = false;
        let groupBy = false;
        let model = 'DriverLevelModel'

        let level_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (level_result.result) {
			return res.status(200).json({
				result : true,
                message : 'OK',
				data: level_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },

    detailDriverLevel: async function(req, res){
        let levelid = req.params.levelid;

        let field = ['*'];
        let where = {
            id: levelid
        };
        let orderBy = false;
        let groupBy = false;
        let model = 'DriverLevelModel'

        let level_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (level_result.result) {
			return res.status(200).json({
                result : true,
                message : 'OK',
				data: level_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },

    updateDriverLevel: async function(req, res){
        /* PARAMS */
        let levelid = req.params.levelid;

        let name = req.body.name;
        let description = req.body.description;

        /* PARAMETER ZSequelize  */
        let level_value = {
            name: name,
            description: description
        }

        let level_where = {
            id: levelid
        };
        
        try {
            transaction = await sequelize.transaction();

            /* UPDATE ZSequelize */
            let level_result = await ZSequelize.updateValues(level_value, level_where, "DriverLevelModel", transaction);

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

    insertDriverLevel: async function(req, res){
        /* BODY */
        let name = req.body.name;
        let description = req.body.description;

        /* VALIDATION */
        /* PARAMETER ZSequelize */
		let validation_field = ['*'];
		let validation_where = {
			name: name
		};

		let validation_orderBy = [['id', 'DESC']];
		let validation_groupBy = false;
		let validation_model = 'DriverLevelModel';

		/* FETCH ZSequelize */
		let validation_accountData = await ZSequelize.fetch(false, validation_field, validation_where, validation_orderBy, validation_groupBy, validation_model);

		if (validation_accountData.dataValues != null) {
			return res.status(409).json({
                result : false,
				message: "FAIL {already registered}"
			});
        }

        /* PARAMETER ZSequelize  */
        let level_value = {
            name: name,
            description: description
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            let level_result = await ZSequelize.insertValues(level_value, "DriverLevelModel", transaction);

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

    deleteDriverLevel: async function(req, res){
        /* PARAMS */
        let levelid = req.params.levelid;

        let level_where = {
            id: levelid
        };

        /* UPDATE ZSequelize */
        let level_result = await ZSequelize.destroyValues(level_where, "DriverLevelModel");

        if (level_result) {
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
}