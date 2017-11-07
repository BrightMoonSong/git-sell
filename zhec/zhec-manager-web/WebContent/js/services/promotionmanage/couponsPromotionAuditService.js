angular
	.module('managerApp')
	.factory('couponsPromotionAuditService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/couponspromotion';
		return {
			//获取商品促销审核列表
			find: function(parmValue, minTime, maxTime, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/auditlist?parmValue=" + parmValue + "&minTime=" + minTime + "&maxTime=" + maxTime + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			//审核 通过
			auditpass: function(id, remark) {
				var defer = $q.defer();
				var url = baseUrl + '/auditpass/' + id + "?remark=" + remark;
				$http({
					method: 'PUT',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//审核 拒绝
			auditfail: function(id, remark) {
				var defer = $q.defer();
				var url = baseUrl + '/auditfail/' + id + "?remark=" + remark;
				$http({
					method: 'PUT',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//获取商品促销审核详情
			auditdetail: function(auditId) {
				var defer = $q.defer();
				var url = baseUrl + '/auditdetail/' + auditId;
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