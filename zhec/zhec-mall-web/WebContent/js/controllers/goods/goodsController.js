function goodsController($scope, $rootScope, $q, $timeout, goodsService, ngDialog) {
	$scope.member = getCookie("loginManager"); //获取登录信息
	if($scope.member != "") {
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
		$scope.memberLoginId = $scope.member.loginId;
		$scope.prescriptionUrl = imgPathPrescription; //oss路径
	}
	$scope.ifLogin = getCookie("formToken");
	$scope.collectPic = "images/sc1.png" //收藏按钮的图片
	var _url = window.location.href; //获取当前路径
	$scope.consultantId = 0; //默认顾问id为0

	if(/consultantId=\d+/g.test(_url)) { //获取顾问id
		$scope.consultantId = parseInt(_url.match(/consultantId=\d+/g)[0].replace("consultantId=", ""));
	}

	if(/id=\d+/g.test(_url)) { //获取商品id
		$scope.goodsId = parseInt(_url.match(/id=\d+/g)[0].replace("id=", ""));
	}
	$scope.hasGoods = true; //判断是否有商品
	$rootScope.showAlert = function(message) {
		var dialog = ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default',
			height: 174,
			controller: ['$scope', function($scope) {
				$scope.promptMessage = message;
			}],
		});

		$timeout(function() {
			dialog.close();
		}, 1500);
	}
	//提示框
	$scope.showAlert = function(message) {
		ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default',
			width: 400,
			height: 174,
			controller: ['$scope', function($scope) {
				$scope.promptMessage = message;
			}],
		});
	}
	//提交资质弹出框
	$scope.openDetail = function() {
			checkLogin()
			$scope.selectSpc1 = $scope.selectSpc;
			$scope.memberId = $scope.member.id;
			$scope.dialog = ngDialog.open({
				template: '../../../views/goods/content.html',
				className: 'ngdialog-theme-default',
				width: 900,
				scope: $scope,
				closeByDocument: false,
				controller: openDetailController
			})
		}
		//商品推荐位
	$scope.goodsrecommend = function() {
		var defer = $q.defer();
		goodsService
			.findRecommend()
			.then(function(result) {
				$scope.goodsinleft = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	}

	//限制输入数量
	$scope.limitStock = function(num) {
			if($scope.initStock < num) {
				$scope.showAlert(zhecDisplayMessage.cartUnderStock)
				$scope.goodsNum = num - 1;
				return;
			}
		}
		//是否收藏过该商品
	$scope.ifCollect = function() {
		goodsService
			.ifCollect($scope.memberId, $scope.goodsId)
			.then(function(result) {
				$scope.ifCollection = result;
				if($scope.ifCollection == true) { //已收藏
					$scope.collectPic = "images/sc.png"
				} else {
					$scope.collectPic = "images/sc1.png"
				}

			}, function(result) {

			});
	}
	if($scope.ifLogin != "" && $scope.ifLogin != null && $scope.ifLogin != undefined) {
		$scope.ifCollect()
	}
	//判断数组是否包含指定元素的方法
	Array.prototype.contains = function(needle) {
		for(i in this) {
			if(this[i] == needle) return true;
		}
		return false;
	};
	//获取价格及促销信息
	$scope.getPrice = function() {
		if($scope.memberId == undefined || $scope.memberId == "" || $scope.memberId == null) {
			$scope.memberId = 0;
		}
		goodsService
			.getPrice($scope.memberId, $scope.goodsId, 1, 1, 1)
			.then(function(result) {
				console.log(result)
				$scope.couponsPromotionList = result.data[0].couponsPromotionList; //优惠券
				$scope.goodsPromotionList = result.data[0].goodsPromotionList; //商品优惠
				$scope.ordersPromotionList = result.data[0].ordersPromotionList; //订单优惠
				$scope.productPriceList = result.data[0].productPriceList; //货品优惠
				$scope.flag = true; //判断是否所有类型都无货
				$scope.flag1 = false;
				console.log($scope.goodsDetail.productList)
				for(var i = 0; i < $scope.goodsDetail.productList.length; i++) {
					//第一个促销的货品并且有货
					for(var j = 0; j < $scope.productPriceList.length; j++) {
						if($scope.productPriceList[j].productId == $scope.goodsDetail.productList[i].id) {
							$scope.goodsDetail.productList[i].promptionSalesPrice = $scope.productPriceList[j].salesPrice;
							$scope.goodsDetail.productList[i].originalPrice = $scope.productPriceList[j].originalPrice;
							$scope.goodsDetail.productList[i].isSelected = $scope.productPriceList[j].isSelected;
							if($scope.goodsDetail.productList[i].isSelected == 1) { //默认显示的货品内容
								$scope.promptionPrice = $scope.goodsDetail.productList[i].promptionSalesPrice
								$scope.currentProStock = $scope.goodsDetail.productList[i].stock;
								if($scope.goodsPromotionList.length > 0) { //有商品促销时，该价格作为原价
									$scope.zhPrice = $scope.goodsDetail.productList[i].originalPrice;
//									$scope.zhPrice1 = $scope.goodsDetail.productList[i].originalPrice;
								} else { //没有促销，改价格就作为商城价
									$scope.zhPrice = $scope.goodsDetail.productList[i].promptionSalesPrice;
//									$scope.zhPrice1 = $scope.goodsDetail.productList[i].promptionSalesPrice;
								}
								$scope.productId = $scope.goodsDetail.productList[i].id;
//								$scope.productId1 = $scope.goodsDetail.productList[i].id;
								//								$scope.selectSpc = $scope.goodsDetail.productList[i].specAttrName;
//								$scope.applyProductId = $scope.goodsDetail.productList[i].id
								$scope.masterImg = $scope.goodsDetail.productList[i].masterImg;
								$scope.specInfoName = $scope.goodsDetail.productList[j].specInfo;
								$scope.currentProductId = $scope.goodsDetail.productList[i].id
								$scope.applyProductId = $scope.goodsDetail.productList[i].id; //处方药默认申请的货品
								if($scope.goodsDetail.productList[i].specAttrIds!=null&&$scope.goodsDetail.productList[i].specAttrIds!=""&&$scope.goodsDetail.productList[i].specAttrIds!=undefined){
									$scope.specAttrIds = $scope.goodsDetail.productList[i].specAttrIds.split(","); //默认货品id组合
//									if($scope.goodsDetail.productList[i].specAttrIds == $scope.specAttrIds){
									$scope.firstImg = $scope.masterImg;
//									}
								}
								$scope.initStock = $scope.goodsDetail.productList[i].stock;
								
							}
						}
					}
					if($scope.goodsDetail.productList[i].stock >= 1) { //如果有商品有库存
						$scope.flag = false;
					}
				}
				$(".showHide").show()
			}, function(result) {

			});
	}
	//笛卡儿积组合  
	function descartes(list) {
		//parent上一级索引;count指针计数  
		var point = {};
		var result = [];
		var pIndex = null;
		var tempCount = 0;
		var temp = "";
		$scope.proLength = 0;
		//根据参数列生成指针对象  
		for(var index in list) {
			if(typeof list[index] == 'object') {
				point[index] = {
					'parent': pIndex,
					'count': 0
				}
				pIndex = index;
			}
		}
		//单维度数据结构直接返回  
		if(pIndex == null) {
			return list;
		}
		//动态生成笛卡尔积  
		while(true) {
			for(var index in list) {
				tempCount = point[index]['count'];
				temp +=list[index][tempCount].split(":")[0]+"&";
			}
			$scope.temp1 = temp.split("&")
			//压入结果数组  
			result.push(temp);
			
			temp = "";
			//检查指针最大值问题  
			while(true) {
				if(point[index]['count'] + 1 >= list[index].length) {
					point[index]['count'] = 0;
					pIndex = point[index]['parent'];
					if(pIndex == null) {
						return result;
					}
					//赋值parent进行再次检查  
					index = pIndex;
				} else {
					point[index]['count']++;
					break;
				}
			}
		}
		
	}
	
	$scope.find = function() {
		goodsService
			.goodsDetail($scope.goodsId)
			.then(function(result) {
				console.log(result)
				if(result.code == -100 || result.code == -1 || result.data.goodsDetail == null) {
					window.open(constMallLocation + "/notfindgoods.html", "_self");
					return;
				}
				$scope.comeInNav1 = result.data.selCategory.split("&");
				//导航渲染
				$scope.comeInNav = [];
				for(var i = 0; i < $scope.comeInNav1.length; i++) {
					$scope.navMessage = {
						"id": $scope.comeInNav1[i].split(":")[0],
						"name": $scope.comeInNav1[i].split(":")[1]
					};
					$scope.comeInNav.push($scope.navMessage);
				}

				$scope.goodsStatus = result.data.goodsStatus; //当前商品状态
				$scope.goodsDetail = result.data.goodsDetail; //商品详情
				$scope.spcInfo = result.data.specInfo; //规格信息
				$scope.propsInfo = result.data.propsInfo; //属性信息
				console.log($scope.propsInfo)
				$scope.productidsArr = [];

//				console.log(descartes($scope.spcInfo))
				$scope.productids = descartes($scope.spcInfo);
				$scope.productids2 = [];
				for(var i = 0; i < $scope.productids.length; i++){
					$scope.idsArr = $scope.productids[i].split("&");
					$scope.productids1 = ""
					for(var n = 0; n < $scope.idsArr.length; n++){
						if($scope.idsArr[n] != ""){
							$scope.productids1 += $scope.idsArr[n];
							if(n < $scope.idsArr.length - 2){
								$scope.productids1 += "&"
							}
						}
					}
					if($scope.productids1 != ""){
						$scope.productids1 = $scope.productids1.split("&");
						$scope.productids4 = "";
						for(var j = 0; j < $scope.productids1.length; j++){
							$scope.productids3 = "";
							for (var inner = j + 1; inner < $scope.productids1.length; inner++) {//这里是a.length，不是a.lenght-1，因为后者会导致右数第2项没法参与排序。
					          if ($scope.productids1[inner] < $scope.productids1[j]) {
					            $scope.productids3 = $scope.productids1[inner];
						          $scope.productids1[inner] = $scope.productids1[j]
						          $scope.productids1[j] = $scope.productids3;
					          }
					          //将最小的项移动到左侧
					        }
						}
						for(var n = 0; n < $scope.productids1.length; n++){
							$scope.productids4+=$scope.productids1[n];
							if(n < $scope.productids1.length -1){
								$scope.productids4+="&"
							}
						}
						$scope.productids2.push($scope.productids4)
					}
					
				}
				console.log($scope.productids2)
				$("#fixedArea>ul").width($scope.goodsDetail.imagesList.length * 72)

				$scope.firstImg = $scope.goodsDetail.imagesList[0].imagePath;
				$scope.spcName = $scope.goodsDetail.productList[0].specName; //规格名称

				$scope.goodsNum = 1;
				//富文本内容渲染
				angular.element(".description").html($scope.goodsDetail.description);
				angular.element(".instruction").html($scope.goodsDetail.instruction)
				$scope.getPrice()
			}, function(result) {

			});

	}
	if($scope.goodsId == "" || $scope.goodsId == null || $scope.goodsId == undefined) {
		window.open(constMallLocation + "/notfindgoods.html", "_self")
	} else {
		$scope.find()
	}
	$scope.goodsrecommend();
	//改变规格
	$scope.changeType = function(n, productId,  event,key) {
		//获取改变的货品id组合
		for(var i = 0; i < $scope.spcInfo[key].length; i++){
			for(var n = 0; n < $scope.specAttrIds.length; n++){
				if($scope.specAttrIds[n] == $scope.spcInfo[key][i].split(':')[0]){
					$scope.specAttrIds[n] = productId
				}
			}
		}
		//查询货品信息
		for(var j = 0; j < $scope.goodsDetail.productList.length; j++) {
			if($scope.goodsDetail.productList[j].specAttrIds == $scope.specAttrIds){
				console.log($scope.goodsDetail.productList[j])
				$scope.initStock = $scope.goodsDetail.productList[j].stock;
				$scope.masterImg = $scope.goodsDetail.productList[j].masterImg;
				$scope.firstImg = $scope.masterImg;
				$scope.specInfoName = $scope.goodsDetail.productList[j].specInfo;
				$scope.currentProductId = $scope.goodsDetail.productList[j].id;
				
			}
		}
		//查询价格
		for(var j = 0; j < $scope.productPriceList.length; j++) {
			if($scope.productPriceList[j].productId == $scope.currentProductId) {
				if($scope.goodsPromotionList.length > 0) { //有商品促销时，该价格作为原价
					$scope.zhPrice = $scope.productPriceList[j].originalPrice;
//					$scope.goodsDetail.productList[i].promptionSalesPrice = $scope.productPriceList[j].salesPrice;
					$scope.promptionPrice = $scope.productPriceList[j].salesPrice;
				} else { //没有促销，改价格就作为商城价
					$scope.zhPrice = $scope.productPriceList[j].salesPrice;
				}
			}
		}		
		
		//显示是否有货
		if($scope.initStock >= 1) {
			$scope.flag1 = false;
			$scope.goodsNum = 1; //改变规格数量就回归为0
			$scope.currentProStock = $scope.initStock;
			$scope.productId = productId;
			if(n == 1) { //主购物车
//				$scope.productId = $scope.specAttrIds;
				$scope.initStock = $scope.initStock;
			}
			$scope.selectSpc = $scope.specInfoName;
			$scope.applyProductId = productId;
		} else {
			$scope.flag1 = true;
			$scope.showAlert(zhecDisplayMessage.cartUnderStock)
		}
	}

	//选项卡
	$scope.currentShowMessage = 0;
	$scope.changeMessage = function(n, event) {
			$scope.currentShowMessage = n;
			$(".clickShow>ul").hide()
			$($(".clickShow>ul")[n]).show()
			if($(".conter_right_ul_ulde").offset().top > $(".fixNavTop").offset().top) {
				$("body,html").animate({
					scrollTop: $(".fixNavTop").offset().top
				}, 0);
			}
		}
		//立即购买
	$scope.nowBuy = function(n) {
			if(!checkLogin()) {
				return;
			}
			if($scope.okModalDisabled == true) {
				return 0;
			}
			$scope.okModalDisabled = true;
			if($scope.consultantId == "" || $scope.consultantId == undefined || $scope.consultantId == null) {
				$scope.consultantId = 0
			}
			$scope.prePage = getCookie("prePage"); //	获取上一页的路径
			if($scope.prePage != "" && $scope.prePage != null && $scope.prePage != undefined) { //判断路径是否带有顾问信息
				if(/consultantId=\d+/g.test($scope.prePage)) {
					$scope.consultantId = parseInt($scope.prePage.match(/consultantId=\d+/g)[0].replace("consultantId=", ""));
				}
			}
			$scope.productCount = $scope.goodsNum;
			if(checkLogin()) {
				delCookie("prePage");
				if(n == 1) {
					window.open("order.html?type=1&productId=" + $scope.productId + "&productCount=" + $scope.productCount + "&consultantId=" + $scope.consultantId, "_self")
				} else {
					window.open("order.html?type=1&productId=" + $scope.productId1 + "&productCount=" + $scope.productCount + "&consultantId=" + $scope.consultantId, "_self")
				}
				$scope.okModalDisabled = false;
			}
		}
		//加入购物车
	$scope.joinCart = function(n) {
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		if($scope.consultantId == "" || $scope.consultantId == undefined || $scope.consultantId == null) {
			$scope.consultantId = 0;
		}
		$scope.prePage = getCookie("prePage");
		if($scope.prePage != "" && $scope.prePage != null && $scope.prePage != undefined) {
			if(/consultantId=\d+/g.test($scope.prePage)) {
				$scope.consultantId = parseInt($scope.prePage.match(/consultantId=\d+/g)[0].replace("consultantId=", ""));
			}
		}
		delCookie("prePage");
		if(n == 1) {
			addGoodsToCart($scope.productId, $scope.goodsNum, $scope.consultantId)
			$scope.okModalDisabled = false;
		} else {
			addGoodsToCart($scope.productId, $scope.goodsNum, $scope.consultantId)
			$scope.okModalDisabled = false;
		}
	}
	//控制划过效果，判断是否有货从而显示不同的点击状态
	$scope.hoverSpc = function(n, stock, event) {
		if(n == 1) {
			angular.element(".slectSpe").removeClass("notProduct");
			angular.element(".slectSpe").removeClass("allowClick");
		} else {
			angular.element(".slectSpe1").removeClass("notProduct");
			angular.element(".slectSpe1").removeClass("allowClick");
		}
		if(stock < 1) {
			angular.element(event.target).addClass("notProduct");
		} else {
			angular.element(event.target).addClass("allowClick");
		}
	}
	$scope.submitInterface = function(n, submitMessage) {
		if($scope.okModalDisabled1 == true) {
			return 0;
		}
		$scope.okModalDisabled1 = true;
		var defer = $q.defer();
		console.log(submitMessage)
		goodsService
			.submitInterface(submitMessage)
			.then(function(result) {
				if(result.code == 1) {
					if(n == 1) {
						$scope.showAlert(zhecDisplayMessage.detailApplySuccess1)
						$timeout(function() {
							ngDialog.close();
						}, 1500);
						$scope.myMobile = "";
					}
				} else if(result.code == -2) {
					$scope.showAlert(zhecDisplayMessage.detailApplycheckMobile);
					$scope.myMobile = "";
				}
				$scope.okModalDisabled1 = false;
				defer.resolve(result);
			}, function(result) {
				$scope.okModalDisabled1 = false;
				defer.reject(result);
			});
		return defer.promise;
	}
	//处方申请提交
	$scope.submitInputMessage1 = function(n) {
		checkLogin()
		$scope.submitMessage = {};
		$scope.submitMessage.memberLoginId = $scope.memberLoginId;
		$scope.submitMessage.goodsType = $scope.goodsDetail.goodsType;
		$scope.submitMessage.consultantId = $scope.consultantId;
		$scope.submitMessage.goodsName = $scope.goodsDetail.name1;
		$scope.submitMessage.goodsImageUrl = $scope.goodsDetail.imagesList[0].imagePath;
		$scope.submitMessage.memberId = $scope.memberId;
		$scope.submitMessage.goodsId = $scope.goodsDetail.id;
		$scope.submitMessage.productId = $scope.applyProductId;
		$scope.submitMessage.goodsPrice = $scope.zhPrice;
		$scope.submitMessage.orderSource = 1;
		$scope.submitMessage.mobile = $scope.myMobile;
		if($scope.myMobile == null || $scope.myMobile == undefined || $scope.myMobile == "") {
			$scope.showAlert(zhecDisplayMessage.detailNoPhone);
			return;
		}
		$scope.submitMessage.submitStatus = 1;
		$scope.submitMessage.productNumber = $scope.goodsNum;
		$scope.submitInterface(1, $scope.submitMessage);
	}

	
	$scope.joinCollection = function() {
			if($scope.ifCollection == true) {
				goodsService
					.editgoodscollection($scope.memberId, $scope.goodsId)
					.then(function(result) {
						if(result.code == 1) {
							$scope.showAlert(zhecDisplayMessage.detailIfCollect);
							$scope.collectPic = "images/sc1.png";
							$scope.ifCollection = false;
							$timeout(function() {
								ngDialog.close();
							}, 1500);
						}
					})
				return;
			}
			$scope.pushMessage = [];
			$scope.saveMessage = {};
			$scope.saveMessage.memberId = $scope.memberId;
			$scope.saveMessage.goodsId = $scope.goodsDetail.id;
			$scope.saveMessage.productId = $scope.productId;
			$scope.saveMessage.cartId = "";
			$scope.pushMessage.push($scope.saveMessage)
			if(checkLogin()) {
				goodsService
					.joinCollection($scope.pushMessage)
					.then(function(result) {
						if(result.code == 0) {
							$scope.showAlert(zhecDisplayMessage.detailCollection);
							$scope.collectPic = "images/sc.png";
							$scope.ifCollection = true;
							$timeout(function() {
								ngDialog.close();
							}, 1500);
						}
					})
			}
		}
		//图片轮播向右
	$scope.showMore = function() {
			$scope.currentLeft = parseInt($("#fixedArea>ul").css("left").replace("px", ""));
			//		console.log(Math.abs($scope.currentLeft),($scope.goodsDetail.imagesList.length - 5)*69)
			if($("#fixedArea > ul").width() > 358 && Math.abs($scope.currentLeft) < ($scope.goodsDetail.imagesList.length - 5) * 66) {
//				$timeout(function() {
					$("#fixedArea>ul").css("left", $scope.currentLeft - 69)
//				}, 600);
			}

		}
		//图片轮播向左
	$scope.showBefore = function() {
			$scope.currentLeft = parseInt($("#fixedArea>ul").css("left").replace("px", ""));
			console.log(Math.abs($scope.currentLeft), ($scope.goodsDetail.imagesList.length - 5) * 69)
			if($("#fixedArea > ul").width() > 358 && $scope.currentLeft < 0) {
//				$timeout(function() {
					$("#fixedArea>ul").css("left", $scope.currentLeft + 69)
//				}, 600);

			}
		}
		//分享
	$scope.goToShare = function(id) {
			$("#shareCover").show()

		}
		//取消分享
	$scope.cancleShare = function() {
			//		$scope.dialog1.close()
			$("#shareCover").hide()
		}
		//放大镜
	$scope.changePath = function(path, event) {
		$("#bigImg").attr("src", path + "?x-oss-process=style/l_b");
		$("#midimg").attr("src", path + "?x-oss-process=style/l_m");
		angular.element("#imageMenu li").removeClass("hover");
		angular.element(event.target).parent().addClass("hover");
	}
	$(document).ready(function() {
		//吸顶
		var detailsTop = $(".conter_right_ul_ulde").offset().top;
		var goosdetailMessageLeft = $(".goosdetailMessage").offset().left;
		var allMessagesHeight = $(".clickShow").offset().top;
		var goodsHeight = $(".goosdetailMessage").height();
		var footerTop = $(".foot").offset().top;
		$(window).scroll(function() {
			if($(window).scrollTop() >= detailsTop) {
				$(".conter_right_ul_ulde").addClass("fixedNavTop")
				$(".goosdetailMessage").addClass("fixedNavTop")
				$(".goosdetailMessage").css({
					"left": goosdetailMessageLeft
				})
				if($(window).scrollTop() >= detailsTop + $(".conter_left_ula").height() - 320 && $($(".getGoodsMessageHei")[$scope.currentShowMessage]).height() < $(".conter_left_ula").height()) {
					$(".conter_right_ul_ulde").removeClass("fixedNavTop")
					$(".goosdetailMessage").removeClass("fixedNavTop");
				} else if($(window).scrollTop() >= detailsTop + $($(".getGoodsMessageHei")[$scope.currentShowMessage]).height() && $($(".getGoodsMessageHei")[$scope.currentShowMessage]).height() > $(".conter_left_ula").height()) {
					$(".goosdetailMessage").removeClass("fixedNavTop");
					$(".conter_right_ul_ulde").removeClass("fixedNavTop")
				}
			} else {
				$(".conter_right_ul_ulde").removeClass("fixedNavTop");
				$(".goosdetailMessage").removeClass("fixedNavTop");
			}
		})
	})
	var bigViewHeight = $("#vertical").offset().top;
	var bigViewLeft = $("#vertical").offset().left + $("#vertical").width();
	$(".bigBox").css({
		"left": bigViewLeft,
		"top": bigViewHeight
	})
	var smallBox = document.getElementById("vertical"); //小盒子
	var tool = document.getElementById("tool"); //放大镜
	var bigBox = document.getElementById("bigView"); //大盒子
	var bigImg = document.getElementById("bigImg"); //大图片

	smallBox.onmouseover = function() {
		tool.style.display = "block"; //显示出放大镜（tool）
		bigBox.style.display = "block"; //显示出右边的大盒子。
	}
	smallBox.onmouseout = function() {
		tool.style.display = "none"; //隐藏出放大镜（tool）
		bigBox.style.display = "none"; //隐藏出右边的大盒子。
	}
	smallBox.onmousemove = function(e) {
		var _event = window.event || e; //事件对象
		var left = _event.clientX - smallBox.offsetLeft - tool.offsetWidth / 2;
		var top = _event.clientY - smallBox.offsetTop - tool.offsetHeight / 2 + $(document).scrollTop();
		if(left < 0) {
			left = 0;
		}
		if(top < 0) {
			top = 0;
		}
		if(left > smallBox.offsetWidth - tool.offsetWidth) {
			left = smallBox.offsetWidth - tool.offsetWidth;
		}
		if(top > smallBox.offsetHeight - tool.offsetHeight) {
			top = smallBox.offsetHeight - tool.offsetHeight;
		}
		tool.style.left = left + "px";
		tool.style.top = top + "px";
		var x = tool.offsetLeft * bigBox.offsetWidth / tool.offsetWidth;
		var y = tool.offsetTop * bigBox.offsetHeight / tool.offsetHeight;
		bigImg.style.left = -x + "px";
		bigImg.style.top = -y + "px";
	}
}

function openDetailController($scope, $q, $timeout, goodsService, ngDialog) {
	$scope.prescriptionUrl = imgPathPrescription; //oss路径
	$scope.consultantId = 0;
	$scope.showPost = false;
	$scope.ifLogin = getCookie("formToken");
	var _url = window.location.href; //获取当前路径
	if(/consultantId=\d+/g.test(_url)) { //获取顾问id
		$scope.consultantId = parseInt(_url.match(/consultantId=\d+/g)[0].replace("consultantId=", ""));
	}
	if(/id=\d+/g.test(_url)) { //获取商品id
		$scope.goodsId = parseInt(_url.match(/id=\d+/g)[0].replace("id=", ""));
	}
	//获取用户基本信息
	$scope.getMemberMessage = function() {
		var defer = $q.defer();

		goodsService
			.memeberDetail($scope.memberId)
			.then(function(result) {
				if(result.code == 0 && result.data != null) { //显示默认的地址及姓名、电话
					$scope.memberMessage = result.data;
					if($scope.memberMessage.consigneePca != null && $scope.memberMessage.consigneePca != "" && $scope.memberMessage.consigneePca != undefined) {
						$scope.defaltAddress = $scope.memberMessage.consigneePca.split(" ");
					}

					$scope.provname = $scope.defaltAddress[0];
					if($scope.memberMessage.consigneeProvince != "" && $scope.memberMessage.consigneeProvince != null && $scope.memberMessage.consigneeProvince != undefined) {
						$scope.change($scope.memberMessage.consigneeProvince, 1);
					}
					$scope.cityname = $scope.defaltAddress[1];
					if($scope.memberMessage.consigneeCity != "" && $scope.memberMessage.consigneeCity != null && $scope.memberMessage.consigneeCity != undefined) {
						$scope.consigneeCityAttr.push({
							"id": $scope.memberMessage.consigneeCity,
							"name": $scope.defaltAddress[1]
						});
						$scope.change($scope.memberMessage.consigneeCity, 2);
					}
					$scope.areaname = $scope.defaltAddress[2];
					$scope.consigneeAddress = $scope.memberMessage.consigneeAddress;
					$scope.consigneePost = $scope.memberMessage.consigneePost;
				}
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	}

	//获取一级地区列表
	$scope.getFirAddress = function() {
		goodsService
			.findtoplevelareas()
			.then(
				function(result) {
					if(result.code == 0) {
						$scope.consigneeProvinceAttr = result.data;
						if($scope.ifLogin != "" && $scope.ifLogin != null && $scope.ifLogin != undefined) {
							$scope.getMemberMessage()
						}
					} else {
						return;
					}

				})
	}
	$scope.getFirAddress()
		//默认不要发票
	$scope.showInvoice = false;
	$scope.confirmType = 0;
	$scope.middleType = 0;
	$scope.middleTitle = "";
	$scope.middleDetail = "";
	$scope.confirmTitle = "";
	$scope.confirmDetail = "";
	//点击显示发票
	$scope.openInvoiceModal = function() {
			$scope.showInvoice = true;
		}
		//发票选项卡
	$scope.changeInvoiceType = function(n, event) {
			$scope.middleType = n;
			angular.element(".selectIfOrc li").removeClass("pop_blue");
			angular.element(event.target).addClass("pop_blue");
			if(n == 1 || n == 2) {
				$scope.middleTitle = "个人";
				$scope.middleDetail = "明细";
			}
		}
		//选择发票内容
	$scope.chooseDetail = function(invoiceDetail) {

			$scope.middleDetail = invoiceDetail;
		}
		//改变发票抬头
	$scope.titleType = 1;
	$scope.chooseTitle = function(n, event) {
			angular.element(".chooseTitle span").removeClass("goods_right");
			angular.element(".chooseTitle input").removeClass("goods_bord");
			angular.element(event.target).addClass("goods_bord");
			$($(".chooseTitle")[n]).find("span").addClass("goods_right");
			$scope.titleType = n;
			if(n == 1) {
				$scope.middleTitle = "个人";
			} else {
				$scope.middleTitle = $scope.inputTitle;
			}
		}
		//保存发票信息
	$scope.saveInvoice = function() {
			$scope.saveFlag = true;
			if($scope.middleType == 0) { //无需发票
				$scope.confirmTitle = "";
				$scope.confirmDetail = "";
				$scope.confirmEmail = "";
				$scope.titleType = "";
			} else { //需要发票
				$scope.confirmEmail = "";
				if($scope.middleType == 2) { //电子发票
					$scope.confirmEmail = $scope.orderEmail;
					$scope.confirmDetail = $scope.middleDetail;
					if($scope.titleType == 2) {
						if($scope.inputTitle == "" || $scope.inputTitle == null || $scope.inputTitle == undefined) {
							$scope.saveFlag = false;
							$scope.showAlert(zhecDisplayMessage.detailInputTitle)
							return;
						}
						$scope.invoiceTitle = $scope.inputTitle;
						$scope.confirmTitle = $scope.inputTitle;
					} else {
						$scope.confirmTitle = "个人";
					}
					if($scope.orderEmail == "" || $scope.orderEmail == null || $scope.orderEmail == undefined) {
						$scope.saveFlag = false;
						$scope.showAlert(zhecDisplayMessage.detailInputEmail);
						return;
					}
				} else { //纸质发票
					if($scope.titleType == 1) {
						$scope.confirmTitle = "个人";
					} else {
						if($scope.inputTitle == "" || $scope.inputTitle == null || $scope.inputTitle == undefined) {
							$scope.saveFlag = false;
							$scope.showAlert(zhecDisplayMessage.detailInputTitle)
							return;
						}
						$scope.confirmTitle = $scope.inputTitle;
					}
					$scope.confirmDetail = $scope.middleDetail;
				}
			}
			if($scope.saveFlag) {
				$scope.showInvoice = false;
			}
			$scope.confirmType = $scope.middleType;
		}
		//取消选择发票
	$scope.cancleInvoice = function() {
			$scope.showInvoice = false;
		}
		//选择地区
	$scope.change = function(id, n) {
		if(n == 1) {
			$scope.consigneeCity = "";
			$scope.consigneeArea = "";
			$scope.consigneeCityAttr = [];
			$scope.consigneeAreaAttr = [];
			$scope.cityname == "";
			$scope.areaname == "";
			for(var a = 0; a < $scope.consigneeProvinceAttr.length; a++) {
				if($scope.consigneeProvinceAttr[a].id == id) {
					$scope.provname = $scope.consigneeProvinceAttr[a].name;
				}
			}
		}
		if(n == 2) {
			$scope.consigneeArea = "";
			$scope.consigneeAreaAttr = [];
			$scope.areaname == "";
			for(var b = 0; b < $scope.consigneeCityAttr.length; b++) {
				if($scope.consigneeCityAttr[b].id == id) {
					$scope.cityname = $scope.consigneeCityAttr[b].name;
				}
			}
		}
		if(n == 3) {
			for(var c = 0; c < $scope.consigneeAreaAttr.length; c++) {
				if($scope.consigneeAreaAttr[c].id == id) {
					$scope.areaname = $scope.consigneeAreaAttr[c].name;
					$scope.consigneePost = $scope.consigneeAreaAttr[c].zipCode;
				}
			}
		}
		goodsService
			.findareasbypid(id)
			.then(
				function(result) {
					if(n == 1) {
						$scope.consigneeCityAttr = result.data;
					} else if(n == 2) {
						$scope.consigneeAreaAttr = result.data;
					}
				});
	}
	$scope.okModalDisabled1 = false;
	//处方申请提交
	$scope.submitInputMessage = function(n) {
		checkLogin()
		$scope.submitMessage = {};
		$scope.submitMessage.memberLoginId = $scope.memberLoginId;
		$scope.submitMessage.goodsType = $scope.goodsDetail.goodsType;
		$scope.submitMessage.consultantId = $scope.consultantId;
		$scope.submitMessage.goodsName = $scope.goodsDetail.name1;
		$scope.submitMessage.goodsImageUrl = $scope.goodsDetail.imagesList[0].imagePath;
		$scope.submitMessage.memberId = $scope.memberId;
		$scope.submitMessage.goodsId = $scope.goodsDetail.id;
		$scope.submitMessage.productId = $scope.applyProductId;
		$scope.submitMessage.goodsPrice = $scope.zhPrice;
		$scope.submitMessage.orderSource = 1;
		$scope.submitMessage.orderEmail = $scope.orderEmail;
		if($scope.orderEmail == undefined || $scope.orderEmail == null) {
			$scope.submitMessage.orderEmail == ""
		}
		$scope.submitMessage.orderProvince = $scope.memberMessage.consigneeProvince;
		$scope.submitMessage.orderCity = $scope.memberMessage.consigneeCity;
		$scope.submitMessage.orderArea = $scope.memberMessage.consigneeArea;
		$scope.submitMessage.orderAddress = $scope.consigneeAddress;
		$scope.submitMessage.orderPca = $scope.provname + "," + $scope.cityname + "," + $scope.areaname;
		$scope.submitMessage.orderPost = $scope.consigneePost;
		if($scope.provname == "" || $scope.cityname == "" || $scope.areaname == "" || $scope.consigneeAddress == "" || $scope.consigneeAddress == undefined) {
			$scope.showAlert(zhecDisplayMessage.detailApplyAddress)
			return;
		}
		$scope.submitMessage.invoiceType = $scope.confirmType;
		$scope.submitMessage.invoiceTitle = $scope.confirmTitle;
		$scope.submitMessage.invoiceDetail = $scope.confirmDetail;
		$scope.submitMessage.mobile = "";

		$scope.submitMessage.submitStatus = 2;
		$scope.submitMessage.productNumber = $scope.goodsNum;
		$scope.submitMessage.orderName = $scope.memberMessage.consigneeName;
		if($scope.submitMessage.orderName == "" || $scope.submitMessage.orderName == null || $scope.submitMessage.orderName == undefined) {
			$scope.showAlert(zhecDisplayMessage.detailApplyname)
			return;
		}
		$scope.submitMessage.orderMobile = $scope.memberMessage.consigneeMobile;
		if($scope.submitMessage.orderMobile == "" || $scope.submitMessage.orderMobile == null || $scope.submitMessage.orderMobile == undefined) {
			$scope.showAlert(zhecDisplayMessage.detailApplyMobile)
			return;
		}
		if(!(/^1[34578]\d{9}$/.test($scope.submitMessage.orderMobile))) {
			$scope.showAlert(zhecDisplayMessage.detailApplycheckMobile)
			return;
		}
		if(imgPath.length < 1) {
			$scope.showAlert(zhecDisplayMessage.detailApplyPre)
			return;
		}
		$scope.submitMessage.imageUrl = "";

		for(var i = 0; i < imgPath.length; i++) {
			$scope.submitMessage.imageUrl += imgPath[i];
			if(i < imgPath.length - 1) {
				$scope.submitMessage.imageUrl += ","
			}
		}
		if($scope.inputMessage == null || $scope.inputMessage == undefined) {
			$scope.submitMessage.message = "";
		} else {
			$scope.submitMessage.message = $scope.inputMessage;
		}
		$scope.submitInterface(2, $scope.submitMessage);
	}
	$scope.submitInterface = function(n, submitMessage) {
		if($scope.okModalDisabled1 == true) {
			return 0;
		}
		$scope.okModalDisabled1 = true;
		var defer = $q.defer();
		console.log(submitMessage)
		goodsService
			.submitInterface(submitMessage)
			.then(function(result) {
				if(result.code == 1) {
					if(n == 1) {
						$scope.showAlert(zhecDisplayMessage.detailApplySuccess1)
						$timeout(function() {
							ngDialog.close();
						}, 1500);
					} else {
						$scope.showAlert(zhecDisplayMessage.detailApplySuccess2)
						$timeout(function() {
							ngDialog.close();
						}, 1500);
					}
					imgPath = [];
					$(".pic_list").remove()
					$scope.confirmType = 0;
					$scope.confirmTitle = "";
					$scope.confirmDetail = "";
					$scope.popApplay = false;
				} else if(result.code == -2) {
					$scope.showAlert(zhecDisplayMessage.detailApplycheckMobile);
					$scope.myMobile = "";
				}
				$scope.okModalDisabled1 = false;
				defer.resolve(result);
			}, function(result) {
				$scope.okModalDisabled1 = false;
				defer.reject(result);
			});
		return defer.promise;
	}
}
var imgPath = [];

function prescriptionSetImgPath(res) {
	imgPath.push(res);
}
angular
	.module('goodsApp')
	.controller('goodsController', goodsController)
	.controller('openDetailController', openDetailController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.directive('smallcart', smallcart)
	.directive('navigationBar', navigationBar)
	.factory('HttpInterceptor', ['$q', HttpInterceptor]) //定义一个 Service，作为 Interceptors 的处理函数
	.config(['$httpProvider', function($httpProvider) { //添加对应的 Interceptors
		$httpProvider.interceptors.push(HttpInterceptor);
	}]);