angular
	.module('managerApp')
	.factory('brandbatchService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/goods';
		return {
			post: function(brands, typeId) {
				var defer = $q.defer();
				var url = baseUrl + '/banchimport?brands=' + brands + "&typeId=" + 0;
				if (typeId !== null && typeId !== undefined && typeId !== '') {
					var url = baseUrl + '/banchimport?brands=' + brands + "&typeId=" + typeId;
				}

				$http({
					method: 'post',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//获取类型
			get: function() {
				var defer = $q.defer();
				var url = baseUrl + '/findgoodstypes';
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






		}
	})
