angular
	.module('managerApp')
	.factory('functionService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/shiro/';
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
			loginout: function(userToken) {
				var defer = $q.defer();
				var url = baseUrl + "/loginout?userToken=" + userToken;
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
			updatepassword: function(userId, oldPwd, newPwd) {
				var defer = $q.defer();
				var url = constMapiLocation + "/sys/updatepassword?userId=" + userId + "&oldPwd=" + oldPwd + "&newPwd=" + newPwd;
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