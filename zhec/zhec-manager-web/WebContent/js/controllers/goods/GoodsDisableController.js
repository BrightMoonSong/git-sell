/**
 * 品牌管理
 */
function GoodsDisableController($rootScope, $scope, $http, $q, constPageSize, GoodsDisableService, ngDialog, goodsReminder) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.goodsNameSearch = "";

	/**
	 * 搜索
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
			var defer = $q.defer();
			var infoName = $scope.goodsNameSearch;
			GoodsDisableService
				.find(infoName, currentPaseSize, currentPageNo)
				.then(function(result) {
						$scope.goodsList = result.data;
						defer.resolve(result);
					},
					function(result) {
						//alert("该用户不存在");
						defer.reject(result);
					})
			return defer.promise;
		}
		/**
		 * 启用
		 * @param id
		 */
	$scope.enable = function(id) {
		var reminder; //提示语
		reminder = goodsReminder.goodsState.enable;
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
			var res = {
				'id': id
			};
			GoodsDisableService.enabled(res).then(
				function(result) {
					$scope.loadData();
				},
				function(reason) {
				});
		}, function(reason) {
		});
	};
}

angular
	.module('managerApp')
	.controller('GoodsDisableController', GoodsDisableController)