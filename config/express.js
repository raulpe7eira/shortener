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
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
		res.header('Access-Control-Allow-Headers', '*');
		res.header('Access-Control-Allow-Credentials', 'true');
		next();
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