const ZSequelize = require('../libraries/ZSequelize');
const AccountHelper = require('../helpers/AccountHelper');
const GlobalHelper = require('../helpers/GlobalHelper');
const Op = require('sequelize').Op;
const sequelize = require('../config/db');
const moment = require('moment');

module.exports = {
    paymentWithVoucher: async function(req, res){
        let hourNow = moment().format("H");

        /* PAYLOAD */
		let driverid = req.payload.accountid;

        /* BODY */
        let voucherid = parseInt(req.body.voucherid, 10);
		let point_destination = req.body.point_destination;
		let point_pickup = req.body.point_pickup;
        let userid = 1;
        let distance = parseFloat(req.body.distance);
        let payment_number = await GlobalHelper.generateUUID();
        let address_destination = req.body.address_destination;
          
        /* VALIDATION */
        /* PARAMETER ZSequelize */
		let validation_voucherUsed_field = ['*'];
		let validation_voucherUsed_where = {
			voucherid: voucherid
		};

		let validation_voucherUsed_orderBy = [['id', 'DESC']];
		let validation_voucherUsed_groupBy = false;
		let validation_voucherUsed_model = 'VoucherUsedModel';

		/* FETCH ZSequelize */
        let validation_voucherUsed = await ZSequelize.fetch(true, validation_voucherUsed_field, validation_voucherUsed_where, validation_voucherUsed_orderBy, validation_voucherUsed_groupBy, validation_voucherUsed_model);
        
        let validation_voucher_field = ['*'];
		let validation_voucher_where = {
			id: voucherid
		};

		let validation_voucher_orderBy = [['id', 'DESC']];
		let validation_voucher_groupBy = false;
		let validation_voucher_model = 'VoucherModel';

		/* FETCH ZSequelize */
		let validation_voucher = await ZSequelize.fetch(false, validation_voucher_field, validation_voucher_where, validation_voucher_orderBy, validation_voucher_groupBy, validation_voucher_model);

        if (validation_voucher.dataValues === null) {
			return res.status(200).json({
                result : false,
				message: "Gagal, voucher tidak ditemukan"
			});
        }

        let voucherLimit = validation_voucher.dataValues.limit;
        let voucherUsed = validation_voucherUsed.dataValues.length;

        if (voucherLimit <= voucherUsed) {
            return res.status(200).json({
                result : false,
				message: "Maaf, voucher sudah terpakai semua"
			});
        }

        /* DRIVER ACCOUNT */
        let accountDriver = await AccountHelper.getDriverAccount(driverid);
        let driver_setup = accountDriver.dataValues.driver_setup;

        if (driver_setup == null) {
            return res.status(200).json({
                result : false,
				message: "Driver belum di setup"
			});
        }
        
        let driver_setup_cost = accountDriver.dataValues.driver_setup_costs;
        
        if (driver_setup_cost.length == 0 || driver_setup_cost == null) {
            return res.status(404).json({
                result : true,
                message : 'Gagal, Driver Cost belum disetting'
            });
        }

        let minDistance = parseFloat(accountDriver.dataValues.driver_setup.min_distance, 10);
        if (distance < minDistance) {
            return res.status(200).json({
                result : false,
				message: "Maaf, jarak minimum adalah "+ minDistance +"KM"
			});
        }
        
        let dataShelter = accountDriver.dataValues.shelter;
        if (dataShelter == null) {
            return res.status(401).json({
                result : false,
				message: "Gagal, Data Shelter Driver belum ada"
			});
        }

        let dataLevel = accountDriver.dataValues.driver_level;

        if (dataLevel == null) {
            return res.status(401).json({
                result : false,
				message: "Gagal, Data Level Driver tidak ada"
			});
        }

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
            voucherid: voucherid,
            payment_number: payment_number,
            point_destination: point_destination,
            point_pickup: point_pickup,
            driverid: driverid,
            total: total,
            distance: distance,
            address_destination: address_destination
        }

        let voucher_value = {
            voucherid: voucherid,
            userid: 1,
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            await ZSequelize.insertValues(driver_value, "DriverPaymentVoucherModel", transaction);
            await ZSequelize.insertValues(voucher_value, "VoucherUsedModel", transaction);
            
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
	},
	
	finishPayment: async function(req, res){
        let hourNow = moment().format("H");

		/* JWT PAYLOAD */
        let driverid = req.payload.accountid;
		
        /* BODY */
        let payment_number = req.body.payment_number;

        let validation_payment_field = ['*'];
		let validation_payment_where = {
			payment_number: payment_number
		};

		let validation_payment_orderBy = [['id', 'DESC']];
		let validation_payment_groupBy = false;
		let validation_payment_model = 'DriverPaymentVoucherModel';

		/* FETCH ZSequelize */
        let validation_payment = await ZSequelize.fetch(false, validation_payment_field, validation_payment_where, validation_payment_orderBy, validation_payment_groupBy, validation_payment_model);
        
        if (validation_payment.dataValues === null) {
			return res.status(200).json({
                result : false,
				message: "Gagal, Pembayaran dengan nomor transaksi "+ payment_number +" tidak ditemukan"
			});
        }

        /* DRIVER ACCOUNT */
        let accountDriver = await AccountHelper.getDriverAccount(driverid);
        let driver_setup_cost = accountDriver.dataValues.driver_setup_costs;

        let point = 0;
        driver_setup_cost.forEach(val => { 
            let inRange = GlobalHelper.inRange(hourNow, val.from_hour, val.to_hour);

            if (inRange == true) {
                point = val.point;
            }
        }); 

        let driverPoint = point;

        let mutation_value = {
            driverid: driverid,
            credit: 0,
            debit: 1,
            point: driverPoint
        }


        let payment_value = {
            status: 'FINISH'
        }
        
        let payment_where = {
            payment_number: payment_number,
            driverid: driverid
        };

        let account_value = {
            point: accountDriver.dataValues.point + driverPoint
        }

        let account_where = {
            id: driverid
        };

        try {
            transaction = await sequelize.transaction();

            /* UPDATE ZSequelize */
            await ZSequelize.insertValues(mutation_value, "DriverMutationPointModel", transaction);
            await ZSequelize.updateValues(payment_value, payment_where, "DriverPaymentVoucherModel", transaction);
            await ZSequelize.updateValues(account_value, account_where, "DriverModel", transaction);

            await transaction.commit();

            /* FETCTH RESULT & CONDITION & RESPONSE */
			return res.status(200).json({
                result : true,
                message : 'Berhasil, menyelesaikan pembayaran'
            });
        } catch (err) {
            await transaction.rollback();
            return res.status(400).json({
                result : false,
                message : err
            });
        }
    },
    
    getMutationPoint: async function(req, res){
		let driverid = req.payload.accountid;

        let field = ['*'];
        let where = {
            driverid: driverid
        };
        let orderBy = [['id', 'DESC']];
        let groupBy = false;
        let model = 'DriverMutationPointModel'

        let payment_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (payment_result.result) {
			return res.status(200).json({
                result : true,
                message : 'OK',
				data: payment_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'Gagal, Mutasi Point tidak ada'
			});
		}
    },

    getDriverPayment: async function(req, res){
		let driverid = req.payload.accountid;

        let field = ['*'];
        let where = {
            driverid: driverid
        };
        let orderBy = [['id', 'DESC']];
        let groupBy = false;
        let model = 'DriverPaymentVoucherModel'

        let payment_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (payment_result.result) {
			return res.status(200).json({
                result : true,
                message : 'OK',
				data: payment_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'Gagal, Pembayaran tidak ada'
			});
		}
    },

    getDriverPaymentByTransactionNumber: async function(req, res){
		let driverid = req.payload.accountid;
		let payment_number = req.params.payment_number;

        let field = ['*'];
        let where = {
            driverid: driverid,
            payment_number: payment_number
        };
        let orderBy = [['id', 'DESC']];
        let groupBy = false;
        let model = 'DriverPaymentVoucherModel'

        let payment_result = await ZSequelize.fetch(false, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (payment_result.result) {
			return res.status(200).json({
                result : true,
                message : 'OK',
				data: payment_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'Gagal, pembayaran dengan no transaksi '+ payment_number + ' tidak ditemukan' 
			});
		}
    },

    getDriverPaymentTotal: async function(req, res){
        let hourNow = moment().format("H");

		let driverid = req.payload.accountid;
		let distance = parseFloat(req.body.distance);

        /* DRIVER ACCOUNT */
        let accountDriver = await AccountHelper.getDriverAccount(driverid);
        let driver_setup_cost = accountDriver.dataValues.driver_setup_costs;
        
        let minDistance = parseFloat(accountDriver.dataValues.driver_setup.min_distance, 10);
        if (distance < minDistance) {
            return res.status(200).json({
                result : false,
				message: "Maaf, jarak minimum adalah "+ minDistance +"KM"
			});
        }
        if (driver_setup_cost.length == 0 || driver_setup_cost == null) {
            return res.status(404).json({
                result : true,
                message : 'Gagal, Driver Cost belum disetting'
            });
        }
        
        let price = 0;
        let point = 0;
        driver_setup_cost.forEach(val => { 
            let inRange = GlobalHelper.inRange(hourNow, val.from_hour, val.to_hour);

            if (inRange == true) {
                price = val.price;
                point = val.point;
            }
        }); 

        price = parseInt(price, 10) * distance;
        point = parseInt(point, 10);

	    return res.status(200).json({
            result : true,
            message : 'OK',
	    	data: {
                price: price,
                point: point
            }
	    });
    }
}
