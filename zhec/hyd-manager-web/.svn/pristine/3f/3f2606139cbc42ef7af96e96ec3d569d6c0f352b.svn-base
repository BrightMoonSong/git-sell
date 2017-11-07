function CarComMissionController($scope, CarComMissionService, ngDialog, goodsReminder) {
	//初始化
	$scope.inner = function() {
		CarComMissionService
			.detail()
			.then(function(result) {
				$scope.commissionEntiy = result.data;
				if(result.data) {
					$scope.resBoole = false;
				} else {
					$scope.resBoole = true;
				}
			}, function(result) {

			})
	}
	$scope.inner();
	//弹出菜单弹窗
	$scope.openModal = function(commissionId, databBoole) {
		$scope.commissionId = commissionId
		$scope.databBoole = databBoole;
		$scope.dialog = ngDialog.open({
			template: 'views/carmodel/CarComMissionFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'CarComMissionFormModelController',
			scope: $scope,
			width: 850
		})
	};
	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
}

//弹窗操作
function CarComMissionFormModelController($scope, CarComMissionService) {
	if(!$scope.commissionId) {
		$scope.commissionEntiy = {
			"unit": "元/单",
		}
	}
	//保存操作
	$scope.okModal = function() {
		if($scope.databBoole) {
			CarComMissionService
				.edit($scope.commissionEntiy)
				.then(function(result) {
					$scope.cancelModal();
					$scope.inner();
				})
		} else {
			CarComMissionService
				.add($scope.commissionEntiy)
				.then(function(result) {
					$scope.cancelModal();
					$scope.inner();
				})
		}
	}
}
angular
	.module("managerApp")
	.controller("CarComMissionController", CarComMissionController)
	.controller("CarComMissionFormModelController", CarComMissionFormModelController)