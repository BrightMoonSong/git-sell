/**
 * Created by shy on 2016/11/30.
 */

app.factory('registerService', function ($q, $http, constBaseLocation, ngVerify) {
   baseUrl = constBaseLocation + '/memberregister';
    return {
        //判断手机是否已注册
        get: function (mobile) {
            var defer = $q.defer();
            var url = baseUrl + "/ifmobile/" + mobile;
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
            //var url = baseUrl + "/sendsmscode?mobile=" + mobile + "&type=" + type;
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
        post: function (registerMessage) {
            var defer = $q.defer();
            var url = baseUrl + "/addmember";
            $http({
                method: 'post',
                url: url,
                data:registerMessage
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data) {
                defer.reject(data)
            })
            return defer.promise;
        }
    }
})
.controller('registerController', registerController)

function registerController($rootScope ,$scope, $q, $timeout, $interval, registerService, ngVerify, ngDialog) {
	$scope.titleManage = titleManage.register
    $scope.url=window.location.href;
    $scope.userPassword = "";
    $scope.userPhone = "";
    //获取顾问ID
    $scope.memberId = 0
    if(/memberId=\d+/g.test($scope.url)){
        $scope.memberId=parseInt($scope.url.match(/memberId=\d+/g)[0].replace("memberId=",""));
    }
    
    // ngVerify.setError('#wrongMessage','123');
    $scope.userName = "";
    $scope.password = "";
    $scope.btnMessage = "获取验证码";
    $scope.userPhone = "";
    $scope.saveMessage = {};
    $scope.paraclass = true;
    $scope.ifSend = false;
    $scope.clickBox = true;
    $scope.checks=true;
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

    //获取验证码
    $scope.getPhoneCode = function(){
    	if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
    	registerService
            .get($scope.userPhone)
            .then(function (result) {
            	$scope.okModalDisabled = false;
                if(result == false){
                	$rootScope.showAlert("该手机号已被注册,请直接登录！")
                    $scope.ifSend = true;
                }else{
                	$scope.ifSend = false;
                	if($scope.paraclass == true){
                		$scope.reciveCode()
                	}
                	
                }
            })
        
    }
    $scope.reciveCode = function(){
    	
    	var defer = $q.defer();
        var mobile = $scope.userPhone;
        if($scope.paraclass == true){
        	registerService
            .put(mobile)
            .then(function (result) {
            	if(result.code == 0){
            		$scope.time = Number(60);
	            	 $interval(function(){ 
	            	 	
	        	        if($scope.time<=0){  
	        	          $scope.btnMessage = "重发验证码";  
	        	          $scope.paraclass = true;
	        	          $scope.time = 0;
	        	        }else{  
	        	          $scope.btnMessage = $scope.time + "秒";  
	        	          $scope.paraclass = false;
	        	          $scope.time--;
	        	        }  
	        	      },1000);
	            	}
            })
        }
    }
  //回车调用注册
//  $scope.myKeyup = function (e) {
//    var keycode = window.event ? e.keyCode : e.which;
//    if (keycode == 13) {
//  	  $scope.registerMember()
//    }
//  };
$scope.checks=true;
$scope.clickcheck = function () {
	if($scope.checks==true){
		$scope.checks=false;
	}else{
		$scope.checks=true;
	}
}
    //注册
    $scope.registerMember = function () {
        var defer = $q.defer();
        $scope.saveMessage.mobile = $scope.userPhone;
        $scope.saveMessage.pwd1 = $scope.confirmParssword;
        $scope.saveMessage.pwd2 = $scope.userPassword;
        $scope.saveMessage.code = $scope.phoneCode;
        $scope.saveMessage.memberRecommendId = $scope.memberId;
//      alert($scope.memberRecommendId)
        $scope.saveMessage.source = 1;
//      if($scope.consultantId == ""){
//      	$scope.saveMessage.consultantId = 0;
//      }else{
//      	$scope.saveMessage.consultantId = $scope.consultantId;
//      }
//      if($scope.clickBox == false){
//      	alert("请同意协议")
//      	return;
//      }
//		if($scope.checks==false){
//			alert("请同意众会注册协议");
//			return 0;
//		}
    registerService
            .post($scope.saveMessage)
            .then(function (result) {
            	if(result.code == "-1002"){
            		$rootScope.showAlert(zhecDisplayMessage.registerCodeNotCorrect)
            		$scope.phoneCodeChecked == zhecDisplayMessage.phoneCodeChecked1
            	}
            	else if(result.code == "-1003"){
            		$rootScope.showAlert(zhecDisplayMessage.registerCodefailure)
            		$scope.phoneCodeChecked == zhecDisplayMessage.phoneCodeChecked2
            	}
            	else if(result.code == "-3001"){
            		$rootScope.showAlert(zhecDisplayMessage.registerNoCode)
            	}
            	else if(result.code == "-3003"){
            		$rootScope.showAlert(zhecDisplayMessage.registerCodeWrong)
            	}
            	else if(result.code == 1){
            		$interval(function(){  
	        	        $rootScope.showAlert(zhecDisplayMessage.registerSuccess) 
	        	      },1500);
            		window.open(constMallLocation+"/login.html","_self")
            	}
            })
    }
}
