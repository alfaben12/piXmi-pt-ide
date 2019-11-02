const ZSequelize = require('../libraries/ZSequelize');
const GlobalHelper = require('../helpers/GlobalHelper');
const sequelize = require('../config/db');
const Op = require('sequelize').Op;
const moment = require('moment');

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
            return res.status(409).json({
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
    
    generatesInsertVoucher: async function(req, res){
        /* BODY */
        let limit = req.body.limit;
        let description = req.body.description;
        let many = parseInt(req.body.many, 10);
        let day = moment().format("DD");
        let month = moment().format("MM");
        let year = moment().format("YYYY");

        /* PARAMETER ZSequelize */
        let validation_day_field = ['*'];
        let validation_day_where = {
            [Op.and]: [
                sequelize.where(sequelize.fn('day', sequelize.col("createdAt")), day),
                sequelize.where(sequelize.fn('month', sequelize.col("createdAt")), month),
                sequelize.where(sequelize.fn('year', sequelize.col("createdAt")), year),
            ]
        };
        
        let validation_day_orderBy = [['id', 'DESC']];
        let validation_day_groupBy = false;
        let validation_day_model = 'VoucherModel';
        
        /* FETCH ZSequelize */
        let validation_day_voucher = await ZSequelize.fetch(false, validation_day_field, validation_day_where, validation_day_orderBy, validation_day_groupBy, validation_day_model);
        
        if (validation_day_voucher.dataValues != null) {
            return res.status(409).json({
                result : false,
                message: "FAIL {already registered voucher today}"
            });
        }

        let count = 0;
        for (let i = 0; i < many; i++) {
            let name = await GlobalHelper.randomCharacterVoucher(10);
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
                return res.status(409).json({
                    result : false,
                    message: "FAIL {already registered, success count "+ count +"}"
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
                
                count = count + 1;
            } catch (err) {
                await transaction.rollback();
            }
        }
        /* FETCTH RESULT & CONDITION & RESPONSE */
        return res.status(201).json({
            result : true,
            message : 'OK'
        });
    },

    getVoucherUsed: async function(req, res){
        let field = ['*'];
        let where = false;
        let orderBy = false;
        let groupBy = false;
        let model = 'VoucherUsedModel'
        
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

    getVoucherRemaining: async function(req, res){
        /* params */
        let voucherid = req.params.voucherid;

        let field = ['*'];
        let where = {
            id: voucherid
        };
        let orderBy = false;
        let groupBy = false;
        let model = 'VoucherModel'
        
        let voucher_result = await ZSequelize.fetch(false, field, where, orderBy, groupBy, model);

        let used_field = ['*'];
        let used_where = {
            voucherid: voucherid
        };
        let used_orderBy = false;
        let used_groupBy = false;
        let used_model = 'VoucherUsedModel'
        
        let voucher_used_result = await ZSequelize.fetch(true, used_field, used_where, used_orderBy, used_groupBy, used_model);
        
        let remaining = voucher_result.dataValues.limit - voucher_used_result.dataValues.length;
        
        /* FETCTH RESULT & CONDITION & RESPONSE */
        if (voucher_result.result) {
            return res.status(200).json({
                result : true,
                message : 'OK',
                data: {
                    voucher: voucher_result.dataValues,
                    remaining: remaining
                }
            });
        }else{
            return res.status(404).json({
                result : false,
                message : 'FAIL'
            });
        }
    },
}