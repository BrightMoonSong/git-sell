/**
 * 系统用户controller定义
 */
function promptionMemberListController($scope,$http,$q,constPageSize,AllConsultantOrderService,ngDialog){

	$scope.find = function(currentPageNo){
		var defer = $q.defer();
     $scope.userNameSearch="";
		AllConsultantOrderService
		.findrecommendmembers($scope.userNameSearch,constPageSize,currentPageNo)
			.then(
				function(result) {
					$scope.consultantMembersList = result.data;
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
			template: 'views/consultant/promptionOrdersListModal.html',
            className: 'ngdialog-theme-default',
            controller: 'promptionOrdersListController',
            scope: $scope,
            width: 900
        })
	};

}

function promptionOrdersListController($scope,$http,$q,constPageSize,AllConsultantOrderService,ngDialog){
	$scope.search=function(currentPageNo){
		var defer = $q.defer();
		$scope.orderNumSearch="";
		AllConsultantOrderService
			.findorderNumSearch(currentPageNo,constPageSize,$scope.dataId)
			.then(
			function(result) {
				$scope.ordersList = result.data.listOrder;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}
}
angular
    .module('managerApp')
    .controller('promptionMemberListController', promptionMemberListController)
    .controller('promptionOrdersListController', promptionOrdersListController);
