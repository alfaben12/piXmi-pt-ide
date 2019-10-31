const ZSequelize = require('../../libraries/ZSequelize');

exports.accessCheckWithParam = async function(req, res, next) {
    /* JWT PAYLOAD */
    let adminid = req.payload.accountid;
    let driverid = req.params.driverid;

    /* PARAMETER ZSequelize */
	let field = ['*'];
	let where_driver = {
        id: driverid
    };
    
    let where_admin = {
        id: adminid
	};

	let orderBy = [['id', 'DESC']];
	let groupBy = false;
    let model_driver = 'DriverModel';
    let model_admin = 'AdminModel';
        
	let driverAccountData = await ZSequelize.fetch(false, field, where_driver, orderBy, groupBy, model_driver);
	let adminAccountData = await ZSequelize.fetch(false, field, where_admin, orderBy, groupBy, model_admin);

    let driver_shelterid = driverAccountData.dataValues.shelterid;
    let admin_shelterid = adminAccountData.dataValues.shelterid;

    if (admin_shelterid == null || admin_shelterid == 0) {
        next();
    }else if (admin_shelterid != null || admin_shelterid != 0 && admin_shelterid != driver_shelterid) {
        res.status(403).json({
			result: false,
			message: 'Akses ditolak'
		});
    }else{
        next();
    }
};