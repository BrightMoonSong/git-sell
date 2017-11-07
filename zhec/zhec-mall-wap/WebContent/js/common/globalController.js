/**
 * 全局controller定义
 */

function globalController($rootScope, $scope, $timeout, ngDialog) {
	//成功提示，相当于alert
	$rootScope.showAlert = function(alertMessage) {
		var dialog = ngDialog.open({
			template: '<h3>提示信息</h3>' +
				'<p>' + alertMessage + '</p>' +
				'<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(1)">关闭</button></div>',
			plain: true,
			closeByDocument: true,
			closeByEscape: true
		});
		$timeout(function() {
			dialog.close();
		}, 1500);
	};

	//失败提示
	$rootScope.showFail = function(failMessage) {
		var dialog = ngDialog.open({
			template: '<h3>错误提示</h3>' +
				'<p>' + failMessage + '</p>' +
				'<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(1)">关闭</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false
		})
	};
	

	//confirm提示
	$rootScope.showConfirm = function(index) {
		var dialog = ngDialog.openConfirm({
				template: 'dialogWithNestedConfirmDialogId',
				className: 'ngdialog-theme-default',
				plain: true,
				scope: $scope
			})
			.then(function(value) {
			}, function(value) {
			});
		if(index == 0) {
			$rootScope.titleDialogMessage = "提示信息";
			$rootScope.rootDialogMessage = "保存失败";
		}
	};


};

app
	.controller('globalController', globalController)