function HomeFloorController($scope, $q, $http, $rootScope, constPageSize, HomeFloorService, ngDialog, goodsReminder) {
	$scope.homeFloorId = "" //操作当前Id
	$scope.name = "" //楼层名称
	//搜索操作
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var names = $scope.name;
		HomeFloorService
			.find(names, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.homefloorList = result.data;
				defer.resolve(result)
			}, function(result) {
				defer.reject(data)
			})
		return defer.promise;
	}
	//启禁用操作
	$scope.enableById = function(id, status) {
		var chainstouses;
		if(status == 1) {
			//0禁1启
			chainstouses = goodsReminder.goodsState.enable;
		} else {
			chainstouses = goodsReminder.goodsState.forbidden;
		}
		ngDialog.openConfirm({
			template: '<p>' + chainstouses + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			HomeFloorService
				.enable(id, status)
				.then(function(result) {
					$scope.loadData(true)
				}),
				function(reason) {}
		})
	}
	//删除操作
	$scope.deleteById = function(id) {
		var chainstouses;
		chainstouses = goodsReminder.goodsbranddelete;
		ngDialog.openConfirm({
			template: '<p>' + chainstouses + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			HomeFloorService
				.delete(id)
				.then(function(result) {
					$scope.loadData(true)
				}),
				function(reason) {}
		})
	}
	//弹窗
	$scope.openModal = function(id, boller) {
		$scope.homeFloorId = id;
		$scope.datared = boller;
		$scope.dialog = ngDialog.open({
			template: 'views/homemanagement/homeFloorFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'homeFloorFormModelController',
			scope: $scope,
			width: 850
		})
	};
	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}

}

//弹窗controller操作
function homeFloorFormModelController($scope, HomeFloorService) {
	if($scope.homeFloorId) { //根据Id判断添加或修改，如果Id为空则为添加，反之为修改
		HomeFloorService
			.detail($scope.homeFloorId)
			.then(function(result) {
				$scope.homeform = result.data
			}, function(reson) {

			})
	} else {
		$scope.homeform = {
			"status": 1
		}
	}

	//保存弹窗
	$scope.okModal = function() {
		if($scope.homeFloorId) { //根据Id判断添加或修改，如果Id为空则为添加，反之为修改
			HomeFloorService
				.edit($scope.homeform)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData(true)
				}, function(reson) {

				})
		} else {
			HomeFloorService
				.add($scope.homeform)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData(true)
				}, function(reson) {

				})
		}
	}
}

angular
	.module("managerApp")
	.controller("HomeFloorController", HomeFloorController)
	.controller("homeFloorFormModelController", homeFloorFormModelController)