angular
	.module('managerApp')
	.factory('abnormalcheckService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/sys';
		return {
			//查询数据
			find: function(optType, requestType,keyword,optId,minTime, maxTime, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/findexceptionlog?optType="+ optType +"&requestType="+requestType +"&optId="+optId+"&keyword="+keyword+ "&minTime=" + minTime + "&maxTime=" + maxTime + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			get: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/getexceptionlog?id=' + id;
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
