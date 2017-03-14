// shortener/config/express.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressLoad = require('express-load');

module.exports = () => {

	const app = express();

    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../bower_components')));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use((req, res, next) => {
		if ('OPTIONS' == req.method) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
			res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
			res.send(200);
		} else {
			next();
		}
	});
	app.enable('trust proxy');

	app.use(helmet.dnsPrefetchControl());
	app.use(helmet.frameguard());
	app.use(helmet.hidePoweredBy());
	app.use(helmet.ieNoOpen());
	app.use(helmet.noSniff());
	app.use(helmet.xssFilter());

	// backend
	expressLoad('models', { cwd: 'app' })
		.then('controllers')
		.then('routes')
		.into(app);

	// frontend
	app.get('/', (req, res) => {
		res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
	});
	app.get('*', (req, res) => {
		res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
	});

	return app;

};