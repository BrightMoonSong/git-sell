function BrandlistController($scope, $http, $q, BrandlistServise, showAllGoods, showStockGoods, CommonService) {
	//url参数获取
	var _url = window.location.href;
	if (/brand=\d+/g.test(_url)) {
		$scope.categoryList = _url.split("?")[1].split("=")[1].split(",");
	}
	if ($scope.categoryList == null || $scope.categoryList == undefined || $scope.categoryList == '' || $scope.categoryList.length != 4) {
		window.open(constMallLocation + "/index.html", "_self");
	}

	currentPageNo = $scope.categoryList[0];
	$scope.paramsCurrentPageNo = currentPageNo;
	$scope.paramsOrderid = $scope.categoryList[1];
	if ($scope.paramsOrderid < 0 || $scope.paramsOrderid > 3) {
		window.open(constMallLocation + "/index.html", "_self");
	}
	$scope.paramsInstock = $scope.categoryList[2];
	if ($scope.paramsInstock < 0 || $scope.paramsInstock > 1) {
		window.open(constMallLocation + "/index.html", "_self");
	}
	$scope.paramsBrandId = $scope.categoryList[3];

	$scope.isGoodsListEmpty = false;

	//商品推荐位
	$scope.goodsrecommend = function() {
		CommonService
			.findGoodsRecommend(12, 1, 5)
			.then(function(result) {
				$scope.goodsinleft = result.data;

				//对商品数据做处理,提取出来ID
				var goodsIds = '';
				var temp = result.data;
				for (var i = 0; i < temp.length; i++) {
					goodsIds = goodsIds + temp[i].id;
					if (i < temp.length - 1) {
						goodsIds = goodsIds + ',';
					}
				}
				//得到动态价格
				if (goodsIds !== '') {
					CommonService.getGoodsPrice($scope.memberId, goodsIds, 1, 0, 0, $scope.goodsinleft);
				}

			});
	};
	//获取商品列表数据
	$scope.find = function(currentPageNo) {
		var defer = $q.defer();
		BrandlistServise
			.listbrand(currentPageNo, $scope.paramsOrderid, $scope.paramsInstock, $scope.paramsBrandId)
			.then(function(result) {
					$(".showHide").show();
					if (result.goodsInfo.goods != null && result.goodsInfo.goods != undefined && result.goodsInfo.goods != '' && result.goodsInfo.goods != []) {
						$scope.isGoodsListEmpty = false;
						$scope.goodsinrights = result.goodsInfo;
						$scope.goodsinright = result.goodsInfo.goods;
						//取得商品id列表
						var goodsIds = '';
						var temp = $scope.goodsinright;
						for (var i = 0; i < temp.length; i++) {
							goodsIds = goodsIds + temp[i].id;
							if (i < temp.length - 1) {
								goodsIds = goodsIds + ',';
							}
						}
						//得到动态价格
						if (goodsIds !== '') {
							CommonService.getGoodsPrice($scope.memberId, goodsIds, 1, 0, 0, $scope.goodsinright);
						}
					} else {
						$scope.isGoodsListEmpty = true;

						CommonService
							.findGoodsRecommend(17, 1, 24)
							.then(function(result) {
								$scope.goodsinright = result.data;
								//对商品数据做处理,提取出来ID
								var goodsIds = '';
								var temp = result.data;
								for (var i = 0; i < temp.length; i++) {
									goodsIds = goodsIds + temp[i].id;
									if (i < temp.length - 1) {
										goodsIds = goodsIds + ',';
									}
								}
								//得到动态价格
								if (goodsIds !== '') {
									CommonService.getGoodsPrice($scope.memberId, goodsIds, 1, 0, 0, $scope.goodsinright);
								}

								defer.resolve(result);
							}, function(result) {
								defer.reject(result);
							});
					}

					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	};
	//品牌
	$scope.goodsprodocts = function() {
		BrandlistServise
			.goodsprodoct($scope.paramsBrandId)
			.then(function(result) {
				$scope.product = result.data;
			});
	};

	$scope.isRxShow = function(num) {
		return num == 1;
	};

	//初始化数据
	$scope.goodsrecommend();
	$scope.goodsprodocts();
}

angular
	.module('brandlistApp')
	.controller('BrandlistController', BrandlistController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.directive('datalistpager', datalistpager)
	.directive('smallcart', smallcart)
	.directive('navigationBar', navigationBar);
