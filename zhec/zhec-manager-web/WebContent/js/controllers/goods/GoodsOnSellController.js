/**
 * 系统用户controller定义
 */
function GoodsOnSellController($scope, $http, $q, constPageSize, GoodsOnSellService, ngDialog) {
	$scope.goodsId = ""; //当前操作的数据id
	$scope.infoName = ""; //搜索关键词
	$scope.saveMessage = {};
	$scope.userId = localStorage.userId;
	/**
	 * 数据初始化
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {

		var defer = $q.defer();
		GoodsOnSellService.find(currentPageNo, currentPaseSize, $scope.infoName).then(
			function(result) {
				$scope.goodsList = result.data;
				console.log($scope.goodsList);
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			});
		return defer.promise;
	};

	//下架按钮点击方法
	$scope.soldOutById = function(goodsId) {
		var reminder = "确定下架该商品吗？"; //提示语
		// reminder = goodsReminder.goodsinfo;

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
			$scope.saveMessage.id = goodsId;
			$scope.saveMessage.downUserId = $scope.userId;

			GoodsOnSellService
				.soldOutById($scope.saveMessage)
				.then(
					function(result) {
						//下架成功刷新页面
						$scope.loadData(false);
					},
					function(result) {}
				);
		}, function(reason) {

		});

	};

	//跳转商品详情页
	$scope.gotoGoodsDetail = function(goodsId) {
		if (goodsId !== null && goodsId !== undefined) {
			window.open(constMallLocation + "/goods.html?id=" + goodsId, "_blank");
		}
	};
	//跳转商品预览页
	$scope.gotoGoodsPreview = function(goodsId) {
		if (goodsId !== null && goodsId !== undefined) {
			window.open(constMallLocation + "/goodsPreview.html?id=" + goodsId, "_blank");
		}
	};
	//返回商品类型，处方药，普通药品，其他
	$scope.getGoodsType = function(goodsType) {
		if (goodsType !== null && goodsType !== undefined) {
			if (goodsType == 1) {
				return '处方药';
			} else if (goodsType == 2) {
				return '非处方药';
			} else if (goodsType == 3) {
				return '其他';
			}
		}
	};

}

angular
	.module('managerApp')
	.controller('GoodsOnSellController', GoodsOnSellController);
