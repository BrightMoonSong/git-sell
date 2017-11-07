/**
 * Created by shy on 2016/12/14.
 */
app.factory('ForgetPwdService', function($q, $http, constBaseLocation) {
		return {
			//判断手机是否已注册
			get: function(mobile) {
				var defer = $q.defer();
				var url = constBaseLocation + "/memberregister/ifmobile/" + mobile;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//获取验证码
			put: function(mobile, type) {
				var defer = $q.defer();
				var url = constBaseLocation + "/memberregister/sendsmscode?mobile=" + mobile;
				$http({
					method: 'post',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			forgetput: function(res) {
				var defer = $q.defer();
				var url = constBaseLocation + "/memberlogin/updatepwd";
				$http({
					method: 'put',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			}
		}
	})
	.controller('ForgetPwdController', ForgetPwdController);

function ForgetPwdController($rootScope,$scope,$timeout, ForgetPwdService, $interval, ngVerify, ngDialog) {
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
			height:174,
			controller: ['$scope', function($scope) {
				$scope.promptMessage = message;
			}],
		});

		$timeout(function() {
			dialog.close();
		}, 1500);
	}

	$scope.getPhoneCode = function() {
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
	//获取验证码
	$scope.reciveCode = function() {
			ForgetPwdService
				.put($scope.userPhone)
				.then(function(result) {
					$scope.time = Number(60);
					var p = 0;
					$interval(function() {
						if($scope.time <= 0) {
							$scope.btnMessage = "重发验证码";
							$scope.paraclass = true;
						} else {
							$scope.btnMessage = $scope.time + "秒";
							$scope.paraclass = false;
							$scope.time--;
						}
					}, 1000, 61);
				})
		}
		//事件
	$scope.forgetPwdBtn = function() {
		var res = {
			'mobile': $scope.userPhone,
			'password': $scope.userPassword,
			'code': $scope.phoneCode
		};
		ForgetPwdService
			.forgetput(res)
			.then(function(result) {
				if(result.code == 0) {
					$rootScope.showAlert(zhecDisplayMessage.changeSuccess);
					$interval(function() {
						window.open('/login.html#/login', '_self');
					}, 1500);
				}else if(result.code == "-1002"){
            		$rootScope.showAlert(zhecDisplayMessage.registerCodeNotCorrect)
//          		$scope.phoneCodeChecked == zhecDisplayMessage.phoneCodeChecked1
            	}
            	else if(result.code == "-1003"){
            		$rootScope.showAlert(zhecDisplayMessage.registerCodefailure)
//          		$scope.phoneCodeChecked == zhecDisplayMessage.phoneCodeChecked2
            	}
            	else if(result.code == "-3001"){
            		$rootScope.showAlert(zhecDisplayMessage.registerNoCode)
            	}
            	else if(result.code == "-3003"){
            		$rootScope.showAlert(zhecDisplayMessage.registerCodeWrong)
            	}
			})
	}

}