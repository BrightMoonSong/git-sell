angular
	.module('managerApp')
	.factory('OrdersPrescriptionOrdersService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/orders';
		return {
			//查询数据
			find: function(pageSize, pageNo, submitStatus, status) {
				var defer = $q.defer();
				var url = baseUrl + "/findrecipeorders?pageSize=" + pageSize + "&pageNo=" + pageNo + "&status=" + status;
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
			//根据id查询一条数据方法
			get: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/getrecipeorder/' + id;
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
			//处方药需求订单留言回复
			reply: function(id, userId, message,imgUrl) {
				var defer = $q.defer();
				var url = baseUrl + "/addreplymessage?id=" + id + "&userId=" + userId + "&message=" + message+"&imgUrl=" + imgUrl;
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
			//处方药审核
			auditing: function(id, status, handleId) {
				var defer = $q.defer();
				var url = baseUrl + "/editorderstatus?id=" + id + "&status=" + status + "&handleId=" + handleId;
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

			//备注
			addmessage: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/addrecipemessageremarks';
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
