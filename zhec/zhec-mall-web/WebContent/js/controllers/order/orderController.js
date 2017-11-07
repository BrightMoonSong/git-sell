/**
 * Created by shy on 2016/12/22.
 */
/**
 * 系统用户controller定义
 */
function orderController($rootScope, $scope, $timeout, orderService, constPageSize, ngDialog) {
	//成功提示，相当于alert
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

	$scope.title = titleManage.placeOrder;
	$scope.member = getCookie("loginManager");
	if($scope.member == "" || $scope.member == null || $scope.member == undefined) {
		$rootScope.showAlert(zhecDisplayMessage.goLogin);
		var t = setTimeout('window.open("login.html#/login", "_self");', 2000);
		return 0;
	}
	$scope.member = JSON.parse($scope.member);
	$scope.memberId = $scope.member.id;
	$scope.memberLoginId = $scope.member.loginId;
	$scope.orderSource = 1; //web端
	$scope.ifedit = false;
	//发票的隐藏
	$scope.ifgeneral = false;
	$scope.ifelectronic = false;
	$scope.ifnoNeed = false;//无需发票
	//商品总金额
	$scope.moneyProduct = 0;
	//为您节省金额
	$scope.saveMoney = 0;
	//订单总金额
	$scope.moneyOrder = '';
	//默认地址
	$scope.ifDefaultShow = false;
	//收货人信息
	$scope.shippingAddress = [];
	$scope.shippingAddress1 = [];
	$scope.shippingAddress2 = [];
	//应对无收获人地址时  显示闪烁
	$scope.shippingAddressLength0 = false;
	//showOrHidden 显示全部地址   收起
	$scope.showOrHidden = "显示全部地址";
	//发票信息
	$scope.dataInvoice = {};
	$scope.dataInvoice2 = {};
	$scope.dataInvoice2.invoiceType = 0;
	$scope.invoiceTitle = '';
	$scope.rightimg = false;

	$scope.iftype1 = false;
	//本次收货地址
	$scope.theReceiptAddress = {};
	//显示全部地址信息
	$scope.displaynone = false;
	//显示地址信息时大于4时   显示滚动条
	$scope.ifShippingAddressLen4 = false;

	$scope.ifgoods = 0;
	//顾问ID
	$scope.consultantId = "";
	////保存按钮的disabled
	$scope.delayed = false; //收回地址
	$scope.dataInvoiceDisabled = false; //发票的保存按钮
	$scope.submitDisabled = false; //提交订单按钮

	$scope.onmouseovers = true;
	$scope.onmouseovers2 = false;
	//地址栏为空时显示的那个加号的方法
	$scope.ngOnmouseover = function() {
		$scope.onmouseovers = false;
		$scope.onmouseovers2 = true;
	};
	$scope.ngOnmouseleave = function() {
		$scope.onmouseovers = true;
		$scope.onmouseovers2 = false;
	};

	/**
	 * 初始化数据
	 */
	$scope.find = function(n) {
		orderService
			.findaddress($scope.memberId)
			.then(
				function(result) {
					//防止angular初始化加载页面时  闪烁页面隐藏的信息
					document.body.style.display = '';
					
					if(result.data.length == 0) {
						$scope.shippingAddressLength0 = true;
					} else {
						$scope.shippingAddressLength0 = false;
					}
					if(result.data != null) {
						if(result.data.length > 0 && result.data.length < 5) {
							$scope.shippingAddress = result.data;
							$scope.theReceiptAddress = result.data[0];
							$scope.showOrHiddenAll = true;
						}
						$scope.shippingAddress = result.data;
						if($scope.shippingAddress.length > 4) {
							$scope.showOrHiddenAll = false;
						}
						if($scope.shippingAddress.length > -1 && $scope.shippingAddress.length < 5) {
							$scope.showOrHiddenAll = true;
						}
						$scope.theReceiptAddress = result.data[0];
					}
				});
		//根据memberID获取商品列表      订单来源          memberId
		var submitType = GetQueryString("type");
		if(submitType == 1) {
			var productId = GetQueryString("productId");
			var productCount = GetQueryString("productCount");
			$scope.consultantId = GetQueryString("consultantId");
			if($scope.consultantId == undefined) {
				$scope.consultantId = "";
			}
			$scope.iftype1 = true;
			var memberId = Number($scope.memberId);
			orderService
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

					});
		}
		if(submitType == 2) {
			$scope.iftype1 = false;
			orderService
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

					});
		}
	}

	//发票显示对号
	$scope.showRight = function(n) {
		if(n != "个人") {
			$scope.rightimg = true;
			$scope.dataInvoice.invoiceTitle = $scope.invoiceTitle;
		} else {
			$scope.rightimg = false;
			$scope.dataInvoice.invoiceTitle = n;
		}
	};
	$scope.showRightData = function() {
		$scope.dataInvoice.invoiceTitle = $scope.invoiceTitle;
	};
	$scope.invoiceDetailClick = function(data) {
		$scope.dataInvoice.invoiceDetail = data;
	}

	$scope.update = function(dataId) {
			if(dataId == null || dataId == undefined || dataId == "") {
				if($scope.shippingAddress.length > 19) {
					//alert("收货地址太多了,大于20个不可再添加")
					$rootScope.showAlert(zhecDisplayMessage.ReceivingAddress);
					return;
				}
				if($scope.shippingAddress.length > 4) {
					$scope.showOrHiddenAll = false;
				}

			}
			$scope.dataId = dataId;
			$scope.dialog = ngDialog.open({
				template: 'views/order/ordersModal.html',
				className: 'ngdialog-theme-default',
				controller: 'orderFormModalController',
				scope: $scope,
				width: 460,
				height: 446
			});
		}
		/**
		 * 发票信息         修改
		 */
	$scope.editInvoice = function() {
		if($scope.ifedit == true) { //已经展开的情况
			return 0;
		}
		$scope.ifedit = true;
		$scope.ifgeneral = true;
		$scope.ifelectronic = false;
		$scope.ifnoNeed = false;
		//if($scope.okInvoiceIfUsed == false) {
		if($scope.dataInvoice.invoiceType == 1) {
			$scope.generalInvoice(1);
		} else if($scope.dataInvoice.invoiceType == 2) {
			$scope.electronicInvoice(2);
		} else if($scope.dataInvoice.invoiceType == 0) {
			$scope.noNeedInvoice(0);
		}
		//}

		$scope.dataInvoice2 = clone($scope.dataInvoice);
		/*invoiceDetail:"药品"
		invoiceTitle:"个人"
		invoiceType:1
		memberId:"16"*/
	}
	$scope.cancel = function() {
		$scope.ifedit = false;
		if(!equals($scope.dataInvoice, $scope.dataInvoice2)) {
			$scope.dataInvoice = clone($scope.dataInvoice2);
		}
	}

	$scope.okInvoiceIfUsed = false;
	/**
	 * 发票信息         保存
	 */
	$scope.okInvoice = function() {
			/*if($scope.dataInvoiceDisabled == true) {
				return 0;
			}
			$scope.dataInvoiceDisabled = true;*/
			if($scope.dataInvoice.invoiceTitle == '') {
				$rootScope.showAlert(zhecDisplayMessage.invoiceTitleWrite); //请您先填写单位发票抬头！
				//$scope.dataInvoiceDisabled = false;
				return 0;
			}
			$scope.okInvoiceIfUsed = true;
			$scope.ifedit = false;
			$scope.ifgeneral = false;
			$scope.ifelectronic = false;
			$scope.ifnoNeed = false;
			$scope.dataInvoice.memberId = $scope.memberId;
			var res = {
				'memberId': Number($scope.memberId),
				'invoiceDetail': $scope.dataInvoice.invoiceDetail,
				'invoiceTitle': $scope.dataInvoice.invoiceTitle,
				'invoiceType': $scope.dataInvoice.invoiceType,
				'phone': $scope.dataInvoice.phone,
				'email': $scope.dataInvoice.email
			};
			$scope.dataInvoice = res;
			$scope.dataInvoice2 = clone(res);
			if($scope.dataInvoice.invoiceTitle == "个人") {
				$scope.rightimg = false;
			} else {
				$scope.invoiceTitle = $scope.dataInvoice.invoiceTitle;
				$scope.rightimg = true;
			}
			/*$scope.dataInvoiceDisabled = false;
					},
					function() {
						$scope.dataInvoiceDisabled = false;
					});*/
		}
		/**
		 * 发票信息        普通发票
		 */
	$scope.generalInvoice = function(n) {
			$scope.dataInvoice.invoiceType = n;
			$scope.ifgeneral = true;
			$scope.ifelectronic = false;
			$scope.ifnoNeed = false;
			$scope.isActive1 = true;
			$scope.isActive2 = false;
			$scope.isActive3 = false;
			if($scope.dataInvoice.invoiceDetail == '' || $scope.dataInvoice.invoiceDetail == null || $scope.dataInvoice.invoiceDetail == undefined) {
				$scope.invoiceDetailClick('药品');
			} else {
				$scope.invoiceDetailClick($scope.dataInvoice.invoiceDetail);
			}
			if($scope.dataInvoice.invoiceTitle == '' || $scope.dataInvoice.invoiceTitle == undefined || $scope.dataInvoice.invoiceTitle == null) {
				$scope.showRight('个人');
			} else {
				$scope.showRight($scope.dataInvoice.invoiceTitle);
			}
		}
		/**
		 * 发票信息         电子发票
		 */
	$scope.electronicInvoice = function(n) {
			$scope.dataInvoice.invoiceType = n;
			$scope.ifgeneral = true;
			$scope.ifelectronic = true;
			$scope.ifnoNeed = false;
			$scope.isActive1 = false;
			$scope.isActive2 = true;
			$scope.isActive3 = false;
			if($scope.dataInvoice.invoiceDetail == '' || $scope.dataInvoice.invoiceDetail == null || $scope.dataInvoice.invoiceDetail == undefined) {
				$scope.invoiceDetailClick('药品');
			} else {
				$scope.invoiceDetailClick($scope.dataInvoice.invoiceDetail);
			}
			if($scope.dataInvoice.invoiceTitle == '' || $scope.dataInvoice.invoiceTitle == undefined || $scope.dataInvoice.invoiceTitle == null) {
				$scope.showRight('个人');
			} else {
				$scope.showRight($scope.dataInvoice.invoiceTitle);
			}
		}
		/**
		 * 发票信息         无需发票
		 */
	$scope.noNeedInvoice = function(n) {
			$scope.dataInvoice.invoiceType = n;
			$scope.ifgeneral = false;
			$scope.ifelectronic = false;
			$scope.ifnoNeed = true;
			$scope.isActive1 = false;
			$scope.isActive2 = false;
			$scope.isActive3 = true;
		}
		//设为默认地址
	$scope.setAsDefaultAddress = function(id, res) {
			var addressId = id;
			var memberId = Number($scope.memberId);
			orderService
				.setdefault(addressId, memberId)
				.then(
					function(result) {
						if(result.code > 0 || result.code == 0) {
							$scope.ifclickremoveclass(res, 0);
							$scope.find();
						}
					});
		}
		//点击显示全部
	$scope.ifallClick = function(n) {
		if($scope.displaynone == true) {
			$scope.displaynone = false;
			$scope.showOrHidden = "显示全部地址";
			$scope.ifShippingAddressLen4 = false;
		} else {
			$scope.displaynone = true;
			$scope.showOrHidden = "收起";
			if($scope.shippingAddress.length > 4) {
				$scope.ifShippingAddressLen4 = true;
			} else {
				$scope.ifShippingAddressLen4 = false;
			}
		}

	}

	/**
	 * 订单提交 提交订单
	 */
	$scope.orderSubmission = function() {
		if(!checkLogin()){
			return;
		}
		if($scope.submitDisabled == true) {
			return 0;
		}
		$scope.submitDisabled = true;
		if(!equals($scope.dataInvoice, $scope.dataInvoice2)) {
			$scope.dataInvoice = $scope.dataInvoice2;
		}
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
		var submitType = GetQueryString("type");
		orderService
			.submit(res, submitType)
			.then(
				function(result) {
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
						location.replace("/payMoney.html?orderId=" + result.data);
					} else if(result.code == -1) {
						$rootScope.showAlert(zhecDisplayMessage.serverBusy);
					}
				},
				function() {
					$scope.submitDisabled = false;
				});
	};
	//本次使用的收货地址
	$scope.ifclickremoveclass = function(obj, n) {
		if(obj == "") {

		} else {
			$scope.theReceiptAddress = obj;
		}

		$scope.ifgoods = n;
	}

	//初始化函数
	$scope.find();
	// 暂时定为默认都是不开发票   
	$scope.noNeedInvoice(0);
	//$scope.okInvoice(); //保存发票信息
}

