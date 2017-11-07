function HomeNewsController($scope, $q, $http, $rootScope, constPageSize, HomeNewsService, ngDialog, goodsReminder) {
	$scope.newId = "" //操作当前Id;
	$scope.title = "" //当前标题
	$scope.statusList = [{
			"id": 0,
			"name": "禁用"
		},
		{
			"id": 1,
			"name": "启用"
		}
	]

	//搜索操作
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer()
		var newsId = $scope.newId;
		var titles = $scope.title
		if($scope.statusObj == undefined || $scope.statusObj == null || $scope.statusObj == "" && $scope.statusObj != 0) {
			$scope.statusObj = ""
		}
		HomeNewsService
			.find(titles, $scope.statusObj, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.newsfloorList = result.data;
				defer.resolve(result)
			}, function(result) {
				defer.reject(result)
			})
		return defer.promise;

	}
	//弹窗
	$scope.openModal = function(id, boller) {
		$scope.newId = id;
		$scope.datared = boller;
		$scope.dialog = ngDialog.open({
			template: 'views/homemanagement/homeNewsFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'homeNewsFormModelController',
			scope: $scope,
			width: 1150
		})
	};
	//逻辑删除首页药到头条
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
			HomeNewsService
				.delete(id)
				.then(function(result) {
					$scope.loadData(true)
				}),
				function(reason) {}
		})
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
			HomeNewsService
				.enable(id, status)
				.then(function(result) {
					$scope.loadData(true)
				}),
				function(reason) {}
		})
	}

	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
}

//弹窗CONTRROER操作
function homeNewsFormModelController($scope, HomeNewsService) {
	if($scope.newId) { //判断id是否为空，如果不为空则为修改 反之为添加
		HomeNewsService
			.detail($scope.newId)
			.then(function(result) {
				$scope.newEntiy = result.data
			}, function(result) {

			})
	} else {
		$scope.newEntiy = {
			"status": 1
		}
	}
	//保存操作
	$scope.okModal = function() {
		if($scope.newId) { //判断id是否为空，如果不为空则为修改 反之为添加
			HomeNewsService
				.edit($scope.newEntiy)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData(true)
				}, function(reson) {

				})
		} else {
			HomeNewsService
				.add($scope.newEntiy)
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
	.controller("HomeNewsController", HomeNewsController)
	.controller("homeNewsFormModelController", homeNewsFormModelController)