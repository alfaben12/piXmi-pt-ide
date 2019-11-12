const ZSequelize = require('../libraries/ZSequelize');
const AccountHelper = require('../helpers/AccountHelper');
const GlobalHelper = require('../helpers/GlobalHelper');
const Op = require('sequelize').Op;
const sequelize = require('../config/db');
const moment = require('moment');

module.exports = {
    ngojek: async function(req, res){
        let hourNow = moment().format("H");
        
        /* PAYLOAD */
        let userid = req.payload.accountid;
        
        /* BODY */
        let pickup_address = req.body.pickup_address;
        let pickup_point = req.body.pickup_point;
        let destination_address = req.body.destination_address;
        let destination_point = req.body.destination_point;
        let distance = parseFloat(req.body.distance);
        let transaction_number = await GlobalHelper.generateUUID();
        
        let price = 0;
        driver_setup_cost.forEach(val => { 
            let inRange = GlobalHelper.inRange(hourNow, val.from_hour, val.to_hour);
            
            if (inRange == true) {
                price = val.price;
            }
        }); 
        
        let total = parseInt(price, 10) * distance;
        
        /* PARAMETER ZSequelize  */
        let driver_value = {
            userid: userid,
            transaction_number: transaction_number,
            pickup_address: pickup_address,
            pickup_point: pickup_point,
            destination_address: destination_address,
            destination_point: destination_point,
            distance: distance,
            total: total
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            await ZSequelize.insertValues(driver_value, "UserNgojekDriverModel", transaction);
            
            await transaction.commit();
            
            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(201).json({
                result : true,
                message : 'Pembayaran dengan voucher berhasil',
                data: payment_number
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