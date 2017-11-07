/**
 * Created by shy on 2016/11/30.
 */

app
    .controller('registerController', registerController)

function registerController($rootScope ,$scope, $q, $timeout, $interval, $stateParams,registerService, ngVerify, ngDialog) {
	$scope.titleManage = titleManage.register
    $scope.url=window.location.href;
    $scope.userPassword = "";
    $scope.userPhone = "";
    //获取顾问ID
    $scope.memberId = 0;
    if(/memberId=\d+/g.test($scope.url)){
        $scope.memberId=$stateParams.memberId;
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
    //清除数据
    $scope.clearInput = function(n) {
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
            case 4:
                $scope.confirmParssword = '';
                break;
            default:
                break;
        }
    }
    //成功提示，相当于alert
    $rootScope.showAlert = function(message) {
		var dialog = ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default',
			height:60,
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
        if(!(/^[1][3,4,5,7,8][0-9]{9}$/g.test($scope.userPhone))) {
            $rootScope.showAlert("手机号输入有误,请重新输入！");
            return;
        }
        
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

$scope.checkes=true;
$scope.clickBox = function () {
	$scope.checks=!$scope.checks;
	
}

    //注册
    $scope.registerMember = function () {
        var defer = $q.defer();
        $scope.saveMessage.mobile = $scope.userPhone;
        $scope.saveMessage.pwd1 = $scope.confirmParssword;
        $scope.saveMessage.pwd2 = $scope.userPassword;
        $scope.saveMessage.code = $scope.phoneCode;
        $scope.saveMessage.memberRecommendId = $scope.memberId;

        $scope.saveMessage.source = 1;
        if(!(/^[1][3,4,5,7,8][0-9]{9}$/g.test($scope.userPhone))) {
            $rootScope.showAlert("手机号输入有误,请重新输入！");
            return;
        }
        if(!(/^[0-9]{6,12}$/g.test($scope.userPassword))) {
            $rootScope.showAlert("密码至少六位！");
            return;
        }
        if($scope.userPassword!=$scope.confirmParssword){
            $rootScope.showAlert("两次密码输入不一致,请重新输入！");
            return;
        }
        
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
            		window.open("/index.html#/info/login","_self");
            	}
            })
    }
}
