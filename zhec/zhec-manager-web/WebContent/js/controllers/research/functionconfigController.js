/**
 * 系统用户controller定义
 */
function functionconfigController($scope,$q,constPageSize,functionconfigService,ngDialog){
	$scope.dataId = "";           //当前操作的数据id
	$scope.userNameSearch = "";   //搜索关键词
	$scope.WdatePicker = {};
	$scope.statusChangeBtn = "";     //开关内容
	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, constPageSize){
		var defer = $q.defer();
		 console.log($scope.userNameSearch)
		functionconfigService
		.find(constPageSize, currentPageNo,$scope.userNameSearch)
			.then(
				function(result) {
					console.log(result)
					$scope.configList = result.data;
					defer.resolve(result);
				}, function(result) {
					console.log(result)
					defer.reject(result);
				})
			return defer.promise;
	}
	
	/**
	 * 弹出修改数据模态框
	 */
	$scope.openModal = function(n,dataId) {
		if(n == 0){
			$scope.dataId = dataId;
		}else{
			$scope.parentId = dataId;
		}
		$scope.resource = n;
		$scope.dialog = ngDialog.open({
			template: 'views/research/functionconfigModal.html',
            className: 'ngdialog-theme-default',
            controller: 'functioncofigModalController',
            scope: $scope,
            width: 650
        })
	};
	$scope.changeStatus = function(n,memberId){
		functionconfigService
			.get(memberId)
			.then(
				function(result){
					$scope.CurrentMember=result.data;
					$scope.memeberStatus = $scope.CurrentMember.status
					$scope.openConfirm(memberId,$scope.memeberStatus)
				}
			);
		
	}

}

/**
 * 系统用户修改弹出页面controller定义
 */
function functioncofigModalController($scope,functionconfigService){
	$scope.configMessage = {}
	$scope.initEntity = function () {
		if($scope.dataId!=null && $scope.dataId!=undefined && $scope.dataId!=""){  //如果参数dataId不为空，说明是修改数据
			functionconfigService
				.findId($scope.dataId)
				.then(
					function(result){
						console.log(result)
						$scope.configMessage=result.data;
					}
				);
		}else{
			$scope.configMessage.status = 1;
			$scope.configMessage.scope = 1;
			$scope.configMessage.parentId = $scope.parentId;
			$scope.configMessage.name = "";
			$scope.configMessage.menuUrl = "";
			$scope.configMessage.functionUrl = "";
			$scope.configMessage.sort = "";
		}
		
	}
	$scope.initEntity();
	$scope.okModal = function(){
		if($scope.dataId!=null && $scope.dataId!=undefined && $scope.dataId!=""){
			console.log($scope.configMessage)
			functionconfigService
			.update($scope.configMessage)
			.then(
				function(result){
					console.log(result)
					$scope.configMessage=result.data;
					$scope.loadData()
					$scope.dialog.close()
				}
			);		
		}else{
			console.log($scope.configMessage)
			functionconfigService
			.insert($scope.configMessage)
			.then(
				function(result){
					console.log(result)
					$scope.configMessage=result.data;
					$scope.loadData()
					$scope.dialog.close()
				}
			);		
		}
	}
	$scope.cancelModal = function(){
		$scope.dialog.close()
	}
    
}

angular
    .module('managerApp')
    .controller('functionconfigController', functionconfigController)
    .controller('functioncofigModalController', functioncofigModalController)
	