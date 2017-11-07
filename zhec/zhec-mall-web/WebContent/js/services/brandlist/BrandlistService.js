angular
	.module('brandlistApp')
	.factory('BrandlistServise', function($http, $q, ConstBaseLocation) {
		var baseUrl = ConstBaseLocation + '/'; //各种基本路径****
		return {
			//商品列表
			listbrand: function(pageno, orderid, instock, brandId) {
				var defer = $q.defer();
				var url = ConstBaseLocation + '/goods/brandlist/' + pageno + '-' + orderid + '-' + instock + '-' + brandId;

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
			//品牌
			goodsprodoct: function(brandId) {
				var defer = $q.defer();
				var url = ConstBaseLocation + '/goods/brand/' + brandId;
				$http({
					method: 'get',
					url: url,
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			}
		};
	});
