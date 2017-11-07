/**
 * 系统用户controller定义
 */
function brandbatchController($scope, $q, brandbatchService, ngDialog, $rootScope) {

	$scope.brand = "";
	$scope.okModalDisabled = false;
	$scope.typeId="";

	//初始化搜索控件，一级分类
	$scope.Type = function() {
		brandbatchService.get().then(
			function(result) {
				$scope.TypeList = result.data;

			},
			function(result) {})
	};
	$scope.Type();


	$scope.okModal = function() {
		if ($scope.brand == '' || $scope.brand == undefined || $scope.brand == "null") {
			$rootScope.showAlert("保存品牌名不能为空");
			return 0;
		}
		$scope.okModalDisabled = true;
		brandbatchService
			.post($scope.brand,$scope.typeId)
			.then(
				function(result) {
					$scope.brand = "";
					$scope.okModalDisabled = false;
				},
				function(result) {
					$scope.okModalDisabled = false;
				}
			);

	};



}

angular
	.module('managerApp')
	.controller('brandbatchController', brandbatchController)
