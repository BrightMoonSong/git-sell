angular
	.module("managerApp")
	.factory("OrderAllService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/order';
		return {
			//全部订单列表
			find: function(orderNo,carLicenseNo, orderStatus, payStatus, startTimeStr, endTimeStr, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/orders?pageNo=' + pageNo + '&pageSize=' + pageSize;
				if(orderNo) {
					url += "&orderNo=" + orderNo;
				}
				if(carLicenseNo) {
					url += "&carLicenseNo=" + carLicenseNo;
				}
				if(orderStatus) {
					url += "&orderStatus=" + orderStatus;
				}
				if(payStatus) {
					url += "&payStatus=" + payStatus;
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
			//取消订单
			detail: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/getorder/' + id;
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