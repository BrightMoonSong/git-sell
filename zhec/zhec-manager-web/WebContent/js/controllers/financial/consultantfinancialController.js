/**
 * 系统用户controller定义
 */
function consultantfinancialController($scope,$http,$q,constPageSize,consultantfinancialService,ngDialog){
	$scope.dataId = "";           //当前操作的数据id
	$scope.userNameSearch = "";   //搜索关键词
	$scope.WdatePicker = {};

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, constPageSize){
		var defer = $q.defer();
		var parmValue = $scope.userNameSearch;
		$scope.financleList = [{id:"1",name:"待审核"},{id:"3",name:"未到账"},{id:"4",name:"提现成功"},{id:"5",name:"拒绝提现"}];
		if($scope.status==undefined&&$scope.status==null){
			$scope.status="";
		}
		consultantfinancialService
		.find(constPageSize,currentPageNo,$scope.status)
			.then(
				function(result) {
					$scope.consultantMembersList = result.data;
					defer.resolve(result);
				}, function(result) {
					defer.reject(result);
				})
			return defer.promise;
	}
	$scope.changeStatus = function(n){
		$scope.status = n;
		$scope.find(1, constPageSize)
	}
	/**
	 * 弹出修改数据模态框
	 */
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'firstDialogId',
            className: 'ngdialog-theme-default',
            controller: 'consultantfinancialModalController',
            scope: $scope,
            width: 900,
			height:600
        })
	};

}
function consultantfinancialModalController($scope,$http,$q,constPageSize,consultantfinancialService,ngDialog){
	$scope.initEntity = function () {
		$scope.showOption = false;
		consultantfinancialService
			.get($scope.dataId)
			.then(
				function(result){
					$scope.memberList=result.data;
					if($scope.memberList.status == 1){
						$scope.showOption = true;
					}else{
						$scope.showOption = false;
					}
				}
			);
	}
    $scope.initEntity();
    //$scope.allowSuc = true;
	/*5,memberList.id,memberList.consultantId,memberList.balance,memberList.money*/
	$scope.inputNode="";
    $scope.okModal = function(n,id,consultantId,money,status,remark){
    	$scope.submitMessage = {};
		$scope.submitMessage.status = n;
    	$scope.submitMessage.id = id;
    	$scope.submitMessage.consultantId = consultantId;
    	$scope.submitMessage.money = money;
    	$scope.submitMessage.remark = remark;
    	$scope.submitMessage.optId = localStorage.getItem('userId')
    	$scope.submitMessage.optName = localStorage.getItem('userName');

		$scope.dialog1 = ngDialog.open({
			template: 'secDialogId',
            className: 'ngdialog-theme-default',
            scope: $scope,
            width: 900
        })
    	/*if(n==1){
    		$scope.allowSuc = true;
    	}else{
    		$scope.allowSuc = false;
    	}*/
    }
    $scope.confirmModal = function(inputNode){
    	$scope.submitMessage.remark = inputNode
    	//$scope.submitMessage.status = 3;
		consultantfinancialService
			.submit($scope.submitMessage)
			.then(
				function(result){
					$scope.dialog1.close()
					$scope.dialog.close()
					$scope.loadData()
				}
			);
    }
	$scope.inputNode="";
    $scope.cancleModal = function(){
    	$scope.dialog1.close()
    }
}

angular
    .module('managerApp')
    .controller('consultantfinancialController', consultantfinancialController)
    .controller('consultantfinancialModalController', consultantfinancialModalController)
