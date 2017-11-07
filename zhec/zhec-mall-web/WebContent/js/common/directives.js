/**
 * headerpage 头指令
 */
function headerpage() {
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="head_bar">' +
			'<div class="bar">' +
			'<ul class="bar_ulone">' +
			'<li class="bar_li">' +
			'<ul class="bar_ul">' +
			'<li>' +
			'<p>' + zhecDisplayMessage.welcome + '</p>' +
			'</li>' +
			'<li>' +
			'<p>' +
			'<a ng-if="memberMessage==\'\'" class="memberIfLogin" ng-click="goToLogin()" >登录</a>' +
			'<b ng-if="memberMessage!=\'\'&&memberMessage.name!=\'\'&&memberMessage.name!=null&&memberMessage.name!=undefined"><a ng-href="member.html" ng-bind="\'Hi,\'+memberMessage.name"><a ng-click="exitLogin()">退出</a></a></b>' +
			'<b ng-if="memberMessage!=\'\'"><a ng-if="memberMessage.name==\'\'||memberMessage.name==null||memberMessage.name==undefined" ng-href="member.html" ng-bind="\'Hi,\'+memberMessage.loginId"></a><a ng-if="memberMessage.name==\'\'||memberMessage.name==null||memberMessage.name==undefined" ng-click="exitLogin()">退出</a></b>' +
			'</p>' +
			'</li>' +
			'<li>' +
			'<p>' +
			'<a href="register.html" ng-if="memberMessage==\'\'" class="memeberResgister">注册</a>' +
			'</p>' +
			'</li>' +
			'</ul>' +
			'</li>' +
			'<li class="bar_li bat_liP">' +
			'<ul class="bar_ultwo">' +
			'<li>' +
			'<a ng-click="returnPath(1)">我的订单</a>' +
			'</li>' +
			'<li>' +
			'<a ng-click="returnPath(2)">会员中心</a>' +
			'</li>' +
			'<li>' +
			'<a href="cart.html" target="_blank">我的购物车</a>' +
			'</li>' +
			'<li class="phoneApp">手机APP' +
			'<span></span>' +
			'<div class="phoneApp_hover">' +
			'<i></i>' +
			'<p>App下载</p>' +
			'</div>' +
			'</li>' +
			'<li>' +
			'<p>客服热线 : 400-648-5566</p>' +
			'</li>' +
			'</ul>' +
			'</li>' +
			'</ul>' +
			'</div>' +
			'</div>',
		scope: {},
		controller: function($scope, $element) {
			$scope.goToLogin = function() {
				delCookie("prePage");
				delCookie("formToken");
				setCookie("prePage", '' + window.location.href, '1');
				window.open("login.html", "_self");
			}
			$scope.returnPath = function(n) {
				if (checkLogin()) {
					if (n == 1) {
						window.open("member.html#/orders", "_blank");
					} else {
						window.open("member.html", "_blank");
					}
				}
			}
			var getMemberCookie = getCookie("loginManager");
			$scope.memberMessage = getCookie("loginManager");
			if ($scope.memberMessage != "") {
				$scope.memberMessage = JSON.parse($scope.memberMessage);
			}
			$scope.exitLogin = function() {
				delCookie("loginManager");
				delCookie("formToken");
				delCookie("prePage");
				if (/payMoney/g.test(window.location.href)) {
					setCookie("prePage", 'member.html#/orders', '1');
				} else {
					setCookie("prePage", '' + window.location.href, '1');
				}
				window.open("login.html", "_self")
			}

		}
	}
}
//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {}
	try {
		m += s2.split(".")[1].length
	} catch (e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
/*
 * 带小购物车的search
 */
function smallcart() {
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="head_navagiton">' +
			'<div class="head_conter">' +
			'<ul class="head_ul">' +
			'<li class="head_li">' +
			'<div class="head_log" style="cursor: pointer;" onclick="self.location=' + "'index.html'" + ';">' +
			'<a href="index.html"><div class="head_log-img"><img src="../../images/u1884.png"></div></a>' +
			'</div>' +
			'</li>' +
			'<li class="head_search">' +
			'<form  method="get" class="Gform">' +
			'<input type="text" id="searchBox" class="search-box" ng-keyup="myKeyup($event)" ng-model="keyword" placeholder="我要买什么..."/>' +
			'<input type="text" id="submit" type="submit" value="submit" style="display:none"/>' +
			'<input type="text" class="Gsubmit" ng-key for="submit"/>' +
			'<label for="submit" class="Gsubmit" style="cursor:pointer;"  ng-click=search()>搜索</label>' +
			'</form>' +
			'<ul class="hot_word">' +
			'<li ng-repeat="res in findcommenddatasearch.text">' + '<a href="searchlist.html?search=0,1,0,0,0,0,{{res}}" ng-bind="res"></a>' + '</li>' +
			'</ul>' +
			'</li>' +
			'<li class="cart clearfix" ng-mouseover="showCart()" ng-mouseout="hideCart()">' +
			'<div class="showControl" >' +
			'<span>' +
			'<a href="cart.html" target="_blank">购物车(' +
			'<b class="allNum" ng-bind="totalSize"></b>' +
			')</a>' +
			'</span>' +
			'</div>' +
			'<div class="showall clearfix"  ng-mouseout="hideCart()">' +
			'<div class="showCart clearfix" style="display:none;">' +
			'<div class="clearfix allCartGoods">' +
			'<ul class="clearfix showAllGoods" ng-hide="showEmptyCart">' +
			'<li ng-repeat="goods in smallCartList">' +
			'<ol>' +
			'<li><a ng-href="goods.html?id={{goods.goodsId}}" target="_blank"><img ng-src="{{goods.masterImg}}"></a></li>' +
			'<li><p><a ng-href="goods.html?id={{goods.goodsId}}" target="_blank" ng-bind="goods.goodsName"></a></p><p class="goodsShowAttr" ><a ng-href="goods.html?id={{goods.goodsId}}" target="_blank" ng-bind="goods.specAttrName"></a></p></li>' +
			'<li>￥<span><b ng-bind="goods.salesPrice | number:2"></b>×<b ng-bind="goods.count">1</b></span></li>' +
			'</ol>' +
			'</li>' +
			'</ul>' +
			'<div class="show_hide" ng-show="showEmptyCart">' +
			'<img src="images/kshop.png" alt="" />' +
			'<p>购物车空空的，赶快添加购物车吧！</p>' +
			'</div>' +
			'</div>' +
			'<div class="cartBottom" ng-hide="showEmptyCart">' +
			'<p>' +
			'<i>总共<b class="allNum" ng-bind="totalSize">0</b>件商品</i>' +
			//			'<i>￥<b ng-bind="allPrice | number:2"></b></i>' +
			'</p>' +
			'<i><button class="goToCart" ng-click="goToCart()">前往购物车</button></i>' +
			'</div>' +
			'</div>' +
			'<div class="cart_fix" style="display:none;"><img src="images/cjj.png" alt="" /></div>' +
			'</div>' +
			'</li>' +
			'</ul>' +
			'</div>' +
			'</div>',
		scope: {},
		controller: function($scope, $element, CommonService) {
			$scope.totalSize = 0;
			$scope.keyword = '';
			$scope.findcommenddatasearch = {};
			$scope.member = getCookie("loginManager"); //获取登录信息
			if ($scope.member != "") {
				$scope.member = JSON.parse($scope.member);
				$scope.memberId = $scope.member.id;
			}
			var cookieIdArr = [];
			$scope.loaddingCart = true;
			$scope.loadData2 = function() {
				CommonService.findcommenddata()
					.then(
						function(result) {
							$scope.findcommenddatasearch = result.data;
						}
					)
			}
			$scope.getTotalSize = getCookie("totalsize");
			if ($scope.getTotalSize != "") {
				$scope.totalSize = $scope.getTotalSize
			}
			//初始化数据
			$scope.loadData2();
			if (undefined != $scope.$parent.paramsKeyWord && $scope.$parent.paramsKeyWord != null && $scope.$parent.paramsKeyWord != '') {
				$scope.keyword = $scope.$parent.paramsKeyWord;
			}
			$scope.locadCartDataTime = false;
			$scope.showCart = function() {

				$scope.loaddingCart = true;
				$(".showCart").show()
				$(".cart_fix").show();

			}
			$scope.hideCart = function() {
				$(".showCart").hide()
				$(".cart_fix").hide()
				$scope.locadCartDataTime = true;
				$scope.loaddingCart = false;
			}
			//前往购物车
			$scope.goToCart = function() {
				window.open(constMallLocation + "/cart.html", "_self")
			}
			//点击搜索事件
			$scope.search = function() {
				if ($scope.keyword !== '') {
					window.open(constMallLocation + "/searchlist.html?search=0,1,0,0,0,0," + $scope.keyword, "_self");
				}
			}
			//回车搜索
			$scope.myKeyup = function(e) {
				var keycode = window.event ? e.keyCode : e.which;
				if (keycode == 13) {
					$scope.search();
				}
			};

			//小购物车加载数据
			$scope.loadSmallCart = function() {
				CommonService.findCartGoods($scope.memberId)
					.then(
						function(result) {
							$scope.loaddingCart = false;
							$scope.totalSize = result.totalSize;
							setCookie("totalsize", '' + $scope.totalSize, '30');
							$scope.smallCartList = result.data;
							if ($scope.smallCartList == "" || $scope.smallCartList == null || $scope.smallCartList == undefined) {
								$scope.showEmptyCart = true;
								$scope.totalSize = 0;
							} else {
								$scope.showEmptyCart = false;
								$scope.goodsIdList = "";
								for (var i = 0; i < $scope.smallCartList.length; i++) {
									$scope.goodsIdList += $scope.smallCartList[i].goodsId;
									if (i < $scope.smallCartList.length - 1) {
										$scope.goodsIdList += ",";
									}
								}

								CommonService.getGoodsPromptionPrice($scope.memberId, $scope.goodsIdList, 1, 1, 1, $scope.smallCartList);
								$scope.allPrice = 0;
								for (var i = 0; i < $scope.smallCartList.length; i++) {
									console.log($scope.smallCartList[i])
									console.log($scope.smallCartList[i].salesPrice)
									$scope.allPrice += accMul($scope.smallCartList[i].salesPrice, $scope.smallCartList[i].count);
								}
							}
						},
						function(result) {
							if (result == "" || result == null || result == undefined) {
								$scope.loaddingCart = false;
								delCookie("loginManager");
								$scope.totalSize = 0;
								$scope.showEmptyCart = true;
							}
						})
			}
			//调取cookie数据
			$scope.getCookieGoods = function(cookieList, cookieIdArr, count) {
				CommonService.findCookieGoods(cookieIdArr)
					.then(
						function(result) {
							$scope.loaddingCart = false;
							$scope.totalSize = count;
							setCookie("totalsize", '' + $scope.totalSize, '30');
							$scope.smallCartList = result.data;
							if ($scope.smallCartList == "" || $scope.smallCartList == null || $scope.smallCartList == undefined) {
								$scope.showEmptyCart = true;
								$scope.totalSize = 0;
							} else {
								$scope.showEmptyCart = false;
								$scope.goodsIdList = ""
								for (var i = 0; i < $scope.smallCartList.length; i++) {
									for (var j = 0; j < cookieList.length; j++) {
										if (cookieList[j].productId == $scope.smallCartList[i].productId) {
											$scope.smallCartList[i].count = cookieList[j].count
										}
									}
									$scope.goodsIdList += $scope.smallCartList[i].goodsId;
									if (i < $scope.smallCartList.length - 1) {
										$scope.goodsIdList += ",";
									}
								}
								CommonService.getGoodsPriceByGoodsId($scope.memberId, $scope.goodsIdList, 1, 1, 1, $scope.smallCartList);
								$scope.allPrice = 0;
								for (var i = 0; i < $scope.smallCartList.length; i++) {
									$scope.allPrice += $scope.smallCartList[i].salesPrice * $scope.smallCartList[i].count;
								}
							}
						}
					)
			}

			$scope.ifLogin = getCookie("formToken");
			if ($scope.ifLogin != "" && $scope.ifLogin != undefined && $scope.ifLogin != null) {
				$scope.loadSmallCart()
			} else {
				var getCookieAllGoods = getCookie("cartManager");
				$scope.saveCookieList = [];
				if (getCookieAllGoods != "" && getCookieAllGoods != null && getCookieAllGoods != undefined) {
					getCookieAllGoods = JSON.parse(getCookieAllGoods);
					for (var i = 0; i < getCookieAllGoods.length; i++) {
						cookieIdArr.push(getCookieAllGoods[i].id);
						saveMessage = {};
						saveMessage.productId = getCookieAllGoods[i].id;
						saveMessage.count = Number(getCookieAllGoods[i].num);
						$scope.saveCookieList.push(saveMessage)
					}
					var count = cookieIdArr.length;
					$scope.getCookieGoods($scope.saveCookieList, cookieIdArr, count)
				} else {
					$scope.showEmptyCart = true;
					$scope.totalSize = 0;
				}
			}
		}
	}
}

