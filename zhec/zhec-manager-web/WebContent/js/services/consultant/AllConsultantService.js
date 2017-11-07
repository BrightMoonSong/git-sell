/**
 * 系统用户service定义
 */
angular
	.module('managerApp')
	.factory('AllConsultantService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/consultantnew';
		return {
			//查询数据方法
			find: function(pageSize, pageNo, auditStatus, consultantsName) {
				var defer = $q.defer();
				var url = baseUrl + "/findconsultants?pageSize=" + pageSize + "&pageNo=" + pageNo + "&status=" + auditStatus + "&consultantsName=" + consultantsName;
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
				var url = baseUrl + '/getconsultants?id=' + id;
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
			//修改顾问信息
			put: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/editconsultants';
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
			//新增顾问
			adds: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/addconsultants';
				$http({
					method: 'post',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			}



		}
	});
