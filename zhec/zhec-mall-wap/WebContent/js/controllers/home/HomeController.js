/**
 * controller定义
 */
function HomeController($rootScope, $scope, $q, HomeService, CommonService, $timeout) {
	$rootScope.clickPage = 0;
	$scope.isLogin = null;
	if (getCookie('formToken')) {
		$scope.isLogin = true;
	} else {
		$scope.isLogin = false;
	}
	var mySwiper = null;
	var mySwiperScrollH = null;
	var myGoodsAdSwiper = null
	$scope.layoutDone = function() {
		mySwiper = new Swiper('.swiper-container-swiper', {
			loop: true,
			// loopAdditionalSlides: 0,
			autoplay: 2000,
			// slidesPerColumn: 1,
			// loopedSlides: 6,
			// galleryTop: true,
			// galleryThumbs: true,
			autoplayDisableOnInteraction: false, //自动播放，不会因为手动滑动而停止
			observer: true,
			observeParents: true,
			//			 observer:true,//修改swiper自己或子元素时，自动初始化swiper
			//			 observeParents:true,//修改swiper的父元素时，自动初始化swiper
			// 如果需要分页器
			pagination: '.swiper-pagination'
		});
		myGoodsAdSwiper = new Swiper('.swiper-container-goods-ad', {
			// loop: true,
			// autoplay: 2000,
			// autoplayDisableOnInteraction: false,
			observer: true,
			observeParents: true,
			//			 observer:true,//修改swiper自己或子元素时，自动初始化swiper
			//			 observeParents:true,//修改swiper的父元素时，自动初始化swiper
			// 如果需要分页器
			pagination: '.swiper-pagination'
		});
		mySwiperScrollH = new Swiper('.swiper-container-scroll-h', {
			// scrollbar: '.swiper-scrollbar',
			// scrollbarHide: true,
			slidesPerView: 'auto',
			// centeredSlides: false,
			observer: true,
			observeParents: true,
		});
		mySwiperScrollH.slideTo(0);
	}



	//外层的swiper
	$scope.myFvpSwiper = new Swiper('.swiper-container-fvp', {
		// noSwiping: true,
		// autoHeight: true, //enable auto height
		observer: true,
		observeParents: true,
	});

	$scope.myFvpSwiper.detachEvents() //阻止swiper滑动

	$scope.slideTo = function(num) {
		$scope.myFvpSwiper.slideTo(num);
		$("body,html").animate({
			scrollTop: 0
		}, 0);
	};

	//点击搜索框
	$scope.gotoSearch = function() {
		$scope.myFvpSwiper.slideTo(2, 0);
		$(".ng-pristine").focus();
	};

	//首页
	//首页广告推荐位
	$scope.findAdvertisement = function(advertId, applyType, size, n) {
		CommonService
			.adviertisement(advertId, applyType, size)
			.then(function(result) {
					switch (n) {
						case 25: //专题图片
							$scope.topicList = result.data;
							// console.log("专题数据");
							// console.log($scope.topicList);
							break;
						case 26: //轮播图
							$scope.bannerList = result.data;
							// console.log("轮播数据");
							// console.log($scope.bannerList);
							break;
						case 27: //每日推荐
							$scope.recommendList = result.data;
							// console.log("每日推荐");
							// console.log($scope.recommendList);
							break;
						case 28: //1层广告位
							$scope.f1adList = result.data;
							// console.log("1层广告位");
							// console.log($scope.f1adList);
							break;
						default:
							break;
					}
				},
				function(result) {

				});
	};
	//首页商品推荐位
	$scope.findGoodsRecommend = function(commendId, applyType, size, n) { //commendId推荐位ID，applyType使用平台，size数量
		CommonService
			.findGoodsRecommend(applyType, commendId, size)
			.then(function(result) {
				$scope.product = result.data;
				switch (n) {
					case 13:
						$scope.f1goodsList = result.data;
						// console.log("1层商品位");
						// console.log($scope.f1goodsList);
						//取得商品id列表
						var f1goodsId = '';
						var f1Temp = $scope.f1goodsList;
						for (var i = 0; i < f1Temp.length; i++) {
							f1goodsId = f1goodsId + f1Temp[i].id;
							if (i < f1Temp.length - 1) {
								f1goodsId = f1goodsId + ',';
							}
						}
						//得到动态价格
						if (f1goodsId != '') {
							CommonService.getGoodsPrice($scope.memberId, f1goodsId, 1, 0, 0, $scope.f1goodsList);
						}
						break;
					case 15:
						$scope.commendGoodsList = result.data;
						// console.log("猜你喜欢商品");
						// console.log($scope.commendGoodsList);
						//取得商品id列表
						var commendGoodsId = '';
						var commendTemp = $scope.commendGoodsList;
						for (var i = 0; i < commendTemp.length; i++) {
							commendGoodsId = commendGoodsId + commendTemp[i].id;
							if (i < commendTemp.length - 1) {
								commendGoodsId = commendGoodsId + ',';
							}
						}
						//得到动态价格
						if (commendGoodsId != '') {
							CommonService.getGoodsPrice($scope.memberId, commendGoodsId, 1, 0, 0, $scope.commendGoodsList);
						}
						break;

					default:
						break;
				}
			});
	}

	//得到品牌数据
	$scope.findBrands = function(floorId, applyType, size) {
		HomeService
			.findBrands(floorId, applyType, size)
			.then(
				function(result) {
					$scope.brandsList = result.data; //将获取到的数据进行赋值，与DOM进行数据绑定
					// console.log("品牌数据");
					// console.log($scope.brandsList);
				},
				function(result) {

				}
			);
	};

	$scope.gotoLogin = function() {
		$scope.currentUrl = window.location.href; //获取当前路径
		delCookie("prePage");
		setCookie("prePage", "" + $scope.currentUrl, "1");
		window.open(constWapLocation + "/index.html#/info/login", "_self");
	};

	$scope.gotoMine = function() {
		window.open(constWapLocation + "/index.html#/main/mine", "_self");
	};

	//是否显示rx标记
	$scope.isRxShow = function(num) {
		return num == 1;
	};
	//取消搜索
	$scope.searchCancel = function() {
		$scope.slideTo(0, 0);
	};

	//初始化
	// $scope.findBanner();
	$scope.findBrands(10, 2, 6);
	// $scope.findFloorAds();
	// $scope.findFloorGoods();
	// $scope.findGuess();
	// $scope.findRecommend();

	//广告位advertId, applyType, size, n
	//轮播图
	$scope.findAdvertisement(26, 2, 6, 26);
	//专题页
	$scope.findAdvertisement(25, 2, 2, 25);
	//每日推荐
	$scope.findAdvertisement(27, 2, 5, 27);
	//楼层广告位
	$scope.findAdvertisement(28, 2, 2, 28);
	// $scope.findAdvertisement(8, 2, 2, 8);
	// $scope.findAdvertisement(10, 2, 2, 10);
	//楼层推荐商品
	$scope.findGoodsRecommend(13, 2, 6, 13); //1楼
	// $scope.findGoodsRecommend(2, 1, 4, 2);
	// $scope.findGoodsRecommend(3, 1, 4, 3);
	// 猜你喜欢
	$scope.findGoodsRecommend(15, 2, 6, 15);
}
app
	.directive('repeatdone', function() {
		return function(scope, element, attrs) {
			if (scope.$last) { // all are rendered
				scope.$eval(attrs.repeatdone);

			}
		}
	})
	.controller('HomeController', HomeController)
