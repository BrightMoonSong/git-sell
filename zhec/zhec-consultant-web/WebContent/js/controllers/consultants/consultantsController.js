/**
 * 系统用户controller定义
 */

function consultantsController($scope,$q,consultantsService,ngDialog){
	
	$scope.dataId = "";           //当前操作的数据id
	$scope.userNameSearch = "";   //搜索关键词
	$scope.loginId = localStorage.userName;
	$scope.mobile = localStorage.mobile;
	$scope.userToken = localStorage.dataLogin;
	$scope.WdatePicker = {};					//时间控件
	$scope.find = function(){
		consultantsService
		.find($scope.userToken)
		.then(
			function(result) {
				$scope.consultantMyMessage = result.data;
			})
	}
	$scope.find()
	//修改信息
	$scope.showFail = function(failMessage) {
        var dialog = ngDialog.openConfirm({
            template: '<div class="ngdialog-message">'+
				        '<h3>提示信息</h3>'+
				       ' <p>确认保存？</p>'+
				    '</div>'+
				    '<div class="ngdialog-buttons">'+
				    	
				    	'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm()">确定</button>'+
				        '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(\'button\')">取消</button>'+
				   ' </div>',
            plain: true,
            closeByDocument: false,
            closeByEscape: false
        }).then(function (value) {
        	if($scope.okModalDisabled == true) {
				return 0;
			}
			$scope.okModalDisabled = true;
            $scope.message = {};
            if (undefined == $scope.WdatePicker.startTime) {
            	$scope.message.birthdayStr = "";
		    }else{
		    	$scope.message.birthdayStr = $scope.WdatePicker.startTime
		    }
			$scope.message.userToken = $scope.userToken;
			$scope.message.name = $scope.consultantMyMessage.name;
			$scope.message.cardId = $scope.consultantMyMessage.cardId;
			$scope.message.sex = $scope.consultantMyMessage.sex;
			if($scope.consultantMyMessage.email == null){
				$scope.message.email = "";
			}else{
				$scope.message.email = $scope.consultantMyMessage.email;
			}
			if($scope.consultantMyMessage.qq == null){
				$scope.message.qq = "";
			}else{
				$scope.message.qq = $scope.consultantMyMessage.qq;
			}
			if($scope.consultantMyMessage.phone == null){
				$scope.message.phone = "";
			}else{
				$scope.message.phone = $scope.consultantMyMessage.phone;
			}
			
			consultantsService
			.editMessage($scope.message)
			.then(
				function(result) {
					$scope.okModalDisabled = false;
					localStorage.setItem("userName", $scope.message.name);
//					$scope.consultantMyMessage = result.data;
				},function(resuult){
					$scope.okModalDisabled = false;
				})
       }, function (reason) {
       	
        });
    };
    $scope.showMessage = function(failMessage) {
        var dialog1 = ngDialog.open({
            template: 
                '<p>' + failMessage + '</p>' +
            	'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(\'button\')">确认</button>',
            plain: true,
            closeByDocument: false,
            closeByEscape: false
        })
    };
    //修改性别
    $scope.check = function(n){
    	$scope.consultantMyMessage.sex = n;
    }
    $scope.closeModal = function(){
    	dialog1.close()
    }
	/**
	 * 修改数据
	 */
	$scope.edit = function(){
		$scope.showFail("确认修改？(部分信息修改后将不能再次修改)");
	}
	
	
}

angular
    .module('managerApp')
    .controller('consultantsController', consultantsController)
    
    
    