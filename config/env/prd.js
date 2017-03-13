// shortener/config/env/prd.js

module.exports = {

	env: 'prd',
	db: `mongodb://${process.env.MONGOLAB_USER}:${process.env.MONGOLAB_PASSWORD}@ds129610.mlab.com:29610/shortener`,
	port: process.env.PORT,
	debug: false

};