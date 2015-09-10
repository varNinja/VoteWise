var express = require('express');

var router = express.Router();

router.post('/api/login', function(req, res){

	console.log(req.body);

	res.json({
		'msg':'success'
	})
})