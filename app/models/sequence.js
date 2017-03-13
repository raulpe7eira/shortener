// shortener/app/models/sequences.js

const mongoose = require('mongoose');

module.exports = () => {

    var schema = mongoose.Schema({
        _id: {
            type: String,
            required: true
        },
        seq: {
            type: Number,
            default: 0
        }
    });

    return mongoose.model('Sequence', schema);

};