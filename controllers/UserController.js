const ZSequelize = require('../libraries/ZSequelize');
const sequelize = require('../config/db');
const AccountHelper = require('../helpers/AccountHelper');

module.exports = {
    verifyUser: async function(req, res){
        /* JWT PAYLOAD */
        let accountid = req.payload.accountid;
        
        /* BODY */
        let token = req.body.token;
        
        let account = await AccountHelper.getUserAccount(accountid);
        let user_token = account.dataValues.token;
        
        if (token != user_token) {
            return res.status(201).json({
                result : false,
                message : 'Gagal, Token tidak valid'
            });
        }
        
        /* PARAMETER ZSequelize  */
        let user_value = {
            is_verify: 1
        }
        
        let user_where = {
            id: accountid
        };
        
        try {
            transaction = await sequelize.transaction();
            
            /* UPDATE ZSequelize */
            let user_result = await ZSequelize.updateValues(user_value, user_where, "UserModel", transaction);
            
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

    USS: async function(req, res){
        /* PARAMS */
        let userid = req.payload.accountid;
        let dropoffAt = req.body.dropoffAt;
        let pickupAt = req.body.pickupAt;
        let dropoff_address = req.body.dropoff_address;
        let dropoff_point = req.body.dropoff_point;
        let pickup_address = req.body.pickup_address;
        let pickup_point = req.body.pickup_point;
        
        /* PARAMETER ZSequelize  */
        let user_value = {
            userid: userid,
            dropoffAt: dropoffAt,
            pickupAt: pickupAt,
            dropoff_address: dropoff_address,
            dropoff_point: dropoff_point,
            pickup_address: pickup_address,
            pickup_point: pickup_point
        }
        
        let user_where = {
            userid: userid
        };
        
        let userAccount = await AccountHelper.getUserAccount(userid);
        let user_subscription_setup = userAccount.dataValues.user_subscription_setup;
        
        try {
            transaction = await sequelize.transaction();
            
            /* DECICION ins/update ZSequelize */
            if (user_subscription_setup == null) {
                await ZSequelize.insertValues(user_value, "UserSubscriptionSetupModel", transaction);
            }else{
                await ZSequelize.updateValues(user_value, user_where, "UserSubscriptionSetupModel", transaction);
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
}