// shortener/config/config.js

module.exports = () => {

	return require(`./env/${process.env.NODE_ENV}`);

};