/**
 * footerpage 尾指令
 */
function footerpage() {
	return {
		restrict: 'E',
		replace: true,
		template: '<div>' +
			'<div class="foot">' +
			'<div class="footer_big">' +
			'<a href="{{buttomAd.imageLink}}" target="getTarget(buttomAd.target)">' +
			'<img ng-src="{{buttomAd.imageUrl}}"></img>' +
			'</a>' +
			'</div>' +
			'<div class="foot-xian"></div>' +
			'<div class="foot_xindo"></div>' +
			'<ul class="foot_ul">' +
			'<li>' +
			'<i></i>' +
			'<p>极速发货</p>' +
			'</li>' +
			'<li>' +
			'<i></i>' +
			'<p>七天退换</p>' +
			'</li>' +
			'<li>' +
			'<i></i>' +
			'<p>正品保障</p>' +
			'</li>' +
			'<li>' +
			'<i></i>' +
			'<p>隐私保护</p>' +
			'</li>' +
			'<li>' +
			'<i></i>' +
			'<p>专业咨询</p>' +
			'</li>' +
			'</ul>' +
			'</div>' +
			'<div class="foot-bottom">' +
			'<div class="footer_first">' +
			'<ul class="footer_ul">' +
			'<li>' +
			'<ul>' +
			'<li>' +
			'<a href="http://www.nhfpc.gov.cn/" target="_blank">国家食品药品监督管理局</a>' +
			'</li>' +
			'<li>' +
			'<a href="http://www.nhfpc.gov.cn/" target="_blank">国家卫计委</a>' +
			'</li>' +
			'<li>' +
			'<a href="http://www.chemdrug.com/" target="_blank">药品咨询</a>' +
			'</li>' +
			'<li>' +
			'<a href="http://www.chinamsr.com/" target="_blank">医药联盟</a>' +
			'</li>' +
			'<li>' +
			'<a href="article.html?arc=36" target="_blank">购物流程</a>' +
			'</li>' +
			'<li>' +
			'<a href="article.html?arc=29" target="_blank">付款方式</a>' +
			'</li>' +
			'<li>' +
			'<a href="article.html?arc=41" target="_blank">常见问题解答</a>' +
			'</li>' +
			'<li>' +
			'<a href="article.html?arc=39" target="_blank">客户须知</a>' +
			'</li>' +
			'<li>' +
			'<a href="article.html?arc=42" target="_blank">购物流程</a>' +
			'</li>' +
			'<li>' +
			'<a href="article.html?arc=29" target="_blank">付款方式</a>' +
			'</li>' +
			'</ul>' +
			'</li>' +
			'<li>' +
			'<ul>' +
			'<li>' +
			'<a href="article.html?arc=35" target="_blank">关于我们</a>' +
			'</li>' +
			'<li>' +
			'<a href="article.html?arc=31" target="_blank">联系我们</a>' +
			'</li>' +
			'<li>' +
			'<a href="article.html?arc=32" target="_blank">人才招聘</a>' +
			'</li>' +
			'<li>' +
			'<a href="article.html?arc=33" target="_blank">广告业务</a>' +
			'</li>' +
			'<li>' +
			'<a href="article.html?arc=34" target="_blank">经营证书</a>' +
			'</li>' +
			'<li>' +
			'<a href="http://kdfafa.com/chaxun/" target="_blank">快递查询</a>' +
			'</li>' +
			'</ul>' +
			'</li>' +
			'<li>' + zhecDisplayMessage.certificateNumber + '</li>' +
			'<li>' + zhecDisplayMessage.copyright + '</li>' +
			'</ul>' +
			'</div>' +
			'</div>' +
			'</div>',
		scope: {},
		controller: function($scope, $element, CommonService) {
			//footer广告位获取
			// $scope.adviertisement = function(advertId, applyType, size) {
			// 	var url = ConstBaseLocation + '/malladvertimage/findwebcommendgoods?advertId=' + advertId + '&applyType=' + applyType + '&size=' + size;
			// 	$http({
			// 		method: 'get',
			// 		url: url
			// 	}).success(function(data) {
			// 		$scope.buttomAd = data.data[0];
			// 	}).error(function(data) {});
			// }
			//footer广告位获取
			$scope.adviertisement = function(advertId, applyType, size) {
				CommonService
					.adviertisement(advertId, applyType, size)
					.then(function(result) {
						$scope.buttomAd = result.data[0];
					}, function(result) {});
			}

			$scope.getTarget = function(target) {
				if (target == 0) {
					return '_self';
				}
				if (target == 1) {
					return '_blank';
				}
			}
			//初始化footer的广告位
			$scope.adviertisement(23, 1, 2);
		}
	}
}

