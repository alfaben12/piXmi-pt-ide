const ZSequelize = require('../libraries/ZSequelize');
const sequelize = require('../config/db');

module.exports = {
    getTransportationType: async function(req, res){
        let field = ['*'];
        let where = false;
        let orderBy = false;
        let groupBy = false;
        let model = 'TransportationTypeModel'

        let transportation_type_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (transportation_type_result.result) {
			return res.status(200).json({
				result : true,
                message : 'OK',
				data: transportation_type_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'Gagal, Transportation Type tidak ditemukan'
			});
		}
    },

    detailTransportationType: async function(req, res){
        let transportationtypeid = req.params.transportationtypeid;

        let field = ['*'];
        let where = {
            id: transportationtypeid
        };
        let orderBy = false;
        let groupBy = false;
        let model = 'TransportationTypeModel'

        let transportation_type_result = await ZSequelize.fetch(false, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (transportation_type_result.result) {
			return res.status(200).json({
                result : true,
                message : 'OK',
				data: transportation_type_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'Gagal, Transportation Type tidak ditemukan'
			});
		}
    },

    updateTransportationType: async function(req, res){
        /* PARAMS */
        let transportationtypeid = req.params.transportationtypeid;

        let name = req.body.name;
        let limit = req.body.limit;
        let description = req.body.description;

        /* PARAMETER ZSequelize  */
        let transportation_type_value = {
            name: name,
            limit: limit,
            description: description
        }

        let transportation_type_where = {
            id: transportationtypeid
        };
        
        try {
            transaction = await sequelize.transaction();

            /* UPDATE ZSequelize */
            let transportation_type_result = await ZSequelize.updateValues(transportation_type_value, transportation_type_where, "TransportationTypeModel", transaction);

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

    insertTransportationType: async function(req, res){
        /* BODY */
        let name = req.body.name;
        let limit = req.body.limit;
        let description = req.body.description;

        /* VALIDATION */
        /* PARAMETER ZSequelize */
		let validation_field = ['*'];
		let validation_where = {
			name: name
		};

		let validation_orderBy = [['id', 'DESC']];
		let validation_groupBy = false;
		let validation_model = 'TransportationTypeModel';

		/* FETCH ZSequelize */
		let validation_accountData = await ZSequelize.fetch(false, validation_field, validation_where, validation_orderBy, validation_groupBy, validation_model);

		if (validation_accountData.dataValues != null) {
			return res.status(409).json({
                result : false,
				message: "Maaf, Transporation Type sudah terdaftar"
			});
        }

        /* PARAMETER ZSequelize  */
        let transportation_type_value = {
            name: name,
            limit: limit,
            description: description
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            let transportation_type_result = await ZSequelize.insertValues(transportation_type_value, "TransportationTypeModel", transaction);

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

    deleteTransportationType: async function(req, res){
        /* PARAMS */
        let transportationtypeid = req.params.transportationtypeid;

        let transportation_type_where = {
            id: transportationtypeid
        };

        /* UPDATE ZSequelize */
        let transportation_type_result = await ZSequelize.destroyValues(transportation_type_where, "TransportationTypeModel");

        if (transportation_type_result) {
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