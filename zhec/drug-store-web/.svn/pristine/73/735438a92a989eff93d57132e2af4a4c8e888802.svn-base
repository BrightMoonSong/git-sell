angular
	.module('managerApp')
	.factory('GoodsCheckFailInfosService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/goodsinfo';
		var baseUrl2 = constMapiLocation + '/goodscate';
		var baseUrlImg = constMapiLocation + '/goodsinfoimages';
		return {
			//获取未通过审核商品列表
			find: function(pageNo, pageSize, parmValue, cateId, storeId) {
				var defer = $q.defer();
				var url = baseUrl + "/checkfailinfos?pageSize=" + pageSize + "&pageNo=" + pageNo;
				if(parmValue) {
					url += "&parmValue=" + parmValue;
				}
				if(cateId) {
					url += "&cateId=" + cateId;
				}
				if(storeId) {
					url += "&storeId=" + storeId;
				}
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
			//获取树形分类列表，返回全部分类数据
			findall: function() {
				var defer = $q.defer();
				var url = baseUrl2 + '/findall?type=2';
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
			//根据PID获取子分类列表
			findinfosbypid: function(id) {
				var defer = $q.defer();
				var url = baseUrl2 + '/findinfosbypid/' + id;
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
			//根据ID获取商品详情
			getinfo: function(id) {
				var defer = $q.defer();
				var url = baseUrl + "/getinfo/" + id;
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
			//根据ID获取商品图片列表
			findinfosImg: function(id) {
				var defer = $q.defer();
				var url = baseUrlImg + '/findinfos/' + id;
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
			//获取审核记录
			findcheckbills: function(pageNo, pageSize, goodsId) {
				var defer = $q.defer();
				var url = baseUrl + '/findcheckbills?pageNo=' + pageNo + '&pageSize=' + pageSize + '&goodsId=' + goodsId;
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