/**
 * 搜索框
 */
function search() {
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="head_navagiton">' +
			'<div class="head_conter">' +
			'<ul class="head_ul">' +
			'<li class="head_li">' +
			'<div class="head_log" style="cursor: pointer;" onclick="self.location=' + "'index.html'" + ';">' +
			'<a href="index.html"><div class="head_log-img"><img src="../../images/u1884.png"></div></a>' +
			'</div>' +
			'</li>' +
			'<li class="head_search">' +
			'<form  method="get" class="Gform">' +
			'<input type="text" id="searchBox" class="search-box" ng-keyup="myKeyup($event)" ng-model="keyword" placeholder="我要买什么..."/>' +
			'<input type="text" id="submit" type="submit" value="submit" style="display:none"/>' +
			'<input type="text" class="Gsubmit" ng-key for="submit"/>' +
			'<label for="submit" class="Gsubmit" style="cursor:pointer;"  ng-click=search()>搜索</label>' +
			'</form>' +
			'<ul class="hot_word">' +
			'<li ng-repeat="res in findcommenddatasearch.text">' + '<a href="searchlist.html?search=0,1,0,0,0,0,{{res}}" ng-bind="res"></a>' + '</li>' +
			'</ul>' +
			'</li>' +
			'</ul>' +
			'</div>' +
			'</div>',
		scope: {},
		controller: function($scope, $element, CommonService) {
			$scope.keyword = '';
			$scope.findcommenddatasearch = {};
			$scope.loadData2 = function() {
				CommonService.findcommenddata()
					.then(
						function(result) {
							$scope.findcommenddatasearch = result.data;
						}
					)
			}
			//初始化数据
			$scope.loadData2();


			//点击搜索事件
			$scope.search = function() {
				if ($scope.keyword !== '') {
					window.open(constMallLocation + "/searchlist.html?search=0,1,0,0,0,0," + $scope.keyword, "_self");
				}
			}
			//回车搜索
			$scope.myKeyup = function(e) {
				var keycode = window.event ? e.keyCode : e.which;
				if (keycode == 13) {
					$scope.search();
				}
			};
		}
	}
}

