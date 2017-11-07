/**
 * 系统用户controller定义
 */
function PromotionCodeGoodsController($scope, $q, constPageSize,constMallLocation, PromotionCodeGoodsService) {
//  $scope.content = "";
    $scope.userToken = localStorage.dataLogin;
    $scope.string = constMallLocation + "/goods.html?id=";
    $scope.dataId = ""; //当前操作的数据id
	$scope.infoName = "";
	$scope.cateId = "";
	$scope.goodsId = "";
	$scope.cateId1 = "";
	$scope.cateId2 = "";
    $scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var infoName = $scope.infoName;
		var cateId = $scope.cateId;
		var cateId1 = $scope.cateId1;
		var cateId2 = $scope.cateId2;
		PromotionCodeGoodsService
			.find(currentPaseSize, currentPageNo,cateId,cateId1,cateId2,infoName)
			.then(
				function(result) {
					$scope.goodsList = result.data;
					for(var i = 0; i < $scope.goodsList.length; i++){
                      	$scope.goodsList[i].string = $scope.string+$scope.goodsList[i].id+"&consultantId="+$scope.consoultId
                    	  
					}
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				})
		return defer.promise;
	}
    //初始化搜索控件，一级分类
	$scope.Type1Init = function() {
		PromotionCodeGoodsService.seach(0).then(
			function(result) {
				$scope.TypeList1 = result.data;
				$scope.loadData();
			},
			function(result) {})
	}

	//一级分类下拉控件的change事件方法，用于实现级连i
	$scope.TypeChange1 = function(id) {

		$scope.cateId = id;

		PromotionCodeGoodsService.seach(id).then(
			function(result) {
				$scope.TypeList2 = result.data;
				$scope.loadData();

			},
			function(result) {})
	}
	$scope.TypeChange2 = function(id) {
		$scope.cateId1 = id;
		PromotionCodeGoodsService.seach(id).then(
			function(result) {
				$scope.TypeList3 = result.data;
				$scope.loadData();

			},
			function(result) {})

	}
	$scope.TypeChange3 = function(id) {
			$scope.cateId2 = id;
			$scope.loadData();

		}
	$scope.Type1Init();
}

angular
    .module('managerApp')
    .controller('PromotionCodeGoodsController', PromotionCodeGoodsController)