function orderFormModalController($scope, $rootScope, ngVerify, $timeout, orderService, ngDialog) {
	$scope.consigneeProvinceAttr = [];
	$scope.consigneeCityAttr = [];
	$scope.consigneeAreaAttr = [];
	$scope.provname = "";
	$scope.cityname = "";
	$scope.areaname = "";
	$scope.dataEntity = {};
	$scope.delayed = false; //延时

	//获取省
	$scope.initEntity = function() {
		orderService
			.findtoplevelareas()
			.then(
				function(result) {
					$scope.consigneeProvinceAttr = result.data;
				})
	}
	$scope.initEntity();

	//是否设为默认地址
	$scope.chk = false; //不设为默认地址  false
	$scope.isDefaultClick = function() {
		$scope.chk ? $scope.dataEntity.isDefault = 1 : $scope.dataEntity.isDefault = 0;
		//$scope.dataEntity.isDefault = n;
		//$scope.dataEntity.isDefault==1
	};

	if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
		//修改收货信息
		//查询单条信息    详情
		orderService
			.getaddress($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntity = result.data;
					$scope.dataEntity.consigneeMobile = Number(result.data.consigneeMobile);
					$scope.consigneeProvince = result.data.consigneeProvince;
					$scope.change(result.data.consigneeProvince, 1);
					$scope.change(result.data.consigneeCity, 2);
					$scope.change(result.data.consigneeArea, 3);
					var str, attr;
					str = $scope.dataEntity.consigneePca;
					attr = str.split(' ');
					$scope.provname = attr[0];
					$scope.cityname = attr[1];
					$scope.areaname = attr[2];
					$scope.consigneeCity = result.data.consigneeCity;
					$scope.consigneeArea = result.data.consigneeArea;

					if($scope.dataEntity.isDefault == 1) {
						$scope.chk = true;
					} else {
						$scope.chk = false;
					}

					$timeout(function() {
						$('#submitbut').attr("disabled", false);
					}, 500);

				})

	} else { //如果参数dataId为空，说明是新增数据                               区id
		$scope.dataEntity = {
			"state": 1,
			"isDefault": 0, //不设为默认地址
			"consigneePca": "",
			"consigneeArea": 1,
			"consigneeCity": 1,
			"consigneeProvince": 1,
			"memberId": Number($scope.memberId)
		}
		$scope.chk = false; //不设为默认地址
	}
	$scope.okModal = function() {
			if($scope.delayed == true) {
				return 0;
			}
			$scope.delayed = true; //延时
			if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
				$scope.dataEntity.consigneePca = $scope.provname + ' ' + $scope.cityname + ' ' + $scope.areaname;
				$scope.dataEntity.consigneeProvince = $scope.consigneeProvince;
				$scope.dataEntity.consigneeCity = $scope.consigneeCity;
				$scope.dataEntity.consigneeArea = $scope.consigneeArea;
				var res = $scope.dataEntity;
				//修改收货信息
				orderService
					.editaddress(res)
					.then(
						function(result) {
							$scope.find();
							if(result.code == 0 || result.code > 0) {
								$rootScope.showAlert("保存成功！");
								$scope.dialog.close();
							}
							$scope.delayed = false;
						},
						function() {
							$scope.delayed = false;
						})
			} else {
				//新增收货信息
				$scope.dataEntity.consigneePca = $scope.provname + ' ' + $scope.cityname + ' ' + $scope.areaname;
				$scope.dataEntity.consigneeProvince = $scope.consigneeProvince;
				$scope.dataEntity.consigneeCity = $scope.consigneeCity;
				$scope.dataEntity.consigneeArea = $scope.consigneeArea;

				/*if($scope.dataEntity.consigneeName==undefined||$scope.dataEntity.consigneeName==null||$scope.dataEntity.consigneeName==""){
					$rootScope.showAlert("请输入收货人姓名！");
					return 0;
				}
				if($scope.dataEntity.consigneeMobile==undefined||$scope.dataEntity.consigneeMobile==null||$scope.dataEntity.consigneeMobile==""){
					$rootScope.showAlert("请输入收货人手机号！");
					return 0;
				}
				if($scope.dataEntity.consigneeArea == undefined || $scope.dataEntity.consigneeCity == undefined || $scope.dataEntity.consigneeProvince == undefined) {
					$rootScope.showAlert("请选择所在地区！");
					return 0;
				}*/
				orderService
					.addaddress($scope.dataEntity)
					.then(
						function(result) {
							$scope.delayed = false; //延时
							if(result.code == 0 || result.code > 0) {
								$scope.find();
								$scope.ifclickremoveclass("", 0)
								$rootScope.showAlert("保存成功！");
								$scope.dialog.close();
							}
							$scope.delayed = false;
						},
						function() {
							$scope.delayed = false;
						})
			}
		}
		//取消关闭窗口
	$scope.cancelModal = function() {
		$scope.find();
		$scope.dialog.close();
	};
	//
	$scope.change = function(id, n) {
		if(n == 1) {
			//对市、区级下拉框以及选取数据进行清空
			$scope.consigneeCity = "";
			$scope.consigneeArea = "";
			$scope.consigneeCityAttr = [];
			$scope.consigneeAreaAttr = [];
			$scope.cityname = "";
			$scope.areaname = "";
			for(var a = 0; a < $scope.consigneeProvinceAttr.length; a++) {
				if($scope.consigneeProvinceAttr[a].id == id) {
					$scope.provname = $scope.consigneeProvinceAttr[a].name;
				}
			}
		}
		if(n == 2) {
			//对区级下拉框以及选取数据进行清空
			$scope.consigneeArea = "";
			$scope.consigneeAreaAttr = [];
			$scope.areaname = "";
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
					$scope.dataEntity.consigneePost = $scope.consigneeAreaAttr[c].zipCode;
				}
			}
		}
		orderService
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
}

