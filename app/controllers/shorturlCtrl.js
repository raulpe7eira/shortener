// shortener/app/controllers/shorturlCtrl.js

const sanitize = require('mongo-sanitize');
const validUrl = require('valid-url');
const base58 = require('../utils/base58');

module.exports = (app) => {

	const Sequence = app.models.sequence;
	const Shorturl = app.models.shorturl;

	var controller = {};

	controller.shortenUrl = (req, res) => {

		const initTime = new Date().getTime();

		var dataReq = {
			webhost: `${req.protocol}://${req.headers.host}`,
			url: sanitize(req.query.url),
			customAlias: sanitize(req.query.CUSTOM_ALIAS) || null
		};

  		if (!dataReq.url) {
    		return res.status(400).json({
      			err_code: '003',
      			description: 'NO URL TO BE SHORTEN'
    		});
  		}

    	if (!validUrl.isWebUri(dataReq.url)) {
    		return res.status(400).json({
      			url: req.query.url,
      			err_code: '004',
      			description: 'URL NOT VALID',
    		});
  		}

		var createShorturl = (dataReq, res) => {

			Shorturl.create({ alias: dataReq.customAlias, url: dataReq.url })
				.then((shorturl) => {
					return res.status(201).json({
						alias: shorturl.alias,
						url: `${dataReq.webhost}/shortener/u/${shorturl.alias}`,
						statistics: {
							time_taken: `${new Date().getTime() - initTime} ms`
						}
					});
				});

		}

		if (dataReq.customAlias) {
			Shorturl.find({ alias: dataReq.customAlias })
				.then((result) => {
					if (result.length > 0) {
						return res.status(400).json({
							alias: dataReq.customAlias,
							err_code: '001',
							description: 'CUSTOM ALIAS ALREADY EXISTS'
						});
					} else {
						createShorturl(dataReq, res);
					}
				});
		} else {
			Sequence.findByIdAndUpdate({ _id: 'seq_shorturl' }, { $inc: { seq: 1 } })
				.then((sequence) => {
					dataReq.customAlias = base58.encode(sequence.seq);
					createShorturl(dataReq, res);
				});
		}

	};

	controller.retrieveUrl = (req, res) => {

		var dataReq = {
			alias: sanitize(req.params.alias)
		};

		Shorturl.findOneAndUpdate({ alias: dataReq.alias }, { $inc: { retrieved: 1 } })
			.then((shorturl) => {
				return res.redirect(shorturl.url);
			})
			.catch(() => {
				return res.status(400).json({
					alias: dataReq.alias,
					err_code: '002',
					description: 'SHORTENED URL NOT FOUND',
				});
			});

	};

	controller.reportTopTen = (req, res) => {

		Shorturl.find().sort({ retrieved: -1 }).limit(10).exec()
			.map((shorturl) => {
				return {
					alias: shorturl.alias,
					url: shorturl.url,
					retrieved: shorturl.retrieved
				};
			})
			.then((topTen) => {
				return res.status(200).json({ topTen });
			});

	};

	return controller;

};