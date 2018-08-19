var express = require('express');
var cors = require('cors');
var Memcached = require('memcached');
var router = express.Router();

/**
 * Use in-memory key-value store.
 *	- Redis, memcached, leveldb
 */
var memcached = new Memcached('localhost:11211');

router.get('/', function(req, res, next) {
	memcached.get('data', function(err, data) {
		res.send(data);
	});
});

module.exports = router;
