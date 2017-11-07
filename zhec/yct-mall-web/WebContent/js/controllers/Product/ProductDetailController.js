/**
 * 系统用户controller定义
 */
function ProductDetailController($scope, $http, $q, ProductDetailService, ngDialog,$stateParams, $rootScope) {
	$rootScope.rootIsActiveId = 4;//产品中心
	$scope.isActiveId = '';
	//药品分类接口
	$scope.finddrugclassification = function() {
			ProductDetailService
				.finddrugclassification()
				.then(
					function(result) {
						$scope.detailList = result.data;
						$scope.detailList.forEach(function(element){
							if(element.classificationId==$stateParams.classificationId){
								$scope.classificationId($stateParams.classificationId,element.name);
							}
						})
						//$scope.classificationId($stateParams.classificationId);
					},
					function(result) {

					})
		}
		//药品列表
	$scope.classificationId = function(id,name) {
		$scope.resName = name;
		$stateParams.classificationId ;
			ProductDetailService
				.classificationId(id)
				.then(
					function(result) {
						$scope.isActiveId = id;
						$scope.classificationList = result.data;
					},
					function(result) {

					})
		}
		//初始化
	$scope.finddrugclassification();
	
}

app.controller('ProductDetailController', ProductDetailController);