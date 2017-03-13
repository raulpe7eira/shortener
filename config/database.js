// shortener/config/database.js

const mongoose = require('mongoose');
const config = require('./config')();

module.exports = (uri) => {

	mongoose.Promise = require('bluebird');
	mongoose.connect(uri);

	mongoose.connection.on('connected', () => {
		config.debug && console.log('[shortener-%s %s] Mongoose! Conectado em %s ...',
			config.env, new Date(Date.now()).toLocaleString('pt-BR'), uri);
	});

	mongoose.connection.on('disconnected', () => {
		config.debug && console.log('\n[shortener-%s %s] Mongoose! Desconectado de %s ...',
			config.env, new Date(Date.now()).toLocaleString('pt-BR'), uri);
	});

	mongoose.connection.on('error', (erro) => {
		config.debug && console.log('[shortener-%s %s] Mongoose! Erro na conexão: %s',
			config.env, new Date(Date.now()).toLocaleString('pt-BR'), erro);
	});

	process.on('SIGINT', () => {
		mongoose.connection.close(() => {
			config.debug && console.log('[shortener-%s %s] Mongoose! Desconectado pelo término da aplicação',
				config.env, new Date(Date.now()).toLocaleString('pt-BR'));
			process.exit(0);
		});
	});

};