/**
 * 系统用户controller定义
 */
function goodsPromotionController($scope, $q, constPageSize, goodsPromotionService, ngDialog, promotionReminder) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.parmValue = ""; //搜索关键词 按会员姓名检索
	$scope.WdatePicker = {}; //WdatePicker时间   获取开始和结束时间

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
		goodsPromotionService.find(parmValue, minTime, maxTime, currentPaseSize, currentPageNo).then(
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
	 * 禁用
	 */
	$scope.disable = function(id) {
		var reminder; //提示语
		reminder = promotionReminder.disable;
		ngDialog.openConfirm({
			template: '<p>' + reminder + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			goodsPromotionService.disable(id).then(
				function(result) {
					$scope.loadData();
				});
		}, function(reason) {
		});
	};
	/**
	 * 弹出模态框
	 */
	$scope.openModal = function(n, id) {
		$scope.ngif = n;
		$scope.dataId = id;
		if(n == 1) { //维护
			var reminder; //提示语
			reminder = promotionReminder.goodsPromotionMaintain;
			ngDialog.openConfirm({
				template: '<p>' + reminder + '</p>' +
					'<div class="ngdialog-buttons">' +
					'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
					'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
					'</button></div>',
				plain: true,
				closeByDocument: false,
				closeByEscape: false,
				className: 'ngdialog-theme-default'
			}).then(function(value) {
				goodsPromotionService.maintain(id).then(
					function(result) {
						$scope.loadData();
					});
			}, function(reason) {
			});
		}
		if(n == 2) {
			$scope.dialog = ngDialog.open({//详情
				template: 'views/promotionmanage/goodsPromotionAuditDetailsModal.html',
				className: 'ngdialog-theme-default',
				controller: 'goodsPromotionDetailsModalController',
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
 * 弹出  详情 页面的controller定义
 */
function goodsPromotionDetailsModalController($scope, goodsPromotionService) {
	//根据平台类型
	$scope.ifshowtype = "";
	//详情
	$scope.details = function() {
		goodsPromotionService
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

angular
	.module('managerApp')
	.controller('goodsPromotionController', goodsPromotionController)
	.controller('goodsPromotionDetailsModalController', goodsPromotionDetailsModalController)