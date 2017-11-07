/**
 * 系统用户controller定义
 */
function financialController($scope,$q,financialService,ngDialog){
	$scope.dataId = "";           //当前操作的数据id
	$scope.userNameSearch = "";   //搜索关键词
	$scope.loginId = localStorage.userName;
	$scope.mobile = localStorage.mobile;
	$scope.dataEntity = [];
	$scope.allowAudit = 1;
	
	$scope.find = function(currentPageNo, currentPaseSize){
		var defer = $q.defer();
		financialService
		.find1(currentPageNo, currentPaseSize)
		.then(
			function(result) {
				$scope.consultantMoneyMessage = result.data;
				defer.resolve(result);
			})
		return defer.promise;
	}
	$scope.getInit = function(){
		var defer = $q.defer();
		financialService
		.find()
		.then(
			function(result) {
				$scope.balanceList = result.data;
				defer.resolve(result);
			})
		return defer.promise;
	}
	$scope.getInit()
	//提现时间
	$scope.getTime = function(){
		var defer = $q.defer();
		financialService
		.getTime()
		.then(
			function(result) {
				console.log(result)
				$scope.balanceMin = result.data.balanceMin;
				$scope.timeMin = result.data.timeMin;
				$scope.timeMax = result.data.timeMax;
				defer.resolve(result);
			},function(result){
				
			})
		return defer.promise;
	}
	$scope.getTime()
	//是否允许提现
	$scope.isallowwithdraw = function(){
		var defer = $q.defer();
		financialService
		.isallowwithdraw()
		.then(
			function(result) {
				$scope.allowAudit = result.code;
				
				defer.resolve(result);
			},function(result){
				defer.resolve(result);
			})
		return defer.promise;
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
	//申请提现
	$scope.openModal = function(){
		$scope.submitMoney = $scope.withdrawMoney;
		if($scope.submitMoney > $scope.balanceList.balance || $scope.submitMoney <= 0){
			$scope.showFail("请填写正确的金额！");
			$scope.withdrawMoney = "";
			return;
		}else if($scope.submitMoney < $scope.balanceMin && $scope.balanceMin > 0 && $scope.submitMoney > 0){
			$scope.showFail("本次至少提现"+$scope.balanceMin+"元！");
			$scope.withdrawMoney = "";
			return;
		}
		$scope.dialog = ngDialog.open({
			template: 'firstDialogId',
            className: 'ngdialog-theme-default',
            scope:$scope,
            controller:allowSubmitController
        })
	}
	//确认收款
	$scope.confirmApply = function(id){
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		financialService
			.consultantwithdrawreceipt(id)
			.then(
				function(result) {
					$scope.okModalDisabled = false;
					$scope.loadData();
				},function(result){
					$scope.okModalDisabled = false;
				})
	}
	$scope.isallowwithdraw();
}
function allowSubmitController($scope,financialService){
	
	$scope.consultantwithdraw = function(){
		if($scope.submitMoney!=undefined){
			if($scope.okModalDisabled == true) {
				return 0;
			}
			$scope.okModalDisabled = true;
			financialService
			.post($scope.submitMoney)
			.then(
				function(result) {
//					$scope.loadData();
					location.reload() 
					$scope.okModalDisabled = false;
					$scope.dialog.close();
					$scope.withdrawMoney = "";
				},function(result){
					$scope.okModalDisabled = false;
				})
		}
	}
	$scope.cancleModal = function(){
		$scope.dialog.close()
	}
}
angular
    .module('managerApp')
    .controller('financialController', financialController)
    .controller('allowSubmitController', allowSubmitController)
    
    
    
    