/**
 * 简版首页对应导航栏
 */
function navigationBar() {
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="banner">' +
			'<div class="banner_all">' +
			'<ul class = "banner_all_ul"> ' +
			'<li class = "banner_all_ul_li" id = "banner_all_li"> ' +
			'<i> </i>' +
			'<a>全部商品</a>' +
			'<div class = "hide"> ' +
			'<ol class = "hide_ol"> ' +
			'<li class = "hide_ol_li_' + '{{res1.id}}' + '  hide_ol_al" ng-repeat="res1 in navigation"> ' +
			'<i> </i>' +
			'<b ng-bind="res1.name"></b>' +
			'<span> ' +
			'</span>' +
			'<div class = "hide_right"> ' +
			'<ul class = "hide_div_ul banner_float clearfix"> ' +
			'<li class = "hide_div_ul_li"> ' +
			'<ul class = "hide_div_ul_li_ul"> ' +
			'<li class = "hide_div_ul_li_ul_li" ng-repeat="res2 in res1.childrenList">' +
			//分类不可点击
			// '<label> <b ng-bind="res2.name"></b> <span> </span> </label>' +
			//分类可以点击
			'<label> <a href = "list.html?cat=' + '{{res2.id}}' + ',1,0,0,0,0" target="_blank" ng-bind="res2.name"></a></b> <span> </span> </label>' +
			'<ol>' +
			'<li ng-repeat="res3 in res2.childrenList"> <a href = "list.html?cat=' + '{{res3.id}}' + ',1,0,0,0,0" target="_blank" ng-bind="res3.name"></a></li> ' +
			'</ol>' + '<div style="clear: both"></div>' +
			'</li>' +
			'</ul>' +
			'</li>' +
			'</ul>' +
			'</div>' +
			'</li>' +

			'</ol>' +
			'</div>' +
			// '</li>' +
			// '<li class="banner_all_ul_li" ng-repeat="res in findcommenddata.navigation.data">' +
			// '<a href="{{res.link}}" ng-bind="res.title"></a>' +
			// '</li>' +
			'</ul>' +
			'</div>' +
			'</div>',
		scope: {},
		controller: function($scope, $element, CommonService) {

			$scope.json = [{
					"id": 1,
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
					"id": 2,
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
					"id": 3,
					"name": "消肿去瘤",
					"childrenList": [{
						"id": 4,
						"name": "肿瘤科"
					}]
				},
				{
					"id": 4,
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
					"id": 5,
					"name": "风湿骨痛",
					"childrenList": [{
						"id": 12,
						"name": "风湿骨科"
					}]
				},
				{
					"id": 6,
					"name": "皮肤用药",
					"childrenList": [{
						"id": 11,
						"name": "皮肤科"
					}]
				},
				{
					"id": 7,
					"name": "补益用药",
					"childrenList": [{
						"id": 15,
						"name": "滋补调养"
					}]
				},
				{
					"id": 8,
					"name": "清热消炎",
					"childrenList": [{
						"id": 168,
						"name": "抗菌消炎"
					}]
				}
			];

			$scope.loadData = function() {
				CommonService.navigationBar()
					.then(
						function(result) {
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

							$scope.navigation = $scope.json;
						}
					)
				// CommonService.findcommenddata()
				// 	.then(
				// 		function(result) {
				// 			$scope.findcommenddata = result.data;
				// 		}
				// 	)
			}

			//初始化数据
			$scope.loadData();

		}
	}
}

