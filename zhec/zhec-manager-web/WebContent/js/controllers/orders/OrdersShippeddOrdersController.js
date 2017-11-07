/**
 * 系统用户controller定义
 */
function OrdersShippeddOrdersController($rootScope, $scope, $http, $q, orderReminder, $uibModal, constPageSize, OrdersShippeddOrdersService, ngDialog) {
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
		OrdersShippeddOrdersService.find(memberName, orderSn, minTime, maxTime, currentPaseSize, currentPageNo).then(
			function(result) {
				$scope.ordersAllList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}

	$scope.openModal = function(dataId, orderSn, orderStatus,memberId) {
		var reminder; //提示语
		reminder = orderReminder.shipped;

		/*ngDialog.openConfirm({
			template: '<p>' + reminder + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {*/
		$scope.dataId = dataId;
		$scope.orderSn = orderSn; //订单编号
		$scope.orderStatus = orderStatus; //订单状态
		$scope.memberId = memberId; //会员id
		$scope.dialog = ngDialog.open({
			template: 'views/orders/OrdersShippedOrdersFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'OrdersShippedOrdersFormModalController',
			scope: $scope,
			width: 920
		});
	}

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
	
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
}
/**
 * 弹出详情页面的controller定义
 */
function OrdersAllFormModalController($scope, OrdersShippeddOrdersService) {
	$scope.initEntity = function() {
		$scope.currentTab = "ordersGoods.html";
		OrdersShippeddOrdersService
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
				OrdersShippeddOrdersService
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

function OrdersShippedOrdersFormModalController($scope, OrdersShippeddOrdersService) {
	$scope.okModal = function() {
		var attr = [];
		if($scope.remark == undefined || $scope.remark == "" || $scope.remark == null) {
			$scope.remark == "";
		}
		var res = {
			'id': $scope.dataId,
			'orderSn': $scope.orderSn,
			'orderStatus': $scope.orderStatus,
			'memberId': $scope.memberId,
			'operationalNotes': $scope.remark
		};
		attr.push(res);
		OrdersShippeddOrdersService
			.received(attr)
			.then(
				function(result) {
					$scope.loadData();
					$scope.dialog.close();
				}
			);
	}
}
angular
	.module('managerApp')
	.controller('OrdersShippeddOrdersController', OrdersShippeddOrdersController)
	.controller('OrdersShippedOrdersFormModalController', OrdersShippedOrdersFormModalController)
	.controller('OrdersAllFormModalController', OrdersAllFormModalController)