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
        
        /* USER ACCOUNT */
        let accountUser = await AccountHelper.getUserAccount(userid);
        let user_setup_cost = accountUser.dataValues.user_setup_costs;
        
        if (user_setup_cost.length == 0) {
            return res.status(200).json({
                result : false,
                message: "User cost belum di setup"
            });
        }
        
        let price = 0;
        user_setup_cost.forEach(val => { 
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
                message : 'Sedang mencari driver',
                data: transaction_number
            });
        } catch (err) {
            await transaction.rollback();
            return res.status(400).json({
                result : false,
                message : err
            });
        }
    },
    
    pickup: async function(req, res){
        /* JWT PAYLOAD */
        let driverid = req.payload.accountid;
        
        /* BODY */
        let transaction_number = req.body.transaction_number;
        
        let validation_payment_field = ['*'];
        let validation_payment_where = {
            transaction_number: transaction_number
        };
        
        let validation_payment_orderBy = [['id', 'DESC']];
        let validation_payment_groupBy = false;
        let validation_payment_model = 'UserNgojekDriverModel';
        
        /* FETCH ZSequelize */
        let validation_payment = await ZSequelize.fetch(false, validation_payment_field, validation_payment_where, validation_payment_orderBy, validation_payment_groupBy, validation_payment_model);
        
        if (validation_payment.dataValues === null) {
            return res.status(200).json({
                result : false,
                message: "Gagal, Transaksi dengan nomor transaksi "+ transaction_number +" tidak ditemukan"
            });
        }
        
        let transaction_value = {
            driverid: driverid,
            status: 'PICKUP'
        }
        
        let transaction_where = {
            transaction_number: transaction_number
        };
        
        try {
            transaction = await sequelize.transaction();
            
            /* UPDATE ZSequelize */
            await ZSequelize.updateValues(transaction_value, transaction_where, "UserNgojekDriverModel", transaction);
            
            await transaction.commit();
            
            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(200).json({
                result : true,
                message : 'Sedang menjemput penumpang'
            });
        } catch (err) {
            await transaction.rollback();
            return res.status(400).json({
                result : false,
                message : err
            });
        }
    },
    
    otw: async function(req, res){
        /* JWT PAYLOAD */
        let driverid = req.payload.accountid;
        
        /* BODY */
        let transaction_number = req.body.transaction_number;
        
        let validation_payment_field = ['*'];
        let validation_payment_where = {
            transaction_number: transaction_number
        };
        
        let validation_payment_orderBy = [['id', 'DESC']];
        let validation_payment_groupBy = false;
        let validation_payment_model = 'UserNgojekDriverModel';
        
        /* FETCH ZSequelize */
        let validation_payment = await ZSequelize.fetch(false, validation_payment_field, validation_payment_where, validation_payment_orderBy, validation_payment_groupBy, validation_payment_model);
        
        if (validation_payment.dataValues === null) {
            return res.status(200).json({
                result : false,
                message: "Gagal, Transaksi dengan nomor transaksi "+ transaction_number +" tidak ditemukan"
            });
        }
        
        let transaction_value = {
            status: 'OTW'
        }
        
        let transaction_where = {
            driverid: driverid,
            transaction_number: transaction_number
        };
        
        try {
            transaction = await sequelize.transaction();
            
            /* UPDATE ZSequelize */
            await ZSequelize.updateValues(transaction_value, transaction_where, "UserNgojekDriverModel", transaction);
            
            await transaction.commit();
            
            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(200).json({
                result : true,
                message : 'Sedang mengantarkan penumpang'
            });
        } catch (err) {
            await transaction.rollback();
            return res.status(400).json({
                result : false,
                message : err
            });
        }
    },
    
    finish: async function(req, res){
        /* JWT PAYLOAD */
        let driverid = req.payload.accountid;
        
        /* BODY */
        let transaction_number = req.body.transaction_number;

        let validation_payment_field = ['*'];
        let validation_payment_where = {
            transaction_number: transaction_number
        };
        
        let validation_payment_orderBy = [['id', 'DESC']];
        let validation_payment_groupBy = false;
        let validation_payment_model = 'UserNgojekDriverModel';
        
        /* FETCH ZSequelize */
        let validation_payment = await ZSequelize.fetch(false, validation_payment_field, validation_payment_where, validation_payment_orderBy, validation_payment_groupBy, validation_payment_model);
        
        if (validation_payment.dataValues === null) {
            return res.status(200).json({
                result : false,
                message: "Gagal, Transaksi dengan nomor transaksi "+ transaction_number +" tidak ditemukan"
            });
        }

        if (validation_payment.dataValues.status == 'FINISH') {
            return res.status(200).json({
                result : false,
                message: "Gagal, Transaksi dengan nomor transaksi "+ transaction_number +" telah selesai"
            });
        }

        let ngojekid = validation_payment.dataValues.id;
        let userid = validation_payment.dataValues.userid;
        let total = parseInt(validation_payment.dataValues.total, 10);

        let mutation_value = {
            ngojekid: ngojekid,
            driverid: driverid,
            userid: userid,
            debit: total,
            payment_type: 'CASH'
        };

        let transaction_value = {
            status: 'FINISH'
        };
        
        let transaction_where = {
            driverid: driverid,
            transaction_number: transaction_number
        };
        
        try {
            transaction = await sequelize.transaction();
            
            /* UPDATE ZSequelize */
            await ZSequelize.updateValues(transaction_value, transaction_where, "UserNgojekDriverModel", transaction);
            await ZSequelize.insertValues(mutation_value, "UserMutationModel", transaction);
            await ZSequelize.insertValues(mutation_value, "DriverMutationModel", transaction);
            
            await transaction.commit();
            
            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(200).json({
                result : true,
                message : 'Berhasil, penumpang berhasil diantar'
            });
        } catch (err) {
            await transaction.rollback();
            return res.status(400).json({
                result : false,
                message : err
            });
        }
    },

    userAct: async function(req, res){
        /* JWT PAYLOAD */
        let userid = req.payload.accountid;
        
        /* BODY */
        let transaction_number = req.body.transaction_number;
        let status = req.body.status;
        
        let validation_payment_field = ['*'];
        let validation_payment_where = {
            transaction_number: transaction_number
        };
        
        let validation_payment_orderBy = [['id', 'DESC']];
        let validation_payment_groupBy = false;
        let validation_payment_model = 'UserNgojekDriverModel';
        
        /* FETCH ZSequelize */
        let validation_payment = await ZSequelize.fetch(false, validation_payment_field, validation_payment_where, validation_payment_orderBy, validation_payment_groupBy, validation_payment_model);
        
        if (validation_payment.dataValues === null) {
            return res.status(200).json({
                result : false,
                message: "Gagal, Transaksi dengan nomor transaksi "+ transaction_number +" tidak ditemukan"
            });
        }

        if (validation_payment.dataValues.status == 'OTW') {
            return res.status(200).json({
                result : false,
                message: "Gagal, Transaksi dengan nomor transaksi "+ transaction_number +" sedang perjalanan"
            });
        }

        if (validation_payment.dataValues.status == 'FINISH') {
            return res.status(200).json({
                result : false,
                message: "Gagal, Transaksi dengan nomor transaksi "+ transaction_number +" telah selesai"
            });
        }
        
        let transaction_value = {
            status: status,
            cancelled_by: 'USER'
        }
        
        let transaction_where = {
            userid: userid,
            transaction_number: transaction_number
        };
        
        try {
            transaction = await sequelize.transaction();
            
            /* UPDATE ZSequelize */
            await ZSequelize.updateValues(transaction_value, transaction_where, "UserNgojekDriverModel", transaction);
            
            await transaction.commit();
            
            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(200).json({
                result : true,
                message : 'Transaksi dibatalkan'
            });
        } catch (err) {
            await transaction.rollback();
            return res.status(400).json({
                result : false,
                message : err
            });
        }
    },

    driverAct: async function(req, res){
        /* JWT PAYLOAD */
        let driverid = req.payload.accountid;
        
        /* BODY */
        let transaction_number = req.body.transaction_number;
        let status = req.body.status;
        
        let validation_payment_field = ['*'];
        let validation_payment_where = {
            transaction_number: transaction_number
        };
        
        let validation_payment_orderBy = [['id', 'DESC']];
        let validation_payment_groupBy = false;
        let validation_payment_model = 'UserNgojekDriverModel';
        
        /* FETCH ZSequelize */
        let validation_payment = await ZSequelize.fetch(false, validation_payment_field, validation_payment_where, validation_payment_orderBy, validation_payment_groupBy, validation_payment_model);
        
        if (validation_payment.dataValues === null) {
            return res.status(200).json({
                result : false,
                message: "Gagal, Transaksi dengan nomor transaksi "+ transaction_number +" tidak ditemukan"
            });
        }

        if (validation_payment.dataValues.status == 'OTW') {
            return res.status(200).json({
                result : false,
                message: "Gagal, Transaksi dengan nomor transaksi "+ transaction_number +" sedang perjalanan"
            });
        }

        if (validation_payment.dataValues.status == 'FINISH') {
            return res.status(200).json({
                result : false,
                message: "Gagal, Transaksi dengan nomor transaksi "+ transaction_number +" telah selesai"
            });
        }

        if (validation_payment.dataValues.driverid === null) {
            return res.status(200).json({
                result : false,
                message: "Gagal, Transaksi dengan nomor transaksi "+ transaction_number +" tidak valid"
            });
        }
        
        let transaction_value = {
            status: status,
            cancelled_by: 'DRIVER'
        }
        
        let transaction_where = {
            driverid: driverid,
            transaction_number: transaction_number
        };
        
        try {
            transaction = await sequelize.transaction();
            
            /* UPDATE ZSequelize */
            await ZSequelize.updateValues(transaction_value, transaction_where, "UserNgojekDriverModel", transaction);
            
            await transaction.commit();
            
            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(200).json({
                result : true,
                message : 'Transaksi dibatalkan'
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