/**
 * 系统用户controller定义
 */
function goodsPromotionAuditController($scope, $q, constPageSize, goodsPromotionAuditService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.parmValue = ""; //搜索关键词 按会员姓名检索
	$scope.WdatePicker = {}; //WdatePicker时间   获取开始和结束时间
	$scope.okmodaldis = false; //保存按钮的disabled

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var parmValue = $scope.parmValue;
		if(undefined == $scope.WdatePicker.startTime) {
			$scope.WdatePicker.startTime = "";
		}
		if(undefined == $scope.WdatePicker.endTime) {
			$scope.WdatePicker.endTime = "";
		}
		var minTime = $scope.WdatePicker.startTime; //下单开始时间检索
		var maxTime = $scope.WdatePicker.endTime; //下单结束时间检索

		//列表
		goodsPromotionAuditService.find(parmValue, minTime, maxTime, currentPaseSize, currentPageNo).then(
			function(result) {
				$scope.ordersAllList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}

	/**
	 * 弹出模态框
	 */
	$scope.openModal = function(n, id) {
		$scope.ngif = n;
		$scope.dataId = id;
		if(n == 1) {
			$scope.dialog = ngDialog.open({
				template: 'views/promotionmanage/goodsPromotionAuditModal.html',
				className: 'ngdialog-theme-default',
				controller: 'goodsPromotionAuditModalController',
				scope: $scope,
				width: 960
			});
		}
		if(n == 2) {
			$scope.dialog = ngDialog.open({
				template: 'views/promotionmanage/goodsPromotionAuditModal.html',
				className: 'ngdialog-theme-default',
				controller: 'goodsPromotionAuditModalController',
				scope: $scope,
				width: 960
			});
		}
		if(n == 3) {
			$scope.dialog = ngDialog.open({ //详情
				template: 'views/promotionmanage/goodsPromotionAuditDetailsModal.html',
				className: 'ngdialog-theme-default',
				controller: 'goodsPromotionAuditDetailsModalController',
				scope: $scope,
				width: 1160
			});
		}
	}

	/*
	 * 关闭弹窗
	 */
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
}
/**
 * 弹出页面的controller定义
 */
function goodsPromotionAuditDetailsModalController($scope, goodsPromotionAuditService) {
	//根据平台类型
	$scope.ifshowtype = "";
	//详情
	$scope.details = function() {
		goodsPromotionAuditService
			.auditdetail($scope.dataId)
			.then(
				function(result) {
					$scope.entity = result.data;
					if($scope.entity.goodsSelectType == 2) {
						$scope.cateclick($scope.entity.promotionCateList[0].id, 0);
					}
					if($scope.entity.goodsSelectType == 3) {
						$scope.brandclick($scope.entity.promotionBrandsList[0].id, 0);
					}
					$scope.ifshowtype = result.data.applicablePlatform;
					$scope.selectedGoods = result.data.promotionGoodsList;
					if($scope.selectedGoods == null || $scope.selectedGoods == undefined) $scope.selectedGoods = [];
					

					$scope.promotionProductList = result.data.promotionProductList;
					if($scope.promotionProductList == null || $scope.promotionProductList == undefined) $scope.promotionProductList = [];
					for(var i = 0; i < $scope.selectedGoods.length; i++) {
						$scope.selectedGoods[i].productlists = [];
						for(var j = 0; j < $scope.promotionProductList.length; j++) {
							if($scope.promotionProductList[j].goodsId == $scope.selectedGoods[i].id) {
								$scope.selectedGoods[i].productlists.push($scope.promotionProductList[j]);
							}
						}
					}
				});
	};
	$scope.details();
	//选择分类
	$scope.cateclick = function(id, index) {
		$scope.cateId = id;
		$scope.cateIndex = index;
	};
	//按品牌
	$scope.brandclick = function(id, index) {
		$scope.brandId = id;
		$scope.brandIndex = index;
	};
}
/**
 * 弹出  填写 备注页面的controller定义
 */
function goodsPromotionAuditModalController($scope, goodsPromotionAuditService) {
	$scope.dataEntity = {};
	//保存
	$scope.okModal = function() {
		if($scope.okmodaldis == true) {
			return 0;
		}
		$scope.okmodaldis = true;

		if($scope.dataEntity.remark == undefined) {
			$scope.dataEntity.remark = "";
		}
		if($scope.ngif == 1) { //通过
			goodsPromotionAuditService
				.auditpass($scope.dataId, $scope.dataEntity.remark)
				.then(
					function(result) {
						$scope.okmodaldis = false;
						$scope.loadData(true);
						$scope.cancelModal();
					},
					function(result) {
						$scope.okmodaldis = false;
					});
		}
		if($scope.ngif == 2) { //拒绝
			goodsPromotionAuditService
				.auditfail($scope.dataId, $scope.dataEntity.remark)
				.then(
					function(result) {
						$scope.okmodaldis = false;
						$scope.loadData(true);
						$scope.cancelModal();
					},
					function(result) {
						$scope.okmodaldis = false;
					});
		}
	};
}

angular
	.module('managerApp')
	.controller('goodsPromotionAuditController', goodsPromotionAuditController)
	.controller('goodsPromotionAuditDetailsModalController', goodsPromotionAuditDetailsModalController)
	.controller('goodsPromotionAuditModalController', goodsPromotionAuditModalController)