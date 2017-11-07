/**
 * 系统用户controller定义
 */
function couponsController($scope, $q, constPageSize, couponsService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.WdatePicker = {}; //WdatePicker时间   获取开始和结束时间
	$scope.couponsSearch = {};
	//获取优惠券促销列表
	$scope.namelist = function() {
		couponsService.namelist().then(
			function(result) {
				$scope.couponsSearchList = result.data;
			});
	};

	$scope.namelist();

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var promotionId = $scope.couponsSearch.couponsId;
		if(promotionId == undefined) {
			promotionId = "";
		}
		if($scope.parmValue == undefined) {
			$scope.parmValue = '';
		}
		//列表
		couponsService.find(promotionId, currentPaseSize, currentPageNo,$scope.parmValue).then(
			function(result) {
				$scope.ordersAllList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}

	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
}

angular
	.module('managerApp')
	.controller('couponsController', couponsController)