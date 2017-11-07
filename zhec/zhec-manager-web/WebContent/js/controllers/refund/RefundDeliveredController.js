/**
 * 系统用户controller定义
 */
function RefundDeliveredController($scope, $q, $rootScope, constPageSize, RefundDeliveredService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.memberNameSearch = ""; //搜索关键词 按会员姓名检索
	$scope.orderSnSearch = ""; //搜索关键词 按订单编号检索
	$scope.WdatePicker = {}; //WdatePicker时间   获取开始和结束时间

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var memberName = $scope.memberNameSearch;
		if(undefined == $scope.WdatePicker.startTime) {
			$scope.WdatePicker.startTime = "";
		}
		if(undefined == $scope.WdatePicker.endTime) {
			$scope.WdatePicker.endTime = "";
		}
		var minTime = $scope.WdatePicker.startTime; //下单开始时间检索
		var maxTime = $scope.WdatePicker.endTime; //下单结束时间检索
		var orderSn = $scope.orderSnSearch;
		RefundDeliveredService.find(memberName, orderSn, minTime, maxTime, currentPaseSize, currentPageNo).then(
			function(result) {
				$scope.RefundAllList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}
	
	/**
	 * 弹出详情模态框
	 */
	$scope.openModal2 = function(dataId, orderSn, orderStatus, n, m) {
		$scope.model = true;
		$scope.dataId = dataId;
		$scope.orderSn = orderSn;
		$scope.orderStatus = orderStatus;
		$scope.pendNum = n;
		$scope.position = 'RefundDeliveredList';
		$scope.dataIdoss = imgPathRefund + '/' + dataId + '/messageBoard';
		$scope.dialog = ngDialog.open({
			template: 'views/refund/RefundAllFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'RefundAllFormModalController',
			scope: $scope,
			width: 1060
		});
	}

	/**
	 * 弹出物流费用模态框
	 */
	$scope.openModal = function(dataId, orderSn, orderStatus, n, m) {
		if(m == 2) {
			$scope.cancelModal();
		}
		$scope.dataId = dataId;
		$scope.orderSn = orderSn;
		$scope.orderStatus = orderStatus;
		$scope.dialog = ngDialog.open({
			template: 'views/refund/RefundDeliveredFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'RefundDeliveredFormModalController',
			scope: $scope,
			width: 750
		});
	}

	$scope.cancelModal = function() {
		$scope.dialog.close();
	};

	//点击显示大图
	$scope.showBigImg = function(imgsrc) {
		$scope.bigimgsrc = imgsrc;
		$scope.model = false;
	};
	//点击大图回去
	$scope.clickBigImg = function() {
		$scope.bigimgsrc = "";
		$scope.model = true;
	};

}

/**
 * 弹出页面的controller定义
 */
function RefundAllFormModalController($scope, $rootScope, RefundDeliveredService) {
	$scope.data = {};
	$scope.showOss = true; //OSS隐藏
	$scope.initEntity = function(mes) {
			$scope.currentTab = mes;
			RefundDeliveredService
				.get($scope.dataId)
				.then(
					function(result) {
						$scope.dataEntity = result.data;
						//数组倒序排列
						//$scope.dataEntity.message = $scope.dataEntity.message.reverse();
					}
				);
		}
		//发送留言
	$scope.sendMessage = function() {
		var res = {
			'recipeId': $scope.dataId,
			'imgUrl': imgUrl,
			'message': $scope.data.message
		};
		if(res.imgUrl == '' && (res.message == '' || res.message == undefined)) {
			$rootScope.showAlert("发送信息不得为空！");
			return 0;
		}
		RefundDeliveredService
			.addmessage(res)
			.then(
				function(result) {
					$scope.initEntity("receivingMessage.html");
					$scope.data.message = "";
					imgUrl = "";
					picDelete();
					document.getElementById('wordNum').innerHTML = '';
				}
			);
	}

	/**
	 * 标签页  切换  click事件  
	 */
	$scope.onClickTab = function(url) {
		$scope.currentTab = url;
		if(url == "receivingMessage.html") {
			$scope.showOss = false;
		} else {
			$scope.showOss = true;
		}
		if(url == 'logisticsMessage.html') {
			if($scope.dataEntity.logisticsNumber != null && $scope.dataEntity.logisticsNumber != undefined && $scope.dataEntity.logisticsNumber != "") {
				RefundDeliveredService
					.getlogistics($scope.dataEntity.logisticsNumber, $scope.dataEntity.logisticsCode)
					.then(
						function(result) {
							if(angular.fromJson(result.data).Success == false) {
								$rootScope.showAlert("暂时无法查询到物流信息，请稍后查询！");
							} else {
								$scope.logisticsAttr = angular.fromJson(result.data).Traces;
							}
						}
					);
			}
		}
	}

	$scope.initEntity("ordersGoods.html");

}

/**
 * 弹出物流费用页面的controller定义
 */
function RefundDeliveredFormModalController($scope, RefundDeliveredService) {
	$scope.money = {};
	$scope.money.moneyLogisticsBear = 1;

	$scope.check = function(n) {
		$scope.money.moneyLogisticsBear = n;
	}

	$scope.okModal = function() {
		var res = [{
			'id': $scope.dataId,
			'orderSn': $scope.orderSn,
			'orderStatus': $scope.orderStatus,
			'moneyLogistics': $scope.money.moneyLogistics,
			'moneyLogisticsBear': $scope.money.moneyLogisticsBear
		}];
		RefundDeliveredService
			.received(res)
			.then(
				function(result) {
					$scope.cancelModal();
					$scope.loadData(true);
				}
			);
	};
}
angular
	.module('managerApp')
	.controller('RefundDeliveredController', RefundDeliveredController)
	.controller('RefundAllFormModalController', RefundAllFormModalController)
	.controller('RefundDeliveredFormModalController', RefundDeliveredFormModalController)

var imgUrl = ""; //留言板图片路径
function setImgRefundPath(src) {
	if(imgUrl == "") {
		imgUrl = src;
	} else {
		imgUrl = imgUrl + "," + src;
	}
}
//调用删除图片
function picDelete() {
	document.getElementById("ossfile").innerHTML = "";
}
//删除元素
function removeElement(_element) {
	var _parentElement = _element.parentNode;
	if(_parentElement) {
		_parentElement.removeChild(_element);
	}
}