angular
	.module('managerApp')
	.factory('testService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/sys';
		return {
			//查询数据
			find: function() {
				var defer = $q.defer();
				var url = baseUrl + "/gettestdata";
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//修改异常测试数据
			modify: function(type) {
				var defer = $q.defer();
				var url = baseUrl + '/edittestdata?type=' + type;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//测试异常返回对应code值
			test: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/edittestdataexception1';
				$http({
					method: 'put',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//测试异常后事务回滚
			affair: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/edittestdataexception2';
				$http({
					method: 'put',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},



		}
	})
