angular
	.module('searchListApp')
	.factory('SearchListService', function($http, $q, ConstBaseLocation) {
		var baseUrl = ConstBaseLocation; //各种基本路径****
		return {
			//商品列表数据
			findGoodsList: function(paramsKeyWord, platform, paramsCateid, paramsPageno, paramsOrderid, paramsInstock, paramsBrandid, paramsFilterid) {
				var defer = $q.defer();
				var goodslisturl = '/goods/search/' +
					paramsKeyWord + '-' +
					platform + '-' +
					paramsCateid + '-' +
					paramsPageno + '-' +
					paramsOrderid + '-' +
					paramsInstock + '-' +
					paramsBrandid + '-' +
					paramsFilterid;
				// encodeURIComponent(paramsFilterid);
				var url = baseUrl + goodslisturl;
				$http({
					method: 'get',
					url: url,
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},

		};
	});
