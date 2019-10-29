const express = require('express')
const con = require('./config/db.js');
const dotenv = require('dotenv');
const cors = require('cors');

const RegisterRouter = require('./routes/RegisterRouter');
const LoginRouter = require('./routes/LoginRouter');
const VoucherRouter = require('./routes/VoucherRouter');
const TransporationTypeRouter = require('./routes/TransporationTypeRouter');
const AccountRouter = require('./routes/AccountRouter');
const DriverPaymentRouter = require('./routes/DriverPaymentRouter');
const ShelterRouter = require('./routes/ShelterRouter');
const DriverLevelRouter = require('./routes/DriverLevelRouter');
const DriverSetupRouter = require('./routes/DriverSetupRouter');

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true, limit:'100mb',parameterLimit:1000000 }));
app.use(express.static('uploads/'));

// allow request
app.use(cors());
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	// allow preflight
	if (req.method === 'OPTIONS') {
		res.send(200);
	} else {
		next();
	}
});


app.get('/', (req, res) => res.send('Hello PT. IDE!'))
app.use('/logins', LoginRouter);
app.use('/registers', RegisterRouter);
app.use('/vouchers', VoucherRouter);
app.use('/transportationtypes', TransporationTypeRouter);
app.use('/accounts', AccountRouter);
app.use('/payments', DriverPaymentRouter);
app.use('/shelters', ShelterRouter);
app.use('/driverlevels', DriverLevelRouter);
app.use('/driversetups', DriverSetupRouter);


app.listen(process.env.RUN_PORT, () => console.log(`Example app listening on port ` + process.env.RUN_PORT));