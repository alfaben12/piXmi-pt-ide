const ZSequelize = require('../libraries/ZSequelize');
const AccountHelper = require('../helpers/AccountHelper');
const GlobalHelper = require('../helpers/GlobalHelper');
const Op = require('sequelize').Op;
const sequelize = require('../config/db');

module.exports = {
    paymentWithVoucher: async function(req, res){
        /* PAYLOAD */
		let driverid = req.payload.accountid;

        /* BODY */
        let voucherid = parseInt(req.body.voucherid, 10);
		let point_destination = req.body.point_destination;
		let userid = req.body.userid;
        let total = parseInt(req.body.total, 10);
        let payment_number = await GlobalHelper.generateUUID();
          
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
				message: "FAIL {voucher not found}"
			});
        }

        let voucherLimit = validation_voucher.dataValues.limit;
        let voucherUsed = validation_voucherUsed.dataValues.length;

        if (voucherLimit <= voucherUsed) {
            return res.status(200).json({
                result : false,
				message: "FAIL {voucher limited}"
			});
        }

        /* PARAMETER ZSequelize  */
        let driver_value = {
            voucherid: voucherid,
            payment_number: payment_number,
            point_destination: point_destination,
            driverid: driverid,
            total: total
        }

        let voucher_value = {
            voucherid: voucherid,
            userid: userid,
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            await ZSequelize.insertValues(driver_value, "DriverPaymentModel", transaction);
            await ZSequelize.insertValues(voucher_value, "VoucherUsedModel", transaction);
            
            await transaction.commit();

            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(201).json({
                result : true,
                message : 'OK',
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
	
	completedPayment: async function(req, res){
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
		let validation_payment_model = 'DriverPaymentModel';

		/* FETCH ZSequelize */
        let validation_payment = await ZSequelize.fetch(false, validation_payment_field, validation_payment_where, validation_payment_orderBy, validation_payment_groupBy, validation_payment_model);
        
        if (validation_payment.dataValues === null) {
			return res.status(200).json({
                result : false,
				message: "FAIL {payment not found}"
			});
        }

        /* DRIVER ACCOUNT */
        let accountDriver = await AccountHelper.getDriverAccount(driverid);
        let driverBalance = parseInt(accountDriver.dataValues.balance, 10);
        let paymentTotal = parseInt(validation_payment.dataValues.total, 10);

        let mutation_value = {
            driverid: driverid,
            credit: 0,
            debit: paymentTotal,
            balance: driverBalance + paymentTotal
        }

        let payment_value = {
            status: 'COMPLETED'
        }
        
        let payment_where = {
            payment_number: payment_number,
            driverid: driverid
        };

        let account_value = {
            balance: driverBalance + paymentTotal
        }

        let account_where = {
            id: driverid
        };

        try {
            transaction = await sequelize.transaction();

            /* UPDATE ZSequelize */
            await ZSequelize.insertValues(mutation_value, "DriverMutationModel", transaction);
            await ZSequelize.updateValues(payment_value, payment_where, "DriverPaymentModel", transaction);
            await ZSequelize.updateValues(account_value, account_where, "DriverModel", transaction);

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