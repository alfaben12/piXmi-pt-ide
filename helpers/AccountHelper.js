const ZSequelize = require('../libraries/ZSequelize');

exports.getDriverAccount = async function(accountid) {
	/* PARAMETER ZSequelize */
	let field = ['*'];
	let where = {
		id: accountid
	};
	let orderBy = false;
	let groupBy = false;
	let model = 'DriverModel'
	let joins = [
		[
			{
				'fromModel' : 'DriverModel',
				'fromKey' : 'transportation_typeid',
				'bridgeType' : 'belongsTo',
				'toModel' : 'TransportationTypeModel',
				'toKey' : 'id',
				'attributes' : ['*'],
				'required': true
			}
		]
	];
	let accountData = await ZSequelize.fetchJoins(false, field, where, orderBy, groupBy, model, joins);
	return accountData;
};

exports.getUserAccount = async function(accountid) {
	/* PARAMETER ZSequelize */
	let field = ['*'];
	let where = {
		id: accountid
	};
	let orderBy = false;
	let groupBy = false;
	let model = 'UserModel';

	/* FETCH ZSequelize */
	let accountData = await ZSequelize.fetch(false, field, where, orderBy, groupBy, model);
	return accountData;
};