/**
 * Created by glh on 2017/2/20.
 */

function applyController($scope, $rootScope, $stateParams, $http, $q, applyService, constPageSize, ngDialog, $timeout) {
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
	//获取memberId和判断是否取到
	$scope.member = getCookie("loginManager");
	if($scope.member == "" || $scope.member == null || $scope.member == undefined) {
		$rootScope.showAlert(zhecDisplayMessage.pleaseLoginFirst)
		var tz = setTimeout('window.open("/index.html#/info/login", "_self");', 1500);
		return 0;
	}
	$scope.member = JSON.parse($scope.member);
	$scope.memberId = $stateParams.memberId;
	$scope.orderId = $stateParams.orderId;
	$scope.productId = $stateParams.productId;
	$scope.goodsId = $stateParams.goodsId;
	$scope.memberLoginId = $scope.member.loginId;
	$scope.goods_applynum=1;
	//OSS文件路径
	$scope.submitBillmemberId = imgPathAfterSale + '/' + $scope.memberId;
	$scope.imgUrl = '';//图片上传路径


	//rx处方图片显现
//	$scope.load = function() {
//		var apply_rx_img = document.getElementById('apply_rx_img');
//		if(apply_rx_img != null || apply_rx_img != undefined || apply_rx_img != "") {
//			apply_rx_img.style.display = "";
//		}
//	}
//	$scope.load();
	//显示弹窗
	$scope.settime = function() {
		$(".all_bill_div").slideDown(500);
		$timeout(function() {
			$scope.popup = true;

		}, 500)

	}
	$scope.slideot = function() {
		$(".all_bill_div").slideUp(500);
		$timeout(function() {
			$scope.popup = false;
		}, 500)

	}

	$scope.find = function() {
		$scope.refundReason = '请选择';

		applyService
			.getrefunddata($scope.memberId, $scope.orderId, $scope.productId)
			.then(function(result) {
				console.log(result)
				$scope.applyData = result.data;
				if(result.code == -1) {
					$rootScope.showAlert(zhecDisplayMessage.serverBusy);
					var tc = setTimeout('window.open("/index.html#/main/orderlist", "_self");', 1500);
				}
				if($scope.applyData == ""||$scope.applyData == null||$scope.applyData == undefined){

				}else{
					if($scope.applyData.maxReturnNum == 0) {
						$rootScope.showAlert(zhecDisplayMessage.goodsCanNotBeReturned);
					var ts = setTimeout('window.open("/index.html#/main/orderlist", "_self");', 1000);
					}
				}

			})
	}
	$scope.getName = function(name) {
		$scope.refundReason = name;

	}

	$scope.resfun = function() {
		if($scope.dataDisabled == true) {
			return 0;
		}
		$scope.dataDisabled = true;
		if($scope.applyData.maxReturnNum == 0) {
			//			$rootScope.showAlert(zhecDisplayMessage.returnOrReturn);
//			$(".detaily_sc").style.display = "";
			$scope.dataDisabled = false;
			return 0;
		}
		var applyShowth=$("#apply-show-th").text();
		   if(applyShowth==""||applyShowth==null||applyShowth==undefined||applyShowth=="请选择"){
		   $rootScope.showAlert(zhecDisplayMessage.applyCause);
		   	return;
		   }
		   if($scope.contactInformation==""||$scope.contactInformation==null||$scope.contactInformation==undefined){
		   	$rootScope.showAlert(zhecDisplayMessage.enterYourPhoneNumber);
		   	return;
		   }else {
				var  re = /^1\d{10}$/;
				if(re.test($scope.contactInformation)){
				}else{
					$rootScope.showAlert(zhecDisplayMessage.phoneNumberFormatNotCorrect);
		   			return;
				}
			}
		   if($scope.remark==""||$scope.remark==null||$scope.remark==undefined){
		   	$rootScope.showAlert(zhecDisplayMessage.appylTextra);
		   	return;
		   }
		if($scope.invoice) {
			$scope.invoiceStatus = 1;
		} else {
			$scope.invoiceStatus = 0;
		}
		$scope.res = {
			'orderId': $scope.orderId,
			'memberId': $scope.memberId,
			'memberLoginId': $scope.memberLoginId,
			'goodsId': $scope.goodsId,
			'productId': $scope.productId,
			'productNum':$scope.goods_applynum, //选择的数量
			'refundReason': applyShowth, //选择的退货原因
			'remark': $scope.remark, //问题描述
			'refundType': 1, //服务类型（退货）1
			/*'invoiceStatus': $scope.invoiceStatus, //是否有发票    0无   1有*/
			'moneyRefundWay': 1, //钱的退回路径（退回余额） 1
			'returnMethod': 1, //退货的方式（快递至平台）  1
			'contactInformation': $scope.contactInformation, //联系方式（手机号）
			'imgUrl': $scope.imgUrl, //图片地址  多个的话  ， 隔开
		};
		
		applyService
			.refund($scope.res)
			.then(function(result) {
				console.log(result)
					$scope.dataDisabled = false;
					if(result.code > 0 || result.code == 0) {
						//$rootScope.showAlert("提交成功！");
					$rootScope.showAlert(zhecDisplayMessage.orderlistSuccess);
						$timeout(function() {
							window.open("index.html#/info/returnOrder", "_self");
						}, 1500);
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
				})
	}
	$scope.find();
}

app.controller('applyController', applyController);

//获取上传图片地址
var imgPathAfterSales = '';

function setImgPathAfterSales(res) {
	if(imgPathAfterSales == '') {
		imgPathAfterSales = res;
	} else {
		imgPathAfterSales = imgPathAfterSales + ',' + res;
	}
}
