/**
 * Created by shy on 2017/2/20.
 */
/**
 * 系统用户controller定义
 */
function afterSalesController($scope, $rootScope, $http, $q, afterSalesService, constPageSize, ngDialog, $timeout) {
	//成功提示，相当于alert
	$rootScope.showAlert = function(message) {
		var dialog = ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default',
			controller: ['$scope', function($scope) {
				$scope.promptMessage = message;
			}],
		});

		$timeout(function() {
			dialog.close();
		}, 1500);
	}
	$scope.title = titleManage.afterSales;
	$scope.member = getCookie("loginManager");
	if($scope.member == "" || $scope.member == null || $scope.member == undefined) {
		$rootScope.showAlert(zhecDisplayMessage.pleaseLoginFirst);
		var t = setTimeout('window.open("login.html#/login", "_self");', 2000);
		return 0;
	}
	$scope.member = JSON.parse($scope.member);
	$scope.memberId = $scope.member.id;
	$scope.memberLoginId = $scope.member.loginId;
	$scope.orderSource = 1; //web端
	$scope.dataGoods = [];
	$scope.memberId = GetQueryString("memberId");
	$scope.orderId = GetQueryString("orderId");
	$scope.productId = GetQueryString("productId");
	$scope.goodsId = GetQueryString("goodsId");
	$scope.invoice = false; //有无发票
	//OSS文件路径
	$scope.submitBillmemberId = imgPathAfterSale + '/' + $scope.memberId;

	//设置默认值
	$scope.productNum = 1; //选择的数量

	$scope.refundType = 1; //服务类型（退货）1
	$scope.moneyRefundWay = 1; //钱的退回路径（退回余额） 1
	$scope.returnMethod = 1; //退货的方式（快递至平台）  1

	$scope.load = function() {
		//用于防止页面刚加载时一瞬间先显示出处方RX图片  加的display none   在这里移除
		var prescriptionPng = document.getElementById("prescriptionPng");
		var anesthesiaPng = document.getElementById("anesthesiaPng");
		if(prescriptionPng != undefined && prescriptionPng != null && prescriptionPng != "") {
			prescriptionPng.style.display = '';
		}
		if(anesthesiaPng != undefined && anesthesiaPng != null && anesthesiaPng != "") {
			anesthesiaPng.style.display = '';
		}
	}
	$scope.load();

	/**
	 * 初始化数据
	 */
	$scope.find = function() {
		$scope.reasonlist = [{
			id: 1,
			name: "收到商品破损"
		}, {
			id: 2,
			name: "商品需要维修"
		}, {
			id: 3,
			name: "商品错发/漏发"
		}, {
			id: 4,
			name: "未按约定时间发货"
		}, {
			id: 5,
			name: "七天无理由退货"
		}, {
			id: 6,
			name: "商品质量问题"
		}, {
			id: 7,
			name: "收到商品与描述不符"
		}, {
			id: 8,
			name: "退运费"
		}, {
			id: 9,
			name: "发票问题"
		}, {
			id: 10,
			name: "其他"
		}];
		afterSalesService
			.getrefunddata($scope.memberId, $scope.orderId, $scope.productId)
			.then(
				function(result) {
					$scope.dataEntity = result.data;
					console.log(result)
					//					$scope.dataEntity.goodsType = 1;
					//$scope.dataEntity.maxReturnNum = 10;
					if(result.code == -1) {
						$rootScope.showAlert(zhecDisplayMessage.serverBusy);
						var ts = setTimeout('window.open("member.html#/orders", "_self");', 1500);
					}
					if($scope.dataEntity.maxReturnNum == 0) {
						$rootScope.showAlert(zhecDisplayMessage.goodsCanNotBeReturned);
						var ts = setTimeout('window.open("member.html#/orders", "_self");', 1000);
					}
				});
	};

	//点击 订单ID 跳转
	$scope.openOrder = function() {
		window.open("orderDetail.html?orderId=" + $scope.orderId, "_self");
	};

	//选择的退货原因
	$scope.changeRefundReason = function(n) {
		for(var i = 0; i < $scope.reasonlist.length; i++) {
			if($scope.reasonlist[i].id == n) {
				$scope.refundReason = $scope.reasonlist[i].name;
			}
		}
	};

	$scope.dataDisabled = false;
	//如果此商品不可退货
	$scope.okModel = function() {
		if($scope.dataDisabled == true) {
			return 0;
		}
		$scope.dataDisabled = true;
		if($scope.dataEntity.maxReturnNum == 0) {
			$rootScope.showAlert(zhecDisplayMessage.returnOrReturn);
			$scope.dataDisabled = false;
			return 0;
		}
		//$rootScope.showAlert("此商品不可退货！");

		//$scope.productNum = 1;						//选择的数量
		//$scope.refundReason = "收到商品破损";			//选择的退货原因
		//$scope.remark = "remark收到商品破损remark";		//问题描述
		//$scope.invoiceStatus = 1;					//是否有发票    0无   1有
		if($scope.invoice) {
			$scope.invoiceStatus = 1;
		} else {
			$scope.invoiceStatus = 0;
		}
		//$scope.contactInformation = "17301088596";	//联系方式（手机号）
		$scope.imgUrl = imgPathAfterSales;
		$scope.res = {
			'orderId': $scope.orderId,
			'memberId': $scope.memberId,
			'memberLoginId': $scope.memberLoginId,
			'goodsId': $scope.goodsId,
			'productId': $scope.productId,
			'productNum': $scope.productNum, //选择的数量
			'refundReason': $scope.refundReason, //选择的退货原因
			'remark': $scope.remark, //问题描述
			'refundType': $scope.refundType, //服务类型（退货）10
			/*'invoiceStatus': $scope.invoiceStatus, //是否有发票    0无   1有*/
			'moneyRefundWay': $scope.moneyRefundWay, //钱的退回路径（退回余额） 1
			'returnMethod': $scope.returnMethod, //退货的方式（快递至平台）  1
			'contactInformation': $scope.contactInformation, //联系方式（手机号）
			'imgUrl': $scope.imgUrl, //图片地址  多个的话  ， 隔开
		};
		afterSalesService
			.refund($scope.res)
			.then(
				function(result) {
					//恢复确认提交按钮
					$scope.dataDisabled = false;
					if(result.code > 0 || result.code == 0) {
						//$rootScope.showAlert("提交成功！");
						var t = setTimeout('window.open("cartinfo.html?type=3&pid=1&pcount=1", "_self");', 500);
					} else if(result.code == -108) {
						$rootScope.showAlert(zhecDisplayMessage.returnOrReturn);
					} else if(result.code == -105) {
						$rootScope.showAlert(zhecDisplayMessage.goodsCanNotBeReturned);
					} else {
						$rootScope.showAlert(zhecDisplayMessage.submitFailed);
					}
				},
				function(result) {
					//恢复确认提交按钮
					$scope.dataDisabled = false;
				});
	};

	//初始化函数
	$scope.find();
}

angular
	.module('afterSalesApp')
	.controller('afterSalesController', afterSalesController)
	.directive('headerpage', headerpage)
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

//用JS显示输入的字符个数
function CountWords(obj, show_id) {
	var fullStr = obj.value;
	var charCount = fullStr.length;
	var rExp = /[^A-Za-z0-9]/gi;
	var spacesStr = fullStr.replace(rExp, ' ');
	var cleanedStr = spacesStr + ' ';
	do {
		var old_str = cleanedStr;
		cleanedStr = cleanedStr.replace('  ', ' ');
	} while (old_str != cleanedStr);
	var splitString = cleanedStr.split(' ');
	document.getElementById(show_id).innerHTML = "已输入" + charCount + "个字";
}

//获取上传图片地址
var imgPathAfterSales = '';

function setImgPathAfterSales(res) {
	if(imgPathAfterSales == '') {
		imgPathAfterSales = res;
	} else {
		imgPathAfterSales = imgPathAfterSales + ',' + res;
	}
}