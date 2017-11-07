function ListController($scope, $q, ListService, CommonService, constPageSize, $stateParams) {
	$scope.crruntSelBrand = ''; //当前选中的品牌
	$scope.crruntSelFilter = []; //当前选中的过滤属性
	$scope.crruntSelMore = []; //当前显示更多的数据
	$scope.isGoodsListEmpty = false;

	$scope.paramsCategoryId = $stateParams.paramsCategoryId;
	$scope.paramsOrderid = $stateParams.paramsOrderid;
	$scope.paramsInstock = $stateParams.paramsInstock;
	$scope.paramsBrandId = $stateParams.paramsBrandId;
	$scope.paramsFilterId = decodeURI($stateParams.paramsFilterId);

	// if ($scope.paramsCategoryId == undefined || $scope.paramsCategoryId == null || $scope.paramsCategoryId == '') {
	// 	window.open(constWapLocation + "/index.html", "_self");
	// }
	//
	// if ($scope.paramsBrandId == undefined || $scope.paramsBrandId == null || $scope.paramsBrandId == '') {
	// 	window.open(constWapLocation + "/index.html", "_self");
	// }
	//
	// if ($scope.paramsOrderid < 0 || $scope.paramsOrderid > 3) {
	// 	window.open(constWapLocation + "/index.html", "_self");
	// }
	// if ($scope.paramsInstock < 0 || $scope.paramsInstock > 1) {
	// 	window.open(constWapLocation + "/index.html", "_self");
	// }

	//从cookie中获取memberId
	$scope.member = getCookie('loginManager');
	if ($scope.member !== '') {
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
	} else {
		$scope.memberId = 0;
	}

	//分页
	$scope.allPage = 0;
	$scope.currentPage = 1;
	$scope.goodsList = [];
	$scope.myFvpSwiper = ""
	//	$scope.layoutDone = function(){
	//swiper定义
	$scope.myFvpSwiper = new Swiper('.swiper-container-fvp', {
		// noSwiping: true,
		//							 autoHeight: true, //enable auto height
		observer: true,
		observeParents: true,
	});

	$scope.myFvpSwiper.detachEvents() //阻止swiper滑动
	//	}


	$scope.slideTo = function(num) {
		$scope.myFvpSwiper.slideTo(num);
		$("body,html").animate({
			scrollTop: 0
		}, 0);
	}

	$scope.slideToWithTime = function(num, time) {
		$scope.myFvpSwiper.slideTo(num, time);
		$("body,html").animate({
			scrollTop: 0
		}, 0);
	};

	//点击搜索框
	$scope.gotoSearch = function() {
		$scope.myFvpSwiper.slideTo(2, 0);
		$(".ng-pristine").focus();
	};

	//获取商品列表数据
	$scope.find = function(currentPageNo) {
		var defer = $q.defer();
		ListService
			.findGoodsList(2, $scope.paramsCategoryId, currentPageNo, $scope.paramsOrderid, $scope.paramsInstock, $scope.paramsBrandId, $scope.paramsFilterId)
			.then(function(result) {
					$scope.totalSize = result.totalSize;
					//已经选择的分类项
					$scope.selCategoryTemp = [];
					$scope.selCategory = [];
					if (result.selectedInfo.selCategory != undefined && result.selectedInfo.selCategory != null && result.selectedInfo.selCategory != '') {
						var temp = JSON.stringify(result.selectedInfo.selCategory);
						$scope.selCategoryTemp = temp.split("&");

						for (var i = 0; i < $scope.selCategoryTemp.length; i++) {
							$scope.saveMessage = {};
							$scope.saveMessage.id = $scope.selCategoryTemp[i].split(":")[0];
							$scope.saveMessage.name = $scope.selCategoryTemp[i].split(":")[1];
							$scope.selCategory.push($scope.saveMessage);
						}
						$(".showHide").show();
					}
					//商品列表数据
					//分页计算
					$scope.allPage = result.totalSize / constPageSize;
					var re = /\d+\.[0-9]/g; //判断数字是否为小数
					if (re.test($scope.allPage)) {
						$scope.allPage = Number($scope.allPage.toString().split(".")[0]) + 1
					}

					if (result.goodsInfo.goods != null && result.goodsInfo.goods != undefined && result.goodsInfo.goods != '' && result.goodsInfo.goods != []) {
						// $scope.isGoodsListEmpty = false;
						var temp = result.goodsInfo.goods;
						for (var i = 0; i < temp.length; i++) {
							$scope.goodsList.push(temp[i])
						}
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
						if ($scope.selBrandStr != undefined && $scope.selBrandStr != null && $scope.selBrandStr != '') {
							for (key in $scope.selBrand) {
								$scope.crruntSelBrand = key + ":" + $scope.selBrand[key];
							}
						} else {
							$scope.crruntSelBrand = '';
						}
						//已选择的过滤属性
						$scope.selFilter = result.selectedInfo.filterAttribute;
						$scope.selFilterStr = JSON.stringify($scope.selFilter);
						if ($scope.selFilterStr != undefined && $scope.selFilterStr != null && $scope.selFilterStr != '') {
							for (key in $scope.selFilter) {
								var temp = key + ":" + $scope.selFilter[key];
								$scope.crruntSelFilter.push(temp);
							}
						} else {
							$scope.crruntSelFilter = [];
						}
						//未选择的品牌
						$scope.displayBrand = result.displayInfo.brand;
						$scope.displayBrandStr = JSON.stringify($scope.displayBrand);
						// console.log($scope.displayBrand);
						//未选择的过滤属性
						$scope.displayFilter = result.displayInfo.filter;
						$scope.displayFilterStr = JSON.stringify($scope.displayFilter);
						// console.log($scope.displayFilter);
					}


					// else {
					// 	// $scope.isGoodsListEmpty = true;
					//
					// 	CommonService
					// 		.findGoodsRecommend(17, 1, 24)
					// 		.then(function(result) {
					// 			$scope.goodsList = result.data;
					// 			//对商品数据做处理,提取出来ID
					// 			var goodsIds = '';
					// 			var temp = result.data;
					// 			for (var i = 0; i < temp.length; i++) {
					// 				goodsIds = goodsIds + temp[i].id;
					// 				if (i < temp.length - 1) {
					// 					goodsIds = goodsIds + ',';
					// 				}
					// 			}
					// 			//得到动态价格
					// 			if (goodsIds != '') {
					// 				CommonService.getGoodsPrice($scope.memberId, goodsIds, 1, 0, 0, $scope.goodsList);
					// 			}
					//
					// 			defer.resolve(result);
					// 		}, function(result) {
					// 			defer.reject(result);
					// 		});
					//
					// }
					defer.resolve(result);

				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	};

	//判断是否到底部
	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();　　
		var scrollHeight = $(document).height();　　
		var windowHeight = $(this).height();
		// console.log(scrollTop + windowHeight, scrollHeight);　　
		if (scrollTop + windowHeight + 1 >= scrollHeight) {
			// console.log($scope.allPage, $scope.currentPage);
			$scope.currentPage++;
			if ($scope.allPage != 0 && $scope.currentPage <= $scope.allPage) {
				$scope.loadding = true;

				// $timeout(function() {
				$scope.find($scope.currentPage);
				// }, 1000);
				$scope.scrollFoot = false;
			} else {

				$scope.loadding = false;
			}　　
		}
		if ($scope.currentPage >= $scope.allPage) {
			$scope.scrollFoot = true;
		}
	});

	//搜索中页面取消事件
	$scope.searchCancel = function() {
		$scope.myFvpSwiper.slideTo(0, 0);
		$(".swiper-container-fvp").css({
			"height": $("#needs_head").height() + $(".list_conter_head").height() + $(".orderd_conter_div_ul").height()
		})
		$(".swiper-container-fvp>.swiper-wrapper").css({
			"height": $("#needs_head").height() + $(".list_conter_head").height() + $(".orderd_conter_div_ul").height()
		})
		$("body,html").animate({
			scrollTop: 0
		}, 0);
	};


	//选择品牌时赋值
	$scope.selectBrand = function(brand) {
		$scope.crruntSelBrand = brand;
		// console.log($scope.crruntSelBrand);
	};

	//判断品牌是否是选中状态
	$scope.isBrandSelected = function(brand) {
		return brand === $scope.crruntSelBrand;
	};

	//选择筛选属性时赋值
	$scope.selectFliter = function(key, filter) {
		var temp = key + "&" + filter;
		var flag = false;
		for (var i = 0; i < $scope.crruntSelFilter.length; i++) {
			if (key === $scope.crruntSelFilter[i].split('&')[0]) {
				$scope.crruntSelFilter[i] = temp;
				flag = true;
			}
		}
		if (!flag) {
			$scope.crruntSelFilter.push(temp);
		}
		// console.log($scope.crruntSelFilter);
	};

	//判断筛选属性是否是选中状态
	$scope.isFilterSelected = function(key, filter) {
		var temp = key + "&" + filter;
		for (var i = 0; i < $scope.crruntSelFilter.length; i++) {
			if (temp === $scope.crruntSelFilter[i]) {
				return true;
			}
		}
		return false;
	};

	//选择更多时
	$scope.showMore = function(key) {
		var flag = false;
		for (var i = 0; i < $scope.crruntSelMore.length; i++) {
			if (key === $scope.crruntSelMore[i]) {
				$scope.crruntSelMore.splice(i);
				flag = true;
			}
		}
		if (!flag) {
			$scope.crruntSelMore.push(key);
		}
	};

	//判断更多是否是选中状态
	$scope.isShowMore = function(key) {
		for (var i = 0; i < $scope.crruntSelMore.length; i++) {
			if (key === $scope.crruntSelMore[i]) {
				return true;
			}
		}
		return false;
	};

	//重置筛选页
	$scope.resetFiter = function() {
		$scope.crruntSelBrand = ''; //当前选中的品牌
		$scope.crruntSelFilter = []; //当前选中的过滤属性
		$scope.crruntSelMore = []; //当前显示更多的数据
	};

	//确定筛选条件，跳转页面
	$scope.commitFiter = function() {
		var brand = '0';
		var filter = '0';
		if ($scope.crruntSelBrand !== '') {
			brand = $scope.crruntSelBrand.split(':')[0];
		}
		if ($scope.crruntSelFilter.length !== 0) {
			filter = '';
			for (var i = 0; i < $scope.crruntSelFilter.length; i++) {
				if (i === 0) {
					filter = $scope.crruntSelFilter[i].split('&')[0].split(':')[0] + '_' + $scope.crruntSelFilter[i].split('&')[1];
				} else {
					filter = filter + "__" + $scope.crruntSelFilter[i].split('&')[0].split(':')[0] + '_' + $scope.crruntSelFilter[i].split('&')[1];
				}
			}
		}

		window.open(constWapLocation + "/index.html#/info/list-" + $scope.paramsCategoryId + "-" + $scope.paramsOrderid + "-" + $scope.paramsInstock + "-" + brand + "-" + filter, "_self");
	};


	//加入购物车
	$scope.joinCart = function(goodsId) {
		addGoodsToCart(goodsId, 1, 0);
	}

	$scope.goBack = function() {
		window.open(constWapLocation + "/index.html/main/mine", "_self");
	};

	//是否显示rx标记
	$scope.isRxShow = function(num) {
		return num == 1;
	};

	//instock是否有库存，1有0没有

	//初始化
	$scope.find(1);
	// $scope.goodsrecommend();
}

app.filter("getValueSplitColon", function() {
	return function(input) {
		var out = "";
		out = input.split(":")[1];
		return out;
	}
});

app
	.controller('ListController', ListController)
	.directive('repeatdone', function() {
		return function(scope, element, attrs) {
			if (scope.$last) {
				scope.$eval(attrs.repeatdone);

			}
		}
	})
