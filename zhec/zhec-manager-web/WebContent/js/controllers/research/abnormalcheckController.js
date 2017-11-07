/**
 * 系统用户controller定义
 */
function abnormalcheckController($scope, $q, constPageSize, $window, abnormalcheckService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.WdatePicker = {}; //WdatePicker时间   获取开始和结束时间
	$scope.optType = "2";
	$scope.keyword = "";
	$scope.requestType = "";
	$scope.optId = "";

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		if (undefined == $scope.WdatePicker.startTime) {
			$scope.WdatePicker.startTime = "";
		}
		if (undefined == $scope.WdatePicker.endTime) {
			$scope.WdatePicker.endTime = "";
		}
		var minTime = $scope.WdatePicker.startTime; //开始时间检索
		var maxTime = $scope.WdatePicker.endTime; //结束时间检索
		var orderSn = $scope.orderSnSearch;
		var optType = $scope.optType;
		var requestType = $scope.requestType;
		var keyword = $scope.keyword;
		var optId = $scope.optId;
		//列表
		abnormalcheckService.find(optType, requestType, keyword, optId, minTime, maxTime, currentPaseSize, currentPageNo).then(
			function(result) {
				$scope.abnormalAllList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}

	$scope.reloadRoute = function() {
		$window.location.reload();
	};

	/**
	 * 弹出模态框
	 */
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/research/abnormalcheckFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'abnormalcheckFormModalController',
			scope: $scope,
			width: 1100
		});
	}
}
/**
 * 弹出页面的controller定义
 */
function abnormalcheckFormModalController($scope, $rootScope, abnormalcheckService) {
	$scope.initEntitys = function() {
		abnormalcheckService
			.get($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntity = result.data;
				},
				function(result) {
					defer.reject(result);
				}
			);


	}
	$scope.initEntity = function(mes) {
		$scope.currentTab = mes;
		abnormalcheckService
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
	}
	$scope.initEntity('optParameterId.html');



	$scope.cancelModal = function() {
		$scope.dialog.close();
	};


}

angular
	.module('managerApp')
	.controller('abnormalcheckController', abnormalcheckController)
	.controller('abnormalcheckFormModalController', abnormalcheckFormModalController)
