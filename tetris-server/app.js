var express = require('express');
var app = express();

//设置跨域访问  
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});  

app.get('/api/comments', function (req, res) {
	var comments = [{
		"id": 1,
		"author": "csq",
		"text": "this is the first comment."
	}, {
		"id": 2,
		"author": "yl",
		"text": "this is the second comment."
	}, {
		"id": 3,
		"author": "yll",
		"text": "this is the third comment."
	}];
  	res.send(comments);
});

app.get('/api/cities', function (req, res) {
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'Admin_8460'
	});
	connection.connect();
	connection.query('select * from world.city',function(err,rows,fields){
		if(err)throw err;
		res.send(rows);
	}); 	
	connection.end();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});