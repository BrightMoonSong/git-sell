angular
	.module('managerApp')
	.factory('OrdersPrescriptionMobileOrdersService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/orders';
		return {
			//查询数据
			find: function(pageSize, pageNo, handleStatus) {
				var defer = $q.defer();
				var url = baseUrl + "/findrecipemobile?pageSize=" + pageSize + "&pageNo=" + pageNo + "&handleStatus=" + handleStatus;
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
				var url = baseUrl + '/getrecipemobile/' + id;
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
			//根据不同的客户写备注
			put: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/editrecipemobilestatus';
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
			// //根据 logisticsNumber  查询物流信息
			// getlogistics: function(logisticsNumber, expCode) {
			// 	var defer = $q.defer();
			// 	var url = baseUrl + '/getlogistics?logisticsNumber=' + logisticsNumber + '&expCode=' + expCode;
			// 	$http({
			// 		method: 'get',
			// 		url: url
			// 	}).success(function(data) {
			// 		defer.resolve(data);
			// 	}).error(function(data) {
			// 		defer.reject(data);
			// 	})
			// 	return defer.promise;
			// }


		}
	})
