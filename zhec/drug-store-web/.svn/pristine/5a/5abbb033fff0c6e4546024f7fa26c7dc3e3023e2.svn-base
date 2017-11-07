function syscodeController($rootScope, $scope, $http, $q, constPageSize, syscodeService, ngDialog) {
	$scope.codeId = "";
	$scope.codeType = "";
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		syscodeService
			.find(currentPaseSize, currentPageNo, $scope.codeType, $scope.codeId)
			.then(
				function(result) {
					$scope.codeList = result.data;
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	};
	//获取分组  搜索栏的下拉菜单
	$scope.getTypes = function() {
		syscodeService
			.getTypes()
			.then(
				function(result) {
					$scope.alltypes = result.data;
				},
				function(result) {

				});
	}
	$scope.getTypes();
	//删除
	$scope.deleteId = function(id) {
		var reminder = "确定删除吗？"; //提示语

		ngDialog.openConfirm({
			template: '<p>' + reminder + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			syscodeService
				.delete(id)
				.then(
					function(result) {
						$scope.loadData();
					},
					function(result) {

					});
		}, function(reason) {

		});

	};
	/**
	 * 弹窗
	 */
	$scope.openModal = function(id) {
		$scope.dataId = id;
		$scope.dialog = ngDialog.open({
			template: 'views/system/syscodeModal.html',
			className: 'ngdialog-theme-default',
			controller: 'sysCodeModalController',
			scope: $scope,
			width: 1000
		})
	};
	//关闭弹窗
	$scope.closeModal = function() {
		$scope.dialog.close();
	}

}

function sysCodeModalController($rootScope, $scope, $http, $q, constPageSize, syscodeService, ngDialog) {
	$scope.initEntity = function() { //初始化方法
		if($scope.dataId) { //修改 获取数据
			syscodeService
				.getinfo($scope.dataId)
				.then(
					function(result) {
						$scope.codeObj = result.data;
					},
					function(result) {

					});
		} else { //添加  设置默认值
			$scope.codeObj = {
				'sort': 1, //排序号
				'status': 1 //启用
			};
		}
	}
	//保存
	$scope.okModal = function() {
		if($scope.okModalDisabled) {
			return false;
		}
		$scope.okModalDisabled = true;
		if($scope.dataId) { //修改
			syscodeService
				.update($scope.codeObj)
				.then(
					function(result) {
						if(result.code >= 0) {
							$scope.closeModal();
							$scope.loadData();
						}
						$scope.okModalDisabled = false;
					},
					function(result) {
						$scope.okModalDisabled = false;
					});
		} else { //添加
			syscodeService
				.insert($scope.codeObj)
				.then(
					function(result) {
						if(result.code >= 0) {
							$scope.closeModal();
							$scope.loadData();
						}
						$scope.okModalDisabled = false;
					},
					function(result) {
						$scope.okModalDisabled = false;
					});
		}
	}
	//初始化方法
	$scope.initEntity();
}

angular
	.module('managerApp')
	.controller('syscodeController', syscodeController)
	.controller('sysCodeModalController', sysCodeModalController)