/**
 * 导航栏
 */
// function navigationBar() {
// 	return {
// 		restrict: 'E',
// 		replace: true,
// 		template: '<div class="banner">' +
// 			'<div class="banner_all">' +
// 			'<ul class = "banner_all_ul"> ' +
// 			'<li class = "banner_all_ul_li" id = "banner_all_li"> ' +
// 			'<i> </i>' +
// 			'<a>全部商品</a>' +
// 			'<div class = "hide"> ' +
// 			'<ol class = "hide_ol"> ' +
// 			'<li class = "hide_ol_li_' + '{{res1.id}}' + '  hide_ol_al" ng-repeat="res1 in navigation.data"> ' +
// 			'<i> </i>' +
// 			'<b ng-bind="res1.name"></b>' +
// 			'<span> ' +
// 			'</span>' +
// 			'<div class = "hide_right"> ' +
// 			'<ul class = "hide_div_ul banner_float clearfix"> ' +
// 			'<li class = "hide_div_ul_li"> ' +
// 			'<ul class = "hide_div_ul_li_ul"> ' +
// 			'<li class = "hide_div_ul_li_ul_li" ng-repeat="res2 in res1.childrenList"> ' +
// 			'<label> <b ng-bind="res2.name"></b> <span> </span> </label>' +
// 			'<ol>' +
// 			'<li ng-repeat="res3 in res2.childrenList"> <a href = "list.html?cat=' + '{{res3.id}}' + ',1,0,0,0,0" target="_blank" ng-bind="res3.name"></a></li> ' +
// 			'</ol>' + '<div style="clear: both"></div>' +
// 			'</li>' +
// 			'</ul>' +
// 			'</li>' +
// 			'</ul>' +
// 			'</div>' +
// 			'</li>' +
//
// 			'</ol>' +
// 			'</div>' +
// 			// '</li>' +
// 			// '<li class="banner_all_ul_li" ng-repeat="res in findcommenddata.navigation.data">' +
// 			// '<a href="{{res.link}}" ng-bind="res.title"></a>' +
// 			// '</li>' +
// 			'</ul>' +
// 			'</div>' +
// 			'</div>',
// 		scope: {},
// 		controller: function($scope, $element, CommonService) {
// 			//为父scope（controller）定义加载数据方法，参数ifRefresh：是否返回第一页
// 			$scope.navigation = {};
// 			$scope.findcommenddata = {};
// 			$scope.loadData = function() {
// 				CommonService.navigationBar()
// 					.then(
// 						function(result) {
// 							$scope.navigation = result;
// 						}
// 					)
// 				CommonService.findcommenddata()
// 					.then(
// 						function(result) {
// 							$scope.findcommenddata = result.data;
// 						}
// 					)
// 			}
// 			//初始化数据
// 			$scope.loadData();
// 		}
// 	}
// }

/**
 * datalistpager 分页指令
 */

