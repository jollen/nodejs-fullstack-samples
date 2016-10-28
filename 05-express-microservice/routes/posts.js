var express = require('express');
var cors = require('cors');
var Memcached = require('memcached');
var router = express.Router();

/**
 * Use in-memory key-value store.
 *	- Redis, memcached, leveldb
 */
var memcached = new Memcached('localhost:11211');

router.options('/', cors());
router.post('/', cors());
router.post('/', function(req, res, next) {
	// JSON 
	var message = {
		message: req.body.message
	};

	// Save
	memcached.get('db', function(err, db) {
		// Create new db
		if (typeof db === 'undefined') {
			db = {
				payload: []
			};
		}

		// Update
		db.payload = db.payload.concat(message);

		memcached.set('db', db, 10, function(err) {
	        res.json(db);
			next();
		});
	});	
});

router.post('/', function(req, res, next) {
	var WebSocketClient = require('websocket').client;
	var client = new WebSocketClient();
	var message;

	client.on('connect', function(connection) {
	    console.log('WebSocket client send: ' + message);

        connection.sendUTF(message);
	});

	memcached.get('db', function(err, db) {
		message = JSON.stringify( db.payload.pop() );
		client.connect('ws://wot.city/object/jollen/send', '');	
	});
});

router.get('/', function(req, res, next) {
	memcached.get('data', function(err, data) {
		res.send(data);
	});
});

module.exports = router;
