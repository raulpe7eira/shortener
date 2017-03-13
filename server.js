// shortener/server.js

const config = require('./config/config')();
const app = require('./config/express')(config.port);

require('./config/database')(config.db);

console.log(config.env);
console.log(config.address);
console.log(config.port);

module.exports = require('http').createServer(app).listen(config.port, config.address, () => {

	config.debug && console.log('\n[shortener-%s %s] URL Short Server! Inicializado em %s:%d ...',
		config.env, new Date(Date.now()).toLocaleString('pt-BR'),
		config.address, config.port);

});