angular
	.module('managerApp')
	.factory('OrdersTobeCanceledOrdersService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/orders';
		return {
			//查询数据
			find: function(memberName, orderSn, minTime, maxTime, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/tobecanceledorders?memberName=" + memberName + "&orderSn=" + orderSn + "&minTime=" + minTime + "&maxTime=" + maxTime + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			//拒绝
			refused: function(res) {
				var defer = $q.defer();
				$http({
					method: 'put',
					url: baseUrl + "/refused",
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//取消
			cancel: function(res) {
				var defer = $q.defer();
				$http({
					method: 'put',
					url: baseUrl + "/cancel",
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//根据id查询一条数据方法
			get: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/ordersinfo/' + id;
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
			//根据 logisticsNumber  查询物流信息
			getlogistics: function(logisticsNumber, expCode) {
				var defer = $q.defer();
				var url = baseUrl + '/getlogistics?logisticsNumber=' + logisticsNumber + '&expCode=' + expCode;
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