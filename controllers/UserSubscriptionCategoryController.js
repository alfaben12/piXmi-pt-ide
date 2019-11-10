const ZSequelize = require('../libraries/ZSequelize');
const GlobalHelper = require('../helpers/GlobalHelper');
const sequelize = require('../config/db');
const Op = require('sequelize').Op;
const moment = require('moment');

module.exports = {
    getUSC: async function(req, res){
        let field = ['*'];
        let where = false;
        let orderBy = false;
        let groupBy = false;
        let model = 'UserSubscriptionCategoryModel'
        
        let usc_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);
        
        /* FETCTH RESULT & CONDITION & RESPONSE */
        if (usc_result.result) {
            return res.status(200).json({
                result : true,
                message : 'OK',
                data: usc_result.dataValues
            });
        }else{
            return res.status(404).json({
                result : false,
                message : 'FAIL'
            });
        }
    },
    
    detailUSC: async function(req, res){
        let uscid = req.params.uscid;
        
        let field = ['*'];
        let where = {
            id: uscid
        };
        let orderBy = false;
        let groupBy = false;
        let model = 'UserSubscriptionCategoryModel'
        
        let usc_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);
        
        /* FETCTH RESULT & CONDITION & RESPONSE */
        if (usc_result.result) {
            return res.status(200).json({
                result : true,
                message : 'OK',
                data: usc_result.dataValues
            });
        }else{
            return res.status(404).json({
                result : false,
                message : 'FAIL'
            });
        }
    },
    
    updateUSC: async function(req, res){
        /* PARAMS */
        let uscid = req.params.uscid;
        
        let name = req.body.name;
        let description = req.body.description;
        
        /* PARAMETER ZSequelize  */
        let usc_value = {
            name: name,
            description: description
        }
        
        let usc_where = {
            id: uscid
        };
        
        try {
            transaction = await sequelize.transaction();
            
            /* UPDATE ZSequelize */
            let usc_result = await ZSequelize.updateValues(usc_value, usc_where, "UserSubscriptionCategoryModel", transaction);
            
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
    
    insertUSC: async function(req, res){
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
        let validation_model = 'UserSubscriptionCategoryModel';
        
        /* FETCH ZSequelize */
        let validation_accountData = await ZSequelize.fetch(false, validation_field, validation_where, validation_orderBy, validation_groupBy, validation_model);
        
        if (validation_accountData.dataValues != null) {
            return res.status(409).json({
                result : false,
                message: "FAIL {already registered}"
            });
        }
        
        /* PARAMETER ZSequelize  */
        let usc_value = {
            name: name,
            description: description
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            let usc_result = await ZSequelize.insertValues(usc_value, "UserSubscriptionCategoryModel", transaction);
            
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
    
    deleteUSC: async function(req, res){
        /* PARAMS */
        let uscid = req.params.uscid;
        
        let usc_where = {
            id: uscid
        };
        
        /* UPDATE ZSequelize */
        let usc_result = await ZSequelize.destroyValues(usc_where, "UserSubscriptionCategoryModel");
        
        if (usc_result) {
            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(201).json({
                result : true,
                message : 'OK'
            });
        } else {
            return res.status(400).json({
                result : false,
                message : err
            });
        }
    }
}