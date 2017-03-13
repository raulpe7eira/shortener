// shortener/config/env/prd.js

module.exports = {

	env: 'prd',
	debug: false,

	address: 'gentle-crag-99464.herokuapp.com',
	port: 8080,

	db: `mongodb://${process.env.MONGOLAB_USER}:${process.env.MONGOLAB_PASSWORD}@ds129610.mlab.com:29610/shortener`
	

};