angular
	.module('orderApp')
	.controller('orderController', orderController)
	.controller('orderFormModalController', orderFormModalController)
	.directive('headerpage', headerpage)
	.filter('priceFormatFilter', priceFormatFilter)
	.directive('footerpage', footerpage)
	.factory('HttpInterceptor', ['$q', HttpInterceptor]) //定义一个 Service，作为 Interceptors 的处理函数
	.config(['$httpProvider', function($httpProvider) { //添加对应的 Interceptors
		$httpProvider.interceptors.push(HttpInterceptor);
	}]);

//用JS获取地址栏参数的方法
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function removeClass(elements, cName) {
	if(hasClass(elements, cName)) {
		elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换 
	};
};

function hasClass(elements, cName) {
	return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断 
};

function addClass(elements, cName) {
	if(!hasClass(elements, cName)) {
		elements.className += " " + cName;
	};
};

//针对引用数据类型    克隆
function clone(obj) {
	var o, i, j, k;
	if(typeof(obj) != "object" || obj === null) return obj;
	if(obj instanceof(Array)) {
		o = [];
		i = 0;
		j = obj.length;
		for(; i < j; i++) {
			if(typeof(obj[i]) == "object" && obj[i] != null) {
				o[i] = arguments.callee(obj[i]);
			} else {
				o[i] = obj[i];
			}
		}
	} else {
		o = {};
		for(i in obj) {
			if(typeof(obj[i]) == "object" && obj[i] != null) {
				o[i] = arguments.callee(obj[i]);
			} else {
				o[i] = obj[i];
			}
		}
	}
	return o;
}
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

//alert(equals([{a:1,b:2}],[{a:1,b:2}]));//true