/**
 * 系统用户controller定义
 */
function OrdersPrescriptionMobileOrdersController($scope, $q, constPageSize, OrdersPrescriptionMobileOrdersService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.handleStatus = ""; //搜索关键词 按处理状态方式检索

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var handleStatus = $scope.handleStatus;
		OrdersPrescriptionMobileOrdersService.find(currentPaseSize, currentPageNo, handleStatus).then(
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
			template: 'views/orders/OrdersPrescriptionMobileOrdersFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'OrdersPrescriptionMobileOrdersFormModalController',
			scope: $scope,
			width: 1060
		});
	}
}

/**
 * 弹出页面的controller定义
 */
function OrdersPrescriptionMobileOrdersFormModalController($scope, OrdersPrescriptionMobileOrdersService) {
	$scope.data = {};
	$scope.initEntity = function(mes) {
		$scope.currentTab = mes;
		OrdersPrescriptionMobileOrdersService
			.get($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntity = result.data;
					$scope.dataEntity.recipeMobileMessage = $scope.dataEntity.recipeMobileMessage.reverse();

				}
			);

	}

	//备注
	$scope.sendMessage = function(handleStatus) {
        var userId = localStorage.userId;
		var res = {
			'id': $scope.dataId,
			'handleStatus': handleStatus,
            'handleId':userId,
			'mobileMessage': $scope.data.message
		};
		OrdersPrescriptionMobileOrdersService
			.put(res)
			.then(
				function(result) {
					$scope.data.message = "";
					var imgUrl = "";
                    $scope.initEntity('leaveMessage.html');
					$scope.cancelModal();
				}
			);
	}


	/**
	 * 标签页click事件
	 */
	$scope.onClickTab = function(url) {
		$scope.currentTab = url;
	}
	$scope.initEntity('ordersDetails.html');
	$scope.cancelModal = function() {
		$scope.dialog.close();
		$scope.loadData();
	}



}

angular
	.module('managerApp')
	.controller('OrdersPrescriptionMobileOrdersController', OrdersPrescriptionMobileOrdersController)
	.controller('OrdersPrescriptionMobileOrdersFormModalController', OrdersPrescriptionMobileOrdersFormModalController);
