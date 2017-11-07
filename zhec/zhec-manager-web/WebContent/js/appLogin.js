/**
 * Created by shy on 2016/11/30.
 */
var app = angular
    .module('myAppLogin', ['ngDialog']);
app.factory('loginService', function($q, $http) {
		return {
			find: function(userName, password) {
				var defer = $q.defer();
				var url = constMapiLocation + "/shiro/login?userName=" + userName + "&password=" + password;
				$http({
					method: 'post',
					url: url
				}).then(function(resp) {
					//响应成功时调用，resp是一个响应对象
					localStorage.removeItem("formToken");
					localStorage.setItem("formToken", resp.headers('formToken'));
					defer.resolve(resp.data);
				}, function(resp) {
					// 响应失败时调用，resp带有错误信息
					defer.resolve(resp.data);
				});
				return defer.promise;
			}
		}
	})
	.controller('loginController', loginController);

function loginController($scope, loginService, ngDialog) {
	$scope.userName = "";
	$scope.password = "";
	//回车调用login()
	$scope.myKeyup = function(e) {
		var keycode = window.event ? e.keyCode : e.which;
		if(keycode == 13) {
			$scope.login();
		}
	};
	//登陆事件
	$scope.login = function() {
		if($scope.userName == ""||$scope.userName == undefined||$scope.userName == null){
			$scope.showFail("请输入账户!");
			return 0;
		}
		if($scope.password == ""||$scope.password == undefined||$scope.password == null){
			$scope.showFail("请输入密码!");
			return 0;
		}
		loginService
			.find($scope.userName, $scope.password)
			.then(function(result) {
					/*102 密码错误
					101 账户不存在*/
					if(result.code == 102) {
						$scope.showFail("密码错误!");
						return 0;
					}
					if(result.code == 101) {
						$scope.showFail("账户不存在!");
						return 0;
					}
					//判断浏览器是否支持localStorage
					if(window.localStorage) {
						localStorage.removeItem("userToken");
						localStorage.removeItem("userId");
						localStorage.setItem("userToken", result.data.userToken);
						localStorage.setItem("userId", result.data.userId);
						localStorage.setItem("userName", result.data.userName);

						window.open("/index.html", "_self");
					} else {
						$scope.showFail("浏览器兼容性问题，请与系统管理员联系！");
					}
				},
				function(result) {
					$scope.showFail("该用户不存在");
				})
	}

	//失败提示
	$scope.showFail = function(failMessage) {
		var dialog = ngDialog.open({
			template: '<h3>错误提示</h3>' +
				'<p>' + failMessage + '</p>' +
				'<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(1)">关闭</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false
		})
	};
}