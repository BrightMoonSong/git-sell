/**
 * Created by shy on 2016/11/30.
 */
var app = angular.module('myAppLogin', ['ngDialog', 'ngVerify']);
app.factory('loginService', function($q, $http) {
		return {
			find: function(phone, password) {
				var defer = $q.defer();
				var url = constMapiLocation + "/shiro/login?phone=" + phone + "&password=" + password;
				$http({
					method: 'post',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//忘记密码
			forgetpwd: function(phone, smsCode, newPassword) {
				var defer = $q.defer();
				var url = constMapiLocation + "/shiro/forgetpwd?phone=" + phone + "&smsCode=" + smsCode + "&newPassword=" + newPassword;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//发送短信验证码
			send: function(phone, type) {
				var defer = $q.defer();
				var url = constMapiLocation + "/sms/send?phone=" + phone + "&type=" + type;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			}
		}
	})
	.controller('loginController', loginController)
	.controller('forgetPasswordModalController', forgetPasswordModalController);

function loginController($scope, loginService, ngDialog, $timeout) {
	$scope.userName = "";
	$scope.password = "";
	//回车调用login()
	$scope.myKeyup = function(e) {
		var keycode = window.event ? e.keyCode : e.which;
		if(keycode == 13) {
			$scope.login();
		}
	};
	//忘记密码找回
	$scope.forgetPassword = function() {
		//弹窗
		$scope.dialog = ngDialog.open({
			template: 'views/common/forgetPassword.html',
			className: 'ngdialog-theme-default margin-top100',
			controller: 'forgetPasswordModalController',
			scope: $scope,
			width: 650
		});
	}

	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};

	//登陆事件
	$scope.login = function() {
		if($scope.userName == "" || $scope.userName == undefined || $scope.userName == null) {
			$scope.showFail("请输入手机号!");
			return 0;
		} else {
			//if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test($scope.userName))) {
			if(!(/^[1][0-9]{10}$/.test($scope.userName))) { //1开头11位数
				$scope.showFail('输入手机号格式不正确！');
				return;
			}
		}
		if($scope.password == "" || $scope.password == undefined || $scope.password == null) {
			$scope.showFail("请输入密码!");
			return 0;
		} else {
			if($scope.password.length < 6) {
				$scope.showFail("密码不小于6位!");
				return 0;
			}
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
					if(result.code == -1) {
						$scope.showFail("系统错误!");
						return 0;
					}
					//判断浏览器是否支持localStorage
					if(window.localStorage) {
						localStorage.removeItem("userToken");
						localStorage.removeItem("userId");
						localStorage.setItem("userToken", result.data.userToken);
						localStorage.setItem("userId", result.data.userId);
						localStorage.setItem("userName", result.data.userName);
						localStorage.setItem("chainId", result.data.chainId);
						localStorage.setItem("drugstoreId", result.data.drugstoreId);
						localStorage.setItem("realName", result.data.realName);

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
	//成功提示，相当于alert
	$scope.showAlert = function(alertMessage) {
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
	}

	//监听键盘
//	function keyUp(e) {
//		var currKey = 0,
//			e = e || event;
//		currKey = e.keyCode || e.which || e.charCode;
//		var keyName = String.fromCharCode(currKey);
//		//console.log("按键码: " + currKey + " 字符: " + keyName);
//		$scope.loginCurrKey = currKey;
//		$scope.$apply();
//	}
//	document.onkeyup = keyUp;
//	$scope.$watch('loginCurrKey', function(newVal, oldVal) {
//		if(newVal === 39 && oldVal === 192) {
//			$scope.userName = '17301088769';
//			$scope.password = '123456';
//			$scope.login();
//		}
//	});
}

function forgetPasswordModalController($scope, loginService, $interval) {
	$scope.btnMessage = "发送验证码";
	$scope.reciveCodeDis = false; //发送验证码的按钮 disabled
	//发送验证码
	$scope.reciveCode = function() {
		$scope.reciveCodeDis = true;
		if($scope.reciveCodDisabled) {
			return false;
		}
		$scope.reciveCodDisabled = true;
		if($scope.btnMessage != "重发验证码" && $scope.btnMessage != "发送验证码") {
			$scope.reciveCodDisabled = false;
			$scope.reciveCodeDis = false;
			return false;
		}
		if(!$scope.phone) {
			$scope.showFail("请输入手机号!");
			$scope.reciveCodDisabled = false;
			$scope.reciveCodeDis = false;
			return false;
		} else {
			if(!(/^[1][0-9]{10}$/.test($scope.phone))) { //1开头11位数
				$scope.showFail('输入手机号格式不正确！');
				$scope.reciveCodDisabled = false;
				$scope.reciveCodeDis = false;
				return;
			}
		}

		loginService
			.send($scope.phone, 2)
			.then(function(result) {
				$scope.reciveCodDisabled = false;
				if(result.data) {
					$scope.time = Number(result.data);
				} else {
					$scope.time = Number(59);
				}
				//取消$interval服务
				$scope.$on('$destroy', function() {
					$interval.cancel(timer);
				})
				var timer = $interval(function() {
					if($scope.time <= 0) {
						$scope.btnMessage = "重发验证码";
						$scope.reciveCodeDis = false;
					} else {
						$scope.btnMessage = $scope.time + "秒";
						$scope.time--;
						$scope.reciveCodeDis = true;
					}
				}, 1000, $scope.time + 1); //最后一个实参60就是限制次数。
			}, function(result) {
				$scope.reciveCodeDis = false;
				$scope.reciveCodDisabled = false;
			})
	}
	//保存
	$scope.okmodal = function() {
		if($scope.okmodalDisabled) {
			return false;
		}
		$scope.okmodalDisabled = true;
		if($scope.phone == "" || $scope.phone == undefined || $scope.phone == null) {
			$scope.showFail("请输入手机号!");
			$scope.okmodalDisabled = false;
			return 0;
		} else {
			if(!(/^[1][0-9]{10}$/.test($scope.phone))) { //1开头11位数
				$scope.showFail('输入手机号格式不正确！');
				$scope.okmodalDisabled = false;
				return;
			}
		}
		if(!$scope.newPwdFirst) {
			$scope.showFail("请输入密码!");
			$scope.okmodalDisabled = false;
			return 0;
		} else {
			if($scope.newPwdFirst.length < 6) {
				$scope.showFail("密码不小于6位!");
				$scope.okmodalDisabled = false;
				return 0;
			}
		}
		if(!$scope.newPwd) {
			$scope.showFail("请再次输入密码!");
			$scope.okmodalDisabled = false;
			return 0;
		} else {
			if($scope.newPwd.length < 6) {
				$scope.showFail("密码不小于6位!");
				$scope.okmodalDisabled = false;
				return 0;
			}
		}
		if($scope.newPwd != $scope.newPwdFirst) {
			$scope.showFail("两次密码输入不一致!");
			$scope.okmodalDisabled = false;
			return 0;
		}
		if($scope.btnMessage == "发送验证码") {
			$scope.showFail("请发送验证码!");
			$scope.okmodalDisabled = false;
			return 0;
		}
		if(!$scope.smsCode) {
			$scope.showFail("请填写验证码!");
			$scope.okmodalDisabled = false;
			return 0;
		}

		loginService
			.forgetpwd($scope.phone, $scope.smsCode, $scope.newPwd)
			.then(function(result) {
				$scope.okmodalDisabled = false;
				if(result.code >= 0) {
					$scope.showAlert("提交成功!");
					$scope.cancelModal();
				} else {
					$scope.showFail("出错了，请重试!");
				}
			}, function(result) {
				$scope.okmodalDisabled = false;
				$scope.showFail("服务器忙，请稍后重试!");
			})
	}
}