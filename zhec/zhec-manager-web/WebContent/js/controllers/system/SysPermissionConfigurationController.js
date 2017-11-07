/**
 * 系统用户controller定义
 */
function SysPermissionConfigurationController($scope, $http, $q, constPageSize, SysPermissionConfigurationService, ngDialog, $rootScope) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.permissionOneSearch = 0; //搜索关键词
	$scope.permissionOneList = [];

	/**
	 * 搜索数据
	 */
	$scope.find = function() {
		SysPermissionConfigurationService
			.sysfunctionlist()
			.then(
				function(result) {
					$scope.permissionList1 = clone(result.data);
					$scope.permissionList2 = clone(result.data);
					for(var i = 0; i < result.data.length; i++) {
						if(result.data[i].parentId == 0) {
							$scope.permissionOneList.push({
								'id': result.data[i].id,
								'name': result.data[i].name
							});
						}

					}
				});
	}
	$scope.change = function() {
		$scope.permissionList1 = [];
		for(var i = 0; i < $scope.permissionList2.length; i++) {
			if($scope.permissionList2[i].parentId == $scope.permissionOneSearch) {
				$scope.permissionList1.push($scope.permissionList2[i]);
			}
		}
	};

	//弹窗
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/system/SysPermissionConfigurationFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'SysPermissionConfigurationFormModalController',
			scope: $scope,
			width: 960
		})
	};

	$scope.find();
}

function SysPermissionConfigurationFormModalController($scope, SysPermissionConfigurationService) {
	for(var i = 0; i < $scope.permissionList2.length; i++) {
		if($scope.permissionList2[i].id == $scope.dataId) {
			$scope.dataEntity = $scope.permissionList2[i];
		}
	}
	
	$scope.add_li=function(){
		$scope.dataEntity.functionUrl+=',';
	};
}

angular
	.module('managerApp')
	.controller('SysPermissionConfigurationController', SysPermissionConfigurationController)
	.controller('SysPermissionConfigurationFormModalController', SysPermissionConfigurationFormModalController)