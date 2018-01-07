var express = require('express');

var router = express.Router();
var feed_read = require("feed-read");
var mysql = require('mysql');
var async = require('async');
var app = express();
var basicAuth = require('express-basic-auth');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "feeds"
});


var challengeAuth = basicAuth({
	authorizeAsync: true,
	authorizer: myAuthorizer,
	challenge: true
})

router.get('/posts',challengeAuth, function(req, res, next) {

	con.query("SELECT * FROM feed", (err, results) => {

		const feeds = results.map(function(item) { return item.resource });

		async.map(feeds, (feed, result_callback) => {
			feed_read(feed, function(err, articles) {
				result_callback(null, articles); 
			})
		}, 
		(err, result) => {
			if (err) {
				res.send(err.message)
			}
			else {
				res.send(result)
			}
		})
	})
})

router.post('/feeds',challengeAuth, function(req, res, next) {

	const resource = req.body.user.rss_resource;

	var sql = "INSERT INTO feed (resource) VALUES ("+"'"+resource+"'"+")";

	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	return res.send("Feed added");
});


router.post('/register', function(req, res) {

	const name = req.body.user.name;
	const password = req.body.user.password;

	var sql = "INSERT INTO users (name, password) VALUES ("+"'"+name+"'"+","+"'"+password+"')";

	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	return res.send("You have registered succesfully");
});


function myAuthorizer(username, password, cb) {

	const sql = "SELECT password FROM users WHERE name = ?";

	con.query(sql,username, function (err, result, fields) {
		if (err) throw err;
		if(result.length === 0) {
			return cb(null,false);
		}
		if(result[0].password == password){
			return  cb(null,true)
		} else {
			return cb(null,false)
		}
	});
};


module.exports = router;



