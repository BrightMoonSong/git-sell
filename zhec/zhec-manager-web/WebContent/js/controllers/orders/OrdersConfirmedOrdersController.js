/**
 * 系统用户controller定义
 */
function OrdersConfirmedOrdersController($scope, $q, constPageSize, OrdersConfirmedOrdersService, ngDialog) {
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
		OrdersConfirmedOrdersService
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
	 * 弹出数据模态框
	 */
	$scope.openModal = function(dataId, orderSn, orderStatus) {
		$scope.dataId = dataId;
		$scope.orderSn = orderSn; //订单编号
		$scope.orderStatus = orderStatus; //订单状态
		$scope.dialog = ngDialog.open({
			template: 'views/orders/OrdersConfirmedOrdersFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'OrdersConfirmedOrdersFormModalController',
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
function OrdersAllFormModalController($scope, OrdersConfirmedOrdersService) {
	$scope.initEntity = function() {
		$scope.currentTab = "ordersGoods.html";
		OrdersConfirmedOrdersService
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
				OrdersConfirmedOrdersService
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
function OrdersConfirmedOrdersFormModalController($scope, OrdersConfirmedOrdersService) {

	//ceshi
	/*$scope.logisticsCompanyAttr=[{'id':1,'name':'firstcomPany'},{'id':2,'name':'secondcomPany'}];
	$scope.logisticsCompany=2;*/

	$scope.findlogisticscompany = function() {
		OrdersConfirmedOrdersService
			.findlogisticscompany()
			.then(
				function(result) {
					$scope.logisticsCompanyAttr = result.data;
				}
			);
	};
	$scope.findlogisticscompany();

	$scope.okModal = function() {
		var attr = [];
		var res = {
			'id': $scope.dataId,
			'orderSn': $scope.orderSn,
			'orderStatus': $scope.orderStatus,
			'operationalNotes': $scope.remark
		};
		attr.push(res);
		var logisticsCode, logisticsName, logisticsNumber;
		logisticsNumber = $scope.logisticsNumber;
		logisticsCode = $scope.logisticsCompany;
		for(var i = 0; i < $scope.logisticsCompanyAttr.length; i++) {
			if($scope.logisticsCompany == $scope.logisticsCompanyAttr[i].code) {
				logisticsName = $scope.logisticsCompanyAttr[i].name;
			}
		}
		OrdersConfirmedOrdersService
			.ship(attr, logisticsCode, logisticsName, logisticsNumber, $scope.logisticsMoney)
			.then(
				function(result) {
					$scope.loadData();
					$scope.dialog.close();
				}
			);
	};

	$scope.cancelModal = function() {
		$scope.dialog.close();
	};

}
angular
	.module('managerApp')
	.controller('OrdersConfirmedOrdersController', OrdersConfirmedOrdersController)
	.controller('OrdersAllFormModalController', OrdersAllFormModalController)
	.controller('OrdersConfirmedOrdersFormModalController', OrdersConfirmedOrdersFormModalController)