function datalistpager() {
	return {
		restrict: 'E',
		//replace: true,
		templateUrl: "../../views/member/dataPager.html",
		scope: {},
		controller: function($scope, $element, constPageSize) {
			$scope.currentPageNo = 1; // 当前页码
			$scope.currentPaseSize = constPageSize; // 每页显示条数
			$scope.isShowPage1 = false; // 是否显示页码前面"..."
			$scope.isShowPage2 = false; // 是否显示页码后面"..."
			$scope.allDataCount = 0; // 所有记录数量
			$scope.selectPage = 1;
			$scope.$parent.loadData = function(ifRefresh) {
				if (ifRefresh)
					$scope.currentPageNo = 1;
				$scope.$parent.find($scope.currentPageNo)
					.then(
						function(result) {
							if (result.totalSize > 0) {
								$scope.showDataPager = true;
							} else {
								$scope.showDataPager = false;
							}
							$scope.allDataCount = result.totalSize; //获取所有记录数量
							$scope.allPage = Math.ceil(result.totalSize / $scope.currentPaseSize) //获取所有页数并向上取整
							$scope.arr = []; //定义一个数组存放页码
							if ($scope.currentPageNo <= 5 && $scope.allPage <= 5) { //如果当前页数小于5并且总页数小于5
								$scope.isShowPage1 = false;
								$scope.isShowPage2 = false;
								if ($scope.currentPageNo == 1) { //为第一页时向左不可点击
									angular.element(".btnLeft a").css("cursor", "default").hover(function() {
										angular.element(".btnLeft a").css('color', 'black')
									});
								} else if ($scope.currentPageNo == $scope.allPage) { //为最后一页时向右不可点击
									//angular.element(".btnRight").addClass("active");
									angular.element(".btnRight a").css("cursor", "default").hover(function() {
										angular.element(".btnRight a").css('color', 'black')
									});
								} else { //否则向右向左都可点击
									// angular.element(".btnLeft").removeClass("active");
									// angular.element(".btnRight").removeClass("active");
									angular.element(".btnLeft a").css("cursor", "pointer").hover(function() {
										angular.element(".btnLeft a").css('color', '#FF9900')
									});
									angular.element(".btnRight a").css("cursor", "pointer").hover(function() {
										angular.element(".btnRight a").css('color', '#FF9900')
									});
								}
								for (var i = 0; i < $scope.allPage; i++) {
									$scope.arr.push(i + 1);

								}
							} else {
								if ($scope.currentPageNo <= 3 && $scope.allPage > 5) { //如果 当前页数小于3，但是总页数大于5
									$scope.isShowPage1 = false;
									$scope.isShowPage2 = true;
									//angular.element(".btnRight").removeClass("active");
									angular.element(".btnRight a").css("cursor", "pointer").hover(function() {
										angular.element(".btnRight a").css('color', '#FF9900')
									});
									if ($scope.currentPageNo != 1) { //不为第一页时向前按钮可以点击
										//angular.element(".btnLeft").removeClass("active");
										angular.element(".btnLeft a").css("cursor", "pointer").hover(function() {
											angular.element(".btnLeft a").css('color', '#FF9900')
										});
									} else { //否则 不可以进行点击
										//angular.element(".btnLeft").addClass("active");
										angular.element(".btnLeft a").css("cursor", "default").hover(function() {
											angular.element(".btnLeft a").css('color', 'black')
										});
									}
									for (var n = 0; n < 5; n++) {
										$scope.arr.push(n + 1);
									}
									$scope.behindPage = "...";
								} else if ($scope.currentPageNo > 3 && $scope.allPage > 5) { //如果当前页码大于3，并且总页数大于5
									if ($scope.currentPageNo >= $scope.allPage - 2) { //判断当前页码在3以内时，隐藏右侧...
										$scope.isShowPage2 = false;
									} else {
										$scope.isShowPage2 = true;
									}
									$scope.isShowPage1 = true;
									$scope.providerPage = "...";
									if ($scope.currentPageNo < $scope.allPage - 1) {
										//当前页数小于最后两页的页码，以当前页为中心加载5条数据
										//angular.element(".btnRight").removeClass("active");
										angular.element(".btnRight a").css("cursor", "pointer").hover(function() {
											angular.element(".btnRight a").css('color', '#FF9900')
										});

										$scope.arr = [];
										for (var i = Number($scope.currentPageNo) - 2; i <= Number($scope.currentPageNo) + 2 && i <= $scope.allPage; i++) {
											$scope.arr.push(i);
										}
										$scope.behindPage = "...";
									} else if ($scope.currentPageNo >= $scope.allPage - 1) { //当前页数为最后两页
										if ($scope.currentPageNo == $scope.allPage - 1) { //倒数第二页时显示最后五页，以当前页数-3为中心加载
											// angular.element(".btnRight").removeClass("active");
											angular.element(".btnLeft a").css("cursor", "pointer").hover(function() {
												angular.element(".btnLeft a").css('color', '#FF9900')
											});
											angular.element(".btnRight a").css("cursor", "pointer").hover(function() {
												angular.element(".btnRight a").css('color', '#FF9900')
											});
											for (var i = $scope.currentPageNo - 3; i <= $scope.allPage; i++) {
												$scope.arr.push(i);
											}
										} else if ($scope.currentPageNo == $scope.allPage) { //最后一页时显示最后五页，以当前页数-4为中心加载
											//angular.element(".btnRight").addClass("active");           //最后一页时向右不可点击
											angular.element(".btnRight a").css("cursor", "default").hover(function() {
												angular.element(".btnRight a").css('color', 'black')
											});
											//angular.element(".btnLeft").removeClass("active");
											angular.element(".btnLeft a").css("cursor", "pointer").hover(function() {
												angular.element(".btnLeft a").css('color', '#FF9900')
											});

											for (var i = $scope.currentPageNo - 4; i <= $scope.allPage; i++) {
												$scope.arr.push(i);
											}
										}
									}
								}
							}
						}
					)
			};

			//点击页码跳转到指定页
			$scope.choosePageNum = function(index) {
				$scope.currentPageNo = Number($scope.arr[index]);
				//执行完分页 重置body的scroll
				angular.element('body').scrollTop(350);
				//获取数组中对应下标的数值复制给$scope.currentPageNo
				$scope.$parent.loadData(false);
			}
			//点击按钮指定跳转页数
			$scope.selectPageNum = function(index) {
				$scope.currentPageNo = Number(index);
				$scope.currentPageNo = $scope.currentPageNo <= $scope.allPage ? $scope.currentPageNo : $scope.allPage;

				//执行完分页 重置body的scroll
				angular.element('body').scrollTop(350);
				//获取数组中对应下标的数值复制给$scope.currentPageNo
				$scope.$parent.loadData(false);
			}
			//跳转到首页
			$scope.jumpFirst = function() {
				if ($scope.currentPageNo != 1) {
					$scope.currentPageNo = 1;
					//执行完分页 重置body的scroll
					angular.element('body').scrollTop(350);
					$scope.$parent.loadData(false);
				}
			}
			//跳转到尾页
			$scope.jumpLast = function() {
				if ($scope.currentPageNo != $scope.allPage) {
					$scope.currentPageNo = $scope.allPage;
					//执行完分页 重置body的scroll
					angular.element('body').scrollTop(350);
					$scope.$parent.loadData(false);
				}
			}
			//显示上一页
			$scope.upPage = function() {
				if ($scope.currentPageNo > 1) {
					$scope.currentPageNo--;
					//执行完分页 重置body的scroll
					angular.element('body').scrollTop(350);
					$scope.$parent.loadData(false);
				}
			}
			//显示下一页
			$scope.downPage = function() {
				if ($scope.currentPageNo < $scope.allPage) { //小于总页数时才向服务器提交请求
					$scope.currentPageNo++;
					//执行完分页 重置body的scroll
					angular.element('body').scrollTop(350);
					$scope.$parent.loadData(false);
				}
			};
			//手动修改显示条数
			$scope.changePage = function(index) {
				$scope.currentPaseSize = index;
				$scope.currentPageNo = 1;
				//执行完分页 重置body的scroll
				angular.element('body').scrollTop(350);
				$scope.$parent.loadData(false);
			}
			//			if(checkLogin()) {
			//$scope.$parent.loadData(true)
			//			};
			$scope.$parent.loadData(true)
		}
	}
}

