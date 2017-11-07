/**
 * 系统用户service定义
 */
angular
	.module('goodsApp')
	.factory('goodsService', function($http, $q, constBaseLocation) {
		var baseUrl = constBaseLocation + '/goods';
		var userToken = "";
    	if (getCookie("loginManager") != '') {
			var member = JSON.parse(getCookie("loginManager")); //获取登录信息
			
			if (member != "") {
				userToken = member.userToken;
			}
		}
		return {
			//商品价格
			getPrice: function(memberId, goodsIds, platform, returnPromotion, showOriginalPrice) {
				var defer = $q.defer();
				var url = constBaseLocation + "/goods/getprice?memberId=" + memberId + "&goodsIds=" + goodsIds + "&platform=" + platform + "&returnPromotion=" + returnPromotion + "&returnOriginalPrice=" + showOriginalPrice;
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
			//是否收藏
			ifCollect: function(memberId, goodsId) {
				var defer = $q.defer();
				var url = constBaseLocation + "/membercollection/ifcollection?memberId=" + memberId + "&goodsId=" + goodsId;
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
			//商品详情
			goodsDetail: function(goodsId) {
				var defer = $q.defer();
				var url = baseUrl + "/getgoodsdetail/" + goodsId;
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
			//获取用户信息
			memeberDetail: function(memberCurrentId) {
				var defer = $q.defer();
				var url = constBaseLocation + "/orders/getmemberaddress/" + memberCurrentId + "?userToken=" + userToken;
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
			//查询数据方法
			find: function(memberId) {
				var defer = $q.defer();
				var url = baseUrl + "/shoppingcarts?memberId=" + memberId + "&userToken=" + userToken;
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
			//加入收藏
			joinCollection: function(saveMessage) {
				var defer = $q.defer();
				var url = constBaseLocation + '/membercollection/collectiongoods' + "?userToken=" + userToken;
				$http({
					method: 'post',
					url: url,
					data: saveMessage
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//根据pid获取下级区域列表
			findareasbypid: function(id) {
				var defer = $q.defer();
				var url = constBaseLocation + '/area/findareasbypid/' + id;
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
			//获取一级区域列表
			findtoplevelareas: function() {
				var defer = $q.defer();
				var url = constBaseLocation + '/area/findtoplevelareas';
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
			//提交申请
			submitInterface: function(message) {
				var defer = $q.defer();
				var url = constBaseLocation + '/orders/recipeneed' + "?userToken=" + userToken;
				$http({
					method: 'post',
					url: url,
					data: message
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//广告推荐位
			findRecommend: function() {
				var defer = $q.defer();
				var url = constBaseLocation + '/malladvertimage/findwebcommendgoods?advertId=24&applyType=1&size=4';
				$http({
					method: 'get',
					url: url,
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//移除收藏
			editgoodscollection: function(memberId,goodsId) {
				var defer = $q.defer();
				var url = baseUrl + '/editgoodscollection?memberId='+memberId+"&goodsId="+goodsId;
				$http({
					method: 'get',
					url: url,
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
		}
	});
