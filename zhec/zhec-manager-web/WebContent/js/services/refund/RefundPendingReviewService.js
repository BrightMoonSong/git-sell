angular
	.module('managerApp')
	.factory('RefundPendingReviewService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/refundorders';
		var baseUrl2 = constMapiLocation + '/orders';
		return {
			//查询数据
			find: function(memberName, orderSn, minTime, maxTime, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/tobeconfirm?memberName=" + memberName + "&orderSn=" + orderSn + "&minTime=" + minTime + "&maxTime=" + maxTime + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			},
			//通过退单审核
			submit: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/submit';
				$http({
					method: 'put',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//拒绝退单审核
			cancel: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/cancel';
				$http({
					method: 'put',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//发送留言
			addmessage: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/addmessage';
				$http({
					method: 'post',
					url: url,
					data: res
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
				var url = baseUrl2 + '/getlogistics?logisticsNumber=' + logisticsNumber + '&expCode=' + expCode;
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