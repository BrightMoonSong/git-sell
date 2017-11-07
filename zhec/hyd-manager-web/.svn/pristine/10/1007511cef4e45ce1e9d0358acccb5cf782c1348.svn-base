angular
	.module("managerApp")
	.factory("CarComMissionService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/commission';
		return {
			//新增
			add: function(money) {
				var defer = $q.defer();
				var url = baseUrl + '/add';
				$http({
					method: 'post',
					url: url,
					data: money
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			
			//详情
			detail: function() {
				var defer = $q.defer();
				var url = baseUrl + '/get' ;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//修改
			edit: function(money) {
				var defer = $q.defer();
				var url = baseUrl + '/update';
				$http({
					method: 'put',
					url: url,
					data:money
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
		}
	})