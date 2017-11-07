/**
 * 系统用户controller定义
 */
function testController($scope, $q, $rootScope, testService, ngDialog) {


	$scope.modify = function(type) {
		testService
			.modify(type)
			.then(
				function(result) {
					$scope.cancelModal();

				}
			);
	};



	$scope.test = function() {
		var res = {

		};
		testService
			.test(res)
			.then(
				function(result) {
				}
			);
	};


	$scope.affair = function() {
		$scope.display = false;
		var res = {

		};
		testService
			.affair(res)
			.then(
				function(result) {
				}
			);
	};
	$scope.openModal1 = function() {
		$scope.find = function() {
			var defer = $q.defer();
			testService
				.find()
				.then(
					function(result) {
						$scope.find = result.data;
					}
				);
		};
		$scope.find();
		$scope.dialog = ngDialog.open({
			template: 'firstDialogId',
			className: 'ngdialog-theme-default',
			scope: $scope,
			width: 800

		})
	};

	$scope.openModal = function() {

		$scope.dialog = ngDialog.open({
			template: 'secDialogId',
			className: 'ngdialog-theme-default',
			scope: $scope,
			width: 400
		})
	};

	$scope.cancelModal = function() {
		$scope.dialog.close();
	};



}



angular
	.module('managerApp')
	.controller('testController', testController)
