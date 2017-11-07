function VersionController($scope, $q, $http, $rootScope, VersionService, constPageSize, ngDialog, goodsReminder) {
	$scope.platformList = [{
			"id": 1,
			"name": "安卓"
		},
		{
			"id": 2,
			"name": "IOS"
		},
		{
			"id": 3,
			"name": "WP"
		}
	];
	$scope.scopeList = [{
			"id": 2,
			"name": "车主"
		},
		{
			"id": 3,
			"name": "货主"
		},

	];
	$scope.updateTypeList = [{
			"id": 1,
			"name": "自由更新"
		},
		{
			"id": 2,
			"name": "强制更新"
		}
	];
	$scope.scopes = function(n) {
		switch(n) {
			case 2:
				return "车主";
				break;
			case 3:
				return "货主";
				break;
		}
	};
	$scope.updateType = function(j) {
		switch(j) {
			case 1:
				return '自由更新';
				break;
			case 2:
				return '强制更新';
				break;
		}
	}

	//app版本列表
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var versionName = $scope.versionName;
		var versionCode = $scope.versionCode;
		if(!$scope.platformobj) {
			var platformId = '';
		} else {
			var platformId = $scope.platformobj;
		}
		if(!$scope.scopeobj) {
			var scopeId = '';
		} else {
			var scopeId = $scope.scopeobj;
		}
		if(!$scope.updateTypeobj) {
			var updateTypeId = '';
		} else {
			var updateTypeId = $scope.updateTypeobj;
		}
		VersionService
			.find(versionName, versionCode, platformId, scopeId, updateTypeId, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.versionList = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result)
			})
		return defer.promise;
	}
	//弹出弹窗
	$scope.openModal = function(id) {
		$scope.versionId = id;
		$scope.dialog = ngDialog.open({
			template: 'views/version/VersionFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'VersionFormModelController',
			scope: $scope,
			width: 850
		})
	};
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
			VersionService
				.enable(id, status)
				.then(function(result) {
					$scope.loadData()
				}),
				function(reason) {}
		})
	}
	
	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
}

//弹窗操作
function VersionFormModelController($scope, VersionService) {
	//初始化操作
	$scope.innter = function() {
		if($scope.versionId) {
			VersionService
				.detail($scope.versionId)
				.then(function(result) {
					$scope.versionEntiy = result.data;
				}, function(result) {

				})
		} else {
			$scope.versionEntiy = {
				"status": 1
			}
		}
	}
	$scope.innter();

	//保存操作
	$scope.okModal = function() {
		if($scope.versionId) {
			VersionService
				.edit($scope.versionEntiy)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData();
				}, function(reason) {

				})
		} else {
			VersionService
				.add($scope.versionEntiy)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData();
				}, function(reason) {

				})
		}
	}
	//状态选择操作
	$scope.check = function(h) {
		$scope.versionEntiy.status= h;
	}
}
angular
	.module("managerApp")
	.controller("VersionController", VersionController)
	.controller("VersionFormModelController", VersionFormModelController)