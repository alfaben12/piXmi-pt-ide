const ZSequelize = require('../libraries/ZSequelize');
const sequelize = require('../config/db');

module.exports = {
    getVoucher: async function(req, res){
        let field = ['*'];
        let where = false;
        let orderBy = false;
        let groupBy = false;
        let model = 'VoucherModel'

        let voucher_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (voucher_result.result) {
			return res.status(200).json({
				result : true,
                message : 'OK',
				data: voucher_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },

    detailVoucher: async function(req, res){
        let voucherid = req.params.voucherid;

        let field = ['*'];
        let where = {
            id: voucherid
        };
        let orderBy = false;
        let groupBy = false;
        let model = 'VoucherModel'

        let voucher_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (voucher_result.result) {
			return res.status(200).json({
                result : true,
                message : 'OK',
				data: voucher_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },

    updateVoucher: async function(req, res){
        /* PARAMS */
        let voucherid = req.params.voucherid;

        let name = req.body.name;
        let limit = req.body.limit;
        let description = req.body.description;

        /* PARAMETER ZSequelize  */
        let voucher_value = {
            name: name,
            limit: limit,
            description: description
        }

        let voucher_where = {
            id: voucherid
        };
        
        try {
            transaction = await sequelize.transaction();

            /* UPDATE ZSequelize */
            let voucher_result = await ZSequelize.updateValues(voucher_value, voucher_where, "VoucherModel", transaction);

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

    insertVoucher: async function(req, res){
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
		let validation_model = 'VoucherModel';

		/* FETCH ZSequelize */
		let validation_accountData = await ZSequelize.fetch(false, validation_field, validation_where, validation_orderBy, validation_groupBy, validation_model);

		if (validation_accountData.dataValues != null) {
			return res.status(200).json({
                result : false,
				message: "FAIL {already registered}"
			});
        }

        /* PARAMETER ZSequelize  */
        let voucher_value = {
            name: name,
            limit: limit,
            description: description
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            let voucher_result = await ZSequelize.insertValues(voucher_value, "VoucherModel", transaction);

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

    deleteVoucher: async function(req, res){
        /* PARAMS */
        let voucherid = req.params.voucherid;

        let voucher_where = {
            id: voucherid
        };

        /* UPDATE ZSequelize */
        let voucher_result = await ZSequelize.destroyValues(voucher_where, "VoucherModel");

        if (voucher_result) {
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