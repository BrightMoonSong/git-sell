angular
	.module('managerApp')
	.factory('operationcheckService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/sys';
		return {
			//查询数据
			find: function(optType,requestType,keyword,optId, minTime, maxTime, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/findopertionlog?optType=" + optType +"&requestType="+requestType+ "&keyword="+keyword+"&optId="+optId+ "&minTime=" + minTime + "&maxTime=" + maxTime + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			//根据id查询一条数据方法
			get: function(dataId) {
				var defer = $q.defer();
				var url = baseUrl + '/getopertionlogbyid?id=' + dataId;
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
