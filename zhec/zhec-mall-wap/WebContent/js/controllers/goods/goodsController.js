function goodsController($rootScope, $scope, $q, $timeout, $stateParams, goodsService, ngDialog) {
	$scope.prescriptionUrl = imgPathPrescription; //oss路径
	$scope.pageScorll = 0;
	$scope.collectPic = "img/scmr.png";

	//会员信息
	$scope.memberMessage = getCookie("loginManager");
	if($scope.memberMessage != "" && $scope.memberMessage != null && $scope.memberMessage != undefined) {
		$scope.memberMessage = JSON.parse($scope.memberMessage)
		$scope.memberId = $scope.memberMessage.id;
		$scope.memberLoginId = $scope.memberMessage.loginId;
	}
	$scope.ifLogin = getCookie("formToken");

	$scope.goodsId = $stateParams.id;
	$scope.consultantId = 0; //默认顾问id为0
	//	if(/consultantId=\d+/g.test(_url)) { //获取顾问id
	//		$scope.consultantId = parseInt(_url.match(/consultantId=\d+/g)[0].replace("consultantId=", ""));
	//	}
	//轮播图swiper
	var swiper = new Swiper('#detailBanner', {
		loop: true,
		observer: true, //修改swiper自己或子元素时，自动初始化swiper
		observeParents: true,
		//		pagination: 'swiper-pagination',
		//      paginationType: 'fraction',
		//		effect : 'cube'
	});
	//整个页面
	$scope.mainContent = new Swiper('#mainContent', {
		// autoHeight:true
	});
	//商品详情swiper
	$scope.detailUpTouch = new Swiper('#detailUpTouch', {
		// autoHeight:true,
		// slidesPerView: 'auto',
	});
	$scope.invoiceDetail = new Swiper('#invoiceDetail', {
		// autoHeight:true,
		// slidesPerView: 'auto',
	});
	$scope.mainContent.detachEvents() //阻止swiper滑动
	$scope.detailUpTouch.detachEvents() //阻止swiper滑动
	//商品详情信息
	$scope.showDetail = function(n) {
		$scope.pageScorll = n;
		$("body,html").animate({
			scrollTop: 0
		}, 0);

		if(n == 1) { //商品详情
			$("#detailUpTouch").css("top", $("#mainContent .detail_head").height())
			$("#mainContent").css({
				"height": $("#mainContent .detail_head").height() + $($(".showDetailMessage")[0]).height() + $(".fix_fot").height()
			})
			$("#detailUpTouch>.swiper-wrapper").css({
				"height": $("#mainContent .detail_head").height() + $($(".showDetailMessage")[0]).height() + $(".fix_fot").height()
			});
		} else if(n == 0) { //需求登记到主页
			$("#mainContent").css({
				"height": $("#mainContent .detail_head").height() + $("#mainContent .detaily_banner").height() + $("#mainContent .detaily_conter").height() + $(".fix_fot").height()
			})
			$("#mainContent>.swiper-wrapper").css({
				"height": $("#mainContent .detail_head").height() + $("#mainContent .detaily_banner").height() + $("#mainContent .detaily_conter").height() + $(".fix_fot").height()
			})
		} else if(n == 2) { //需求登记
			checkLogin()
			$("#mainContent").css({
				"height": $("#mainContent .detail_head").height() * 2 + $(".prescripitonApply").height() + $(".fix_fot").height() * 2
			})
			$("#mainContent>.swiper-wrapper").css({
				"height": $("#mainContent .detail_head").height() * 2 + $(".prescripitonApply").height() + $(".fix_fot").height() * 2
			})
			$scope.mainContent.slideTo(n, 200, false);
		}

		$scope.mainContent.slideTo(n, 200, false);
	}

	var startX, startY, moveEndX, moveEndY, X, Y;

	$("body").on("touchstart", function(e) {
		if($scope.pageScorll == 1 && $(window).scrollTop() == 0) {
			//          e.preventDefault();
			startX = e.originalEvent.changedTouches[0].pageX,
				startY = e.originalEvent.changedTouches[0].pageY;
		}
	});
	$("body").on("touchmove", function(e) {
		if($scope.pageScorll == 1 && $(window).scrollTop() == 0) {

			//          e.preventDefault();
			moveEndX = e.originalEvent.changedTouches[0].pageX,
				moveEndY = e.originalEvent.changedTouches[0].pageY,
				X = moveEndX - startX,
				Y = moveEndY - startY;
			if(Math.abs(Y) > Math.abs(X) && Y > 0) {
				if(Y <= $("#upTouch").height()) {
					$("#detailUpTouch").css("top", Y + $(".detaily_conter_ol").height())
				}
				if(Y > $("#upTouch").height() / 2) {
					$scope.showUpMessage = false;
				} else {
					$scope.showUpMessage = true;
				}
			}
		}
	});

	document.addEventListener('touchend', function(ev) {
		if($scope.pageScorll == 1) {
			var endX, endY;
			endX = ev.changedTouches[0].pageX;
			endY = ev.changedTouches[0].pageY;
			if(endY - startY >= $("#upTouch").height() / 2 && $(window).scrollTop() == 0) {
				$scope.showDetail(0)
				$("#mainContent").css({
					"height": $(".detail_head").height() + $(".detaily_banner").height() + $(".detaily_conter").height() + $(".fix_fot").height()
				})
				$("#mainContent>.swiper-wrapper").css({
					"height": $(".detail_head").height() + $(".detaily_banner").height() + $(".detaily_conter").height() + $(".fix_fot").height()
				})
			} else if(endY - startY < $("#upTouch").height() / 2) {
				$scope.showDetail(1);
				$("#detailUpTouch").css("top", $("#mainContent .detail_head").height())
			}
		}

	});
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
					$scope.collectPic = "img/ysc.png"
				} else {
					$scope.collectPic = "img/scmr.png"
				}

			}, function(result) {

			});
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
			.getPrice($scope.memberId, $scope.goodsId, 2, 1, 1)
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
								} else { //没有促销，改价格就作为商城价
									$scope.zhPrice = $scope.goodsDetail.productList[i].promptionSalesPrice;
								}
								$scope.productId = $scope.goodsDetail.productList[i].id;
								$scope.masterImg = $scope.goodsDetail.productList[i].masterImg;
								$scope.specInfoName = $scope.goodsDetail.productList[j].specInfo;
								$scope.currentProductId = $scope.goodsDetail.productList[i].id
								$scope.applyProductId = $scope.goodsDetail.productList[i].id; //处方药默认申请的货品
								if($scope.goodsDetail.productList[i].specAttrIds != null && $scope.goodsDetail.productList[i].specAttrIds != "" && $scope.goodsDetail.productList[i].specAttrIds != undefined) {
									$scope.specAttrIds = $scope.goodsDetail.productList[i].specAttrIds.split(","); //默认货品id组合
									$scope.firstImg = $scope.masterImg;
								}
								$scope.initStock = $scope.goodsDetail.productList[i].stock;
								if($scope.initStock <= 0) {
									$(".detaily_sc").show();
									$scope.goodsCurrentStatus = "该商品暂时无货！"
								}
							}
						}
					}
					if($scope.goodsDetail.productList[i].stock >= 1) { //如果有商品有库存
						$scope.flag = false;
					}
				}
				if($scope.flag == true) {
					$(".detaily_sc").show()
					$scope.goodsCurrentStatus = "该商品暂时无货！"
				}
				$(document).ready(function() {
					if($scope.propsInfoLen > 0) {
						$("#showDetail .detaily_conter_ol>li").css({
							"width": "25%"
						})
					} else {
						$("#showDetail .detaily_conter_ol>li").css({
							"width": "33%"
						})
					}
					$timeout(function() {
						$(".coverBody").hide();
					}, 500);
					$("#mainContent").css({
						"height": $(".detail_head").height() + $(".detaily_banner").height() + $(".detaily_conter").height() + $(".fix_fot").height()
					})
					$("#mainContent>.swiper-wrapper").css({
						"height": $(".detail_head").height() + $(".detaily_banner").height() + $(".detaily_conter").height() + $(".fix_fot").height()
					})
				})

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
				temp += list[index][tempCount].split(":")[0] + "&";
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
					window.open(constWapLapiLocation + "index.html#/info/notfindgoods", "_self");
					return;
				}
				$scope.goodsStatus = result.data.goodsStatus; //当前商品状态
				if($scope.goodsStatus != 6) {
					$scope.goodsCurrentStatus = "该商品已下架！"
				}
				$scope.goodsDetail = result.data.goodsDetail; //商品详情

				$scope.spcInfo = result.data.specInfo; //规格信息
				$scope.spcInfoLen = 0;
				for(var k in $scope.spcInfo) {
					$scope.spcInfoLen++;
				}
				$scope.propsInfo = result.data.propsInfo; //属性信息	
				$scope.propsInfoLen = 0;
				for(var key in $scope.propsInfo) {
					if(key != '默认分组') {
						$scope.propsInfoLen++;
					}
				}

				$scope.productidsArr = [];

				$scope.productids = descartes($scope.spcInfo);
				$scope.productids2 = [];
				for(var i = 0; i < $scope.productids.length; i++) {
					$scope.idsArr = $scope.productids[i].split("&");
					$scope.productids1 = "";
					for(var n = 0; n < $scope.idsArr.length; n++) {
						if($scope.idsArr[n] != "") {
							$scope.productids1 += $scope.idsArr[n];
							if(n < $scope.idsArr.length - 2) {
								$scope.productids1 += "&"
							}
						}
					}
					if($scope.productids1 != "") {
						$scope.productids1 = $scope.productids1.split("&");
						$scope.productids4 = "";
						for(var j = 0; j < $scope.productids1.length; j++) {
							$scope.productids3 = "";
							for(var inner = j + 1; inner < $scope.productids1.length; inner++) { //这里是a.length，不是a.lenght-1，因为后者会导致右数第2项没法参与排序。
								if($scope.productids1[inner] < $scope.productids1[j]) {
									$scope.productids3 = $scope.productids1[inner];
									$scope.productids1[inner] = $scope.productids1[j]
									$scope.productids1[j] = $scope.productids3;
								}
								//将最小的项移动到左侧
							}
						}
						for(var n = 0; n < $scope.productids1.length; n++) {
							$scope.productids4 += $scope.productids1[n];
							if(n < $scope.productids1.length - 1) {
								$scope.productids4 += "&"
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
				$(".showHide").show()
				//富文本内容渲染
				angular.element(".description").html($scope.goodsDetail.description);
				angular.element(".instruction").html($scope.goodsDetail.instruction)
				// console.log($scope.goodsDetail.instruction)

				$scope.getPrice()

			}, function(result) {

			});

	}

	//改变规格
	$scope.changeType = function(n, productId, event, key) {
		//获取改变的货品id组合
		for(var i = 0; i < $scope.spcInfo[key].length; i++) {
			for(var n = 0; n < $scope.specAttrIds.length; n++) {
				if($scope.specAttrIds[n] == $scope.spcInfo[key][i].split(':')[0]) {
					$scope.specAttrIds[n] = productId
				}
			}
		}
		//查询货品信息
		for(var j = 0; j < $scope.goodsDetail.productList.length; j++) {
			if($scope.goodsDetail.productList[j].specAttrIds == $scope.specAttrIds) {
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
					$scope.promptionPrice = $scope.productPriceList[j].salesPrice;
				} else { //没有促销，改价格就作为商城价
					$scope.zhPrice = $scope.productPriceList[j].salesPrice;
				}
			}
		}

		//显示是否有货
		if($scope.initStock >= 1) {
			$(".detaily_sc").hide();
			$scope.flag1 = false;
			$scope.goodsNum = 1; //改变规格数量就回归为0
			$scope.currentProStock = $scope.initStock;
			$scope.productId = $scope.currentProductId;
			if(n == 1) { //主购物车
				$scope.initStock = $scope.initStock;
			}
			$scope.selectSpc = $scope.specInfoName;
			$scope.applyProductId = $scope.currentProductId;
		} else {
			$(".detaily_sc").show();
			$scope.goodsCurrentStatus = "当前商品暂时无货！"
			$scope.flag1 = true;
			$scope.showAlert(zhecDisplayMessage.cartUnderStock)
		}
	}

	//选项卡
	$scope.currentShowMessage = 0;
	$scope.changeMessage = function(n) {
		$scope.currentShowMessage = n;
		$scope.detailUpTouch.slideTo(n, 100, false);
		$("#mainContent").css({
			"height": $("#mainContent .detail_head").height() + $($(".showDetailMessage")[n]).height() + $(".fix_fot").height(),
			"min-height": "18rem"
		})
		$("#detailUpTouch>.swiper-wrapper").css({
			"height": $("#mainContent .detail_head").height() + $($(".showDetailMessage")[n]).height() + $(".fix_fot").height(),
			"min-height": "18rem"
		});
		console.log($("#mainContent .detail_head").height(), $($(".showDetailMessage")[n]).height(), $(".fix_fot").height())
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
				window.open("index.html#/info/submitorder-" + 1 + "-" + $scope.productId + "-" + $scope.productCount + "-" + $scope.consultantId, "_self")
			} else {
				window.open("index.html#/info/submitorder-" + 1 + "-" + $scope.productId + "-" + $scope.productCount + "-" + $scope.consultantId, "_self")
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
		console.log($scope.productId, $scope.goodsNum, $scope.consultantId)
		delCookie("prePage");
		if(n == 1) {
			addGoodsToCart($scope.productId, $scope.goodsNum, $scope.consultantId)
			$scope.okModalDisabled = false;
		} else {
			addGoodsToCart($scope.productId, $scope.goodsNum, $scope.consultantId)
			$scope.okModalDisabled = false;
		}
	}

	$scope.joinCollection = function() {
		if($scope.ifCollection == true) {
			goodsService
				.editgoodscollection($scope.memberId, $scope.goodsId)
				.then(function(result) {
					console.log(result)
					if(result.code == 1) {
						$scope.showAlert(zhecDisplayMessage.detailIfCollect);
						$scope.collectPic = "img/scmr.png";
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
						$scope.collectPic = "img/ysc.png";
						$scope.ifCollection = true;
						$timeout(function() {
							ngDialog.close();
						}, 1500);
					}
				})
		}
	}

	//分享
	$scope.goToShare = function(id) {
		$("#shareCover").show()
	}
	//取消分享
	$scope.cancleShare = function() {
		$("#shareCover").hide()
	}

	//获取用户基本信息
	$scope.getMemberMessage = function() {
		var defer = $q.defer();
		goodsService
			.memeberDetail($scope.memberId)
			.then(function(result) {
				if(result.code == 0 && result.data != null) { //显示默认的地址及姓名、电话
					$scope.getMemberMessage = result.data;
					$scope.consigneePca = result.data.consigneePca; //地址
					$scope.consigneeAddress = result.data.consigneeAddress //详细地址
					$scope.consigneePost = result.data.consigneePost //邮编

					$scope.provname = result.data.consigneePca.split(' ')[0];
					$scope.cityname = result.data.consigneePca.split(' ')[1];
					$scope.areaname = result.data.consigneePca.split(' ')[2];
					$scope.consigneeProvince = result.data.consigneeProvince;
					$scope.consigneeCity = result.data.consigneeCity;
					$scope.consigneeArea = result.data.consigneeArea;

					// console.log(result.data)
					$scope.setAreaValue(result.data.consigneePca, result.data.consigneeProvince, result.data.consigneeCity, result.data.consigneeArea)
				}
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	}
	//选完三级地址取数据
	$scope.getAreaValue = function(selectAddress) {
		if(selectAddress == undefined || selectAddress == null || selectAddress == "") {
			return;
		}
		$scope.consigneePca = selectAddress.province.name + " " + selectAddress.city.name + " " + selectAddress.area.name;
		$scope.provname = selectAddress.province.name;
		$scope.cityname = selectAddress.city.name;
		$scope.areaname = selectAddress.area.name;
		$scope.consigneeProvince = selectAddress.province.id;
		$scope.consigneeCity = selectAddress.city.id;
		$scope.consigneeArea = selectAddress.area.id;
		$scope.consigneePost = selectAddress.zipCode;
		$timeout(function() {
			$("#mainContent").css({
				"height": $("#mainContent .detail_head").height() + $(".prescripitonApply").height() + $(".fix_fot").height()
			})
			$("#mainContent>.swiper-wrapper").css({
				"height": $("#mainContent .detail_head").height() + $(".prescripitonApply").height() + $(".fix_fot").height()
			})
			$scope.mainContent.slideTo(2, 200, false);
		}, 200);

	}
	//返回上一级
	$scope.areaChooseCancel = function() {
		$("#mainContent").css({
			"height": $("#mainContent .detail_head").height() + $(".prescripitonApply").height() + $(".fix_fot").height()
		})
		$("#mainContent>.swiper-wrapper").css({
			"height": $("#mainContent .detail_head").height() + $(".prescripitonApply").height() + $(".fix_fot").height()
		})
		$scope.mainContent.slideTo(2, 200, false);
	}

	//默认不要发票
	$scope.confirmType = 0;
	$scope.middleType = 0;
	$scope.middleTitle = "";
	$scope.middleDetail = "";
	$scope.confirmTitle = "";
	$scope.confirmDetail = "";
	$scope.currentTitle = "个人"
	//发票
	$scope.openInvoiceModal = function() {
		$("body,html").animate({
			scrollTop: 0
		}, 0);
		$scope.mainContent.slideTo(3, 300, false);
		$("#mainContent").css({
			"height": $("#mainContent .detail_head").height() * 3 + $(".invoiceTitleTab").height() + $(".fix_fot").height() * 3
		})
		$("#mainContent>.swiper-wrapper").css({
			"height": $("#mainContent .detail_head").height() * 3 + $(".invoiceTitleTab").height() + $(".fix_fot").height * 3
		})
		$scope.middleType = 1;
		$scope.middleTitle = "个人";
		$scope.middleDetail = "明细";
		$scope.currentTitle = "个人";
	}
	//发票tab
	$scope.invoiceTitleTab = 1;
	// $scope.mainContent.slideTo(2, 0, false);

	//发票选项卡
	$scope.changeInvoiceType = function(n) {
		$scope.middleType = n;
		if(n == 1 || n == 2) {
			$scope.middleTitle = "个人"
			$scope.middleDetail = "明细";
			$scope.invoiceTitleTab = n;
		} else {
			$scope.showDetail(2)
		}
	}
	$scope.openInvoiceDetail = function() {
		// $(".all_billDetail").show()
		$(".all_bill2").show()
		$(".all_billDetail").slideDown(500)
	}

	//处方电话
	$scope.showPhoneCall = function() {
		$(".phoneCallBack").show();
		$(".phoneCallBack1").slideDown(500);
	}
	//打开选择规格弹框
	$scope.openSelect = function() {
		$(".selectSpcInfo").show()
		$(".selectSpcInfo1").slideDown(500);
	}

	//选择发票内容
	$scope.chooseDetail = function(invoiceDetail) {
		$scope.middleDetail = invoiceDetail;
	}
	$scope.changeInvoiceTitle = function(n) {
		$(".all_bill1").show();
		$(".all_billTitle").slideDown(500);
	}
	$scope.chooseConfirm = function(n) {
		if(n == 1) {
			$(".all_billTitle").slideUp(500);
			$timeout(function() {
				$(".all_bill1").hide();
			}, 500);
		} else if(n == 2) {
			$(".all_billDetail").slideUp(500);
			$timeout(function() {
				$(".all_bill2").hide();
			}, 500);
		} else if(n == 3) {
			$(".phoneCallBack1").slideUp(500);
			$timeout(function() {
				$(".phoneCallBack").hide();
			}, 500);
		} else {
			$(".selectSpcInfo1").slideUp(500);
			$timeout(function() {
				$(".selectSpcInfo").hide();
			}, 500);
		}
	}
	//改变发票抬头
	$scope.titleType = 1;

	$scope.goBack = function() {
		history.back(-1)
	}
	$scope.invoiceGoBack = function() {
		$scope.mainContent.slideTo(2, 200, false);
		$("#mainContent").css({
			"height": $("#mainContent .detail_head").height() + $(".prescripitonApply").height() + $(".fix_fot").height()
		})
		$("#mainContent>.swiper-wrapper").css({
			"height": $("#mainContent .detail_head").height() + $(".prescripitonApply").height() + $(".fix_fot").height()
		})
	}
	//保存发票信息

	$scope.saveInvoice = function() {
		if(document.getElementById("titleTypeId1").value != "" && document.getElementById("titleTypeId1").value != undefined && document.getElementById("titleTypeId1").value != null) {
			$scope.titleType = document.getElementById("titleTypeId1").value;
			if($scope.titleType == 1) {
				$scope.middleTitle = $("#titleType1").attr("data-value");
				$scope.currentTitle = $("#titleType1").attr("data-value");
			} else {
				$scope.middleTitle = $scope.inputTitle;
				$scope.currentTitle = "单位"
			}
		}
		$scope.saveFlag = true;
		// $scope.middleType = $("#titleType1").text(); //发票抬头
		// $scope.middleDetail = $("#showBank").text(); //发票内容
		if($scope.middleType == 0) { //无需发票
			$scope.confirmTitle = "";
			$scope.confirmDetail = "";
			$scope.confirmEmail = "";
			$scope.titleType = "";
		} else { //需要发票
			$scope.confirmEmail = "";
			if($scope.middleType == 2) { //电子发票
				$scope.confirmEmail = $scope.orderEmail;
				$scope.confirmDetail = $("#showBank1").text();
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
				$scope.confirmDetail = $("#showBank1").text();
				console.log($scope.confirmTitle, $scope.confirmDetail)
			}
		}
		if($scope.saveFlag) {
			$scope.showInvoice = false;
		}
		$scope.confirmType = $scope.middleType;
		$scope.showDetail(2)
	}
	//取消选择发票
	$scope.cancleInvoice = function() {
		$scope.showInvoice = false;
	}

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
		$scope.submitMessage.orderProvince = $scope.consigneeProvince;
		$scope.submitMessage.orderCity = $scope.consigneeCity;
		$scope.submitMessage.orderArea = $scope.consigneeArea;
		$scope.submitMessage.orderAddress = $scope.consigneeAddress;
		$scope.submitMessage.orderPca = $scope.provname + "," + $scope.cityname + "," + $scope.areaname;
		//$scope.submitMessage.orderPca = $scope.consigneePca;
		$scope.submitMessage.orderPost = $scope.consigneePost;
		if($scope.provname == "" || $scope.cityname == "" || $scope.areaname == "" || $scope.consigneeAddress == "" || $scope.consigneeAddress == undefined) {
			$scope.showAlert(zhecDisplayMessage.detailApplyAddress)
			return;
		}
		$scope.submitMessage.invoiceType = $scope.confirmType;
		$scope.submitMessage.invoiceTitle = $scope.confirmTitle;
		$scope.submitMessage.invoiceDetail = $scope.confirmDetail;
		// $scope.submitMessage.mobile = "";

		$scope.submitMessage.submitStatus = 2;
		$scope.submitMessage.productNumber = $scope.goodsNum;
		$scope.submitMessage.orderName = $scope.getMemberMessage.consigneeName;
		if($scope.submitMessage.orderName == "" || $scope.submitMessage.orderName == null || $scope.submitMessage.orderName == undefined) {
			$scope.showAlert(zhecDisplayMessage.detailApplyname)
			return;
		}
		$scope.submitMessage.orderMobile = $scope.getMemberMessage.consigneeMobile;
		// console.log($scope.getMemberMessage.consigneeMobile == "")
		if($scope.submitMessage.orderMobile == "" || $scope.submitMessage.orderMobile == null || $scope.submitMessage.orderMobile == undefined) {
			$scope.showAlert(zhecDisplayMessage.detailApplyMobile)
			return;
		}
		if(!(/^1[34578]\d{9}$/.test($scope.submitMessage.orderMobile))) {
			$scope.showAlert(zhecDisplayMessage.detailApplycheckMobile)
			return;
		}
		if(imgPath.length < 1) {
			console.log(imgPath)
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
		$scope.submitMessage.orderSource = 2; //订单来源    1 web 2 wap 3 app
		$scope.submitMessage.mobile = $scope.myMobile;
		if($scope.getMemberMessage.consigneeMobile == null || $scope.getMemberMessage.consigneeMobile == undefined || $scope.getMemberMessage.consigneeMobile == "") {
			$scope.showAlert(zhecDisplayMessage.detailNoPhone);
			return;
		}
		$scope.submitMessage.submitStatus = 1;
		$scope.submitMessage.productNumber = $scope.goodsNum;
		$scope.submitInterface(1, $scope.submitMessage);
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
				console.log(result)
				if(result.code == 1) {
					if(n == 1) {
						$scope.showAlert(zhecDisplayMessage.detailApplySuccess1)
						$(".phoneCallBack1").slideUp(500);
						$timeout(function() {
							//							ngDialog.close();
							//							$(".phoneCallBack").hide();
							location.reload();
						}, 1500);
					} else {
						$scope.showAlert(zhecDisplayMessage.detailApplySuccess2)
						$timeout(function() {
							ngDialog.close();
							$scope.showDetail(0)
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

	if($scope.goodsId == "" || $scope.goodsId == null || $scope.goodsId == undefined) {
		console.log($scope.goodsId)
		window.open(constMallLocation + "/notfindgoods.html", "_self")
	} else {
		$scope.find()
	}
	if($scope.ifLogin != "" && $scope.ifLogin != null && $scope.ifLogin != undefined) {
		$scope.ifCollect()
		$scope.getMemberMessage()
	}

	console.log(returnBigImgList())

}
var imgPath = [];
var currentBigImgSrc = ""; //点击的图片路径
var bigImgList = []; //存储点击的图片列表
//显示大图
function showBigImg(that) {
	currentBigImgSrc = that.src
	bigImgList = returnBigImgList()
	$(".showBigPic").show()
	console.log(bigImgList)
}

function prescriptionSetImgPath(res) {
	imgPath.push(res);
	console.log(imgPath)
}

app
	.controller('goodsController', goodsController)
	.directive('repeatdone', function() {
		return function(scope, element, attrs) {
			if(scope.$last) { // all are rendered
				scope.$eval(attrs.repeatdone);

			}
		}
	})