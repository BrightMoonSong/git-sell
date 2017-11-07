function CommonService($http, $q) { //, ngDialog,$timeout
	if (getCookie("loginManager") != '') {
		var member = JSON.parse(getCookie("loginManager")); //获取登录信息
		var userToken = "";
		if (member != "") {
			userToken = member.userToken;
		}
	}
	return {
		//得到商品动态价格
		getGoodsPrice: function(memberId, goodsIds, platform, returnPromotion, returnOriginalPrice,
			goodsList) {
			if (memberId == null || memberId == undefined || memberId == '') {
				memberId = 0;
			}
			var url = ConstBaseLocation + '/goods/getprice?memberId=' + memberId +
				'&goodsIds=' + goodsIds +
				'&platform=' + platform +
				'&returnPromotion=' + returnPromotion +
				'&returnOriginalPrice=' + returnOriginalPrice;
			$http({
				method: 'get',
				url: url
			}).success(function(result) {
				if (result.data != null) {
					for (var i = 0; i < result.data.length; i++) {
						for (var j = 0; j < goodsList.length; j++) {
							if (goodsList[j].id == result.data[i].goodsId) {
								for (var n = 0; n < result.data[i].productPriceList.length; n++) {
									if (result.data[i].productPriceList[n].isSelected == 1) {
										goodsList[j].salesPrice = result.data[i].productPriceList[n].salesPrice;
										goodsList[j].originalPrice = result.data[i].productPriceList[n].originalPrice;
										goodsList[j].productId = result.data[i].productPriceList[n].productId;
									}
								}
							}
						}
					}
				}
			}).error(function(data) {

			});
		},
		//得到商品动态价格，由goodsId拼接
		getGoodsPriceByGoodsId: function(memberId, goodsIds, platform, returnPromotion, returnOriginalPrice,
			goodsList) {
			if (memberId == null || memberId == undefined || memberId == '') {
				memberId = 0;
			}
			var url = ConstBaseLocation + '/goods/getprice?memberId=' + memberId +
				'&goodsIds=' + goodsIds +
				'&platform=' + platform +
				'&returnPromotion=' + returnPromotion +
				'&returnOriginalPrice=' + returnOriginalPrice;
			$http({
				method: 'get',
				url: url
			}).success(function(result) {
				if (result.data != null) {
					for (var i = 0; i < result.data.length; i++) {
						for (var j = 0; j < goodsList.length; j++) {
							if (goodsList[j].goodsId == result.data[i].goodsId) {
								for (var n = 0; n < result.data[i].productPriceList.length; n++) {
									if (result.data[i].productPriceList[n].isSelected == 1) {
										goodsList[j].salesPrice = result.data[i].productPriceList[n].salesPrice;
										goodsList[j].originalPrice = result.data[i].productPriceList[n].originalPrice;
										goodsList[j].productId = result.data[i].productPriceList[n].productId;
									}
								}
							}
						}
					}
				}
			}).error(function(data) {

			});
		},
		//得到商品动态价格，由goodsId拼接
		getGoodsPromptionPrice: function(memberId, goodsIds, platform, returnPromotion, returnOriginalPrice,
			goodsList) {
			if (memberId == null || memberId == undefined || memberId == '') {
				memberId = 0;
			}
			var url = ConstBaseLocation + '/goods/getprice?memberId=' + memberId +
				'&goodsIds=' + goodsIds +
				'&platform=' + platform +
				'&returnPromotion=' + returnPromotion +
				'&returnOriginalPrice=' + returnOriginalPrice;
			$http({
				method: 'get',
				url: url
			}).success(function(result) {
				console.log(result.data)

				if (result.data != null) {
					var totalPrice = 0;
					for (var i = 0; i < result.data.length; i++) {
						for (var j = 0; j < goodsList.length; j++) {
							if (goodsList[j].goodsId == result.data[i].goodsId) {
								for (var n = 0; n < result.data[i].productPriceList.length; n++) {
									if (result.data[i].productPriceList[n].productId == goodsList[j].productId) {
										goodsList[j].salesPrice = result.data[i].productPriceList[n].salesPrice;
										goodsList[j].originalPrice = result.data[i].productPriceList[n].originalPrice;
									}
								}
							}
						}
					}
					return true;
				}
			}).error(function(data) {

			});
		},
		//广告推荐位
		adviertisement: function(advertId, applyType, size) {
			var defer = $q.defer();
			var url = ConstBaseLocation + '/malladvertimage/findwebcommendgoods?advertId=' + advertId + '&applyType=' + applyType + '&size=' + size;
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
		//小购物车
		findCartGoods: function(memberId) {
			var defer = $q.defer();
			var url = ConstBaseLocation + "/cart/shoppingcarts?memberId=" + memberId + "&userToken=" + userToken;
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
		//cookie商品数据
		findCookieGoods: function(cookieIdArr) {
			var defer = $q.defer();
			var url = ConstBaseLocation + "/cart/productinfos?productIds=" + cookieIdArr;
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
		//导航
		navigationBar: function() {
			var defer = $q.defer();
			var url = ConstBaseLocation + "/goods/categorylist";
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
		//专题栏  和  搜索框下的字
		findcommenddata: function() {
			var defer = $q.defer();
			var url = ConstBaseLocation + "/homepage/findcommenddata?applyType=1";
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
		//商品推荐位数据
		findGoodsRecommend: function(commendId, applyType, size) {
			var defer = $q.defer();
			var url = ConstBaseLocation + '/mallcommendgoods/findwebcommendgoods?commendId=' + commendId + '&applyType=' + applyType + '&size=' + size;
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

		/*,
		showAlert: function(message) {
			var dialog = ngDialog.open({
				template: '../../../views/common/promptBox.html',
				className: 'ngdialog-theme-default',
				controller: ['$scope', function($scope) {
					$scope.promptMessage = message;
				}],
			});

			$timeout(function() {
				dialog.close();
			}, 1500);
		},


	//失败提示
		showFail: function(failMessage) {
			var dialog = ngDialog.open({
				template: '<h3>错误提示</h3>' +
					'<p>' + failMessage + '</p>' +
					'<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(1)">关闭</button></div>',
				plain: true,
				closeByDocument: false,
				closeByEscape: false
			});

			$timeout(function() {
				dialog.close();
			}, 1500);
		}*/


	};

}
