// shortener/config/express.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressLoad = require('express-load');

module.exports = () => {

	const app = express();

    app.use(express.static(path.join(__dirname, '../public')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.enable('trust proxy');

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