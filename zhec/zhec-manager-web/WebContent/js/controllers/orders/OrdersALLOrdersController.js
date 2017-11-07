/**
 * 系统用户controller定义
 */
function OrdersALLOrdersController($scope, $q, constPageSize, OrdersALLOrdersService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.memberNameSearch = ""; //搜索关键词 按会员姓名检索
	$scope.WdatePicker = {}; //WdatePicker时间   获取开始和结束时间
	$scope.orderSnSearch = ""; //搜索关键词 按订单编号检索
	$scope.findallstatusAttr = []; //订单状态集合
	$scope.selectedStatus = {};

	//findallstatus---查询订单状态信息
	$scope.first = function() {
		//查询订单状态信息  
		OrdersALLOrdersService.findallstatus().then(
			function(result) {
				$scope.findallstatusAttr = result.data;
			});
	}
	$scope.first();
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
		if(null == $scope.selectedStatus) {
			$scope.selectedStatus = {};
		}
		if(undefined == $scope.selectedStatus.statusCode) {
			$scope.selectedStatus.statusCode = '';
		}
		var orderStatus = $scope.selectedStatus.statusCode;
		//列表
		OrdersALLOrdersService.find(orderStatus, memberName, orderSn, minTime, maxTime, currentPaseSize, currentPageNo).then(
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
	$scope.openModal = function(dataId) {
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
 * 弹出页面的controller定义
 */
function OrdersAllFormModalController($scope, $rootScope, OrdersALLOrdersService) {
	$scope.initEntity = function() {
		$scope.currentTab = "ordersGoods.html";
		OrdersALLOrdersService
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
				OrdersALLOrdersService
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

angular
	.module('managerApp')
	.controller('OrdersALLOrdersController', OrdersALLOrdersController)
	.controller('OrdersAllFormModalController', OrdersAllFormModalController)