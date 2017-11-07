function IndexController($scope, $q, $http, IndexService, CommonService) {
	$scope.dataEntity = {}; //用来存储修改或者添加的数据
	$scope.member = getCookie('loginManager');

	$scope.json = [{
			"name": "常见疾病",
			"childrenList": [{
					"id": 13,
					"name": "呼吸道疾病"
				},
				{
					"id": 6,
					"name": "消化科"
				},
				{
					"id": 14,
					"name": "五官科"
				}
			]
		},
		{
			"name": "慢病三高",
			"childrenList": [{
					"id": 2,
					"name": "心脑血管科"
				},
				{
					"id": 3,
					"name": "内分泌科"
				},
				{
					"id": 5,
					"name": "肝胆科"
				},
				{
					"id": 7,
					"name": "神经精神科"
				}
			]
		},
		{
			"name": "消肿去瘤",
			"childrenList": [{
				"id": 4,
				"name": "肿瘤科"
			}]
		},
		{
			"name": "专用人群",
			"childrenList": [{
					"id": 10,
					"name": "儿科"
				},
				{
					"id": 9,
					"name": "妇科"
				},
				{
					"id": 8,
					"name": "男科"
				}
			]
		},
		{
			"name": "风湿骨痛",
			"childrenList": [{
				"id": 12,
				"name": "风湿骨科"
			}]
		},
		{
			"name": "皮肤用药",
			"childrenList": [{
				"id": 11,
				"name": "皮肤科"
			}]
		},
		{
			"name": "补益用药",
			"childrenList": [{
				"id": 15,
				"name": "滋补调养"
			}]
		},
		{
			"name": "清热消炎",
			"childrenList": [{
				"id": 168,
				"name": "抗菌消炎"
			}]
		}
	];

	//首页
	//首页广告推荐位
	$scope.advertisement = function(advertId, applyType, size, n) {
		IndexService
			.advertisement(advertId, applyType, size)
			.then(function(result) {
					switch (n) {
						case 1: //轮播图advertId=1
							$scope.carousel = result.data;
							break;
						case 2: //轮播图右侧advertId=2
							$scope.service = result.data;
							break;
						case 3: //每日推荐advertId=3
							$scope.recommend = result.data;
							break;
						case 4: //横条广告advertId=4
							$scope.advert = result.data[0];
							break;
						case 6: //1楼层advertId=6
							$scope.familypr = result.data;
							break;
						case 8: //2楼层advertId=8
							$scope.olderpr = result.data;
							break;
						case 10: //3楼层advertId=10
							$scope.manpr = result.data;
							break;
						default:
							break;
					}
				},
				function(result) {

				});
	}
	//首页商品推荐位
	$scope.indexprodect = function(commendId, applyType, size, n) { //commendId推荐位ID，applyType使用平台，size数量
		IndexService
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

					default:
						break;
				}
			});
	}
	//商城端推荐品牌和推荐分类
	$scope.indexpcprodect = function(applyType, floorId, cateSize, brandSize, n) {
		IndexService
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

					default:
						break;
				}
			});
	}
	//导航栏主题活动
	$scope.indexheader = function(applyType) {
		IndexService
			.indexheader(applyType)
			.then(function(result) {
				$scope.headsevers = result.data.navigation.data;
			})

	}
	//导航栏三级分类
	$scope.findNavigationBar = function() {
		CommonService
			.navigationBar()
			.then(function(result) {
				// $scope.headseversa = result.data;

				//为简版分类添加三级分类，数据从数据库中得到
				var temp = result.data[0].childrenList;
				for (var i = 0; i < $scope.json.length; i++) {
					for (var j = 0; j < $scope.json[i].childrenList.length; j++) {
						for (var n = 0; n < temp.length; n++) {
							if ($scope.json[i].childrenList[j].id == temp[n].id) {
								$scope.json[i].childrenList[j].childrenList = temp[n].childrenList;
							}
						}
					}
				}

				$scope.headseversa = $scope.json;
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
	$scope.findNavigationBar();
	//导航栏主题活动
	// $scope.indexheader(1);
	//广告位
	//轮播图
	$scope.advertisement(1, 1, 6, 1);

	$scope.advertisement(2, 1, 1, 2);
	$scope.advertisement(3, 1, 5, 3);
	$scope.advertisement(4, 1, 1, 4);
	//楼层广告位
	$scope.advertisement(6, 1, 2, 6);
	$scope.advertisement(8, 1, 2, 8);
	$scope.advertisement(10, 1, 2, 10);
	//楼层推荐品牌和分类
	$scope.indexpcprodect(1, 1, 10, 4, 1);
	$scope.indexpcprodect(1, 2, 10, 4, 2);
	$scope.indexpcprodect(1, 3, 10, 4, 3);
	//楼层推荐商品
	$scope.indexprodect(1, 1, 4, 1);
	$scope.indexprodect(2, 1, 4, 2);
	$scope.indexprodect(3, 1, 4, 3);

}


angular
	.module('indexApp')
	.controller('IndexController', IndexController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.directive('smallcart', smallcart)
	.directive('navigationBar', navigationBar);
