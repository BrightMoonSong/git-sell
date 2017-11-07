/**
 * 系统用户controller定义
 */
function VersionController($rootScope, $scope, $http, $q, $uibModal, constPageSize, VersionService, ngDialog) {
	$scope.appType = 1;
	$scope.currentLabel = true; //true Android/false IOS
	$scope.clickLabel = "Android列表 点击查看IOS列表";

	/**
	 * 得到数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		//Android 1;ios 2
		VersionService.find($scope.appType, currentPaseSize, currentPageNo).then(
			function(result) {
				$scope.VersionList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			});
		return defer.promise;
	};


	$scope.changeLabel = function() {
		if ($scope.currentLabel) {
			$scope.currentLabel = !$scope.currentLabel;
			$scope.appType = 2;
			$scope.clickLabel = "IOS列表 点击查看Android列表";
			$scope.loadData(true);
		} else {
			$scope.currentLabel = !$scope.currentLabel;
			$scope.appType = 1;
			$scope.clickLabel = "Android列表 点击查看IOS列表";
			$scope.loadData(true);
		}
	}

	/**
	 * 弹出详情模态框
	 */
	$scope.openDetailModal = function(versionId) {
		$scope.versionId = versionId;
		$scope.dialog = ngDialog.open({
			template: 'views/app/VersionDetailsModal.html',
			className: 'ngdialog-theme-default',
			controller: 'VersionDetailsModalController',
			scope: $scope,
			width: 1060
		});
	};

	/**
	 * 弹出上传页模态框
	 */
	$scope.openUpdateModal = function() {
		$scope.dialog = ngDialog.open({
			template: 'views/app/VersionUpdateModal.html',
			className: 'ngdialog-theme-default',
			controller: 'VersionUpdateModalController',
			scope: $scope,
			width: 1360
		});
	};


	$scope.cancelModal = function() {
		$scope.dialog.close();
	};

}
/**
 * 弹出详情页面的controller定义
 */
function VersionDetailsModalController($scope, VersionService) {

	$scope.findById = function() {
		VersionService
			.get($scope.versionId)
			.then(
				function(result) {
					$scope.versionData = result.data;
				}
			);
	};

	$scope.findById();
}



/**
 * 弹出更新页面的controller定义
 */
function VersionUpdateModalController($scope, VersionService) {
	$scope.isUpdate = false;
	$scope.res = {};
	$scope.update = function() {
		//先获取输入内容
		if (!$scope.isUpdate) {
			$scope.isUpdate = true;

			$scope.res.versionName = $scope.appVersionName;
			$scope.res.apkUrl = $scope.apkUrl;
			$scope.res.versionCode = $scope.appVersionCode;
			$scope.res.versionDesc = $scope.appVersionDesc;
			$scope.res.appType = $scope.appType;
			$scope.res.optId = localStorage.userId;
			$scope.res.optName = localStorage.userName;


			VersionService
				.update($scope.res)
				.then(
					function(result) {
						$scope.loadData(true);
						$scope.dialog.close();
					},
					function(result) {
						
					}
				);
		}
	};


}

angular
	.module('managerApp')
	.controller('VersionController', VersionController)
	.controller('VersionDetailsModalController', VersionDetailsModalController)
	.controller('VersionUpdateModalController', VersionUpdateModalController)
