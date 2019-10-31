const ZSequelize = require('../libraries/ZSequelize');
const sequelize = require('../config/db');

module.exports = {
    getAdmin: async function(req, res){
        let field = ['*'];
        let where = false;
        let orderBy = false;
        let groupBy = false;
        let model = 'AdminModel'

        let admin_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (admin_result.result) {
			return res.status(200).json({
				result : true,
                message : 'OK',
				data: admin_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },

    detailAdmin: async function(req, res){
        let adminid = req.params.adminid;

        let field = ['*'];
        let where = {
            id: adminid
        };
        let orderBy = false;
        let groupBy = false;
        let model = 'AdminModel'

        let admin_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (admin_result.result) {
			return res.status(200).json({
                result : true,
                message : 'OK',
				data: admin_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },

    updateAdmin: async function(req, res){
        /* PARAMS */
        let adminid = req.params.adminid;

        let roleid = req.body.roleid;
        let shelterid = req.body.shelterid;
        let name = req.body.name;
        let address = req.body.address;
        let phone = req.body.phone;
        let username = req.body.username;
        let password = req.body.password;
          
        let admin_value = {
            roleid: roleid,
            shelterid: shelterid,
            name: name,
            address: address,
            phone: phone,
            username: username,
            password: password
        }

        let admin_where = {
            id: adminid
        };
        
        try {
            transaction = await sequelize.transaction();

            /* UPDATE ZSequelize */
            let admin_result = await ZSequelize.updateValues(admin_value, admin_where, "AdminModel", transaction);

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

    insertAdmin: async function(req, res){
        /* BODY */
        let roleid = req.body.roleid;
        let shelterid = req.body.shelterid;
        let name = req.body.name;
        let address = req.body.address;
        let phone = req.body.phone;
        let username = req.body.username;
        let password = req.body.password;

        /* VALIDATION */
        /* PARAMETER ZSequelize */
		let validation_field = ['*'];
		let validation_where = {
			shelterid: shelterid,
			username: username
		};

		let validation_orderBy = [['id', 'DESC']];
		let validation_groupBy = false;
		let validation_model = 'AdminModel';

		/* FETCH ZSequelize */
		let validation_accountData = await ZSequelize.fetch(false, validation_field, validation_where, validation_orderBy, validation_groupBy, validation_model);

		if (validation_accountData.dataValues != null) {
			return res.status(409).json({
                result : false,
				message: "Gagal, Akun sudah terdaftar"
			});
        }

        /* PARAMETER ZSequelize  */
        let admin_value = {
            roleid: roleid,
            shelterid: shelterid,
            name: name,
            address: address,
            phone: phone,
            username: username,
            password: password
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            let admin_result = await ZSequelize.insertValues(admin_value, "AdminModel", transaction);

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

    deleteAdmin: async function(req, res){
        /* PARAMS */
        let adminid = req.params.adminid;

        let admin_where = {
            id: adminid
        };

        /* UPDATE ZSequelize */
        let admin_result = await ZSequelize.destroyValues(admin_where, "AdminModel");

        if (admin_result) {
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
    }
}