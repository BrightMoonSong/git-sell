/**
 * 退货订单详情controller定义
 */
function returndetailController($rootScope, $scope, $http, $q, $timeout, returnOrderDetailService, ngDialog, ngVerify) {
	//设置按钮初始的状态为可点击
	$scope.addMessageDisabled = false;
	//拦截器
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
		//获取退单详情的初始数据
	$scope.loadData = function() {
		$scope.locationUrl = window.location.href;
		if (/orderId=\d+/g.test($scope.locationUrl)) {
			$scope.orderId = parseInt($scope.locationUrl.match(/orderId=\d+/g)[0].split("=")[1]);
		}
		if (/memberId=\d+/g.test($scope.locationUrl)) {
			$scope.memberId = parseInt($scope.locationUrl.match(/memberId=\d+/g)[0].split("=")[1]);
		}
		$scope.returnmemberId = imgPathRefund + '/' + $scope.memberId;
		var defer = $q.defer();
		returnOrderDetailService
			.findMemberOrder($scope.memberId, $scope.orderId)
			.then(
				function(result) {
					console.log(result)
					$scope.returnOrder = result.data;
					console.log($scope.returnOrder);
					//把imgUrl变成数组
					$scope.messageList = $scope.returnOrder.message;
					for (var i = 0; i < $scope.messageList.length; i++) {
						if ($scope.messageList[i].imgUrl != null && $scope.messageList[i].imgUrl != "") {
							$scope.messageList[i].messageImgList = $scope.messageList[i].imgUrl.split(",");
						}
					}
					if ($scope.returnOrder.imgUrl != "" && $scope.returnOrder.imgUrl != null) {
						$scope.returnOrder.imgUrl = $scope.returnOrder.imgUrl.split(",")
					}

					if ($scope.returnOrder.refundType == 1) {
						$scope.returnOrder.refundType = "退货"
					}
					if ($scope.returnOrder.moneyRefundWay == 1) {
						$scope.returnOrder.moneyRefundWay = "按原支付方式退回"
					}
					if ($scope.returnOrder.returnMethod == 1) {
						$scope.returnOrder.returnMethod = "快递至平台"
					}

					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	}
	if (checkLogin()) {
		$scope.loadData()
	}

	<!--ng-src="images/jdt.png"蓝色-->
	<!--ng-src="images/jdt1.png"灰色-->
	//控制时间轴的颜色

	$scope.blueTime = "images/jdt.png";
	$scope.grayTime = "images/jdt1.png";

	$scope.logisticsNumber = "";
	$scope.trackingNo = function() {
		$scope.findlogisticscompany();
		$scope.trackingNoDialog = ngDialog.open({
			template: 'trackingNo.html',
			className: 'ngdialog-theme-default',
			controller: 'returndetailController',
			scope: $scope,
			width: 400,
			height: 200
		});
	};
	//	//关闭弹窗
	//	$scope.closeTrackingNo = function() {
	//		$scope.trackingNoDialog.close();
	//	};
	//选择物流公司
	$scope.checkCompany = function(company) {
		$scope.logisticsName = company.name;
		$scope.logisticsCode = company.code;
	};
	//确定发货
	$scope.confirlDisabled = false;
	$scope.confirlSend = function(tracking, memberId, id) {
		checkLogin()
		if ($scope.confirlDisabled == true) {
			return 0;
		}
		$scope.confirlDisabled = true;
		$scope.trackingData = {};
		$scope.trackingData.logisticsNumber = tracking;
		$scope.trackingData.memberId = memberId;
		$scope.trackingData.orderId = id;
		//		$scope.trackingData.logisticsName = $scope.logisticsName;
		$scope.trackingData.logisticsCode = document.querySelector('#showctract').dataset['id'];
		$scope.trackingData.logisticsName = document.querySelector('#showctract').dataset['value'];
		if ($scope.trackingData.logisticsCode == "" || $scope.trackingData.logisticsName == "") {
			return 0
		}
		console.log($scope.trackingData.logisticsName)
		var defer = $q.defer();
		returnOrderDetailService
			.sendReturnNo($scope.trackingData)
			.then(function(result) {
				//$scope.loadData();
				//				$scope.closeTrackingNo();
				//window.location.reload();
				$scope.confirlDisabled = false;
				//window.open(window.locationUrl,"_self");
				$timeout(function() {
					ngDialog.close();
					location.reload()
				}, 1500);
			}, function(result) {
				$scope.confirlDisabled = false;
				defer.reject(result);
			});
		return defer.promise;
	};

	$("#postfiles").hide();
	//点击上传图片和信息
	$scope.addMessage = function() {
		checkLogin()
		if ($scope.addMessageDisabled == true) {
			return 0;
		}
		$scope.addMessageDisabled = true;
		$scope.submitMessage = {};
		$scope.submitMessage.recipeId = $scope.returnOrder.id;
		$scope.submitMessage.imgUrl = "";
		for (var i = 0; i < imgPathReturn.length; i++) {
			$scope.submitMessage.imgUrl += imgPathReturn[i];
			if (i < imgPathReturn.length - 1) {
				$scope.submitMessage.imgUrl += ","
			}
		}

		if ($scope.submitMessage.imgUrl == "") {
			if ($scope.messageMemInput == "" || $scope.messageMemInput == null || $scope.messageMemInput == undefined) {
				promptBox("输入内容为空！");
				$scope.addMessageDisabled = false;
				return 0;
			}
		}
		$scope.submitMessage.memberId = $scope.memberId;
		$scope.submitMessage.message = $scope.messageMemInput;

		if ($scope.messageMemInput != "" || imgPathReturn != "") {
			var defer = $q.defer();
			returnOrderDetailService
				.submitMessage($scope.submitMessage)
				.then(function(result) {
					$scope.loadData();
					$("#ossfile").html("");
					$("#container").show();
					$("#selectfiles").show();
					$("#postfiles").hide();
					imgPathReturn = [];
					$scope.messageMemInput = "";

					$scope.addMessageDisabled = false;
					defer.resolve(result);
				}, function(result) {
					$scope.addMessageDisabled = false;
					defer.reject(result);
				});
			return defer.promise;
		}

	};

	//不同状态对应的提示内容
	/*
	* <label>提&nbsp;&nbsp;&nbsp;示:</label>
	 <span ng-if="returnOrder.orderStatus==1"><b>订单正在审核中请耐心等待</b></span>
	 <span ng-if="returnOrder.orderStatus==2"><b>您需要在一周内填写物流单号，否则退单将会中止</b></span>
	 <span ng-if="returnOrder.orderStatus==3"><b>若货已发出，请您注意跟踪物流信息（若在30天之内收不到货，退货失败，订单中止）</b></span>
	 <span ng-if="returnOrder.orderStatus==4"><b>已经收到货了，我们将尽快的把退款返回您的账户</b></span>
	 <span ng-if="retur nOrder.orderStatus==5"><b>退款完成，退单结束</b></span>
	<span ng-if="returnOrder.orderStatus==6"><b>订单中止</b></span>*/
	//	$scope.mySwiper=new Swiper(" swiper-container",{
	//
	//	})
	//	$scope.conpayswiper=function(){
	//		$scope.mySwiper.slideTo(1, 1000)
	//	}
	var mySwiper = new Swiper(" .swiper-container", {
		onlyExternal: true, //无法拖动
	})
	mySwiper.detachEvents(); //阻止swiper滑动

	$('#cotrack').click(function() {
		console.log(2222)
		// mySwiper.slideTo(); //切换到第一个slide，速度为1秒
		angular.element('body').scrollTop(0);
	})

	$scope.slideTo = function(num) {
		mySwiper.slideTo(num, 0);
	}


	$scope.statusWarn = function(orderstatus) {
		switch (orderstatus) {
			case 1:
				return "订单正在审核中请耐心等待";
				break;
			case 2:
				return "您需要在一周内填写物流单号，否则退单将会中止";
				break;
			case 3:
				return "若货已发出，请您注意跟踪物流信息（若在30天之内收不到货，退货失败，订单中止）";
				break;
			case 4:
				return "已经收到货了，我们将尽快的把退款返回您的账户";
				break;
			case 5:
				return "退款完成，退单结束";
				break;
			case 6:
				return "订单中止";
				break;
		}
	};
	/* //先隐藏开始上传
	 $("#selectfiles").show();
	 $("#postfiles").hide();*/

	//取消申请
	$scope.cancleReturn = false;
	$scope.cancleApply = function(orderId) {
		console.log(orderId)
		checkLogin()
		$scope.dialogcle = jDialog.confirm(zhecDisplayMessage.cancleOrderApply, {
			handler: function(button, dialog) {
				if ($scope.cancleReturn = false) {
					return 0;
				}
				$scope.cancleReturn = true;

				var defer = $q.defer();
				returnOrderDetailService
					.cancleApply(orderId, $scope.memberId)
					.then(
						function(result) {
							$scope.loadData(true);
							promptBox(zhecDisplayMessage.cancleOrderApplySuccess);
							$scope.dialogcle.close();
							$scope.cancleReturn = false;
						},
						function(result) {
							$scope.cancleReturn = false;
						});
			}
		}, {
			handler: function(button, dialog) {
				$scope.dialogcle.close();
			}
		});
	};
	//获取物流公司的列表
	$scope.findlogisticscompany = function() {
		var defer = $q.defer();
		returnOrderDetailService
			.findlogisticscompany()
			.then(function(result) {
				console.log(result);
				$scope.logistics = result.data;
				returncomp(result.data);
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	}
	$scope.findlogisticscompany();
	/*//点击显示大图
	$scope.showBigImg = function(imgSrc) {

		$scope.showPic = imgSrc;
		$scope.dialog = ngDialog.open({
			template: 'firstDialogId',
			className: 'ngdialog-theme-default',
			scope: $scope,
			width: 800,
			controller: showBigImgController
		})

	}*/


	//点击显示大图
	$scope.showBigImg = function(imgSrc) {
		$scope.dialog1 = ngDialog.open({
			template: '../../../views/common/bigImg.html',
			className: 'ngdialog-theme-default',
			scope: $scope,
			width: 800,
			controller: ['$scope', function($scope) {
				$scope.currentImg = imgSrc;
				$scope.closeModal = function() {
					$scope.dialog1.close()
				}
			}]

		})
	}

};
var imgPathReturn = [];

function setReturnImgPath(res) {
	imgPathReturn.push(res);
};

function showBigImgController($scope, $http, $q, $compile) {
	$scope.currentImg = $scope.showPic;
	$scope.closeModal = function() {
		$scope.dialog.close()
	}
}

app
	.controller('returndetailController', returndetailController)

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
