var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('./../models/goods');

/* 连接MongoDB数据库 */
mongoose.connect('mongodb://127.0.0.1:27017/vue_shop');

mongoose.connection.on('connected', function(a,b,c) {
	console.log('MongoDB connected success');
});

mongoose.connection.on('error', function() {
	console.log('MongoDB connected fail');
});

mongoose.connection.on('disconnected', function() {
	console.log('MongoDB connected disconnected');
});

router.get("/",function(req, res, next) {
	var page = parseInt(req.param("page"));
	var pageSize = parseInt(req.param("pageSize"));
	var sort = parseInt(req.param("sort"));
	var skip = (page-1)*pageSize;
	var params = {};
	var goodsModel = Goods.find(params).skip(skip).limit(pageSize);
	goodsModel.sort({"salePrice": sort});
	goodsModel.exec(function(err, doc) {
		if(err) {
			res.json({
				status: "1",
				msg: err.message
			})
		}else {
			res.json({
				status: "0",
				msg: '',
				result: {
					count: doc.length,
					list: doc
				}
			});
		}
	});
});

module.exports = router;
