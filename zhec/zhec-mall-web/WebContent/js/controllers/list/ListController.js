function ListController($scope, $q, ListService, CommonService) {
	//url参数获取
	var _url = window.location.href;
	if (/cat=\d+/g.test(_url)) {
		$scope.categoryList = _url.split("?")[1].split("=")[1].split(",");
	}
	if ($scope.categoryList == null || $scope.categoryList == undefined || $scope.categoryList == '' || $scope.categoryList.length != 6) {
		window.open(constMallLocation + "/index.html", "_self");
	}
	$scope.paramsCategoryId = $scope.categoryList[0];
	currentPageNo = $scope.categoryList[1];
	$scope.paramsCurrentPageNo = currentPageNo;
	$scope.paramsOrderid = $scope.categoryList[2];
	if ($scope.paramsOrderid < 0 || $scope.paramsOrderid > 3) {
		window.open(constMallLocation + "/index.html", "_self");
	}
	$scope.paramsInstock = $scope.categoryList[3];
	if ($scope.paramsInstock < 0 || $scope.paramsInstock > 1) {
		window.open(constMallLocation + "/index.html", "_self");
	}
	$scope.paramsBrandId = $scope.categoryList[4];
	// decodeURI()该方法可以把中文乱码转换成中文
	$scope.paramsFilterId = decodeURI($scope.categoryList[5]);

	$scope.member = getCookie('loginManager');
	if ($scope.member !== '') {
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
	} else {
		$scope.memberId = 0;
	}

	$scope.isGoodsListEmpty = false;

	//获取商品列表数据
	$scope.find = function(currentPageNo) {
		var defer = $q.defer();
		ListService
			.findGoodsList(1, $scope.paramsCategoryId, currentPageNo, $scope.paramsOrderid, $scope.paramsInstock, $scope.paramsBrandId, $scope.paramsFilterId)
			.then(function(result) {
					$scope.list = result;

					//已经选择的分类项
					$scope.selCategoryTemp = [];
					$scope.selCategoryTemp = result.selectedInfo.selCategory.split("&");
					$scope.selCategory = [];
					for (var i = 0; i < $scope.selCategoryTemp.length; i++) {
						$scope.saveMessage = {};
						$scope.saveMessage.id = $scope.selCategoryTemp[i].split(":")[0];
						$scope.saveMessage.name = $scope.selCategoryTemp[i].split(":")[1];
						$scope.selCategory.push($scope.saveMessage);
					}
					$(".showHide").show();
					//商品列表数据
					if (result.goodsInfo.goods != null && result.goodsInfo.goods != undefined && result.goodsInfo.goods != '' && result.goodsInfo.goods != []) {
						$scope.isGoodsListEmpty = false;
						$scope.goodsList = result.goodsInfo.goods;
						//取得商品id列表
						var goodsIds = '';
						var temp = $scope.goodsList;
						for (var i = 0; i < temp.length; i++) {
							goodsIds = goodsIds + temp[i].id;
							if (i < temp.length - 1) {
								goodsIds = goodsIds + ',';
							}
						}
						//得到动态价格
						if (goodsIds != '') {
							CommonService.getGoodsPrice($scope.memberId, goodsIds, 1, 0, 0, $scope.goodsList);
						}
						//已经选择的品牌
						$scope.selBrand = result.selectedInfo.filterBrand;
						$scope.selBrandStr = JSON.stringify($scope.selBrand);
						//已选择的过滤属性
						$scope.selFilter = result.selectedInfo.filterAttribute;
						$scope.selFilterStr = JSON.stringify($scope.selFilter);
						//未选择的品牌
						$scope.displayBrand = result.displayInfo.brand;
						$scope.displayBrandStr = JSON.stringify($scope.displayBrand);
						//未选择的过滤属性
						$scope.displayFilter = result.displayInfo.filter;
						$scope.displayFilterStr = JSON.stringify($scope.displayFilter);
					} else {
						$scope.isGoodsListEmpty = true;

						CommonService
							.findGoodsRecommend(17, 1, 24)
							.then(function(result) {
								$scope.goodsList = result.data;
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
								if (goodsIds != '') {
									CommonService.getGoodsPrice($scope.memberId, goodsIds, 1, 0, 0, $scope.goodsList);
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

	//商品推荐位
	$scope.goodsrecommend = function() {
		var defer = $q.defer();
		CommonService
			.findGoodsRecommend(12, 1, 5)
			.then(function(result) {
				$scope.recommendList = result.data;
				if (result.data != null && result.data != undefined && result.data != '' && result.data != {}) {
					//对商品数据做处理,提取出来ID
					var goodsIds = '';
					var temp = result.data;
					for (var i = 0; i < temp.length; i++) {
						goodsIds = goodsIds + temp[i].id;
						if (i < temp.length - 1) {
							goodsIds = goodsIds + ',';
						}
					}
					if (goodsIds != '') {
						CommonService.getGoodsPrice($scope.memberId, goodsIds, 1, 0, 0, $scope.recommendList);
					}
				}
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	};

	$scope.isFilterShow = function() {
		return (($scope.displayBrandStr != '' && $scope.displayBrandStr != undefined && $scope.displayBrandStr != null && $scope.displayBrandStr != '{}') || ($scope.displayFilterStr != '' && $scope.displayFilterStr != undefined && $scope.displayFilterStr != null && $scope.displayFilterStr != '{}'));
	};

	$scope.isRxShow = function(num) {
		return num == 1;
	};

	//instock是否有库存，1有0没有



	//初始化
	// $scope.findGoodsList();
	$scope.goodsrecommend();
}

//过滤已选择的筛选属性、自定义过滤器
myApp.filter("selFilterFormat", function() {
	return function(input) {
		var out = '';
		var temp = '';
		out = input.split('&')[0];
		temp = input.split('&')[1].split(':')[1];
		out = out + ':' + temp;
		return out;
	}
});

//过滤未选择的品牌、自定义过滤器
myApp.filter("getValueSplitColon", function() {
	return function(input) {
		var out = "";
		out = input.split(":")[1];
		return out;
	}
});
//过滤未选择的品牌、自定义过滤器
myApp.filter("getIdSplitColon", function() {
	return function(input) {
		var out = '';
		out = input.split(':')[0];
		return out;
	};
});

//添加一个过滤属性、用于拼接url字符串、自定义过滤器
myApp.filter('addSelFilter', function() {
	return function(input, key, paramsFilterId) {
		var out = '';
		var temp = '';
		if (paramsFilterId !== '0') {
			temp = paramsFilterId + '__';
		}
		out = temp + key.split(':')[0] + '_' + input;
		return out;
	};
});

//删除一个过滤属性、用于拼接url字符串、自定义过滤器
myApp.filter('delSelFilter', function() {
	return function(input, key, paramsFilterId) {
		var out = '';
		var temp = '';
		//判断paramsFilterId中是否包含__，没有返回-1，有返回index值
		if (paramsFilterId.indexOf('__') > 0) {
			temp = input.split('&')[1];
			out = paramsFilterId.replace(key, '').replace(temp, '').replace('___', '');
		} else {
			out = '0';
		}
		return out;
	};
});



angular
	.module('listApp')
	.controller('ListController', ListController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.directive('smallcart', smallcart)
	.directive('navigationBar', navigationBar)
	.directive('datalistpager', datalistpager);
