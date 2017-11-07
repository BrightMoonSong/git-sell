angular
	.module("managerApp")
	.factory("ShipperRegnocheckService", function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/shipper';
		return {
			//注册未审核用户列表
			find: function(phone, startTime, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/regnochecks?pageNo=' + pageNo + '&pageSize='+pageSize;
				if(phone) {
					url += '&phone=' + phone;
				}
				if(startTime) {
					url += '&startTime=' + startTime;
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
				//启禁用
			enable: function(id,status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + id + '?status=' + status;
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
		}
	})