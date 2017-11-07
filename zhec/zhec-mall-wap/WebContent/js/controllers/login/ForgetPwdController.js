/**
 * 忘记密码 controller定义
 */
function ForgetPwdController($rootScope, $scope, $timeout, $interval, ForgetPwdService, ngDialog) {
	$scope.phoneCode = "";
	$scope.userPassword = "";
	$scope.userPhone = "";
	$scope.btnMessage = "发送验证码";
	$scope.paraclass = true;

	//成功提示，相当于alert
	$rootScope.showAlert = function(message) {
		var dialog = ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default',
			height: 174,
			controller: ['$scope', function($scope) {
				$scope.promptMessage = message;
			}],
		});

		$timeout(function() {
			dialog.close();
		}, 1500);
	}

	/**
	 * 清空输入框
	 * @param {Object} n
	 */
	$scope.empty = function(n) {
		switch(n) {
			case 1:
				$scope.userPhone = '';
				break;
			case 2:
				$scope.phoneCode = '';
				break;
			case 3:
				$scope.userPassword = '';
				break;
			default:
				$scope.confirmParssword = '';
				break;
		}
	}
	//获取手机验证码
	$scope.getPhoneCode = function() {
		if($scope.btnMessage != "重发验证码" && $scope.btnMessage != "发送验证码") {
			return false;
		}
		if($scope.userPhone == "") {
			$rootScope.showAlert(zhecDisplayMessage.enterYourPhoneNumber);
			return;
		}
		if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test($scope.userPhone))) {
			$rootScope.showAlert(zhecDisplayMessage.phoneNumberFormatNotCorrect);
			return;
		}
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		ForgetPwdService
			.get($scope.userPhone)
			.then(function(result) {
				$scope.okModalDisabled = false;
				if(result == true) {
					$rootScope.showAlert(zhecDisplayMessage.pleaseRegisterFirst);
					//                  $scope.ifSend = true;
				} else {
					//              	$scope.ifSend = false;
					if($scope.paraclass == true) {
						$scope.reciveCode()
					}
				}
			})
	};
	$scope.intervalCode = function() {
		if($scope.time <= 0) {
			$scope.btnMessage = "重发验证码";
			$scope.paraclass = true;
			//清除定时器         可以不用
			$scope.$on('$destroy', function() {
				$interval.cancel($scope.timeInterCode);
			});
		} else {
			$scope.btnMessage = $scope.time + "秒";
			$scope.paraclass = false;
			$scope.time--;
		}
	}
	//获取验证码
	$scope.reciveCode = function() {
		if($scope.userPhone == "" || $scope.userPhone == null || $scope.userPhone == undefined) {
			$rootScope.showAlert(zhecDisplayMessage.enterYourPhoneNumber); //请输入手机号
			return false;
		} else { //格式验证  /^[1][3,4,5,7,8][0-9]{9}$/
			var re = /^[1][3,4,5,7,8][0-9]{9}$/;
			if(re.test($scope.userPhone)) {
				//	alert("正确");
			} else {
				//	alert("错误");
				$rootScope.showAlert(zhecDisplayMessage.phoneNumberFormatNotCorrect); //输入手机号格式不正确
				return false;
			}
		}
		//防止请求后台时  没有返回时就点击第二次  防止重复提交的
		if($scope.submitDisabledReciveCode == true) {
			return false;
		}
		$scope.submitDisabledReciveCode = true;

		ForgetPwdService
			.put($scope.userPhone)
			.then(function(result) {
					$scope.submitDisabledReciveCode = false;
					$scope.time = Number(60);
					$scope.timeInterCode = $interval($scope.intervalCode, 1000, 61);
				},
				function() {
					$scope.submitDisabledReciveCode = false;
				});
	}
	//事件  保存
	$scope.forgetPwdBtn = function() {
		if($scope.userPhone == "" || $scope.userPhone == null || $scope.userPhone == undefined) {
			$rootScope.showAlert(zhecDisplayMessage.enterYourPhoneNumber); //请输入手机号
			return false;
		} else { //格式验证
			//var re = /^1\d{10}$/;
			var re = /^[1][3,4,5,7,8][0-9]{9}$/;
			if(re.test($scope.userPhone)) {
				//	alert("正确");
			} else {
				//	alert("错误");
				$rootScope.showAlert(zhecDisplayMessage.phoneNumberFormatNotCorrect); //输入手机号格式不正确
				return false;
			}
		}
		if($scope.phoneCode == "" || $scope.phoneCode == null || $scope.phoneCode == undefined) {
			$rootScope.showAlert(zhecDisplayMessage.codeNotBeEmpty); //验证码不得为空
			return false;
		}
		if($scope.userPassword == "" || $scope.userPassword == null || $scope.userPassword == undefined) {
			$rootScope.showAlert(zhecDisplayMessage.userPassword); //请输入密码
			return false;
		}
		if($scope.confirmParssword == "" || $scope.confirmParssword == null || $scope.confirmParssword == undefined) {
			$rootScope.showAlert(zhecDisplayMessage.confirmParssword); //请再次输入密码
			return false;
		}
		if($scope.confirmParssword != $scope.userPassword) {
			$rootScope.showAlert(zhecDisplayMessage.parsswordDiffer); //两次输入密码不一致
			return false;
		}
		//防止请求后台时  没有返回时就点击第二次  防止重复提交的
		if($scope.submitDisabled == true) {
			return false;
		}
		$scope.submitDisabled = true;
		var res = {
			'mobile': $scope.userPhone,
			'password': $scope.userPassword,
			'code': $scope.phoneCode
		};
		ForgetPwdService
			.forgetput(res)
			.then(function(result) {
					$scope.submitDisabled = false;
					if(result.code == 0) {
						$rootScope.showAlert(zhecDisplayMessage.changeSuccess);
						$timeout(function() {
							window.open('/index.html#/info/login', '_self');
						}, 1500);
					} else if(result.code == "-1002") {
						$rootScope.showAlert(zhecDisplayMessage.registerCodeNotCorrect);
					} else if(result.code == "-1003") {
						$rootScope.showAlert(zhecDisplayMessage.registerCodefailure);
					} else if(result.code == "-3001") {
						$rootScope.showAlert(zhecDisplayMessage.registerNoCode);
					} else if(result.code == "-3003") {
						$rootScope.showAlert(zhecDisplayMessage.registerCodeWrong);
					}
				},
				function() {
					$scope.submitDisabled = false;
				});
	}

}

app.controller('ForgetPwdController', ForgetPwdController);