/**
 * 系统用户controller定义
 */
function GoodsSpecController($rootScope, $scope, $http, $q, constPageSize, GoodsSpecService, ngDialog) {
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
		GoodsSpecService
			.find(name, currentPaseSize, currentPageNo)
			.then(
				function(data) {
					if(data.code == 0) {
						$scope.specList = data.data;
						defer.resolve(data);
					}
				},
				function(data) {
					defer.reject(data);
				})
		return defer.promise;
	}

	/**
	 * 弹出修改数据模态框
	 */
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsSpecFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'GoodsSpecFormModalController',
			scope: $scope,
			width: 1220
		});

	}
}
/**
 * 系统用户修改弹出页面controller定义
 */
function GoodsSpecFormModalController($scope, GoodsSpecService, constPageSize) {
	$scope.attrIds = [];
	$scope.initEntity = function() {
			if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
				GoodsSpecService
					.get($scope.dataId)
					.then(function(result) {
						$scope.dataEntity = result.data.goodsSpec;
						$scope.resfly = result.data.goodsSpec.specAttrs;
						$scope.attrIds = result.data.attrIds;
					});
			} else { //如果参数dataId为空，说明是新增数据，设置默认值
				$scope.dataEntity = {
					"state": 1,
					'isNeedImage': 1
				};
				$scope.add_li();
			}
		}
		/*$scope.updataSpecAttr=[];*/
	$scope.okModal = function(updataSpecAttr, resfly) {
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") {
			$scope.dataEntity.specAttrs = updataSpecAttr.concat(resfly);
			GoodsSpecService
				.edit($scope.dataEntity)
				.then(function(result) {
						$scope.loadData();
						$scope.okModalDisabled = false;
						$scope.dialog.close();
					},
					function(result) {
						$scope.okModalDisabled = false;
					});
		} else {
			$scope.dataEntity.specAttrs = updataSpecAttr;
			GoodsSpecService
				.add($scope.dataEntity)
				.then(function(result) {
						$scope.loadData();
						$scope.okModalDisabled = false;
						$scope.dialog.close();
					},
					function(result) {
						$scope.okModalDisabled = false;
					});
		}
	};

	/**
	 * 是否上传主图
	 */
	$scope.checkIsNeedImage = function(n) {
			$scope.dataEntity.isNeedImage = n;
		}
		/**
		 * 状态转换
		 */
	$scope.check = function(n, j, k) {
			if(k == 1) {
				$scope.resfly[j].status = n;
			} else if(k == 2) {
				$scope.updataSpecAttr[j].status = n;
			}
		}
		/**
		 * 在添加页面增加一行 规格值 排序号
		 */
	$scope.updataSpecAttr = [];
	$scope.add_li = function() {
		$scope.updataSpecAttr.push({
			"name": "",
			"sort": "",
			'status': 1
		});
	};

	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
	$scope.initEntity();

}

angular
	.module('managerApp')
	.controller('GoodsSpecController', GoodsSpecController)
	.controller('GoodsSpecFormModalController', GoodsSpecFormModalController)