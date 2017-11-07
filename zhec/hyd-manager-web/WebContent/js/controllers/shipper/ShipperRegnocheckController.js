function ShipperRegnocheckController($scope, $q, $http, $rootScope, ShipperRegnocheckService, constPageSize, ngDialog, goodsReminder) {
	$scope.WdatePicker = {}; //日期
	//注册未审核用户列表
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var phone = $scope.phone;
		$scope.startTime = $scope.WdatePicker.startTimes;
		ShipperRegnocheckService
			.find(phone, $scope.startTime, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.regList = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result)
			})
		return defer.promise;
	}
	//启禁用操作
	$scope.enableId = function(id, status) {
		var chainstouses;
		if(status == 1) {
			//0禁1启
			chainstouses = goodsReminder.goodsState.enable;
		} else if(status == 2) {
			chainstouses = goodsReminder.goodsState.forbidden;
		} else if(status == 3) {
			chainstouses = goodsReminder.goodsbranddelete;
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
			ShipperRegnocheckService
				.enable(id, status)
				.then(function(result) {
					$scope.loadData()
				}),
				function(reason) {}
		})
	}
}

angular
	.module("managerApp")
	.controller("ShipperRegnocheckController", ShipperRegnocheckController)