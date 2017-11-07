angular
	.module('managerApp')
	.factory('couponsPromotionService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/couponspromotion';
		return {
			//详情
			detail: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/detail/' + id;
				$http({
					method: 'GET',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//商品促销的维护
			maintain: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/maintain/' + id;
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
			//获取商品促销列表
			find: function(parmValue, minTime, maxTime, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/list?parmValue=" + parmValue + "&minTime=" + minTime + "&maxTime=" + maxTime + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			},
			//单独 发放优惠券 
			release: function(memberId, promotionId) {
				var defer = $q.defer();
				var url = baseUrl + '/release?memberId=' + memberId + "&promotionId=" + promotionId;
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
			//批量 发放优惠券 
			batchrelease: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/batchrelease';
				$http({
					method: 'PUT',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//发放优惠券   显示会员列表
			members: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/members';
				$http({
					method: 'POST',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//禁用
			disable: function(promotionId) {
				var defer = $q.defer();
				var url = baseUrl + '/disable?promotionId=' + promotionId;
				$http({
					method: 'PUT',
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