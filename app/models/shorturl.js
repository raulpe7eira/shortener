// shortener/app/models/shorturl.js

const mongoose = require('mongoose');

module.exports = () => {

    var schema = mongoose.Schema({
		alias: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		url: {
			type: String,
			required: true
		},
		retrieved: {
			type: Number,
			default: 0
		}
    });

    return mongoose.model('Shorturl', schema);

};