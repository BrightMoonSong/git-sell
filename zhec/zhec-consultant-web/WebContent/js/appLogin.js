/**
 * Created by shy on 2016/11/30.
 */
var appLogin = angular
    .module('myAppLogin', ['ngDialog','ngVerify'])
    .controller('loginController', loginController)
	.controller('registerController', registerController)
	.controller('findPasswordController', findPasswordController);
	
appLogin.factory('loginService', function ($q, $http) {
    baseUrl1 = constCapiLocation + '/consultantlogin';
    return {
        post: function (mobile,password) {
            var defer = $q.defer();
            var url = baseUrl1 + "/consultantlogin?mobile=" + mobile + "&password=" + password;
            $http({
				method: 'post',
				url: url
			}).then(function(resp) {
				//响应成功时调用，resp是一个响应对象
				localStorage.removeItem("formTokenCapi");
				localStorage.setItem("formTokenCapi", resp.headers('formToken'));
				
				defer.resolve(resp.data);
			}, function(resp) {
				// 响应失败时调用，resp带有错误信息
				defer.resolve(resp.data);
			});
            return defer.promise;
        }
    }
})


function loginController($scope,$q, loginService,ngDialog) {
    $scope.inputUserPhone = "";
    $scope.inputUserPassword = "";
    $scope.userLogin = function () {
    	if($scope.inputUserPhone==""){
    		$scope.showFail("请输入账号！");
    		return;
    	}
    	if($scope.inputUserPassword==""){
    		$scope.showFail("请输入密码！");
    		return;
    	}
        var defer = $q.defer();
        loginService
            .post($scope.inputUserPhone, $scope.inputUserPassword)
            .then(function (result) {
                if(result.code == 0){
                	$scope.dataEntityfun = result.data.userToken;
	                
	                if(result.data.name != null && result.data.name != ""){
	                	localStorage.setItem("userName", result.data.name);
	                }
	                
	                localStorage.setItem("id", result.data.id);
	                if (window.localStorage) {
	                    localStorage.setItem("dataLogin", result.data.userToken);
	                } else {
	                    Cookie.write("dataLogin", result.data.userToken);
	                }
	                window.open("index.html", "_self");
                }else{
                	$scope.showFail("用户名或密码错误！");
//              	$scope.inputUserPhone = "";
                	$scope.inputUserPassword = "";
                }
                
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
appLogin.factory('registerService', function ($q, $http) {
    baseUrl = constCapiLocation + '/consultantregister';
    return {
    	//验证手机号是否注册过
    	ifmobile: function (mobile) {
            var defer = $q.defer();
            var url = baseUrl + "/ifmobile?mobile=" + mobile;
            $http({
                method: 'get',
                url: url
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data) {
                defer.reject(data)
            })
            return defer.promise;
        },
        //获取验证码
        put: function (mobile) {
            var defer = $q.defer();
            var url = baseUrl + "/sendsmscode?mobile=" + mobile;
            $http({
                method: 'post',
                url: url
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data) {
                defer.reject(data)
            })
            return defer.promise;
        },

        post: function (mobile,password,code) {
            var defer = $q.defer();
            var url = baseUrl + "/addconsultant?mobile="+mobile+"&password="+password+"&code="+code;
            $http({
                method: 'POST',
                url: url,
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data) {
                defer.reject(data)
            })
            return defer.promise;
        },
        //找回密码
        edit:function (mobile,password,smsCode) {
            var defer = $q.defer();
            var url = constCapiLocation + "/consultantlogin/consultanteditpassword?mobile=" + mobile +'&password=' + password + '&code=' + smsCode;
            $http({
                method: 'put',
                url: url
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data) {
                defer.reject(data)
            })
            return defer.promise;
        }
    }
})


function registerController($scope, $q,$interval,$timeout, registerService, ngDialog) {
    $scope.userName = "";
    $scope.password = "";
    $scope.btnMessage = "获取验证码";
    $scope.userPhone = "";
    $scope.saveMessage = {};
    $scope.paraclass = true;
    $scope.ifSend = false;
	//验证手机号是否被注册过
	$scope.ifmobile = function(){
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		var defer = $q.defer();
        registerService
            .ifmobile($scope.userPhone)
            .then(function (result) {
            	$scope.okModalDisabled = false;
            	if(result == false){
                	$scope.showAlert("该手机号已被注册,请直接登录！")
                    $scope.ifSend = true;
                }else{
                	$scope.ifSend = false;
                	if($scope.paraclass == true){
                		$scope.reciveCode()
                	}
                }
            })
	}
	//成功提示，相当于alert
	$scope.showAlert = function(alertMessage) {
		var dialog = ngDialog.open({
			template: '<h3></h3>' +
				'<p>' + alertMessage + '</p>' +
				'<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(1)">关闭</button></div>',
			plain: true,
			closeByDocument: true,
			closeByEscape: true
		});
	};
    $scope.reciveCode = function(){
    	var defer = $q.defer();
        var mobile = $scope.userPhone;
        if($scope.paraclass == true){
        	registerService
            .put(mobile)
            .then(function (result) {
            	if(result.code == 1){
            		$scope.time = Number(60);
	            	 $interval(function(){  
	        	        if($scope.time<=0){  
	        	          $scope.btnMessage = "重发验证码";  
	        	          $scope.paraclass = true;
	        	          $scope.time = 0;
	        	        }else{  
	        	          $scope.btnMessage = $scope.time + "秒后可重发";  
	        	          $scope.paraclass = false;
	        	          $scope.time--;
	        	        }  
	        	      },1000);
	            	}
            	else if(result.code == -1001){
            		$scope.showAlert("手机号格式不正确，请重新输入！");
            		$scope.userPhone = "";
            	}else if(result.code == -700){
            		$scope.showAlert("验证码获取异常，请重新获取！");
            	}
            })
        }
    }
    $scope.registerConsultant = function () {
        var defer = $q.defer();
        registerService
            .post($scope.userPhone,$scope.userPassword,$scope.phoneCode)
            .then(function (result) {
            	if(result.code == 1){
            		$scope.showAlert("恭喜您注册成功！");
            		localStorage.setItem("userName", "普通顾问");
//						ngDialog.open({
//							template: 'modalDialogId',
//				            className: 'ngdialog-theme-default',
//				            width: 300,
//				            scope:$scope
//				        })
						$timeout(function() {
				            ngDialog.close();
				            window.open(constConsultantLocation+"/login.html","_self")
				        }, 1500);
            	}else if(result.code == -1002){
            		$scope.showAlert("没发送验证码或验证码已过期，请重新获取验证码！");
            	}else if(result.code == -1003){
            		$scope.showAlert("验证码不正确，请重新输入验证码！");
            		$scope.phoneCode = "";
            	}
            	
            })
    }
    //重置
    $scope.emptyData = function(){
    	$scope.userPhone = "";
    	$scope.userPassword = "";
    	$scope.phoneCode = "";
    	$scope.paraclass = true;
    	$scope.userRepeatPassword = "";
    }
}
function findPasswordController( $scope, $interval, $q, registerService,ngDialog) {
    $scope.paraclass = true;
    $scope.ifSend = false;
    $scope.btnMessage = "获取验证码";
	//验证手机号是否被注册过
	$scope.ifmobile = function(){
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		var defer = $q.defer();
        registerService
            .ifmobile($scope.userMobile)
            .then(function (result) {
            	$scope.okModalDisabled = false;
            	if(result == true){
                	$scope.showAlert("该手机号未注册,请先注册！")
                    $scope.ifSend = true;	
                }else{
                	$scope.ifSend = false;
                	if($scope.paraclass == true){
                		$scope.reciveCode()
                	}
                }
            })
	}
    $scope.showAlert = function(alertMessage) {
		var dialog = ngDialog.open({
			template: '<h3></h3>' +
				'<p>' + alertMessage + '</p>' +
				'<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(1)">关闭</button></div>',
			plain: true,
			closeByDocument: true,
			closeByEscape: true
		});
	};
    $scope.reciveCode = function(){
    	var defer = $q.defer();
        var mobile = $scope.userMobile;
        if($scope.paraclass == true){
        	registerService
            .put(mobile)
            .then(function (result) {
            	if(result.code == 1){
            		$scope.time = Number(60);
	            	 $interval(function(){  
	        	        if($scope.time<=0){  
	        	          $scope.btnMessage = "重发验证码";  
	        	          $scope.paraclass = true;
	        	          $scope.time = 0;
	        	        }else{  
	        	          $scope.btnMessage = $scope.time + "秒后可重发";  
	        	          $scope.paraclass = false;
	        	          $scope.time--;
	        	        }  
	        	      },1000);
	            	}
            	else if(result.code == -1001){
            		$scope.showAlert("手机号格式不正确，请重新输入！");
            		$scope.userMobile = "";
            	}else if(result.code == -700){
            		$scope.showAlert("验证码获取异常，请重新获取！");
            	}
            })
        }
    }
    //找回密码
    $scope.editNewPassword = function(){
        var defer = $q.defer();
        registerService
            .edit($scope.userMobile, $scope.newPassword, $scope.newCode)
            .then(function (result) {
                if(result.code == 2){
                	$scope.showAlert("修改成功！");
                	$interval(function(){  
	        	        window.open(constConsultantLocation+"/login.html","_self")
	        	    },1000);
                }
                else if(result.code == -1002){
            		$scope.showAlert("没发送验证码或验证码已过期，请重新获取验证码！");
            	}else if(result.code == -1003){
            		$scope.showAlert("验证码不正确，请重新输入验证码！");
            		$scope.phoneCode = "";
            	}else if(result.code == -1001){
                	$scope.showAlert("手机号格式不正确，请重新输入！");
            		$scope.userMobile = "";
                }
                
            })
    }
}
