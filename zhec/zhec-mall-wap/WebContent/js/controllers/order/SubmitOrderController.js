/**
 * 提交订单 controller定义
 */
function SubmitOrderController($scope, SubmitOrderService, ngDialog, $timeout, $stateParams, $rootScope, $state) {
	//成功提示，相当于alert
	$rootScope.showAlert = function(message) {
		var dialog = ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default submit-tc',
			//			height: 174,
			controller: ['$scope', function($scope) {
				$scope.promptMessage = message;
			}],
		});

		$timeout(function() {
			dialog.close();
		}, 1500);
	}

	$scope.member = getCookie("loginManager");
	if($scope.member == "" || $scope.member == null || $scope.member == undefined) {
		$rootScope.showAlert(zhecDisplayMessage.goLogin);
		var t = setTimeout('window.open("index.html#/info/login", "_self");', 2000);
		return 0;
	}
	$scope.member = JSON.parse($scope.member);
	$scope.memberId = $scope.member.id;
	$scope.memberLoginId = $scope.member.loginId;
	$scope.orderSource = 2; //1 web端     2 wap端  3 app

	$rootScope.stateParamsTypeOrder = $stateParams.type;
	$rootScope.stateParamsProductIdOrder = $stateParams.productId;
	$rootScope.stateParamsProductCountOrder = $stateParams.productCount;
	$rootScope.stateParamsConsultantIdOrder = $stateParams.consultantId;

	$scope.find = function() {
		if($rootScope.addressForThisUse == '' || $rootScope.addressForThisUse == undefined || $rootScope.addressForThisUse == null) {
			//地址
			SubmitOrderService
				.findaddress($scope.memberId)
				.then(
					function(result) {
						$scope.theReceiptAddress = result.data[0];
						//调用回显地址
						//$scope.setAreaValue($scope.theReceiptAddress.consigneePca, $scope.theReceiptAddress.consigneeProvince, $scope.theReceiptAddress.consigneeCity, $scope.theReceiptAddress.consigneeArea);
					},
					function(result) {

					});
		} else {
			$scope.theReceiptAddress = $rootScope.addressForThisUse;
		}
		//根据memberID获取商品列表      订单来源          memberId
		//var submitType = GetQueryString("type");
		var submitType = $stateParams.type;
		if(submitType == 1) {
			//			var productId = GetQueryString("productId");
			//			var productCount = GetQueryString("productCount");
			//			$scope.consultantId = GetQueryString("consultantId");
			var productId = $stateParams.productId;
			var productCount = $stateParams.productCount;
			$scope.consultantId = $stateParams.consultantId;

			if($scope.consultantId == undefined) {
				$scope.consultantId = "";
			}
			$scope.iftype1 = true;
			var memberId = Number($scope.memberId);
			SubmitOrderService
				.finddirectpurchaseproducts($scope.orderSource, $scope.consultantId, productId, productCount, memberId)
				.then(
					function(result) {
						if(result.code == -1) {
							$rootScope.showAlert(zhecDisplayMessage.serverBusy);
							var t = setTimeout('window.open(document.referrer, "_self");', 2000);
							return 0;
						}
						if(result.data == null) {
							$rootScope.showAlert(zhecDisplayMessage.serverBusy);
							var t = setTimeout('window.open(document.referrer, "_self");', 2000);
							return 0;
						}

						$scope.moneydata = result.data;

						//商品列表
						$scope.dataGoods = result.data.orderProducts;

					},
					function(result) {

					});
		}
		if(submitType == 2) { //购物车过来的
			$scope.iftype1 = false;
			SubmitOrderService
				.findsubmitproducts($scope.orderSource, $scope.memberId)
				.then(
					function(result) {
						if(result.data == null) {
							$rootScope.showAlert(zhecDisplayMessage.serverBusy);
							var t = setTimeout('window.open(document.referrer, "_self");', 2000);
							return 0;
						}

						if(result.code == -1) {
							$rootScope.showAlert(zhecDisplayMessage.serverBusy);
							var t = setTimeout('window.open(document.referrer, "_self");', 2000);
							return 0;
						}

						$scope.moneydata = result.data;

						//商品列表
						$scope.dataGoods = result.data.orderProducts;

					},
					function(result) {

					});
		}
	}
	/**
	 * 跳转收货地址页
	 */
	$scope.jumpOrderAddress = function() {
		$rootScope.scopeDataInvoice = $scope.dataInvoice; //存发票信息
		window.location.replace("/index.html#/info/orderaddress");
	}

	$scope.firstDataInvoice = function() {
		if($rootScope.scopeDataInvoice == '' || $rootScope.scopeDataInvoice == undefined || $rootScope.scopeDataInvoice == null) {
			$scope.dataInvoice = {
				'invoiceTitle': '个人',
				'invoiceDetail': '明细',
				'email': '',
				'invoiceType': 0, // 0  无需发票 ,1  普通发票,2  电子发票
				'memberId': Number($scope.memberId),
				'phone': ''
			}
		} else {
			$scope.dataInvoice = $rootScope.scopeDataInvoice;
		}

	}

	//初始化
	$scope.find();
	//初始化发票信息
	$scope.firstDataInvoice();
	//初始化发票抬头  滑动框
	submitorderIosSelectContent([{
			'id': '10001',
			'value': '明细'
		},
		{
			'id': '10002',
			'value': '药品'
		},
		{
			'id': '10003',
			'value': '保健品'
		},
		{
			'id': '10004',
			'value': '医疗器械'
		},
		{
			'id': '10005',
			'value': '其他'
		}
	]);
	//初始化发票内容  滑动框
	submitorderIosSelectTitle([{
			'id': '20001',
			'value': '个人'
		},
		{
			'id': '20002',
			'value': '单位'
		}
	]);

	/**
	 * 订单提交 提交订单
	 */
	$scope.orderSubmission = function() {

		//	location.replace("/info/orderpay?orderId=" + result.data);

		//return false;
		if(!checkLogin()) {
			return;
		}
		if($scope.submitDisabled == true) {
			return 0;
		}
		$scope.submitDisabled = true;
		/*	if(!equals($scope.dataInvoice, $scope.dataInvoice2)) {
				$scope.dataInvoice = $scope.dataInvoice2;
			}*/
		//$scope.consultantId = $scope.dataGoods[0].consultantId; //顾问ID，为空代表直接下单
		$scope.invoiceTitle = $scope.dataInvoice.invoiceTitle; //发票抬头
		$scope.invoiceDetail = $scope.dataInvoice.invoiceDetail; //发票内容
		$scope.invoiceType = $scope.dataInvoice.invoiceType; //发票类型0、不要发票；1、普通发票；2电子发票
		if($scope.invoiceType == undefined) {
			$scope.dataInvoice.invoiceType = 0;
			$scope.invoiceType = 0;
		}
		if($scope.invoiceType == 0) {
			$scope.invoiceTitle = '';
			$scope.invoiceDetail = '';
		}

		if($scope.remark == null || $scope.remark == undefined || $scope.remark == "") {
			$scope.remark = ""; //订单备注
		}
		if($scope.theReceiptAddress == null || $scope.theReceiptAddress == undefined || $scope.theReceiptAddress == "") {
			$rootScope.showAlert(zhecDisplayMessage.setAddress);
			$scope.submitDisabled = false;
			return 0;
		}
		var consigneeName = $scope.theReceiptAddress.consigneeName;
		var consigneeProvince = $scope.theReceiptAddress.consigneeProvince;
		var consigneeCity = $scope.theReceiptAddress.consigneeCity;
		var consigneeArea = $scope.theReceiptAddress.consigneeArea;
		var consigneePca = $scope.theReceiptAddress.consigneePca;
		var consigneeAddress = $scope.theReceiptAddress.consigneeAddress;
		var consigneeMobile = $scope.theReceiptAddress.consigneeMobile;
		var consigneeEmail = $scope.theReceiptAddress.consigneeEmail;
		var consigneePost = $scope.theReceiptAddress.consigneePost;

		if($scope.dataInvoice.email == undefined || $scope.dataInvoice.email == null) {
			$scope.dataInvoice.email = '';
		}
		if($scope.dataInvoice.phone == undefined || $scope.dataInvoice.phone == null) {
			$scope.dataInvoice.phone = '';
		}
		var res = {
			'remark': $scope.remark,
			'orderSource': $scope.orderSource,
			/*'consultantId': $scope.consultantId,*/
			'memberId': Number($scope.memberId),
			'memberLoginId': $scope.memberLoginId,
			'invoiceDetail': $scope.invoiceDetail,
			'invoiceTitle': $scope.invoiceTitle,
			'invoiceType': $scope.invoiceType,
			'invoicePhone': $scope.dataInvoice.phone,
			'invoiceEmail': $scope.dataInvoice.email,
			'moneyOrder': $scope.moneydata.moneyOrder,
			'moneyProduct': $scope.moneydata.moneyProduct,
			'consigneeName': consigneeName,
			'consigneeProvince': consigneeProvince,
			'consigneeCity': consigneeCity,
			'consigneeArea': consigneeArea,
			'consigneePca': consigneePca,
			'consigneeAddress': consigneeAddress,
			'consigneeMobile': consigneeMobile,
			'consigneeEmail': consigneeEmail,
			'consigneePost': consigneePost,
			'ordersProduct': $scope.dataGoods
		};

		// 调用方法
		var submitType = $stateParams.type;
		SubmitOrderService
			.submit(res, submitType)
			.then(
				function(result) {
					$rootScope.scopeDataInvoice = ''; //重置发票信息
					$scope.submitDisabled = false;
					if(result.code == -103) {
						$rootScope.showAlert(zhecDisplayMessage.orderPriceChanges);
					} else if(result.code == -102) {
						$rootScope.showAlert(zhecDisplayMessage.underStock);
					} else if(result.code == -104) { //计算后实付款不大于0，订单价格过低不可提交
						$rootScope.showAlert(zhecDisplayMessage.orderPriceWrong);
					} else if(result.code == -101) {
						$rootScope.showAlert(zhecDisplayMessage.goodsLaidDown);
					} else if(result.code == 1) {
						location.replace("/index.html#/info/orderpay-" + result.data);
					} else if(result.code == -1) {
						$rootScope.showAlert(zhecDisplayMessage.serverBusy);
					}
				},
				function() {
					$scope.submitDisabled = false;
				});
	};
	/**
	 * 返回
	 */
	$scope.back = function(n) {
		mySwiper.slideTo(n, 300, false);
		if(n == 1) {
			$scope.fixFoot = true; //fix_foot  提交订单按钮显示
		}
	}
	/**
	 * 返回上一页
	 */
	$scope.goback = function() {
		//history.back('-2');
		window.open($rootScope.previousPageUrl, "_self");
		//$rootScope.previousPageUrl = '';
		//window.open("index.html#/main/index", "_self");
	}
	/**
	 * 省市区选择的回调
	 * @param {Object} obj
	 */
	$scope.getAreaValue = function(obj) {
		$scope.theReceiptAddress.consigneeProvince = obj.province.id;
		$scope.theReceiptAddress.consigneeCity = obj.city.id;
		$scope.theReceiptAddress.consigneeArea = obj.area.id;
		$scope.theReceiptAddress.consigneePca = obj.province.name + "   " + obj.city.name + "   " + obj.area.name;
		$scope.theReceiptAddress.consigneePost = obj.zipCode;
	};
	//省市区选择的 返回
	$scope.areaChooseCancel = function() {
		$scope.back(1);
	}
	//fix_foot  提交订单按钮显示
	$scope.fixFoot = true;
	$scope.invoiceClick = function() {
		$scope.fixFoot = false;
		if($scope.invoiceTitleTab == 0) {
			$scope.invoiceTitleTab = 1;
		}
	}

	//发票选项卡	
	$scope.changeInvoiceType = function(n) {
		$scope.invoiceTitleTab = n;
		if(n == 1 || n == 2) {
			$scope.middleTitle = "个人"
			$scope.middleDetail = "明细";
			$scope.invoiceTitleTab = n;
		}
	}
	$scope.changeInvoiceType(1); //默认选中普通发票
	/**
	 * title  和   发票内容 弹出
	 * @param {Object} n
	 */
	/*$scope.slideup = function(n) {
		//$("#myallBillTitle")[0].style.display = '';
		//$("#myallBillTitleClearfix").slideDown(500);
		//mySetInterval(500)
		if(n == 1) { //发票抬头
			$scope.billTitleBind = '发票抬头';
			$scope.allBillList = ['个人', '单位'];
			$scope.titleType = '个人'; //默认选中  个人
		} else { //发票内容
			//$scope.billTitleBind = '发票内容';
			//$scope.allBillList = ['明细', '药品', '保健品', '医疗器械', '其他'];
			//$scope.titleType = '明细'; //默认选中  明细
		}
	}*/
	/**
	 * title  和   发票内容  隐藏
	 * @param {Object} n
	 */
	$scope.okModalData = {
		'titleType': '个人',
		'middleDetail': '明细'
	};
	/*	$scope.slidedown = function(n) {
			$("#myallBillTitleClearfix").slideUp(500);
			$scope.allBillList = [];
			$timeout(function() {
				$("#myallBillTitle")[0].style.display = 'none';
			}, 500);
			//给 okModalData 赋值
			switch($scope.billTitleBind) {
				case '发票抬头':
					$scope.okModalData.titleType = $scope.titleType;
					break;
				default: //发票内容
					$scope.okModalData.middleDetail = $scope.titleType;
					break;
			}

		}*/
	/*
		//选中的 发票抬头  或者 发票内容
		$scope.chooseTitle = function(res) {
			$scope.titleType = res;
		}*/
	/**
	 * 保存  发票
	 */
	$scope.saveInvoice = function(n) {
		$scope.okModalData.titleType = $("#titleType").text(); //发票抬头
		$scope.okModalData.middleDetail = $("#showBank").text(); //发票内容
		if(n == 0) {
			$scope.changeInvoiceType(0);
		} else {
			if($scope.invoiceTitleTab == 0) {
				$scope.invoiceTitleTab = 1;
			}
		}
		switch($scope.invoiceTitleTab) {
			case 1: //普通发票
				if($scope.inputTitle == '') {
					$rootScope.showAlert(zhecDisplayMessage.invoiceTitleWrite); //请您先填写单位发票抬头！
					return 0;
				}
				if($scope.okModalData.titleType == '单位') {
					if($scope.inputTitle == '' || $scope.inputTitle == null || $scope.inputTitle == undefined) {
						$rootScope.showAlert(zhecDisplayMessage.invoiceTitleWrite); //请您先填写单位发票抬头！
						return 0;
					}
				}
				/*$scope.orderMobile='';
				$scope.orderEmail='';*/
				break;
			case 2: //电子发票
				if($scope.orderEmail == "" || $scope.orderEmail == null || $scope.orderEmail == undefined) { //收件人邮箱
					$rootScope.showAlert(zhecDisplayMessage.detailInputEmail);
					return false;
				} else {
					var retest = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
					if(retest.test($scope.orderEmail)) {
						//alert("正确");
					} else {
						//alert("错误");
						$rootScope.showAlert(zhecDisplayMessage.emailFormatNotCorrect);
						return false;
					}
				}
				if($scope.orderMobile == "" || $scope.orderMobile == null || $scope.orderMobile == undefined) { //收件人电话
					$rootScope.showAlert(zhecDisplayMessage.detailApplyMobile);
					return false;
				} else {
					var re = /^1\d{10}$/;
					if(re.test($scope.orderMobile)) {
						//	alert("正确");
					} else {
						//	alert("错误");
						$rootScope.showAlert(zhecDisplayMessage.phoneNumberFormatNotCorrect);
						return false;
					}
				}
				if($scope.okModalData.titleType == '单位') {
					if($scope.inputTitle == '' || $scope.inputTitle == null || $scope.inputTitle == undefined) {
						$rootScope.showAlert(zhecDisplayMessage.invoiceTitleWrite); //请您先填写单位发票抬头！
						return 0;
					}
				}
				break;
			default: //0  无需发票
				break;
		}
		if($scope.orderMobile == undefined) {
			$scope.orderMobile = '';
		}
		if($scope.orderEmail == undefined) {
			$scope.orderEmail = '';
		}
		var res = {
			'memberId': Number($scope.memberId),
			'invoiceDetail': $scope.okModalData.middleDetail, //发票内容
			'invoiceTitle': '个人', //发票title
			'invoiceType': $scope.invoiceTitleTab, //发票  0  1  2
			'phone': $scope.orderMobile,
			'email': $scope.orderEmail
		};
		if($scope.okModalData.titleType == '单位') {
			res.invoiceTitle = $scope.inputTitle;
		}
		$scope.dataInvoice = res;
		mySwiper.slideTo(1, 300, false);
		$scope.fixFoot = true; //fix_foot  提交订单按钮显示
	};

}

app.controller('SubmitOrderController', SubmitOrderController);

//判断object是否相等
function equals(x, y) {
	var in1 = x instanceof Object;
	var in2 = y instanceof Object;
	if(!in1 || !in2) {
		return x === y;
	}
	if(Object.keys(x).length !== Object.keys(y).length) {
		return false;
	}
	for(var p in x) {
		var a = x[p] instanceof Object;
		var b = y[p] instanceof Object;
		if(a && b) {
			return equals(x[p], y[p]);
		} else if(x[p] !== y[p]) {
			return false;
		}
	}
	return true;
}
//
//function mySetInterval(n) {
//	setInterval("clock("+n+")", n);
//}
//var clockM = 0;
//
//function clock(n) {
//	if(n == 0) {
//		clockM++;
//		$('#myall_billTitle').css("bottom", '-16rem');
//	} else {
//		if(clockM == n) {
//			$('#myall_billTitle').css("bottom", '0rem');
//			clockM = 0;
//			return false;
//		}
//		clockM++;
//		var num = 16 / n;
//		$('#myall_billTitle').css("bottom", '-' + num + 'rem');
//	}
//
//}