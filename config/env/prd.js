// shortener/config/env/prd.js

module.exports = {

	env: 'prd',
	debug: false,

	address: '107.22.213.25',
	port: 80,

	db: `mongodb://${process.env.MONGOLAB_USER}:${process.env.MONGOLAB_PASSWORD}@ds129610.mlab.com:29610/shortener`
	

};