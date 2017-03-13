// shortener/server.js

const config = require('./config/config')();
const app = require('./config/express')(config.port);

require('./config/database')(config.db);

module.exports = require('http').createServer(app).listen(config.port, () => {

	config.debug && console.log('\n[shortener-%s %s] URL Shortener Server! Running on port %d ...',
		config.env, new Date(Date.now()).toLocaleString('pt-BR'), config.port);

});