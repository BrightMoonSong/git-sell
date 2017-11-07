/**
 * 退货订单详情controller定义
 */
function returnOrderDetailController($rootScope,$scope, $http, $q, $timeout, returnOrderDetailService, constPageSize, ngDialog, ngVerify) {
	//设置按钮初始的状态为可点击
  $scope.addMessageDisabled = false;
  //拦截器
  $rootScope.showAlert = function(message) {
    var dialog = ngDialog.open({
      template: '../../../views/common/promptBox.html',
      className: 'ngdialog-theme-default',
      height:174,
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
		if(/orderId=\d+/g.test($scope.locationUrl)) {
			$scope.orderId = parseInt($scope.locationUrl.match(/orderId=\d+/g)[0].split("=")[1]);
		}
		if(/memberId=\d+/g.test($scope.locationUrl)) {
			$scope.memberId = parseInt($scope.locationUrl.match(/memberId=\d+/g)[0].split("=")[1]);
		}
		$scope.returnmemberId = imgPathRefund + '/' + $scope.memberId;
		var defer = $q.defer();
		returnOrderDetailService
			.findMemberOrder($scope.memberId, $scope.orderId)
			.then(
				function(result) {
					$scope.returnOrder = result.data;
          console.log($scope.returnOrder);
					//把imgUrl变成数组
					$scope.messageList = $scope.returnOrder.message;
					for(var i = 0; i < $scope.messageList.length; i++) {
						if($scope.messageList[i].imgUrl != null && $scope.messageList[i].imgUrl != "") {
							$scope.messageList[i].messageImgList = $scope.messageList[i].imgUrl.split(",");
						}
					}
					if($scope.returnOrder.imgUrl != "" && $scope.returnOrder.imgUrl != null) {
						$scope.returnOrder.imgUrl = $scope.returnOrder.imgUrl.split(",")
					}

					if($scope.returnOrder.refundType == 1) {
						$scope.returnOrder.refundType = "退货"
					}
					if($scope.returnOrder.moneyRefundWay == 1) {
						$scope.returnOrder.moneyRefundWay = "按原支付方式退回"
					}
					if($scope.returnOrder.returnMethod == 1) {
						$scope.returnOrder.returnMethod = "快递至平台"
					}

					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	}
	if(checkLogin()) {
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
			controller: 'returnOrderDetailController',
			scope: $scope,
			width: 400,
			height:200
		});
	};
	//关闭弹窗
	$scope.closeTrackingNo = function() {
		$scope.trackingNoDialog.close();
	};
	//选择物流公司
	$scope.checkCompany = function(company) {
		$scope.logisticsName = company.name;
		$scope.logisticsCode = company.code;
	};
	//确定发货
  $scope.confirlDisabled = false;
	$scope.confirlSend = function(tracking, memberId, id) {
    checkLogin()
    if($scope.confirlDisabled == true){
      return 0;
    }
    $scope.confirlDisabled = true;
		$scope.trackingData = {};
		$scope.trackingData.logisticsNumber = tracking;
		$scope.trackingData.memberId = memberId;
		$scope.trackingData.orderId = id;
		$scope.trackingData.logisticsName = $scope.logisticsName;
		$scope.trackingData.logisticsCode = $scope.logisticsCode;
		var defer = $q.defer();
		returnOrderDetailService
			.sendReturnNo($scope.trackingData)
			.then(function(result) {
				//$scope.loadData();
				$scope.closeTrackingNo();
				window.location.reload();
        $scope.confirlDisabled = false;
				//window.open(window.locationUrl,"_self");
				defer.resolve(result);
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
		if($scope.addMessageDisabled == true) {
			return 0;
		}
		$scope.addMessageDisabled = true;
		$scope.submitMessage = {};
		$scope.submitMessage.recipeId = $scope.returnOrder.id;
		$scope.submitMessage.imgUrl = "";
		for(var i = 0; i < imgPathReturn.length; i++) {
			$scope.submitMessage.imgUrl += imgPathReturn[i];
			if(i < imgPathReturn.length - 1) {
				$scope.submitMessage.imgUrl += ","
			}
		}

		if($scope.submitMessage.imgUrl == "") {
			if($scope.messageMemInput == "" || $scope.messageMemInput == null || $scope.messageMemInput == undefined) {
				promptBox("输入内容为空！");
				$scope.addMessageDisabled = false;
				return 0;
			}
		}
		$scope.submitMessage.memberId = $scope.memberId;
		$scope.submitMessage.message = $scope.messageMemInput;

		if($scope.messageMemInput != "" || imgPathReturn != "") {
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
	/* //先隐藏开始上传
	 $("#selectfiles").show();
	 $("#postfiles").hide();*/

	//取消申请
  $scope.cancleReturn = false;
	$scope.cancleApply = function(orderId,memberId) {
    checkLogin()
		$scope.dialogcle = jDialog.confirm(zhecDisplayMessage.cancleOrderApply, {
			handler: function(button, dialog) {
        if(  $scope.cancleReturn = false){
          return 0 ;
        }
        $scope.cancleReturn = true;

        var defer = $q.defer();
				returnOrderDetailService
					.cancleApply(orderId,memberId)
					.then(
						function(result) {
							$scope.loadData(true);
							promptBox(zhecDisplayMessage.cancleOrderApplySuccess);
							$scope.dialogcle.close();
              $scope.cancleReturn = false;
            },function(result){
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
				$scope.logistics = result.data;

				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	}

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
  $scope.showBigImg = function(imgSrc){
    $scope.dialog1 = ngDialog.open({
      template: '../../../views/common/bigImg.html',
      className: 'ngdialog-theme-default',
      scope:$scope,
      width:800,
      controller: ['$scope', function($scope) {
        $scope.currentImg = imgSrc;
        $scope.closeModal = function(){
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

angular
	.module('returnOderDetailApp', ['ngDialog', 'ngVerify'])
	.constant('constBaseLocation', ConstBaseLocation)
	.constant('constPageSize', 10)
	.controller('returnOrderDetailController', returnOrderDetailController)
	.controller('showBigImgController', showBigImgController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.factory('CommonService', CommonService)
	.directive('search', search)
	.directive('navigationBar', navigationBar)
  .factory('HttpInterceptor', ['$q', HttpInterceptor]) //定义一个 Service，作为 Interceptors 的处理函数
  .config(['$httpProvider', function($httpProvider) { //添加对应的 Interceptors
    $httpProvider.interceptors.push(HttpInterceptor);
  }]);
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
