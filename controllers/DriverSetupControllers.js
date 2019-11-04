const AccountHelper = require('../helpers/AccountHelper');
const ZSequelize = require('../libraries/ZSequelize');
const sequelize = require('../config/db');

module.exports = {
    setupDriver: async function(req, res){
        /* PARAMS */
        let driverid = req.params.driverid;
        let adminid = req.payload.accountid;
        
        let limit_balance = req.body.limit_balance;
        let limit_point = req.body.limit_point;
        let limit_withdraw = req.body.limit_withdraw;
        let min_distance = req.body.min_distance;
        
        /* PARAMETER ZSequelize  */
        let driver_value = {
            driverid: driverid,
            adminid: adminid,
            limit_balance: limit_balance,
            limit_point: limit_point,
            limit_withdraw: limit_withdraw,
            min_distance: min_distance
        }
        
        let driver_where = {
            driverid: driverid
        };
        
        let driverAccount = await AccountHelper.getDriverAccount(driverid);
        let driver_setup = driverAccount.dataValues.driver_setup;
        
        try {
            transaction = await sequelize.transaction();
            
            /* DECICION ins/update ZSequelize */
            if (driver_setup == null) {
                await ZSequelize.insertValues(driver_value, "DriverSetupModel", transaction);
            }else{
                await ZSequelize.updateValues(driver_value, driver_where, "DriverSetupModel", transaction);
            }
            
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
    
    insertCost: async function(req, res){
        /* PARAMS */
        let driverid = req.params.driverid;
        let adminid = req.payload.accountid;
        
        /* BODY */
        let from_hour = req.body.from_hour;
        let to_hour = req.body.to_hour;
        let price = req.body.price;
        let point = req.body.point;
        
        /* VALIDATION */
        /* PARAMETER ZSequelize */
        let validation_field = ['*'];
        let validation_where = {
            driverid: driverid,
            from_hour: from_hour,
            to_hour: to_hour
        };
        
        let validation_orderBy = [['id', 'DESC']];
        let validation_groupBy = false;
        let validation_model = 'DriverSetupCostModel';
        
        /* FETCH ZSequelize */
        let validation_accountData = await ZSequelize.fetch(false, validation_field, validation_where, validation_orderBy, validation_groupBy, validation_model);
        
        if (validation_accountData.dataValues != null) {
            return res.status(409).json({
                result : false,
                message: "FAIL {data duplicate}"
            });
        }
        
        /* PARAMETER ZSequelize  */
        let driver_value = {
            driverid: driverid,
            adminid: adminid,
            from_hour: from_hour,
            to_hour: to_hour,
            price: price,
            point: point
        }
        
        try {
            transaction = await sequelize.transaction();
            
            /* INSERT ZSequelize */
            await ZSequelize.insertValues(driver_value, "DriverSetupCostModel", transaction);
            
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
    
    updateCost: async function(req, res){
        /* PARAMS */
        let driversetupid = req.params.driversetupid;
        let driverid = req.params.driverid;
        
        /* BODY */
        let from_hour = req.body.from_hour;
        let to_hour = req.body.to_hour;
        let price = req.body.price;
        let point = req.body.point;
        
        /* PARAMETER ZSequelize  */
        let driver_value = {
            from_hour: from_hour,
            to_hour: to_hour,
            price: price,
            point: point
        }
        
        let driver_where = {
            id: driversetupid,
            driverid: driverid
        };
        
        try {
            transaction = await sequelize.transaction();
            
            /* INSERT ZSequelize */
            await ZSequelize.updateValues(driver_value, driver_where, "DriverSetupCostModel", transaction);
            
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
    },
    
    getAccountDriver: async function(req, res){
        /* JWT PAYLOAD */
        let accountid = req.params.driverid;
        
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
    
    deleteCost: async function(req, res){
        /* PARAMS */
        let driversetupid = req.params.driversetupid;
        let driverid = req.params.driverid;
        
        let driver_where = {
            id: driversetupid,
            driverid: driverid
        };
        /* UPDATE ZSequelize */
        let driver_result = await ZSequelize.destroyValues(driver_where, "DriverSetupCostModel");
        
        if (driver_result) {
            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(201).json({
                result : true,
                message : 'OK'
            });
        } else {
            return res.status(400).json({
                result : false,
                message : 'Gagal'
            });
        }
    },
}