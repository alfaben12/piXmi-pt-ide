const ZSequelize = require('../libraries/ZSequelize');
const sequelize = require('../config/db');

module.exports = {
    getAdminRole: async function(req, res){
        let field = ['*'];
        let where = false;
        let orderBy = false;
        let groupBy = false;
        let model = 'AdminRoleModel'

        let role_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (role_result.result) {
			return res.status(200).json({
				result : true,
                message : 'OK',
				data: role_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },

    detailAdminRole: async function(req, res){
        let roleid = req.params.roleid;

        let field = ['*'];
        let where = {
            id: roleid
        };
        let orderBy = false;
        let groupBy = false;
        let model = 'AdminRoleModel'

        let role_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (role_result.result) {
			return res.status(200).json({
                result : true,
                message : 'OK',
				data: role_result.dataValues
			});
		}else{
			return res.status(404).json({
				result : false,
                message : 'FAIL'
			});
		}
    },

    updateAdminRole: async function(req, res){
        /* PARAMS */
        let roleid = req.params.roleid;
          
        let name = req.body.name;
        let resource = '*';
        let method = '*';
        let description = req.body.description;
          
        let role_value = {
            name: name,
            resource: resource,
            method: method,
            description: description
        }

        let role_where = {
            id: roleid
        };
        
        try {
            transaction = await sequelize.transaction();

            /* UPDATE ZSequelize */
            let role_result = await ZSequelize.updateValues(role_value, role_where, "AdminRoleModel", transaction);

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

    insertAdminRole: async function(req, res){
        /* BODY */
        let name = req.body.name;
        let resource = '*';
        let method = '*';
        let description = req.body.description;

        /* VALIDATION */
        /* PARAMETER ZSequelize */
		let validation_field = ['*'];
		let validation_where = {
			name: name
		};

		let validation_orderBy = [['id', 'DESC']];
		let validation_groupBy = false;
		let validation_model = 'AdminRoleModel';

		/* FETCH ZSequelize */
		let validation_accountData = await ZSequelize.fetch(false, validation_field, validation_where, validation_orderBy, validation_groupBy, validation_model);

		if (validation_accountData.dataValues != null) {
			return res.status(409).json({
                result : false,
				message: "Gagal, Akun sudah terdaftar"
			});
        }

        /* PARAMETER ZSequelize  */
        let role_value = {
            name: name,
            resource: resource,
            method: method,
            description: description
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            let role_result = await ZSequelize.insertValues(role_value, "AdminRoleModel", transaction);

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

    deleteAdminRole: async function(req, res){
        /* PARAMS */
        let roleid = req.params.roleid;

        let role_where = {
            id: roleid
        };

        /* UPDATE ZSequelize */
        let role_result = await ZSequelize.destroyValues(role_where, "AdminRoleModel");

        if (role_result) {
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