function pagerwaitorder() {
	return {
		restrict: 'E',
		//replace: true,
		templateUrl: "../../views/member/dataPager.html",
		scope: {},
		controller: function($scope, $element, constPageSize) {
			$scope.currentPageNo = 1; // 当前页码
			$scope.currentPaseSize = constPageSize; // 每页显示条数
			$scope.isShowPage1 = false; // 是否显示页码前面"..."
			$scope.isShowPage2 = false; // 是否显示页码后面"..."
			$scope.allDataCount = 0; // 所有记录数量
			$scope.selectPage = 1;
			$scope.$parent.loadData = function(ifRefresh) {
				if (ifRefresh)
					$scope.currentPageNo = 1;

				$scope.$parent.find($scope.currentPageNo)
					.then(
						function(result) {
							$scope.allDataCount = result.totalSize; //获取所有记录数量
							$scope.allPage = Math.ceil(result.totalSize / $scope.currentPaseSize) //获取所有页数并向上取整
							$scope.arr = []; //定义一个数组存放页码
							if ($scope.currentPageNo <= 5 && $scope.allPage <= 5) { //如果当前页数小于5并且总页数小于5
								//angular.element(".btnLeft").removeClass("active");
								angular.element(".btnLeft a").css("cursor", "pointer").hover(function() {
									angular.element(".btnLeft a").css('color', '#FF9900')
								});
								angular.element(".btnRight a").css("cursor", "pointer").hover(function() {
									angular.element(".btnRight a").css('color', '#FF9900')
								});

								$scope.isShowPage1 = false;
								$scope.isShowPage2 = false;
								if ($scope.currentPageNo == 1) { //为第一页时向左不可点击
									angular.element(".btnLeft a").css("cursor", "default").hover(function() {
										angular.element(".btnLeft a").css('color', 'black')
									});
								} else if ($scope.currentPageNo == $scope.allPage) { //为最后一页时向右不可点击
									//angular.element(".btnRight").addClass("active");
									angular.element(".btnRight a").css("cursor", "default").hover(function() {
										angular.element(".btnRight a").css('color', 'black')
									});
								} else { //否则向右向左都可点击

								}
								for (var i = 0; i < $scope.allPage; i++) {
									$scope.arr.push(i + 1);

								}
							} else {
								if ($scope.currentPageNo <= 3 && $scope.allPage > 5) { //如果 当前页数小于3，但是总页数大于5
									$scope.isShowPage1 = false;
									$scope.isShowPage2 = true;
									//angular.element(".btnRight").removeClass("active");
									angular.element(".btnRight a").css("cursor", "pointer").hover(function() {
										angular.element(".btnRight a").css('color', '#FF9900')
									});
									if ($scope.currentPageNo != 1) { //不为第一页时向前按钮可以点击
										//angular.element(".btnLeft").removeClass("active");
										angular.element(".btnLeft a").css("cursor", "pointer").hover(function() {
											angular.element(".btnLeft a").css('color', '#FF9900')
										});
									} else { //否则 不可以进行点击
										//angular.element(".btnLeft").addClass("active");
										angular.element(".btnLeft a").css("cursor", "default").hover(function() {
											angular.element(".btnLeft a").css('color', 'black')
										});
									}
									for (var n = 0; n < 5; n++) {
										$scope.arr.push(n + 1);
									}
									$scope.behindPage = "...";
								} else if ($scope.currentPageNo > 3 && $scope.allPage > 5) { //如果当前页码大于3，并且总页数大于5
									if ($scope.currentPageNo >= $scope.allPage - 2) { //判断当前页码在3以内时，隐藏右侧...
										$scope.isShowPage2 = false;
									} else {
										$scope.isShowPage2 = true;
									}
									$scope.isShowPage1 = true;
									$scope.providerPage = "...";
									if ($scope.currentPageNo < $scope.allPage - 1) {
										//当前页数小于最后两页的页码，以当前页为中心加载5条数据
										//angular.element(".btnRight").removeClass("active");
										angular.element(".btnRight a").css("cursor", "pointer").hover(function() {
											angular.element(".btnRight a").css('color', '#FF9900')
										});

										$scope.arr = [];
										for (var i = Number($scope.currentPageNo) - 2; i <= Number($scope.currentPageNo) + 2 && i <= $scope.allPage; i++) {
											$scope.arr.push(i);
										}
										$scope.behindPage = "...";
									} else if ($scope.currentPageNo >= $scope.allPage - 1) { //当前页数为最后两页
										if ($scope.currentPageNo == $scope.allPage - 1) { //倒数第二页时显示最后五页，以当前页数-3为中心加载
											// angular.element(".btnRight").removeClass("active");
											angular.element(".btnLeft a").css("cursor", "pointer").hover(function() {
												angular.element(".btnLeft a").css('color', '#FF9900')
											});
											angular.element(".btnRight a").css("cursor", "pointer").hover(function() {
												angular.element(".btnRight a").css('color', '#FF9900')
											});
											for (var i = $scope.currentPageNo - 3; i <= $scope.allPage; i++) {
												$scope.arr.push(i);
											}
										} else if ($scope.currentPageNo == $scope.allPage) { //最后一页时显示最后五页，以当前页数-4为中心加载
											//angular.element(".btnRight").addClass("active");           //最后一页时向右不可点击
											angular.element(".btnRight a").css("cursor", "default").hover(function() {
												angular.element(".btnRight a").css('color', 'black')
											});
											//angular.element(".btnLeft").removeClass("active");
											angular.element(".btnLeft a").css("cursor", "pointer").hover(function() {
												angular.element(".btnLeft a").css('color', '#FF9900')
											});

											for (var i = $scope.currentPageNo - 4; i <= $scope.allPage; i++) {
												$scope.arr.push(i);
											}
										}
									}
								}
							}
						}
					)
			};
			//点击页码跳转到指定页
			$scope.choosePageNum = function(index) {
				$scope.currentPageNo = Number($scope.arr[index]);
				//执行完分页 重置body的scroll
				angular.element('body').scrollTop(350);
				//获取数组中对应下标的数值复制给$scope.currentPageNo
				$scope.$parent.loadData(false);
			}
			//点击按钮指定跳转页数
			$scope.selectPageNum = function(index) {
				$scope.currentPageNo = Number(index);
				$scope.currentPageNo = $scope.currentPageNo <= $scope.allPage ? $scope.currentPageNo : $scope.allPage;

				//执行完分页 重置body的scroll
				angular.element('body').scrollTop(350);
				//获取数组中对应下标的数值复制给$scope.currentPageNo
				$scope.$parent.loadData(false);
			}
			//跳转到首页
			$scope.jumpFirst = function() {
				if ($scope.currentPageNo != 1) {
					$scope.currentPageNo = 1;
					//执行完分页 重置body的scroll
					angular.element('body').scrollTop(350);
					$scope.$parent.loadData(false);
				}
			}
			//跳转到尾页
			$scope.jumpLast = function() {
				if ($scope.currentPageNo != $scope.allPage) {
					$scope.currentPageNo = $scope.allPage;
					//执行完分页 重置body的scroll
					angular.element('body').scrollTop(350);
					$scope.$parent.loadData(false);
				}
			}
			//显示上一页
			$scope.upPage = function() {
				if ($scope.currentPageNo > 1) {
					$scope.currentPageNo--;
					//执行完分页 重置body的scroll
					angular.element('body').scrollTop(350);
					$scope.$parent.loadData(false);
				}
			}
			//显示下一页
			$scope.downPage = function() {
				if ($scope.currentPageNo < $scope.allPage) { //小于总页数时才向服务器提交请求
					$scope.currentPageNo++;
					//执行完分页 重置body的scroll
					angular.element('body').scrollTop(350);
					$scope.$parent.loadData(false);
				}
			};
			//手动修改显示条数
			$scope.changePage = function(index) {
				$scope.currentPaseSize = index;
				$scope.currentPageNo = 1;
				//执行完分页 重置body的scroll
				angular.element('body').scrollTop(350);
				$scope.$parent.loadData(false);
			}
			if (checkLogin()) {
				$scope.$parent.loadData(true)
			};
			//$scope.$parent.loadData(true)
		}
	}
}

function goodsindown() {
	return {
		restrict: 'E',
		replace: true,
		template: '<li class="produc_goods_shop clearfix">' +
			'<div class="goods_look clearfix">' +
			'<div class="look_head"> 大家都在看</div>' +
			'<ul class="clearfix">' +
			'<li ng-repeat="good in goodsindown">' +
			'<ol>' +
			'<li><a href="goods.html?id={{good.id}}" target="_blank">{{good.name1}}</a></li>' +
			'<li><span>{{good.salesPrice | priceFormatFilter}}</li>' +
			'<li><a href="goods.html?id={{good.id}}" target="_blank"><img ng-src="{{good.masterImg}}"></a></li>' +
			'</ol>' +
			'</li>' +
			'</ul>' +
			'</div>' +
			'</li>',
		scope: true
	}

}
//</span><span class="line">￥{{good.marketPrice | number:2}}</span>优惠
