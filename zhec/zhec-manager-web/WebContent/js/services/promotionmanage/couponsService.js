angular
	.module('managerApp')
	.factory('couponsService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/couponspromotion';
		return {
			//获取商品促销审核列表
			find: function(promotionId, pageSize, pageNo,parmValue) {
				var defer = $q.defer();
				var url = baseUrl + "/coupons?promotionId=" + promotionId + "&parmValue=" + parmValue + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			//添加商品促销审核
			add: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/add';
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
			//获取商品促销审核列表
			auditlist: function() {
				var defer = $q.defer();
				var url = baseUrl + '/auditlist';
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
			//获取商品促销详情
			detail: function(auditId) {
				var defer = $q.defer();
				var url = baseUrl + '/detail/' + auditId;
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
			//单独 发放优惠券 
			release: function(memberLoginId, promotionId) {
				var defer = $q.defer();
				var url = baseUrl + '/release?memberLoginId=' + memberLoginId + "&promotionId=" + promotionId;
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
			//获取优惠券促销列表
			namelist: function(memberLoginId, promotionId) {
				var defer = $q.defer();
				var url = baseUrl + '/namelist';
				$http({
					method: 'GET',
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