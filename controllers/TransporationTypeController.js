module.exports = {
    getCategories: async function(req, res){
        let field = ['*'];
        let where = false;
        let orderBy = false;
        let groupBy = false;
        let model = 'TransporationTypeModel'

        let transporation_type_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (transporation_type_result.result) {
			return res.status(200).json({
				result : transporation_type_result.result,
				data: {
					code: 200,
					message: "Success fetch data.",
					datas: transporation_type_result.dataValues
				}
			});
		}else{
			return res.status(404).json({
				result : transporation_type_result.result,
				data:{
					code: 404,
					message: "Data does not exist ."
				},
			});
		}
    },

    processGetDetailProduct: async function(req, res){
        let transporation_typeid = req.params.transporation_typeid;

        let field = ['*'];
        let where = {
            id: transporation_typeid
        };
        let orderBy = false;
        let groupBy = false;
        let model = 'TransporationTypeModel'

        let transporation_type_result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);

        /* FETCTH RESULT & CONDITION & RESPONSE */
		if (transporation_type_result.result) {
			return res.status(200).json({
				result : transporation_type_result.result,
				data: {
					code: 200,
					message: "Success fetch data.",
					datas: transporation_type_result.dataValues
				}
			});
		}else{
			return res.status(404).json({
				result : transporation_type_result.result,
				data:{
					code: 404,
					message: "Data does not exist ."
				},
			});
		}
    },

    updateProduct: async function(req, res){
        /* JWT PAYLOAD */
        let transporation_typeid = req.params.transporation_typeid;

        /* BODY */
        let name = req.body.name;

        /* PARAMETER ZSequelize  */
        let transporation_type_value = {
            name: name
        }

        let transporation_type_where = {
            id: transporation_typeid
        };
        
        try {
            transaction = await sequelize.transaction();

            /* UPDATE ZSequelize */
            let transporation_type_result = await ZSequelize.updateValues(transporation_type_value, transporation_type_where, "TransporationTypeModel", transaction);

            await transaction.commit();

            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(200).json({
                result : transporation_type_result.result,
                data: {
                    code: 200,
                    message: "Success update data."
                }
            });
        } catch (err) {
            await transaction.rollback();
            return res.status(400).json({
                result : false,
                data:{
                    code: 400,
                    message: err
                },
            });
        }
    },

    insertProduct: async function(req, res){
        /* JWT PAYLOAD */
        let accountid = req.payload.accountid;

        /* BODY */
        let name = req.body.name;

        /* PARAMETER ZSequelize  */
        let transporation_type_value = {
            name: name
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            let transporation_type_result = await ZSequelize.insertValues(transporation_type_value, "TransporationTypeModel", transaction);

            await transaction.commit();

            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(201).json({
                result : transporation_type_result.result,
                data: {
                    code: 201,
                    message: "Success create data."
                }
            });
        } catch (err) {
            await transaction.rollback();
            return res.status(400).json({
                result : false,
                data:{
                    code: 400,
                    message: err
                },
            });
        }
    }
}