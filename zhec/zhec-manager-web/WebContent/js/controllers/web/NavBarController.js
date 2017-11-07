/**
 * 系统用户controller定义
 */
function NavBarController($scope,$http,$q,constPageSize,NavBarService,ngDialog){
	$scope.dataId = "";           //当前操作的数据id
	$scope.userNameSearch = "";   //搜索关键词
	$scope.WdatePicker = {};
	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, constPageSize){
		var defer = $q.defer();
		var parmValue = $scope.userNameSearch;
		var minTime = "";
		var maxTime = "";
		NavBarService
		.find(parmValue,minTime,maxTime,constPageSize, currentPageNo)
			.then(
				function(result) {
					$scope.navBarList = result.data;
					defer.resolve(result);
				}, function(result) {
					defer.reject(result);
				})
			return defer.promise;
	}
	/**
	 * 弹出修改数据模态框
	 */
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/web/NavBarModal.html',
            className: 'ngdialog-theme-default',
            controller: 'NavBarModalController',
            scope: $scope,
            width: 650
        })
	};

}

/**
 * 系统用户修改弹出页面controller定义
 */
function NavBarModalController($scope,NavBarService){
	$scope.initEntity = function () {
		if($scope.dataId!=null && $scope.dataId!=undefined && $scope.dataId!=""){  //如果参数dataId不为空，说明是修改数据
			NavBarService
				.get($scope.dataId)
				.then(
					function(result){
						$scope.navBarList=result.data;
					}
				);
		}
		else{   //如果参数dataId为空，说明是新增数据，设置默认值
			$scope.navBarList = {"status":1,"target":0,"applyType":1};
		}	
	}
	//radio选中的值
	
    $scope.check = function (n, name) {
        if ('status' == name) {
            $scope.navBarList.status = n;
        }
        if('target' == name) {
        	$scope.navBarList.target = n;
        }
        if('applyType' == name) {
        	$scope.navBarList.applyType = n;
        }
    }
	$scope.okModal = function() {
		$scope.saveMessage = {};
		if(undefined == $scope.WdatePicker.startTime){
			$scope.WdatePicker.startTime = $scope.navBarList.startTime;
		}
		if(undefined == $scope.WdatePicker.endTime){
			$scope.WdatePicker.endTime = $scope.navBarList.endTime;
		}
		$scope.saveMessage.title=$scope.navBarList.title;
		$scope.saveMessage.link=$scope.navBarList.link;
		$scope.saveMessage.sort=$scope.navBarList.sort;
		$scope.saveMessage.startTime=$scope.WdatePicker.startTime;
		$scope.saveMessage.endTime=$scope.WdatePicker.endTime;
		$scope.saveMessage.status=$scope.navBarList.status;
		$scope.saveMessage.target=$scope.navBarList.target;
		$scope.saveMessage.applyType=$scope.navBarList.applyType;
		if($scope.dataId!=null && $scope.dataId!=undefined && $scope.dataId!=""){   //修改数据
			$scope.saveMessage.id=$scope.navBarList.id;
			NavBarService
				.edit($scope.saveMessage)
				.then(
					function(result){
						$scope.dialog.close();
						$scope.loadData()
					}
				)
		}
		else {   //新增数据
			NavBarService
				.add($scope.saveMessage)
				.then(
					function(result){
						$scope.dialog.close();
						$scope.loadData()
					}
				)
		}
    };
    
    $scope.cancelModal = function () {
    	$scope.dialog.close();
    };
    $scope.initEntity();
}

angular
    .module('managerApp')
    .controller('NavBarController', NavBarController)
    .controller('NavBarModalController', NavBarModalController)
    