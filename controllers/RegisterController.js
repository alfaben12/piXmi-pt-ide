const ZSequelize = require('../libraries/ZSequelize');
const AccountHelper = require('../helpers/AccountHelper');
const GlobalHelper = require('../helpers/GlobalHelper');
const Op = require('sequelize').Op;
const sequelize = require('../config/db');
const ba64 = require("ba64")
const moment = require("moment")
const bcrypt = require('bcryptjs');

module.exports = {
    insertDriver: async function(req, res){
        /* BODY */
        let name = req.body.name;
        let username = req.body.username;
        let password = bcrypt.hashSync(req.body.password, 10);
        let activity_category = req.body.activity_category;
        let for_woman = req.body.for_woman;
        let transportation_type = req.body.transportation_type;
        let address = req.body.address;
        let ktp_number = req.body.ktp_number;
        let phone = req.body.phone;
        let email = req.body.email;
        
        /* VALIDATION */
        /* PARAMETER ZSequelize */
        let validation_field = ['*'];
        let validation_where = {
            [Op.or]: [{username: username}, {email: email}]
        };
        
        let validation_orderBy = [['id', 'DESC']];
        let validation_groupBy = false;
        let validation_model = 'DriverModel';
        
        /* FETCH ZSequelize */
        let validation_accountData = await ZSequelize.fetch(false, validation_field, validation_where, validation_orderBy, validation_groupBy, validation_model);
        
        if (validation_accountData.result) {
            return res.status(409).json({
                result : false,
                message: "Maaf, email/username sudah terdaftar"
            });
        }
        
        let prefixFileName = moment().format('YYYYxMMDD')
        
        ba64, data_url = req.body.photo_profile;
        let photo_profile = "photo_profile"+ prefixFileName +"."+ GlobalHelper.getMime(req.body.photo_profile);
        let filename_photo_profile = "photo_profile"+ prefixFileName;
        ba64.writeImageSync("uploads/images/" + filename_photo_profile, data_url);
        
        let fileSize_photo_profile = GlobalHelper.getFileSize(req.body.photo_profile)
        
        if (fileSize_photo_profile > 1000) {
            return res.status(413).json({
                result : false,
                message: "Maaf, File terlalu besar max size file adalah 1MB"
            });
        }
        
        ba64, data_url = req.body.photo_stnk;
        let photo_stnk = "photo_stnk"+ prefixFileName +"."+ GlobalHelper.getMime(req.body.photo_stnk);
        let filename_photo_stnk = "photo_stnk"+ prefixFileName;
        ba64.writeImageSync("uploads/images/" + filename_photo_stnk, data_url);
        
        let fileSize_photo_stnk = GlobalHelper.getFileSize(req.body.photo_stnk)
        
        if (fileSize_photo_stnk > 1000) {
            return res.status(413).json({
                result : false,
                message: "Maaf, File terlalu besar max size file adalah 1MB"
            });
        }
        
        ba64, data_url = req.body.photo_skck;
        let photo_skck = "photo_skck"+ prefixFileName +"."+ GlobalHelper.getMime(req.body.photo_skck);
        let filename_photo_skck = "photo_skck"+ prefixFileName;
        ba64.writeImageSync("uploads/images/" + filename_photo_skck, data_url);
        
        let fileSize_photo_skck = GlobalHelper.getFileSize(req.body.photo_skck)
        
        if (fileSize_photo_skck > 1000) {
            return res.status(413).json({
                result : false,
                message: "Maaf, File terlalu besar max size file adalah 1MB"
            });
        }
        
        ba64, data_url = req.body.photo_sim;
        let photo_sim = "photo_sim"+ prefixFileName +"."+ GlobalHelper.getMime(req.body.photo_sim);
        let filename_photo_sim = "photo_sim"+ prefixFileName;
        ba64.writeImageSync("uploads/images/" + filename_photo_sim, data_url);
        
        let fileSize_photo_sim = GlobalHelper.getFileSize(req.body.photo_sim)
        
        if (fileSize_photo_sim > 1000) {
            return res.status(413).json({
                result : false,
                message: "Maaf, File terlalu besar max size file adalah 1MB"
            });
        }
        
        ba64, data_url = req.body.photo_transportation;
        let photo_transportation = "photo_transportation"+ prefixFileName +"."+ GlobalHelper.getMime(req.body.photo_transportation);
        let filename_photo_transportation = "photo_transportation"+ prefixFileName;
        ba64.writeImageSync("uploads/images/" + filename_photo_transportation, data_url);
        
        let fileSize_photo_transportation = GlobalHelper.getFileSize(req.body.photo_transportation)
        
        if (fileSize_photo_transportation > 1000) {
            return res.status(413).json({
                result : false,
                message: "Maaf, File terlalu besar max size file adalah 1MB"
            });
        }
        
        /* PARAMETER ZSequelize  */
        let driver_value = {
            name: name,
            username: username,
            password: password,
            activity_category: activity_category,
            for_woman: for_woman,
            transportation_typeid: transportation_type,
            address: address,
            ktp_number: ktp_number,
            phone: phone,
            email: email,
            photo_profile: photo_profile,
            photo_stnk: photo_stnk,
            photo_skck: photo_skck,
            photo_sim: photo_sim,
            photo_transportation: photo_transportation
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            await ZSequelize.insertValues(driver_value, "DriverModel", transaction);
            
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
    
    insertUser: async function(req, res){
        /* BODY */
        let name = req.body.name;
        let username = req.body.username;
        let password = bcrypt.hashSync(req.body.password, 10);
        let address = req.body.address;
        let ktp_number = req.body.ktp_number;
        let phone = req.body.phone;
        let email = req.body.email;
        
        /* VALIDATION */
        /* PARAMETER ZSequelize */
        let validation_field = ['*'];
        let validation_where = {
            [Op.or]: [{username: username}, {email: email}]
        };
        
        let validation_orderBy = [['id', 'DESC']];
        let validation_groupBy = false;
        let validation_model = 'UserModel';
        
        /* FETCH ZSequelize */
        let validation_accountData = await ZSequelize.fetch(false, validation_field, validation_where, validation_orderBy, validation_groupBy, validation_model);
        
        if (validation_accountData.dataValues != null) {
            return res.status(409).json({
                result : false,
                message: "Maaf, email/username sudah terdaftar"
            });
        }
        
        let prefixFileName = moment().format('YYYYxMMDD')
        
        ba64, data_url = req.body.photo_profile;
        let photo_profile = "photo_profile"+ prefixFileName +"."+ GlobalHelper.getMime(req.body.photo_profile);
        let filename_photo_profile = "photo_profile"+ prefixFileName;
        ba64.writeImageSync("uploads/images/" + filename_photo_profile, data_url);
        
        let fileSize = GlobalHelper.getFileSize(req.body.photo_profile)
        
        if (fileSize > 1000) {
            return res.status(413).json({
                result : false,
                message: "Maaf, File terlalu besar max size file adalah 1MB"
            });
        }
        
        /* PARAMETER ZSequelize  */
        let driver_value = {
            name: name,
            username: username,
            password: password,
            address: address,
            ktp_number: ktp_number,
            phone: phone,
            email: email,
            photo_profile: photo_profile,
        }
        
        try {
            transaction = await sequelize.transaction();
            /* INSERT ZSequelize */
            let dataRes = await ZSequelize.insertValues(driver_value, "UserModel", transaction);
            
            let userid = dataRes.record.id;
            
            let user_cost_list = [
                {
                    "userid": userid,
                    "from_hour": 1,
                    "to_hour": 7,
                    "price": 6000,
                    "point": 6
                },
                {
                    "userid": userid,
                    "from_hour": 7,
                    "to_hour": 11,
                    "price": 2000,
                    "point": 2
                },
                {
                    "userid": userid,
                    "from_hour": 11,
                    "to_hour": 16,
                    "price": 3000,
                    "point": 3
                },
                {
                    "userid": userid,
                    "from_hour": 16,
                    "to_hour": 20,
                    "price": 4000,
                    "point": 4
                },
                {
                    "userid": userid,
                    "from_hour": 20,
                    "to_hour": 24,
                    "price": 5000,
                    "point": 5
                }
            ];

            for (let i = 0; i < user_cost_list.length; i++) {
                let user_cost = {
                    userid: userid,
                    from_hour: user_cost_list[i].from_hour,
                    to_hour: user_cost_list[i].to_hour,
                    price: user_cost_list[i].price,
                    point: user_cost_list[i].point
                }
                await ZSequelize.insertValues(user_cost, "UserSetupCostModel", transaction);
            }
            await transaction.commit();
            
            /* FETCTH RESULT & CONDITION & RESPONSE */
            return res.status(201).json({
                result : true,
                message : 'Berhasil, Silahkan Login'
            });
        } catch (err) {
            await transaction.rollback();
            return res.status(400).json({
                result : false,
                message : err
            });
        }
    },
    
    verifyDriver: async function(req, res){
        /* JWT PAYLOAD */
        let accountid = req.payload.accountid;
        
        /* BODY */
        let token = req.body.token;
        
        let account = await AccountHelper.getDriverAccount(accountid);
        let driver_token = account.dataValues.token;
        
        if (token != driver_token) {
            return res.status(201).json({
                result : false,
                message : 'FAIL {invalid token}'
            });
        }
        
        /* PARAMETER ZSequelize  */
        let driver_value = {
            is_verify: 1
        }
        
        let driver_where = {
            id: accountid
        };
        
        try {
            transaction = await sequelize.transaction();
            
            /* UPDATE ZSequelize */
            let driver_result = await ZSequelize.updateValues(driver_value, driver_where, "DriverModel", transaction);
            
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
    },
    
    sendCodeVerify: async function(req, res){
        const accountSid = 'AC5f5a33217cbd07b15e276bca1610b401';
        const authToken = '44fd1d9fd12e89d483894b15295fa8f2';
        const client = require('twilio')(accountSid, authToken);
        
        /* JWT PAYLOAD */
        let accountid = req.payload.accountid;
        
        let token = GlobalHelper.randomCharacter(5);
        
        /* PARAMETER ZSequelize  */
        let account_value = {
            token: token,
            is_verify: 1
        }
        
        let account_where = {
            id: accountid
        };
        
        try {
            transaction = await sequelize.transaction();
            
            /* UPDATE ZSequelize */
            let account_result = await ZSequelize.updateValues(account_value, account_where, "DriverModel", transaction);
            
            let account = await AccountHelper.getDriverAccount(accountid);
            
            let phone = account.dataValues.phone;
            client.messages
            .create({body: 'PIXMI code '+ token + ".", from: '+12242698055', to: phone})
            .then(message => console.log(message.sid));
            
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