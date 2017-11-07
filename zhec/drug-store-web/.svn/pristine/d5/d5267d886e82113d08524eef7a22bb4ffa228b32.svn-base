angular
	.module('managerApp')
	.factory('OrdersDeliveryService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/order';
		var drugstoreschain = constMapiLocation + '/drugstoreschain';
		var drugstore = constMapiLocation + '/drugstore';
		var goodsappraisalBaseUrl = constMapiLocation + '/goodsappraisal';
		return {
			//获取订单列表
			find: function(orderNo, deliveryName, storeId, status, orderStatus, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/finddeliveryorders?pageSize=" + pageSize + "&pageNo=" + pageNo + "&status=" + status;
				if(storeId) {
					url += "&storeId=" + storeId;
				}
				if(orderNo) {
					url += "&orderNo=" + orderNo;
				}
				if(deliveryName) {
					url += "&deliveryName=" + deliveryName;
				}
				if(orderStatus) {
					url += "&orderStatus=" + orderStatus;
				}
				if(orderStatus === 0) {
					url += "&orderStatus=" + orderStatus;
				}
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
			//根据ID获取订单详情
			getinfo: function(id) {
				var defer = $q.defer();
				var url = baseUrl + "/getinfo/" + id;
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
			//根据ID获取获取订单操作记录
			findoperatelist: function(orderId) {
				var defer = $q.defer();
				var url = baseUrl + "/findoperatelist?orderId=" + orderId;
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
			//所有连锁店列表
			drugfindall: function() {
				var defer = $q.defer();
				var url = drugstoreschain + '/findall';
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//根据连锁店ID列出所有连锁店子药店列表
			drugstoreById: function(chainId) {
				var defer = $q.defer();
				var url = drugstore + '/findall?chainId=' + chainId;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//完成订单
			complete: function(orderId, userId, remark) {
				var defer = $q.defer();
				var url = baseUrl + '/complete/' + orderId + '?userId=' + userId + "&remark=" + remark;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//确认订单
			confirm: function(orderId, userId, remark) {
				var defer = $q.defer();
				var url = baseUrl + '/confirm/' + orderId + '?userId=' + userId + "&remark=" + remark;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//分配配送员
			dispatcher: function(orderId, userId, storeUserId, remark) {
				var defer = $q.defer();
				var url = baseUrl + '/dispatcher/' + orderId + '?userId=' + userId + "&storeUserId=" + storeUserId + "&remark=" + remark;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//拒绝接单
			refuse: function(orderId, userId, remark) {
				var defer = $q.defer();
				var url = baseUrl + '/refuse/' + orderId + '?userId=' + userId + "&remark=" + remark;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//订单派送中
			shipped: function(orderId, userId, remark) {
				var defer = $q.defer();
				var url = baseUrl + '/shipped/' + orderId + '?userId=' + userId + "&remark=" + remark;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//订单派送中
			shipped: function(orderId, userId, remark) {
				var defer = $q.defer();
				var url = baseUrl + '/shipped/' + orderId + '?userId=' + userId + "&remark=" + remark;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//根据商品ID和订单ID获取评价详情
			findinfos: function(orderId, goodsId) {
				var defer = $q.defer();
				var url = goodsappraisalBaseUrl + '/findinfos?goodsId=' + goodsId + '&orderId=' + orderId;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//发表回复
			updateinfo: function(res) {
				var defer = $q.defer();
				var url = goodsappraisalBaseUrl + '/updateinfo';
				$http({
					method: 'PUT',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			}
		}
	});