/**
 * 系统用户service定义
 */
angular
	.module('CartApp')
	.factory('cartService', function($http, $q, constBaseLocation) {
		var baseUrl = constBaseLocation + '/cart';
		var userToken = "";
    	if (getCookie("loginManager") != '') {
			var member = JSON.parse(getCookie("loginManager")); //获取登录信息
			
			if (member != "") {
				userToken = member.userToken;
			}
		}
		return {
			//获取价格
			getGoodsPrice: function(memberId, goodsIds, platform, returnPromotion, returnOriginalPrice) {
				var defer = $q.defer();
				if (memberId == null || memberId == undefined || memberId == '') {
					memberId = 0;
				}
				var url = constBaseLocation + '/goods/getprice?memberId=' + memberId +
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
			find: function(memberId) {
				var defer = $q.defer();
				var url = baseUrl + "/shoppingcarts?memberId=" + memberId+"&userToken="+userToken;
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
				var url = baseUrl + "/productinfos?productIds=" + productId+"&userToken="+userToken;
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
				var url = baseUrl + '/shoppingcarts/' + cartId + "?count=" + count+"&userToken="+userToken;
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
				var url = baseUrl + '/shoppingcarts/' + id+"?userToken="+userToken;
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
				var url = baseUrl + '/shoppingcarts?cartIds=' + arr+"&userToken="+userToken;
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
				var url = constBaseLocation + '/membercollection/collectiongoods'+"?userToken="+userToken;
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
				var url = baseUrl + '/shoppingcarts'+"?userToken="+userToken;
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
				var url = constBaseLocation + '/mallcommendgoods/findwebcommendgoods?commendId=12&applyType=1&size=5'+"&userToken="+userToken;

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
