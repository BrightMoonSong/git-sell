/**
 * 系统用户service定义
 */
app
	.factory('goodsService', function($http, $q) {
		var baseUrl = constWapLapiLocation + '/goods';
    	
		return {
			//商品价格
			getPrice: function(memberId, goodsIds, platform, returnPromotion, showOriginalPrice) {
				var defer = $q.defer();
				var url = constWapLapiLocation + "/goods/getprice?memberId=" + memberId + "&goodsIds=" + goodsIds + "&platform=" + platform + "&returnPromotion=" + returnPromotion + "&returnOriginalPrice=" + showOriginalPrice;
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
				var url = constWapLapiLocation + "/membercollection/ifcollection?memberId=" + memberId + "&goodsId=" + goodsId;
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
				var url = constWapLapiLocation + "/orders/getmemberaddress/" + memberCurrentId;
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
				var url = baseUrl + "/shoppingcarts?memberId=" + memberId;
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
				var url = constWapLapiLocation + '/membercollection/collectiongoods';
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
				var url = constWapLapiLocation + '/area/findareasbypid/' + id;
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
				var url = constWapLapiLocation + '/area/findtoplevelareas';
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
				var url = constWapLapiLocation + '/orders/recipeneed';
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
				var url = constWapLapiLocation + '/malladvertimage/findwebcommendgoods?advertId=24&applyType=1&size=4';
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