/**
 * 系统用户controller定义
 */
function GoodsPropertiesController($rootScope, $scope, $http, $q, goodsReminder, constPageSize, GoodsPropertiesService, ngDialog) {
	//定义变量
	$scope.nameSearch = ""; //搜索文本框的 model
	$scope.dataId = ""; //当前操作的数据id
	$scope.brandNameSearch = "";
	$scope.okModalDisabled = false; //保存按钮的disabled

	/**
	 * 搜索
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var name = $scope.nameSearch;
		GoodsPropertiesService
			.find(name, currentPaseSize, currentPageNo)
			.then(
				function(result) {
					if(result.code == 0) {
						$scope.PropertiesList = result.data;
						defer.resolve(result);
					}
				},
				function(result) {
					defer.reject(result);
				})
		return defer.promise;
	}

	/**
	 * 弹出修改数据模态框
	 */
	$scope.openModal = function(dataId, n) {
		$scope.dataId = dataId;
		var reminder; //提示语
		if(n == 0) { //禁用
			reminder = goodsReminder.GoodsProperties.forbidden;
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
				GoodsPropertiesService
					.editstatus(dataId, 0)
					.then(
						function(result) {
							$scope.loadData();
						});
			}, function(reason) {

			});
		} else if(n == 1) { //启用
			reminder = goodsReminder.GoodsProperties.enable;
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
				GoodsPropertiesService
					.editstatus(dataId, 1)
					.then(
						function(result) {
							$scope.loadData();
						});
			}, function(reason) {

			});
		} else { //修改
			$scope.dialog = ngDialog.open({
				template: 'views/goods/GoodsPropertiesFormModal.html',
				className: 'ngdialog-theme-default',
				controller: 'GoodsPropertiesFormModalController',
				scope: $scope,
				width: 1220
			});
		}
	}

	//取消
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
}
/**
 * 系统用户修改弹出页面controller定义
 */
function GoodsPropertiesFormModalController($scope, $rootScope, GoodsPropertiesService, constPageSize) {
	$scope.attrIds = [];
	$scope.inputType12 = false; //输入类型：1 单选输入、2 多选输入  时显示新增属性值按钮
	$scope.initEntity = function() {
			if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
				GoodsPropertiesService
					.get($scope.dataId)
					.then(function(result) {
						$scope.dataEntity = result.data;
						$scope.resfly = result.data.propAttrsList;
						$scope.showResfly = true;
						if(result.data.inputType == 1 || result.data.inputType == 2) {
							$scope.inputType12 = true;
							$scope.updataPropertiesAttr = [];
						}
						if($scope.dataEntity.attrType == 1) {
							$scope.filter1 = true;
						} else {
							$scope.filter1 = false;
						}
					});
			} else { //如果参数dataId为空，说明是新增数据，设置默认值
				$scope.dataEntity = {
					"status": 1 //状态 正常
				};
				$scope.filter1 = false;
			}
		}
		/*$scope.updataPropertiesAttr=[];*/
	$scope.okModal = function(updataPropertiesAttr, resfly) {
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") {
			$scope.dataEntity.propAttrsList = resfly.concat(updataPropertiesAttr);
			GoodsPropertiesService
				.edit($scope.dataEntity)
				.then(function(result) {
						$scope.loadData();
						$scope.okModalDisabled = false;
						$scope.cancelModal();
					},
					function(result) {
						$scope.okModalDisabled = false;
					});
		} else { //新增
			$scope.dataEntity.propAttrsList = updataPropertiesAttr;

			if($scope.dataEntity.attrType == undefined) {
				$rootScope.showAlert("请选择属性类型！");
				$scope.okModalDisabled = false;
				return false;
			}
			if($scope.dataEntity.inputType == undefined) {
				$rootScope.showAlert("请选择输入类型！");
				$scope.okModalDisabled = false;
				return false;
			}

			GoodsPropertiesService
				.addprop($scope.dataEntity)
				.then(function(result) {
						$scope.loadData();
						$scope.okModalDisabled = false;
						$scope.cancelModal();
					},
					function(result) {
						$scope.okModalDisabled = false;
					});
		}
	};
	/**
	 * 状态转换
	 */
	$scope.check = function(n, m, j, k) {
			if(m == 'inputType') {
				if(n == 1 || n == 2) {
					$scope.inputType12 = true;
					$scope.showResfly = true;
				} else {
					$scope.updataPropertiesAttr = [];
					$scope.inputType12 = false;
					$scope.showResfly = false;
				}
				$scope.dataEntity.inputType = n;
			}
			if(m == 'status') {
				if(j == undefined) {
					$scope.dataEntity.status = n;
				} else if(k == 0) {
					$scope.resfly[j].status = n;
				} else if(k == 1) {
					$scope.updataPropertiesAttr[j].status = n;
				}
			}
			if(m == 'attrType') {
				$scope.dataEntity.attrType = n;
				if(n == 1) { //选择筛选属性时只能选择 单选输入  多选输入
					$scope.filter1 = true;
					if($scope.dataEntity.inputType == 1 || $scope.dataEntity.inputType == 2) {

					} else {
						$scope.check(1, 'inputType');
					}
				} else {
					$scope.filter1 = false;
				}
			}
		}
		/**
		 * 在添加页面增加一行 规格值 排序号
		 */
	$scope.updataPropertiesAttr = [];
	$scope.add_li = function() {
		$scope.updataPropertiesAttr.push({
			"name": "",
			"sort": "",
			"status": 1
		});
	};

	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
	$scope.initEntity();

}

angular
	.module('managerApp')
	.controller('GoodsPropertiesController', GoodsPropertiesController)
	.controller('GoodsPropertiesFormModalController', GoodsPropertiesFormModalController)