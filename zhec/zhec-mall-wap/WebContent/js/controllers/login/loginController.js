/**
 * 登录 controller定义
 */
function loginController($scope, loginService, ngDialog, $timeout) {
	$scope.userName = ""; //输入的用户名
	$scope.password = ""; //输入的密码
	$scope.captcha = ""; //输入的验证码
	$scope.chk = true; //设置checkbox默认不选中
	$scope.userNameError = false; //用户名错误时true
	$scope.pwdyzmError = false; //验证码 密码错误时true
	$scope.pwdError = false; //密码错误时true
	$scope.yzmError = false; //验证码错误时true

	$scope.phonePrompt = '请输入手机号';
	$scope.passwordPrompt = '请输入密码';
	$scope.captchaPrompt = '请输入验证码';

	//成功提示，相当于alert
	$scope.showAlert = function(message) {
		var dialog = ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default',
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
				$scope.userName = '';
				break;
			case 2:
				$scope.password = '';
				break;
			case 3:
				$scope.captcha = '';
				break;
			default:
				break;
		}
	}

	//回车调用login()
	$scope.myKeyup = function(e) {
		var keycode = window.event ? e.keyCode : e.which;
		if(keycode == 13) {
			$scope.login();
		}
	};
	$scope.sessionKey = "";
	$scope.yzmcli = function() {
		loginService
			.getcaptcha()
			.then(function(result) {
					document.getElementById("conter_con_ul_input_li").innerHTML = result.imageSvg;
					$scope.sessionKey = result.sessionKey;
				},
				function(result) {
					//window.open("error.html", "_self");
				})

	};
	$scope.yzmcli();

	//登陆事件
	$scope.login = function() {
		var res = {
			"loginId": $scope.userName,
			"password": $scope.password,
			"captcha": $scope.captcha,
			"sessionKey": $scope.sessionKey
		};
		if(res.loginId == undefined || res.loginId == null || res.loginId == "") {
			$scope.showAlert(zhecDisplayMessage.loginIdNull);
			return 0;
		}
		if(res.password == undefined || res.password == null || res.password == "") {
			$scope.showAlert(zhecDisplayMessage.passwordNull);
			return 0;
		}
		if(res.captcha == undefined || res.captcha == null || res.captcha == "") {
			$scope.showAlert(zhecDisplayMessage.captchaNull);
			return 0;
		}
		loginService
			.login(res)
			.then(function(result) {
					if(result.code == 0) {
						$scope.phonePrompt = '请输入手机号';
						$scope.passwordPrompt = '请输入密码';
						$scope.captchaPrompt = '请输入验证码';
						$scope.getLoginMessage = getCookie("cartManager");
						//存cookie
						var loginId = result.data.loginId;
						var memberId = result.data.memberId;
						var memberToken = result.data.memberToken;
						var loginManager1 = {
							'loginId': loginId,
							'id': memberId,
							'userToken': memberToken,
							'name': result.data.name
						}
						loginManager1 = JSON.stringify(loginManager1)
						setCookie("loginManager", "" + loginManager1, "1")
						addMultipleGoodsToCart()
						$scope.prePage = getCookie("prePage");
						if($scope.prePage != "" && $scope.prePage != null && $scope.prePage != undefined) {
							window.open($scope.prePage, "_self");
						} else {
							window.open("index.html#/main/index", "_self");
						}
						delCookie("prePage");
						/**
						 * -2001  验证码不正确
						 * -2002  帐户名不存在
						 * -2003  密码不正确
						 * -2 是验证码 用户名 密码 sessionKey 之中有空的
						 * //-1异常；
						 */
					} else if(result.code == -2002) { //用户名错误   用户名不存在；
						$scope.phonePrompt = '用户名不存在';
						$scope.passwordPrompt = '请输入密码';
						$scope.captchaPrompt = '请输入验证码';
						$scope.userNameError = true;
						$scope.pwdyzmError = false; //验证码 密码错误时true
						$scope.pwdError = false; //密码错误时true
						$scope.yzmError = false; //验证码错误时true
						$scope.captcha = '';
						$scope.yzmcli();
					} else if(result.code == -2003) { //密码错误
						$scope.phonePrompt = '请输入手机号';
						$scope.passwordPrompt = '密码不正确';
						$scope.captchaPrompt = '请输入验证码';
						$scope.pwdyzmError = true;
						$scope.pwdError = true;
						$scope.userNameError = false; //用户名错误时true
						$scope.yzmError = false; //验证码错误时true
						$scope.password = '';
						$scope.captcha = '';
						$scope.yzmcli();
					} else if(result.code == -2001) { // 验证码不正确
						$scope.phonePrompt = '请输入手机号';
						$scope.passwordPrompt = '请输入密码';
						$scope.captchaPrompt = '验证码不正确';
						$scope.pwdyzmError = true;
						$scope.yzmError = true;
						$scope.userNameError = false; //用户名错误时true
						$scope.pwdError = false; //密码错误时true
						$scope.captcha = '';
						$scope.yzmcli();
					} else if(result.code == -2) {} else if(result.code == -2004) { //-2004该用户处于非正常状态
						$scope.showAlert(zhecDisplayMessage.accountHasBeenDisabled);
					} else if(result.code == -1006) {
						$scope.showAlert(zhecDisplayMessage.passwordLength);
					} else {
						$scope.showAlert(zhecDisplayMessage.serverBusy);
					}
				},
				function(result) {
					window.open("error.html", "_self");
				})
	}
}

app.controller('loginController', loginController);

