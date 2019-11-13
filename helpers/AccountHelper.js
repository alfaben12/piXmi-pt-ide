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
		],
		[
			{
				'fromModel' : 'DriverModel',
				'fromKey' : 'shelterid',
				'bridgeType' : 'belongsTo',
				'toModel' : 'ShelterModel',
				'toKey' : 'id',
				'attributes' : ['*'],
				'required': false
			}
		],
		[
			{
				'fromModel' : 'DriverModel',
				'fromKey' : 'driver.id',
				'bridgeType' : 'hasOne',
				'toModel' : 'DriverSetupModel',
				'toKey' : 'driverid',
				'attributes' : ['*'],
				'required': false
			}
		],
		[
			{
				'fromModel' : 'DriverModel',
				'fromKey' : 'driver.id',
				'bridgeType' : 'hasMany',
				'toModel' : 'DriverSetupCostModel',
				'toKey' : 'driverid',
				'attributes' : ['*'],
				'required': false
			}
		],
		[
			{
				'fromModel' : 'DriverModel',
				'fromKey' : 'levelid',
				'bridgeType' : 'belongsTo',
				'toModel' : 'DriverLevelModel',
				'toKey' : 'id',
				'attributes' : ['*'],
				'required': false
			}
		],
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
	let joins = [
		[
			{
				'fromModel' : 'UserModel',
				'fromKey' : 'user.id',
				'bridgeType' : 'hasOne',
				'toModel' : 'UserSubscriptionSetupModel',
				'toKey' : 'userid',
				'attributes' : ['*'],
				'required': false
			}
		],
		[
			{
				'fromModel' : 'UserModel',
				'fromKey' : 'user.id',
				'bridgeType' : 'hasMany',
				'toModel' : 'UserSetupCostModel',
				'toKey' : 'userid',
				'attributes' : ['*'],
				'required': false
			}
		],
	];
	/* FETCH ZSequelize */
	let accountData = await ZSequelize.fetchJoins(false, field, where, orderBy, groupBy, model, joins);
	return accountData;
};


exports.getAdminAccount = async function(accountid) {
	/* PARAMETER ZSequelize */
	let field = ['*'];
	let where = {
		id: accountid
	};
	let orderBy = false;
	let groupBy = false;
	let model = 'AdminModel'
	let joins = [
		[
			{
				'fromModel' : 'AdminModel',
				'fromKey' : 'roleid',
				'bridgeType' : 'belongsTo',
				'toModel' : 'AdminRoleModel',
				'toKey' : 'id',
				'attributes' : ['*'],
				'required': true
			}
		]
	];
	let accountData = await ZSequelize.fetchJoins(false, field, where, orderBy, groupBy, model, joins);
	return accountData;
};