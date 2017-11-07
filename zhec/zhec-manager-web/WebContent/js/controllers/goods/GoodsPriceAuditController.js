/**
 * 系统用户controller定义
 */
function GoodsPriceAuditController($scope, $q, constPageSize, $rootScope, GoodsPriceAuditService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.stateNameSearch = ""; //搜索关键词
	$scope.info = '';
	$scope.remarks = ''; //申请的回执信息
	$scope.userId = localStorage.userId;
	$scope.okModalDisabled = false; //保存按钮的disabled

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var name1 = $scope.stateNameSearch;
		GoodsPriceAuditService
			.findauditgoods(name1, currentPaseSize, currentPageNo)
			.then(
				function(result) {
					$scope.priceAuditList = result.data;
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	};
	//  findauditgoodsbyid
	$scope.findauditgoodsbygoodsid = function(goodsId) {
		GoodsPriceAuditService
			.findauditgoodsbyid(goodsId)
			.then(
				function(result) {
					$scope.infoList = result.data;
				});
	};

	$scope.emptyInfo = function() {
		$scope.infoList = '';
	}

	/**
	 * 弹出数据模态框
	 */
	$scope.openModal = function(status, dataId, goodsId) {
		$scope.dataId = dataId;
		$scope.status = status;
		$scope.goodsId = goodsId;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsPriceAuditModal.html',
			className: 'ngdialog-theme-default',
			controller: 'GoodsPriceAuditModalController',
			scope: $scope,
			width: 950
		})
	};
	//取消
	$scope.cancelModal = function() {
		$scope.loadData(true);
		$scope.emptyInfo();
		$scope.dialog.close();
	};

};

/**
 * 用户修改弹出页面controller定义
 */
function GoodsPriceAuditModalController($scope, GoodsPriceAuditService, $rootScope) {
	$scope.okModal = function() {
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		var res = { //id status auditId  auditName remarks goodsId
			status: $scope.status,
			id: $scope.dataId,
			goodsId: $scope.goodsId,
			auditId: $scope.userId,
			remarks: $scope.remarks,
			auditName: localStorage.userName
		};
		if($scope.status == 2) {
			if($scope.remarks == '' || $scope.remarks == null || $scope.remarks == undefined) {
				$rootScope.showAlert("拒绝申请时，申请的回执信息为必填项！");
				$scope.okModalDisabled = false;
				return 0;
			}
		}
		GoodsPriceAuditService
			.editauditgoods(res)
			.then(
				function(result) {
					$scope.okModalDisabled = false;
					$scope.cancelModal();
				},
				function(result) {
					$scope.okModalDisabled = false;
				});
	};
}

angular
	.module('managerApp')
	.controller('GoodsPriceAuditController', GoodsPriceAuditController)
	.controller('GoodsPriceAuditModalController', GoodsPriceAuditModalController)