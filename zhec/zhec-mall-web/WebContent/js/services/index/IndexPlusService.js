angular
	.module('indexPlusApp')
	.factory('IndexPlusService', function($http, $q, indextBaseLocation) {
		var baseUrl = indextBaseLocation + '/member/'; //各种基本路径****
		var areaUrl = indextBaseLocation + '/area/';
		var basisUrl = indextBaseLocation + '/malladvertimage/';
		var basicUrl = indextBaseLocation + '/mallcommendgoods/';
		var briefUrl = indextBaseLocation + '/mallcateandbrand/';
		var headUrl = indextBaseLocation + '/homepage/';
		var classifyUrl = indextBaseLocation + '/goods/';
		return {
			//首页广告推荐为
			advertisement: function(advertId, applyType, size) {
				var defer = $q.defer();
				var url = basisUrl + 'findwebcommendgoods?advertId=' + advertId + '&applyType=' + applyType + '&size=' + size;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//首页商品推荐位
			indexprodect: function(commendId, applyType, size) {
				var defer = $q.defer();
				var url = basicUrl + 'findwebcommendgoods?commendId=' + commendId + '&applyType=' + applyType + '&size=' + size;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//商城端推荐品牌和推荐分类
			indexpcprodect: function(applyType, floorId, cateSize, brandSize) {
				var defer = $q.defer();
				var url = briefUrl + 'findfloordate?applyType=' + applyType + '&floorId=' + floorId + '&cateSize=' + cateSize + '&brandSize=' + brandSize;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//商城头部广告
			indexheader: function(applyType) {
				var defer = $q.defer();
				var url = headUrl + 'findcommenddata?applyType=' + applyType;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//三级分类
			indexclassify: function() {
				var defer = $q.defer();
				var url = classifyUrl + 'categorylist';
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			}

		};
	});
