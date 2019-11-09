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
    }
}