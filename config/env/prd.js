// shortener/config/env/prd.js

module.exports = {

	env: 'prd',
	debug: false,

	domain: 'localhost:3000',
	address: 'localhost',
	port: 3000,

	db: `mongodb://${process.env.MONGOLAB_USER}:${process.env.MONGOLAB_PASSWORD}@ds129610.mlab.com:29610/shortener`
	

};