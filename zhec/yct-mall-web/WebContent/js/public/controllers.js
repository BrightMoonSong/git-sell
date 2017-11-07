/**
 * 全局controller定义
 */

function MainCtrl($rootScope, $scope, $timeout, ngDialog,constManagerLocation) {

	//显示加载中提示框
	$rootScope.showLoading = function() {
			$rootScope.rootPromptLoaddingClass = "toastLoadding fadeInTop";
		}
		//隐藏加载中提示框
	$rootScope.hideLoading = function() {
		$rootScope.rootPromptLoaddingClass = "toastLoadding fadeOutTop";
	}

	//成功提示,2秒自动关闭
	$rootScope.showPrompt = function(promptMessage) {
		var dialog = ngDialog.open({
			template: '<h3>提示信息</h3>' +
				'<p>' + promptMessage + '</p>',
			plain: true,
			closeByDocument: true,
			closeByEscape: true
		});
		$timeout(function() {
			dialog.close();
		}, 2000);
	};

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
	//totalSize为空时
	$rootScope.showEmpty = function() {
		var dialog = ngDialog.open({
			template: '<h3>提示信息</h3>' +
				'<p> 数据为空,请重新选择</p>',
			plain: true,
			closeByDocument: true,
			closeByEscape: true
		});
		$timeout(function() {
			dialog.close();
			//滚动条回到顶部
			myScroll();
		}, 2000);
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

	//判断是否登录
	$rootScope.checkLogin = function() {
		var userToken = localStorage.userToken;
		if(userToken == null || userToken == "" || undefined == userToken) {
			$rootScope.gotoLogin();
		}
	}

	//跳转到首页面
	$rootScope.gotoIndex = function() {
		$timeout(function() {
			window.open(constManagerLocation + "/index.html", "_self");
		}, 1000)
	}

	//跳转到登录页面
	$rootScope.gotoLogin = function() {
		$timeout(function() {
			console.log(constManagerLocation + "/login.html");
	//		window.open(constManagerLocation + "/login.html", "_self");
		}, 1000)
	}


	this.userName = localStorage.userName;
	this.helloText = '欢迎来到御草堂管理系统！';
	this.descriptionText = '';

};

app.controller('MainCtrl', MainCtrl)