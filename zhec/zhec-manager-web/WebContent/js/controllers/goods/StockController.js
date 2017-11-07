/**
 * 系统用户controller定义
 */
function stockController($scope, $q, $rootScope, constPageSize, stockService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.infoName = "";
	$scope.cateId = "";
	$scope.goodsId = "";
	$scope.cateId1 = "";
	$scope.cateId2 = "";
	$scope.status = '1';
	$scope.okModalDisabled = false;
	$scope.id = "";
	$scope.id1 = 0;


	/**stock
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var infoName = $scope.infoName;
		var cateId = $scope.cateId;
		var cateId1 = $scope.cateId1;
		var cateId2 = $scope.cateId2;
		stockService
			.find(currentPaseSize, currentPageNo, cateId, cateId1, cateId2, infoName)
			.then(
				function(result) {
					$scope.stockAllList = result.data;
					console.log(result.data)
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				})
		return defer.promise;
	}


	//初始化搜索控件，一级分类
	$scope.Type1Init = function() {
		stockService.seach(0).then(
			function(result) {
				$scope.TypeList1 = result.data;
				// $scope.loadData();
			},
			function(result) {})
	}

	//一级分类下拉控件的change事件方法，用于实现级连i
	$scope.TypeChange1 = function(id) {
		$scope.cateId = id;
		stockService.seach(id).then(
			function(result) {
				$scope.TypeList2 = result.data;
				// $scope.loadData();
			},
			function(result) {})
	}
	$scope.TypeChange2 = function(id) {
		$scope.cateId1 = id;
		stockService.seach(id).then(
			function(result) {
				$scope.TypeList3 = result.data;
				// $scope.loadData();

			},
			function(result) {})

	}
	$scope.TypeChange3 = function(id) {
			$scope.cateId2 = id;
			// $scope.loadData();

		}
		/**
		 * 弹出模态框
		 */
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/StockFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'stockFormModalController',
			scope: $scope,
			width: 950
		});
	}

	/**s
	 * 弹出模态框
	 */
	$scope.openModals = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/StocksFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'stocksFormModalController',
			scope: $scope,
			width: 950
		});
	}
	$scope.Type1Init();

}

/**
 * 弹出页面的controller定义  修改历史
 */
function stockFormModalController($scope, stockService) {

	$scope.initEntitys = function(id) {
		stockService
			.get(id)
			.then(
				function(result) {
					$scope.dataEntitys = result.data;
					console.log(result.data);
					//数组倒序排列
					$scope.dataEntitys = $scope.dataEntitys.reverse();
				}
			);

	}

	$scope.initEntity = function() {
			stockService
				.gets($scope.dataId)
				.then(
					function(result) {
						$scope.dataEntity = result.data;
						// $scope.initEntitys(result.data[0].id);
						$scope.choose(result.data[0].id)
						console.log(result.data);
					}
				);

		}
		//选择规格
	$scope.choose = function(id) {
		$scope.id = id;
		$scope.initEntitys(id);

	};

	/**
	 * 标签页click事件
	 */
	// $scope.onClickTab = function(url) {
	// 	$scope.currentTab = url;
	// }
	$scope.initEntity();
	$scope.cancelModal = function() {
		$scope.dialog.close();
		$scope.loadData();

	}
}

/**
 * 弹出页面的controller定义 修改库存
 */
function stocksFormModalController($scope, stockService, $rootScope) {
	$scope.productId = "";
	$scope.type = "";

	$scope.initEntity = function() {
		stockService
			.gets($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntity = result.data;
					console.log(result.data)
					$scope.goodsId = $scope.dataEntity[0].goodsId;
					$scope.id = $scope.dataEntity[0].id;
					$scope.choose($scope.id);
					// for (var i = 0; i < $scope.dataEntity.length; i++) {
					// 	if ($scope.productId == $scope.dataEntity[i].id) {
					// 		$scope.id1 = i;
					// 		$scope.id = $scope.productId;
					// 		$scope.goodsId = $scope.dataEntity[i].goodsId;
					// 	}
					// }
					// $scope.stock = $scope.dataEntity.stock;

				}
			);
	};
	$scope.initEntity();
	$scope.choose = function(id) {
		$scope.productId = id;
		$scope.initEntitys = function() {
			stockService
				.gets($scope.dataId)
				.then(
					function(result) {
						$scope.dataEntity = result.data;
						for (var i = 0; i < $scope.dataEntity.length; i++) {
							if ($scope.productId == $scope.dataEntity[i].id) {
								$scope.id1 = i;
								$scope.id = $scope.productId;
								$scope.goodsId = $scope.dataEntity[i].goodsId;
							}
						}
						$scope.stock = $scope.dataEntity.stock;

					}
				);
		};
		$scope.initEntitys();

	};


	$scope.okModal = function(num, text, status) {
		if ($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		var userId = localStorage.userId;
		var userName = localStorage.userName;
		// var type = $scope.status;
		// var num = $scope.num;
		// var text = $scope.text;
		if (status == 1 || status == 3) {
			var num = num;
		} else {
			var num = -num;
			// if (-$scope.stock > num) {
			// 	$rootScope.showAlert("减少库存数不大于现有库存");
			// 	$scope.okModalDisabled = false;
			// 	return 0;
			// }
		}
		var res = {
			'goodsId': $scope.goodsId,
			'productId': $scope.id,
			'optId': userId,
			'optName': userName,
			'changeType': status,
			'changeNum': num,
			'remark': text,

		};
		console.log(res)

		if (num == '' || num == null || num == undefined || text == '' || text == null || text == undefined) {
			$rootScope.showAlert("修改库存不能为空！");
			$scope.okModalDisabled = false;
			return 0;
		}

		stockService
			.put(res)
			.then(
				function(result) {
					$scope.okModalDisabled = false;
					var imgUrl = "";
					$scope.cancelModal();
					$scope.loadData();

				},
				function(result) {
					$scope.okModalDisabled = false;
				}
			);
	}

	$scope.cancelModal = function() {
		$scope.dialog.close();
		$scope.loadData();

	};




}


angular
	.module('managerApp')
	.controller('stockController', stockController)
	.controller('stockFormModalController', stockFormModalController)
	.controller('stocksFormModalController', stocksFormModalController)
