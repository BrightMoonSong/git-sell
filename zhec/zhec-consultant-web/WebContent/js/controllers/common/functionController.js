function functionController($scope, $q, functionService, constConsultantLocation,ngDialog) {
	
    /**
     * 搜索
     */
    $scope.find = function () {
        var defer = $q.defer();
        var userToken = localStorage.dataLogin;
        if (userToken == null || userToken == "") {
            window.open(constConsultantLocation + "login.html", "_self");
        }
        functionService
            .find(userToken)
            .then(function (result) {
                $scope.dataEntityfun = result.data;
                var personalCenter = [];
                var recommend = [];
                var promotion = [];
                var financial = [];
                for (var i = 0; i < $scope.dataEntityfun.length; i++) {
                    if ($scope.dataEntityfun[i].parentId == 21) {
                        personalCenter.push($scope.dataEntityfun[i]);
                    }
                    else if ($scope.dataEntityfun[i].parentId == 22) {
                        recommend.push($scope.dataEntityfun[i]);
                    }
                    else if ($scope.dataEntityfun[i].parentId == 23) {
                        promotion.push($scope.dataEntityfun[i]);
                    }
                    else if ($scope.dataEntityfun[i].parentId == 24) {
                        financial.push($scope.dataEntityfun[i]);
                    }
                }
                $scope.personalCenter = (personalCenter.length > 0);
                $scope.recommend = (recommend.length > 0);
                $scope.promotion = (promotion.length > 0);
                $scope.financial = (financial.length > 0);
                //清空localStorage
                //localStorage.clear();
                defer.resolve(result);
            },
            function (result) {
                defer.reject(result);
            })
        return defer.promise;
    }
    $scope.find();
    $scope.funcIdPower = function(funcId) {
		localStorage.removeItem("funcIdCapi");
		localStorage.setItem("funcIdCapi", funcId);
	};
    $scope.exitLogin = function(){
        localStorage.removeItem("dataLogin");
        $scope.find();
    }
    $scope.changePassword = function(){
		$scope.userId = localStorage.userId;
		$scope.dialog = ngDialog.open({
			template: 'views/common/updatePassword.html',
			className: 'ngdialog-theme-default',
			controller: 'updatePasswordModalController',
			scope: $scope,
			width: 600
		})
		
    }
    $scope.userName = "顾问";
    if(localStorage.userName != null && localStorage.userName != undefined && localStorage.userName != ""){
		$scope.userName = localStorage.userName;
	}
}
//修改密码弹窗
function updatePasswordModalController($scope,$q,$interval, functionService,$rootScope) {
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
    $scope.paraclass = true;
    $scope.ifSend = false;
//  $scope.btnMessage = "点击获取验证码";
    $scope.btnMessage = "获取验证码";
	//验证手机号是否被注册过
	$scope.ifmobile = function(){
		var defer = $q.defer();
        functionService
            .ifmobile($scope.mobile)
            .then(function (result) {
            	if(result == true){
                	$scope.showAlert("该手机号未注册,请先注册！")
                    $scope.ifSend = true;	
                }else{
                	$scope.ifSend = false;
                	if($scope.paraclass == true){
                		$scope.reciveCode()
                	}
                }
                defer.resolve(result);
            },function(result){
            	if(result == true){
                	$scope.showAlert("该手机号未注册,请先注册！")
                    $scope.ifSend = true;	
                }else{
                	$scope.ifSend = false;
                	if($scope.paraclass == true){
                		$scope.reciveCode()
                	}
                }
            	defer.resolve(result);
            })
        return defer.promise;
	}
    $scope.reciveCode = function(){
    	var defer = $q.defer();
        var mobile = $scope.mobile;
        if($scope.paraclass == true){
        	functionService
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
            })
        }
    }
	//修改密码
	$scope.updatePassword = function() {
		functionService
			.updatepassword($scope.mobile, $scope.password, $scope.code)
			.then(
				function(result) {
					if(result.code == 2){
	                	$scope.showAlert("修改成功！");
	                	$interval(function(){ 
	                		$rootScope.gotoLogin();
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
				}
			)
	};
}
angular
    .module('managerApp')
    .controller('functionController', functionController)
	.controller('updatePasswordModalController', updatePasswordModalController)