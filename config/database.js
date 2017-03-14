// shortener/config/database.js

const mongoose = require('mongoose');
const config = require('./config')();

module.exports = (uri) => {

	mongoose.Promise = require('bluebird');
	mongoose.connect(uri);

	mongoose.connection.on('connected', () => {
		config.debug && console.log('[shortener-%s %s] Mongoose! Connect on %s ...',
			config.env, new Date(Date.now()).toLocaleString('pt-BR'), uri);
	});

	mongoose.connection.on('disconnected', () => {
		config.debug && console.log('\n[shortener-%s %s] Mongoose! Disconnected on %s ...',
			config.env, new Date(Date.now()).toLocaleString('pt-BR'), uri);
	});

	mongoose.connection.on('error', (erro) => {
		config.debug && console.log('[shortener-%s %s] Mongoose! Error in connection: %s',
			config.env, new Date(Date.now()).toLocaleString('pt-BR'), erro);
	});

	process.on('SIGINT', () => {
		mongoose.connection.close(() => {
			config.debug && console.log('[shortener-%s %s] Mongoose! Disconnected by terminal',
				config.env, new Date(Date.now()).toLocaleString('pt-BR'));
			process.exit(0);
		});
	});

};