angular
	.module("managerApp")
	.factory("CarownerRegnochecksService", function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/carowner';
		var shipperBaseUrl = constMapiLocation + '/shipper';
		return {
			//注册未审核用户列表
			carfind: function(phone, startTime, pageNo, pageSize) {
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
			//删除
			cardetel:function(carOwnerId,status){
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + carOwnerId +'?status=' + status;
				$http({
					method:'put',
					url:url
				}).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				})
				return defer.promise;
			},
			//注册未审核用户列表
			shipperfind: function(phone, startTime, pageNo, pageSize) {
				var defer = $q.defer();
				var url = shipperBaseUrl + '/regnochecks?pageNo=' + pageNo + '&pageSize='+pageSize;
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
			shipperenable: function(id,status) {
				var defer = $q.defer();
				var url = shipperBaseUrl + '/updatestatus/' + id + '?status=' + status;
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
