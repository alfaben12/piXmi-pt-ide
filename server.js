const express = require('express')
const app = express();
const con = require('./config/db.js');
const dotenv = require('dotenv');
const cors = require('cors');
const RegisterRouter = require('./routes/RegisterRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use('/registers', RegisterRouter);

app.listen(process.env.RUN_PORT, () => console.log(`Example app listening on port ` + process.env.RUN_PORT));