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
	var priceLevel = req.param("priceLevel");
	var priceGt = "";
	var priceLte = "";
	var skip = (page-1)*pageSize;
	var params = {};
	if( priceLevel && priceLevel != "all") {
		switch(priceLevel) {
			case "0": priceGt = 0; priceLte = 100; break;
			case "1": priceGt = 100; priceLte = 200; break;
			case "2": priceGt = 200; priceLte = 500; break;
			case "3": priceGt = 500; priceLte = 1000; break;
			case "4": priceGt = 1000; priceLte = 2000; break;
			case "5": priceGt = 2000; priceLte = 5000; break;
		}
		params = {
			salePrice: {
				$gt: priceGt,
				$lte: priceLte
			}
		}
	}
	var goodsModel = Goods.find(params).skip(skip).limit(pageSize);
	console.log(goodsModel)
	// goodsModel.
	// 	sort({"salePrice": sort}).
	// 	exec(function(err, doc) {
	// 		if(err) {
	// 			res.json({
	// 				status: "1",
	// 				msg: err.message
	// 			})
	// 		}else {
	// 			res.json({
	// 				status: "0",
	// 				msg: '',
	// 				result: {
	// 					count: doc.length,
	// 					list: doc
	// 				}
	// 			});
	// 		}
	// 	});
});

module.exports = router;
