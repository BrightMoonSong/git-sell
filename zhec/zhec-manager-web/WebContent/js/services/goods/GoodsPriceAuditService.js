/**
 * 系统用户service定义
 */

angular
	.module('managerApp')
	.factory('GoodsPriceAuditService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/audit';
		return {
			//查询数据方法
			findauditgoods: function(goodsName, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/findauditgoods?pageSize=" + pageSize + "&pageNo=" + pageNo + "&goodsName=" + goodsName;
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
			//审核结果
			editauditgoods: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/editauditgoods';
				$http({
					method: 'put',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//点击行时显示   更改的数据
			findauditgoodsbyid: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/findauditgoodsbyid?id=' + id;
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
		}
	});