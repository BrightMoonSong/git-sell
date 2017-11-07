angular
	.module('managerApp')
	.factory('functionService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/shiro/';
		var baseOrderUrl = constMapiLocation + '/order/';
		return {
			//查询数据
			find: function(userToken) {
				var defer = $q.defer();
				var url = baseUrl + "userfunctions?userToken=" + userToken;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			logout: function(userToken) {
				var defer = $q.defer();
				var url = baseUrl + "/logout?userToken=" + userToken;
				$http({
					method: 'delete',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//获取异常数据个数
			getunreadabnormalsigncount: function() {
				var defer = $q.defer();
				var url = baseOrderUrl + "getunreadabnormalsigncount";
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			changepwd: function(userToken, oldPwd, newPwd) {
				var defer = $q.defer();
				var url = baseUrl + "changepwd?userToken=" + userToken + "&oldPassword=" + oldPwd + "&newPassword=" + newPwd;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			}
		}
	})