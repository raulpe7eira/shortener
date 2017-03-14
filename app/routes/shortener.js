// shortener/app/routes/shortener.js

module.exports = (app) => {

	var ShorturlCtrl = app.controllers.shorturlCtrl;

	app.route('/shortener/create')
		.post(ShorturlCtrl.shortenUrl);

	app.route('/shortener/u/:alias')
		.get(ShorturlCtrl.retrieveUrl);

	app.route('/shortener/topTen')
		.get(ShorturlCtrl.reportTopTen);

};