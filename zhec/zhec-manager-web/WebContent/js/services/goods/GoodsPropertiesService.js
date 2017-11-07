/**
 * 系统用户service定义
 */

angular
	.module('managerApp')
	.factory('GoodsPropertiesService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + "/goods";
		return {
			//查询数据
			find: function(propName, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/props?propName=" + propName + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			//根据id查询一条数据方法
			get: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/prop/' + id;
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
			//修改数据
			edit: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/prop';
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
			//新增数据
			addprop: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/addprop';
				$http({
					method: 'post',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//修改属性状态
			editstatus: function(id, status) {
				var defer = $q.defer();
				var url = baseUrl + '/editpropstatus?id=' + id + '&status=' + status;
				$http({
					method: 'put',
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