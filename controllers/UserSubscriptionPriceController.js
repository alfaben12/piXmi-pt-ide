const ZSequelize = require('../libraries/ZSequelize');
const GlobalHelper = require('../helpers/GlobalHelper');
const sequelize = require('../config/db');
const Op = require('sequelize').Op;
const moment = require('moment');

module.exports = {
    getUSP: async function(req, res){
        let field = ['*'];
        let where = false;
        let orderBy = false;
        let groupBy = false;
        let model = 'UserSubscriptionPriceModel'
        let joins = [
            [
                {
                    'fromModel' : 'UserSubscriptionPriceModel',
                    'fromKey' : 'user_subscription_categoryid',
                    'bridgeType' : 'belongsTo',
                    'toModel' : 'UserSubscriptionCategoryModel',
                    'toKey' : 'id',
                    'attributes' : ['*'],
                    'required': true
                }
            ],
        ];
        let usp_result = await ZSequelize.fetchJoins(true, field, where, orderBy, groupBy, model, joins);
        
        /* FETCTH RESULT & CONDITION & RESPONSE */
        if (usp_result.result) {
            return res.status(200).json({
                result : true,
                message : 'OK',
                data: usp_result.dataValues
            });
        }else{
            return res.status(404).json({
                result : false,
                message : 'FAIL'
            });
        }
    },
    
    detailUSP: async function(req, res){
        let uspid = req.params.uspid;
        
        let field = ['*'];
        let where = {
            id: uspid
        };
        let orderBy = false;
        let groupBy = false;
        let model = 'UserSubscriptionPriceModel'
        let joins = [
            [
                {
                    'fromModel' : 'UserSubscriptionPriceModel',
                    'fromKey' : 'user_subscription_categoryid',
                    'bridgeType' : 'belongsTo',
                    'toModel' : 'UserSubscriptionCategoryModel',
                    'toKey' : 'id',
                    'attributes' : ['*'],
                    'required': true
                }
            ],
        ];
        let usp_result = await ZSequelize.fetchJoins(false, field, where, orderBy, groupBy, model, joins);
        
        /* FETCTH RESULT & CONDITION & RESPONSE */
        if (usp_result.result) {
            return res.status(200).json({
                result : true,
                message : 'OK',
                data: usp_result.dataValues
            });
        }else{
            return res.status(404).json({
                result : false,
                message : 'FAIL'
            });
        }
    },
    
    updateUSP: async function(req, res){
        /* PARAMS */
        let uspid = req.params.uspid;
        
        let user_subscription_categoryid = req.body.user_subscription_categoryid;
        let type = req.body.type;
        let price = req.body.price;
        let name = req.body.name;
        let day_expired = req.body.day_expired;
        
        /* PARAMETER ZSequelize  */
        let usp_value = {
            user_subscription_categoryid: user_subscription_categoryid,
            type: type,
            price: price,
            name: name,
            day_expired: day_expired
        }
        
        let usp_where = {
            id: uspid
        };
        
        try {
            transaction = await sequelize.transaction();
            
            /* UPDATE ZSequelize */
            let usp_result = await ZSequelize.updateValues(usp_value, usp_where, "UserSubscriptionPriceModel", transaction);
            
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
    
    insertUSP: async function(req, res){
        /* BODY */
        let user_subscription_categoryid = req.body.user_subscription_categoryid;
        let type = req.body.type;
        let price = req.body.price;
        let name = req.body.name;
        let day_expired = req.body.day_expired;

        /* VALIDATION */
        /* PARAMETER ZSequelize */
        let validation_field = ['*'];
        let validation_where = {
            user_subscription_categoryid: user_subscription_categoryid,
            type: type
        };
        
        let validation_orderBy = [['id', 'DESC']];
        let validation_groupBy = false;
        let validation_model = 'UserSubscriptionPriceModel';
        
        /* FETCH ZSequelize */
        let validation_accountData = await ZSequelize.fetch(false, validation_field, validation_where, validation_orderBy, validation_groupBy, validation_model);
        
        if (validation_accountData.dataValues != null) {
            return res.status(409).json({
                result : false,
                message: "FAIL {already registered}"
            });
        }
        
        /* PARAMETER ZSequelize  */
        let usp_value = {
            user_subscription_categoryid: user_subscription_categoryid,
            type: type,
            price: price,
            name: name,
            day_expired: day_expired
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            let usp_result = await ZSequelize.insertValues(usp_value, "UserSubscriptionPriceModel", transaction);
            
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
    
    deleteUSP: async function(req, res){
        /* PARAMS */
        let uspid = req.params.uspid;
        
        let usp_where = {
            id: uspid
        };
        
        /* UPDATE ZSequelize */
        let usp_result = await ZSequelize.destroyValues(usp_where, "UserSubscriptionPriceModel");
        
        if (usp_result) {
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