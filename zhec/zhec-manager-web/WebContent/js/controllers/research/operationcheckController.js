/**
 * 系统用户controller定义
 */
function operationcheckController($scope, $q, constPageSize,$window, operationcheckService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.WdatePicker = {}; //WdatePicker时间   获取开始和结束时间
	$scope.optType = "2";
	$scope.keyword = "";
	$scope.requestType="";
	$scope.optId="";

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
		var keyword = $scope.keyword;
		var requestType=$scope.requestType;
		var optId=$scope.optId;
		//列表
		operationcheckService.find(optType,requestType, keyword,optId, minTime, maxTime, currentPaseSize, currentPageNo).then(
			function(result) {
				$scope.operationAllList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			})
		return defer.promise;
	};

	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/research/operationcheckFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'operationcheckFormModalController',
			scope: $scope,
			width: 1100
		});
	}
	$scope.reloadRoute = function() {
		$window.location.reload();
	};


}
/**
 * 弹出页面的controller定义
 */
function operationcheckFormModalController($scope, $rootScope, operationcheckService) {
	$scope.initEntitys = function() {
		operationcheckService
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
		operationcheckService
			.get($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntity = result.data;
					$scope.initEntitys();
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
	.controller('operationcheckController', operationcheckController)
	.controller('operationcheckFormModalController', operationcheckFormModalController)
