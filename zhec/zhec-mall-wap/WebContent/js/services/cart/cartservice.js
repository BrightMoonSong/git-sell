/**
 * 系统用户service定义
 */
app
	.factory('cartService', function($http, $q) {
		var baseUrl = constWapLapiLocation + '/cart';
    	
		return {
			//获取价格
			getGoodsPrice: function(memberId, goodsIds, platform, returnPromotion, returnOriginalPrice) {
				var defer = $q.defer();
				if (memberId == null || memberId == undefined || memberId == '') {
					memberId = 0;
				}
				var url = constWapLapiLocation + '/goods/getprice?memberId=' + memberId +
					'&goodsIds=' + goodsIds +
					'&platform=' + platform +
					'&returnPromotion=' + returnPromotion +
					'&returnOriginalPrice=' + returnOriginalPrice;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.reject(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//查询数据方法
			find: function(memberId,pageNo,pageSize) {
				var defer = $q.defer();
				var url = baseUrl + "/shoppingcarts?memberId=" + memberId+"&pageNo="+pageNo+"&pageSize="+pageSize;
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
			//查询单个商品信息
			findOne: function(productId) {
				var defer = $q.defer();
				var url = baseUrl + "/productinfos?productIds=" + productId;
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
			//改变数量信息
			put: function(cartId, count) {
				var defer = $q.defer();
				var url = baseUrl + '/shoppingcarts/' + cartId + "?count=" + count;
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
			//删除单个
			delete: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/shoppingcarts/' + id;
				$http({
					method: 'delete',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//删除多个
			deleteMore: function(arr) {
				var defer = $q.defer();
				var url = baseUrl + '/shoppingcarts?cartIds=' + arr;
				$http({
					method: 'delete',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//cookie中商品展示
			findCookieGoods: function(arr) {
				var defer = $q.defer();
				var url = baseUrl + '/productinfos?productIds=' + arr;
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
			//移入收藏
			membercollection: function(collectionGoods) {
				var defer = $q.defer();
				var url = constWapLapiLocation + '/membercollection/collectiongoods';
				$http({
					method: 'post',
					url: url,
					data: collectionGoods
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			pay: function(payGoods) {
				var defer = $q.defer();
				var url = baseUrl + '/shoppingcarts';
				$http({
					method: 'put',
					url: url,
					data: payGoods
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			recommend: function() {
				var defer = $q.defer();
				var url = constWapLapiLocation + '/mallcommendgoods/findwebcommendgoods?commendId=12&applyType=1&size=5';

				$http({
					method: 'get',
					url: url,
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			}
		}
	});
