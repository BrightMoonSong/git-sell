angular
	.module('managerApp')
	.factory('OrdersALLOrdersService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/orders';
		return {
			//查询数据
			find: function(orderStatus, memberName, orderSn, minTime, maxTime, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/allorders?memberName=" + memberName + "&orderStatus=" + orderStatus + "&orderSn=" + orderSn + "&minTime=" + minTime + "&maxTime=" + maxTime + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			},
			//修改数据
			edit: function(brand) {
				var defer = $q.defer();
				var url = baseUrl + "/allorders";
				$http({
					method: 'put',
					url: url,
					data: brand
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//新增数据
			add: function(res) {
				var defer = $q.defer();
				var url = baseUrl + "/allorders";
				$http({
					method: 'post',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//查询订单状态信息  
			findallstatus: function() {
				var defer = $q.defer();
				var url = baseUrl + '/findallstatus';
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