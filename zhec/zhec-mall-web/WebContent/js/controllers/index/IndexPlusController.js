function IndexPlusController($scope, $q, $http, IndexPlusService, CommonService) {
	$scope.dataEntity = {}; //用来存储修改或者添加的数据
	$scope.member = getCookie('loginManager');
	//首页
	//首页广告推荐位
	$scope.advertisement = function(advertId, applyType, size, n) {
		IndexPlusService
			.advertisement(advertId, applyType, size)
			.then(function(result) {
				switch (n) {
					case 1:
						$scope.carousel = result.data;
						break;
					case 2:
						$scope.service = result.data;
						break;
					case 3:
						$scope.recommend = result.data;
						break;
					case 4:
						$scope.advert = result.data[0];
						break;
					case 6:
						$scope.familypr = result.data;
						break;
					case 8:
						$scope.olderpr = result.data;
						break;
					case 10:
						$scope.manpr = result.data;
						break;
					case 12:
						$scope.womenpr = result.data;
						break;
					case 14:
						$scope.motherpr = result.data;
						break;
					case 16:
						$scope.lifepr = result.data;
						break;
					case 18:
						$scope.treatmentpr = result.data;
						break;
					case 20:
						$scope.bisexualpr = result.data;
						break;
					case 22:
						$scope.personalpr = result.data;
						break;
					default:
						break;
				}
			});
	}
	//首页商品推荐位
	$scope.indexprodect = function(commendId, applyType, size, n) {
		IndexPlusService
			.indexprodect(commendId, applyType, size)
			.then(function(result) {
				$scope.product = result.data;
				switch (n) {
					case 1:
						$scope.familysh = result.data;
						//取得商品id列表
						var goodsIdsFamily = '';
						var tempFamily = $scope.familysh;
						for (var i = 0; i < tempFamily.length; i++) {
							goodsIdsFamily = goodsIdsFamily + tempFamily[i].id;
							if (i < tempFamily.length - 1) {
								goodsIdsFamily = goodsIdsFamily + ',';
							}
						}
						//得到动态价格
						CommonService.getGoodsPrice($scope.memberId, goodsIdsFamily, 1, 0, 0, $scope.familysh);
						break;
					case 2:
						$scope.oldersh = result.data;
						//取得商品id列表
						var goodsIdsOlder = '';
						var tempOlder = $scope.oldersh;
						for (var i = 0; i < tempOlder.length; i++) {
							goodsIdsOlder = goodsIdsOlder + tempOlder[i].id;
							if (i < tempOlder.length - 1) {
								goodsIdsOlder = goodsIdsOlder + ',';
							}
						}
						//得到动态价格
						CommonService.getGoodsPrice($scope.memberId, goodsIdsOlder, 1, 0, 0, $scope.oldersh);
						break;
					case 3:
						$scope.mansh = result.data;
						//取得商品id列表
						var goodsIdsMan = '';
						var tempMan = $scope.mansh;
						for (var i = 0; i < tempMan.length; i++) {
							goodsIdsMan = goodsIdsMan + tempMan[i].id;
							if (i < tempMan.length - 1) {
								goodsIdsMan = goodsIdsMan + ',';
							}
						}
						//得到动态价格
						CommonService.getGoodsPrice($scope.memberId, goodsIdsMan, 1, 0, 0, $scope.mansh);
						break;
					case 4:
						$scope.womensh = result.data;
						//取得商品id列表
						var goodsIdsWomen = '';
						var tempWomen = $scope.womensh;
						for (var i = 0; i < tempWomen.length; i++) {
							goodsIdsWomen = goodsIdsWomen + tempWomen[i].id;
							if (i < tempWomen.length - 1) {
								goodsIdsWomen = goodsIdsWomen + ',';
							}
						}
						//得到动态价格
						CommonService.getGoodsPrice($scope.memberId, goodsIdsWomen, 1, 0, 0, $scope.womensh);
						break;
					case 5:
						$scope.mothersh = result.data;
						//取得商品id列表
						var goodsIdsMother = '';
						var tempMother = $scope.mothersh;
						for (var i = 0; i < tempMother.length; i++) {
							goodsIdsMother = goodsIdsMother + tempMother[i].id;
							if (i < tempMother.length - 1) {
								goodsIdsMother = goodsIdsMother + ',';
							}
						}
						//得到动态价格
						CommonService.getGoodsPrice($scope.memberId, goodsIdsMother, 1, 0, 0, $scope.mothersh);
						break;
					case 6:
						$scope.lifesh = result.data;
						//取得商品id列表
						var goodsIdsLife = '';
						var tempLife = $scope.lifesh;
						for (var i = 0; i < tempLife.length; i++) {
							goodsIdsLife = goodsIdsLife + tempLife[i].id;
							if (i < tempLife.length - 1) {
								goodsIdsLife = goodsIdsLife + ',';
							}
						}
						//得到动态价格
						CommonService.getGoodsPrice($scope.memberId, goodsIdsLife, 1, 0, 0, $scope.lifesh);
						break;
					case 7:
						$scope.treatmentsh = result.data;
						//取得商品id列表
						var goodsIdsTrearment = '';
						var tempTrearment = $scope.treatmentsh;
						for (var i = 0; i < tempTrearment.length; i++) {
							goodsIdsTrearment = goodsIdsTrearment + tempTrearment[i].id;
							if (i < tempTrearment.length - 1) {
								goodsIdsTrearment = goodsIdsTrearment + ',';
							}
						}
						//得到动态价格
						CommonService.getGoodsPrice($scope.memberId, goodsIdsTrearment, 1, 0, 0, $scope.treatmentsh);
						break;
					case 8:
						$scope.bisexualsh = result.data;
						//取得商品id列表
						var goodsIdsBisexual = '';
						var tempBisexual = $scope.bisexualsh;
						for (var i = 0; i < tempBisexual.length; i++) {
							goodsIdsBisexual = goodsIdsBisexual + tempBisexual[i].id;
							if (i < tempBisexual.length - 1) {
								goodsIdsBisexual = goodsIdsBisexual + ',';
							}
						}
						//得到动态价格
						CommonService.getGoodsPrice($scope.memberId, goodsIdsBisexual, 1, 0, 0, $scope.bisexualsh);
						break;
					case 9:
						$scope.personalsh = result.data;
						//取得商品id列表
						var goodsIdsPersonal = '';
						var tempPersonal = $scope.personalsh;
						for (var i = 0; i < tempPersonal.length; i++) {
							goodsIdsPersonal = goodsIdsPersonal + tempPersonal[i].id;
							if (i < tempPersonal.length - 1) {
								goodsIdsPersonal = goodsIdsPersonal + ',';
							}
						}
						//得到动态价格
						CommonService.getGoodsPrice($scope.memberId, goodsIdsPersonal, 1, 0, 0, $scope.personalsh);
						break;
					default:
						break;
				}
			});
	}
	//商城端推荐品牌和推荐分类
	$scope.indexpcprodect = function(applyType, floorId, cateSize, brandSize, n) {
		IndexPlusService
			.indexpcprodect(applyType, floorId, cateSize, brandSize)
			.then(function(result) {
				switch (n) {
					case 1:
						$scope.family = result.data.cate;
						$scope.familycat = result.data.brand;
						break;
					case 2:
						$scope.older = result.data.cate;
						$scope.oldercat = result.data.brand;
						break;
					case 3:
						$scope.man = result.data.cate;
						$scope.mancat = result.data.brand;
						break;
					case 4:
						$scope.women = result.data.cate;
						$scope.womencat = result.data.brand;
						break;
					case 5:
						$scope.mother = result.data.cate;
						$scope.mothercat = result.data.brand;
						break;
					case 6:
						$scope.life = result.data.cate;
						$scope.lifecat = result.data.brand;
						break;
					case 7:
						$scope.treatment = result.data.cate;
						$scope.treatmentcat = result.data.brand;
						break;
					case 8:
						$scope.bisexual = result.data.cate;
						$scope.bisexualcat = result.data.brand;
						break;
					case 9:
						$scope.personal = result.data.cate;
						$scope.personalcat = result.data.brand;
						break;
					default:
						break;
				}
			});
	}
	//导航栏主题活动
	$scope.indexheader = function(applyType) {
		IndexPlusService
			.indexheader(applyType)
			.then(function(result) {
				$scope.headsevers = result.data.navigation.data;
			})

	}
	//导航栏三级分类
	$scope.indexclassify = function() {
		IndexPlusService
			.indexclassify()
			.then(function(result) {
				$scope.headseversa = result.data;

			})

	}

	//根据返回的target来确定页面跳转方式
	$scope.getTarget = function(target) {
		if (target == 0) {
			return '_self';
		}
		if (target == 1) {
			return '_blank';
		}
	}
	$(function() {
		$(document).ready(function(e) {
			var unslider04 = $('#b04').unslider({
					dots: false
				}),
				data04 = unslider04.data('unslider');
			$('.unslider-arrow04').click(function() {
				var fn = this.className.split(' ')[1];
				data04[fn]();
			});
		});
		//louti
		var mark = 1;
		$("#LoutiNav ul .showStairs").not(".last").click(function() {
			mark = 2;
			$("#LoutiNav ul .showStairs").removeClass("active");

			$(this).addClass("active");
			var $index = $(this).index();
			var $top = $("#mainNav .content_one").eq($index).offset().top;
			$("body,html").animate({
				scrollTop: $top
			}, 500, function() {
				mark = 1;
			});
		});
		$(window).scroll(function() {
			if (mark == 1) {
				var $t = $(this).scrollTop();
				var firetTop = $($(".content_one")[0]).offset().top - 300;
				if ($t >= firetTop) {
					$("#LoutiNav").fadeIn();
				} else {
					$("#LoutiNav").fadeOut();
				}
				var $obj = $("#mainNav .content_one");
				$obj.each(function() {
					var $index = $(this).index();
					var $height = $obj.eq($index).offset().top + $(this).height() / 2;
					if ($t < $height) {
						$("#LoutiNav ul .showStairs").removeClass("active")
						$("#LoutiNav ul .showStairs").eq($index).addClass("active");
						return false;
					}
				});
			}
		});
		$("#LoutiNav ul li.last").click(function() {
			$("body,html").animate({
				scrollTop: 0
			}, 500, function() {
				mark = 1;
			});
		});
	});
	//是否显示rx标记
	$scope.isRxShow = function(num) {
		return num == 1;
	};
	//初始化数据
	//导航栏三级分类
	$scope.indexclassify();
	//导航栏主题活动
	$scope.indexheader(1);
	//广告位
	//轮播图
	$scope.advertisement(1, 1, 6, 1);
	$scope.advertisement(2, 1, 1, 2);
	$scope.advertisement(3, 1, 5, 3);
	$scope.advertisement(4, 1, 1, 4);
	$scope.advertisement(6, 1, 2, 6);
	$scope.advertisement(8, 1, 2, 8);
	$scope.advertisement(10, 1, 2, 10);
	$scope.advertisement(12, 1, 2, 12);
	$scope.advertisement(14, 1, 2, 14);
	$scope.advertisement(16, 1, 2, 16);
	$scope.advertisement(18, 1, 2, 18);
	$scope.advertisement(20, 1, 2, 20);
	$scope.advertisement(22, 1, 2, 22);
	//推荐品牌和分类
	$scope.indexpcprodect(1, 1, 10, 4, 1);
	$scope.indexpcprodect(1, 2, 10, 4, 2);
	$scope.indexpcprodect(1, 3, 10, 4, 3);
	$scope.indexpcprodect(1, 4, 10, 4, 4);
	$scope.indexpcprodect(1, 5, 10, 4, 5);
	$scope.indexpcprodect(1, 6, 10, 4, 6);
	$scope.indexpcprodect(1, 7, 10, 4, 7);
	$scope.indexpcprodect(1, 8, 10, 4, 8);
	$scope.indexpcprodect(1, 9, 10, 4, 9);
	//推荐商品
	$scope.indexprodect(1, 1, 4, 1);
	$scope.indexprodect(2, 1, 4, 2);
	$scope.indexprodect(3, 1, 4, 3);
	$scope.indexprodect(4, 1, 4, 4);
	$scope.indexprodect(5, 1, 4, 5);
	$scope.indexprodect(6, 1, 4, 6);
	$scope.indexprodect(7, 1, 4, 7);
	$scope.indexprodect(8, 1, 4, 8);
	$scope.indexprodect(9, 1, 4, 9);

}


angular
	.module('indexPlusApp')
	.controller('IndexPlusController', IndexPlusController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.directive('smallcart', smallcart)
	.directive('navigationBar', navigationBar);
