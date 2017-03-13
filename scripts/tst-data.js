// shortener/scripts/tst-data.js

const mongodb = require('mongodb');

mongodb.MongoClient.connect('mongodb://192.168.99.100:32771/shortener-tst', (err, db) => {

	if (err) throw err;

    const sequences = [
        { _id: 'seq_shorturl', seq: 1 }
    ];

	db.dropDatabase((err) => {

		if (err) return console.log(err);
		console.log('\u001b[32m✓\u001b[0m \u001b[90mDROPPED TEST DATABASE\u001b[0m');
		db.collection('sequences').insert(sequences, (err, inserted) => {

			if (err) return console.log(err);
			console.log('\u001b[32m✓\u001b[0m \u001b[90mFILLED TEST DATABASE\u001b[0m');
			process.exit(0);
			db.close();

		});

	});

});