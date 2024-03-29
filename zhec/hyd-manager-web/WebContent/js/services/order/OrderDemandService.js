angular
	.module("managerApp")
	.factory("OrderDemandService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/order';
		return {
			//全部订单列表
			find: function(orderNo, startTimeStr, endTimeStr, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/demandorders?pageNo=' + pageNo + '&pageSize=' + pageSize;
				if(orderNo) {
					url += "&orderNo=" + orderNo;
				}
				if(startTimeStr) {
					url += "&startTimeStr=" + startTimeStr;
				}
				if(endTimeStr) {
					url += "&endTimeStr=" + endTimeStr;
				}
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
			//取消订单
			cancel: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/cancel/' + id;
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
			//订单详情
			detail: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/getdemand/' + id;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			}
		}
	})