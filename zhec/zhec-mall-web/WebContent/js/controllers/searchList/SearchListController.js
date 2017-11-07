function SearchListController($scope, $http, $q, SearchListService, CommonService) {
	//url参数获取
	var _url = window.location.href;
	if (/search=\d+/g.test(_url)) {
		$scope.categoryList = _url.split("?")[1].split("=")[1].split(",");
	}
	if ($scope.categoryList == null || $scope.categoryList == undefined || $scope.categoryList == '' || $scope.categoryList.length != 7) {
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
	$scope.paramsKeyWord = decodeURI($scope.categoryList[6]);

	$scope.isGoodsListEmpty = false;

	//获取商品列表数据
	$scope.find = function(currentPageNo) {
		var defer = $q.defer();
		SearchListService
			.findGoodsList($scope.paramsKeyWord, 1, $scope.paramsCategoryId, currentPageNo, $scope.paramsOrderid, $scope.paramsInstock, $scope.paramsBrandId, $scope.paramsFilterId)
			.then(function(result) {
					$(".showHide").show();
					if (result.goodsInfo != null && result.goodsInfo != undefined && result.goodsInfo.goods != null && result.goodsInfo.goods != undefined && result.goodsInfo.goods != '' && result.goodsInfo.goods != []) {
						$scope.isGoodsListEmpty = false;
						$scope.list = result;
						//商品列表数据
						$scope.goodsList = result.goodsInfo.goods;
						//取得商品id列表
						var goodsIds = '';
						if ($scope.goodsList !== null || $scope.goodsList !== undefined || $scope.goodsLists !== '') {
							var temp = $scope.goodsList;
							for (var i = 0; i < temp.length; i++) {
								goodsIds = goodsIds + temp[i].id;
								if (i < temp.length - 1) {
									goodsIds = goodsIds + ',';
								}
							}
							//得到动态价格
							if (goodsIds !== '') {
								CommonService.getGoodsPrice($scope.memberId, goodsIds, 1, 0, 0, $scope.goodsList);
							}
						}

						//已选择的分类
						$scope.selCategoryStr = JSON.stringify(result.selectedInfo.selCategory);
						if ($scope.selCategoryStr != null && $scope.selCategoryStr != undefined && $scope.selCategoryStr != '' && $scope.selCategoryStr != '{}') {
							$scope.selCategoryTemp = [];
							$scope.selCategoryTemp = result.selectedInfo.selCategory.split("&");
							for (var i = $scope.selCategoryTemp.length - 1; i < $scope.selCategoryTemp.length; i++) {
								$scope.selCategory = $scope.selCategoryTemp[i].split(":")[1];
							}
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
						//未选择的分类
						$scope.displayCate = result.displayInfo.cate;
						$scope.displayCateStr = JSON.stringify($scope.displayCate);
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
								if (goodsIds !== '') {
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
					CommonService.getGoodsPrice($scope.memberId, goodsIds, 1, 0, 0, $scope.recommendList);
				}

				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	};

	$scope.isFilterShow = function() {
		return (($scope.displayBrandStr != '' && $scope.displayBrandStr != undefined && $scope.displayBrandStr != null && $scope.displayBrandStr != '{}') || ($scope.displayFilterStr != '' && $scope.displayFilterStr != undefined && $scope.displayFilterStr != null && $scope.displayFilterStr != '{}') || ($scope.displayCateStr != '' && $scope.displayCateStr != undefined && $scope.displayCateStr != null && $scope.displayCateStr != '{}'));
	};

	$scope.isRxShow = function(num) {
		return num == 1;
	};

	//初始化
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
// myApp.filter("selFilterFormat", function() {
// 	return function(input) {
// 		var out = "";
// 		out = input.replace("&", ":");
// 		return out;
// 	}
// });

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

//添加一个过滤属性、自定义过滤器
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

//删除一个过滤属性、自定义过滤器
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
	.module('searchListApp')
	.controller('SearchListController', SearchListController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.directive('smallcart', smallcart)
	.directive('navigationBar', navigationBar)
	.directive('datalistpager', datalistpager);
