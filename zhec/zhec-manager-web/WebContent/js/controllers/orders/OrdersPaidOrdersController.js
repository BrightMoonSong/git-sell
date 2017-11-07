/**
 * 系统用户controller定义
 */
function OrdersPaidOrdersController($rootScope, $scope, $q, orderReminder, constPageSize, OrdersPaidOrdersService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.remark = ""; //当前操作的数据备注信息
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
		OrdersPaidOrdersService
			.find(memberName, orderSn, minTime, maxTime, currentPaseSize, currentPageNo)
			.then(
				function(result) {
					$scope.ordersAllList = result.data;
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				})
		return defer.promise;
	}

	/**
	 * 弹出模态框
	 */
	$scope.openModal = function(dataId, orderSn, orderStatus, n) {
		var reminder; //提示语
		if(n == 1) {
			reminder = orderReminder.paid.ensure;
		} else if(n == 2) {
			reminder = orderReminder.paid.cancel;
		}
		/*ngDialog.openConfirm({
			template: '<p>' + reminder + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			className: 'ngdialog-theme-default'
		}).then(function(value) {*/
		$scope.dataId = dataId;
		$scope.orderSn = orderSn; //订单编号
		$scope.orderStatus = orderStatus; //订单状态
		$scope.suborcan = n;
		$scope.dialog = ngDialog.open({
			template: 'views/orders/OrdersPaidOrdersFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'OrdersPaidOrdersFormModalController',
			scope: $scope,
			width: 920
		});
	};

	/**
	 * 弹出详情模态框
	 */
	$scope.openModal2 = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/orders/OrdersALLOrdersFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'OrdersAllFormModalController',
			scope: $scope,
			width: 1360
		});
	}
}
/**
 * 弹出详情页面的controller定义
 */
function OrdersAllFormModalController($scope, OrdersPaidOrdersService) {
	$scope.initEntity = function() {
		$scope.currentTab = "ordersGoods.html";
		OrdersPaidOrdersService
			.get($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntity = result.data;
				}
			);

	}

	/**
	 * 标签页click事件
	 */
	$scope.onClickTab = function(url) {
		$scope.currentTab = url;
		if(url == 'logisticsMessage.html') {
			if($scope.dataEntity.logisticsNumber != null && $scope.dataEntity.logisticsNumber != undefined && $scope.dataEntity.logisticsNumber != "") {
				OrdersPaidOrdersService
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

	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
	$scope.initEntity();

}

/**
 * 弹出页面的controller定义
 */
function OrdersPaidOrdersFormModalController($rootScope, $scope, OrdersPaidOrdersService) {
	$scope.okModal = function() {
		var attr = [];
		var res = {
			'id': $scope.dataId,
			'orderSn': $scope.orderSn,
			'orderStatus': $scope.orderStatus,
			'operationalNotes': $scope.remark
		};
		attr.push(res);
		if($scope.suborcan == 1) {
			OrdersPaidOrdersService
				.submit(attr)
				.then(
					function(result) {
						$scope.loadData();
						$scope.dialog.close();
					}
				);
		} else if($scope.suborcan == 2) {
			if($scope.remark == null || $scope.remark == undefined || $scope.remark == "") {
				$rootScope.showAlert("取消时备注必须填！");
				return 0;
			}
			OrdersPaidOrdersService
				.cancel(attr)
				.then(
					function(result) {
						$scope.loadData();
						$scope.dialog.close();
					}
				);
		} else {
			$rootScope.showAlert("出错了，请联系管理员");
		}
	};

	$scope.cancelModal = function() {
		$scope.dialog.close();
	};

}

angular
	.module('managerApp')
	.controller('OrdersPaidOrdersController', OrdersPaidOrdersController)
	.controller('OrdersAllFormModalController', OrdersAllFormModalController)
	.controller('OrdersPaidOrdersFormModalController', OrdersPaidOrdersFormModalController)