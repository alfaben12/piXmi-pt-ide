const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');
const multer = require('multer');
const path = require('path');
const JWT = require('../helpers/JWT');

router.post(
	'/drivers',
	function(req, res, next){   
        let filename = '';
        const storage = multer.diskStorage({    
            destination : path.join(__dirname + '../../uploads/images/'),    
            filename: function(req, file, cb){   
                filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);     
                cb(null, filename);    
            }
        });
        
        const upload = multer({    
            storage : storage
        }).fields([
			{ 
				name: 'photo_profile', 
				maxCount: 1 
			}, 
			{ 
				name: 'photo_stnk', 
				maxCount: 1 
			},
			{ 
				name: 'photo_skck', 
				maxCount: 1 
			},
			{ 
				name: 'photo_sim', 
				maxCount: 1 
			},
			{ 
				name: 'photo_transportation', 
				maxCount: 1 
			}
		]);

        upload(req, res, err => {
			if (err) {
				return res.status(400).json({
					result: false,
					data:{
						code: 400,
						message: 'Failed upload image.'
					}
				});
			}

			filename = {
				photo_profile: req.files['photo_profile'][0].filename,
				photo_stnk: req.files['photo_stnk'][0].filename,
				photo_skck: req.files['photo_skck'][0].filename,
				photo_sim: req.files['photo_sim'][0].filename,
				photo_transportation: req.files['photo_transportation'][0].filename
			};
			req.upload = filename;
			next();
        })    
    },
	RegisterController.insertDriver
);

router.post(
	'/users',
	function(req, res, next){   
        let filename = '';
        const storage = multer.diskStorage({    
            destination : path.join(__dirname + '../../uploads/images/'),    
            filename: function(req, file, cb){   
                filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);     
                cb(null, filename);    
            }
        });
        
        const upload = multer({    
            storage : storage
        }).single('photo_profile');

        upload(req, res, err => {
			if (err) {
				return res.status(400).json({
					result: false,
					data:{
						code: 400,
						message: 'Failed upload image.'
					}
				});
			}

			filename = {
				photo_profile: filename
			};
			req.upload = filename;
			next();
        })    
    },
	RegisterController.insertUser
);

router.put(
	'/verify',
	JWT.JWTverify,
	RegisterController.verifyDriver
);

module.exports = router;
