/**
 * 品牌管理
 */
function HomeHotRecommendController($rootScope, $scope, $http, $q, constPageSize, goodsReminder, GoodsOnSaleService, HomeHotRecommendService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	/**
	 * 搜索
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		$scope.drugstoreIdSearch1 = localStorage.drugstoreId;//	分店ID取登录时获得的
		var drugstoreId = $scope.drugstoreIdSearch1;
		HomeHotRecommendService
			.find(currentPageNo, currentPaseSize, drugstoreId)
			.then(function(result) {
					$scope.homeHotRecommendList = result.data;
					defer.resolve(result);
				},
				function(result) {
					//alert("该用户不存在");
					defer.reject(result);
				})
		return defer.promise;
	}

	/**
	 * 获取树形分类列表，返回全部分类数据
	 */
	$scope.findallCate = function() {
		GoodsOnSaleService
			.findall()
			.then(
				function(result) {
					$scope.allCateList = result.data;
				},
				function(result) {

				});
	}
	//$scope.findallCate();

	//获取所有连锁店列表--一级
//	$scope.drugfindall = function() {
//		GoodsOnSaleService
//			.drugfindall()
//			.then(
//				function(result) {
//					$scope.drugAllNameList = result.data;
//					$scope.drugAllNameListSearch = result.data;
//				},
//				function(result) {
//
//				});
//	}
//	$scope.drugfindall(); //获取所有连锁店列表
//	//根据连锁店ID列出所有连锁店子药店列表--二级
//	$scope.drugstoreById = function(id) {
//		if(!id) {
//			$scope.drugSecondNameList = [];
//			return false;
//		}
//		GoodsOnSaleService
//			.drugstoreById(id)
//			.then(
//				function(result) {
//					$scope.drugSecondNameList = result.data;
//				},
//				function(result) {
//
//				});
//	}
//	$scope.drugstoreById2 = function(id) {
//		if(!id) {
//			$scope.drugSecondNameListSearch = [];
//			return false;
//		}
//		GoodsOnSaleService
//			.drugstoreById(id)
//			.then(
//				function(result) {
//					$scope.drugSecondNameListSearch = result.data;
//				},
//				function(result) {
//
//				});
//	}

	/**
	 * 根据PID获取子分类列表
	 */
	$scope.findinfosbypid = function(id, n) {
		if(!id) {
			switch(n) {
				case 1: //一级选中的
					$scope.secCateList = [];
					$scope.thirdCateList = [];
					return false;
					break;
				case 2: //二级选中的
					$scope.thirdCateList = [];
					return false;
					break;
			}
		}
		GoodsOnSaleService
			.findinfosbypid(id)
			.then(
				function(result) {
					switch(n) {
						case 1: //一级选中的
							$scope.secCateList = result.data;
							$scope.thirdCateList = [];
							break;
						case 2: //二级选中的
							$scope.thirdCateList = result.data;
							break;
					}
				},
				function(result) {
				});
	}

	/**
	 * 弹出修改/添加数据模态框
	 */
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		if($scope.dataId) { //修改
			$scope.dialog2 = ngDialog.open({
				template: 'views/homemanagement/homeHotRecommendModel.html',
				className: 'ngdialog-theme-default',
				controller: 'HomeHotRecommendModelController',
				scope: $scope,
				width: 1150
			})
		} else { //新增
			$scope.dialog = ngDialog.open({
				template: 'views/homemanagement/homeHotRecommendModelOnSale.html',
				className: 'ngdialog-theme-default',
				controller: 'HomeHotRecommendModelOnSaleController',
				scope: $scope,
				width: 1150
			})
		}
	};

	/**
	 * 启用/禁用/删除首页热门商品推荐
	 * @param {Object} recommendId 热门商品推荐 的ID
	 * @param {Object} status 热门商品推荐 的状态值
	 */
	$scope.updataStatus = function(recommendId, status) {
		var reminder; //提示语
		switch(status) {
			case 0:
				reminder = "确定禁用吗？"; //提示语
				break;
			case 1:
				reminder = "确定启用吗？"; //提示语
				break;
			case 2:
				reminder = "确定删除吗？"; //提示语
				break;
		}

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
			switch(status) {
				case 0:
					reminder = "确定禁用吗？"; //提示语
					break;
				case 1:
					reminder = "确定启用吗？"; //提示语
					break;
				case 2:
					reminder = "确定删除吗？"; //提示语
					break;
			}
			switch(status) {
				case 2:
					HomeHotRecommendService
						.delete(recommendId)
						.then(
							function(result) {
								if(result.code >= 0) {
									$scope.loadData(); //刷新
								}
							},
							function(result) {

							});
					break;
				default:
					HomeHotRecommendService
						.updatestatus(recommendId, status)
						.then(
							function(result) {
								if(result.code >= 0) {
									$scope.loadData(); //刷新
								}
							},
							function(result) {

							});
					break;
			}
		}, function(reason) {

		});
	}

	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
}

function HomeHotRecommendModelOnSaleController($scope, topicService, $q, ngDialog) {
	$scope.findallCate();
	//弹窗 分页 //获取在售商品列表
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var thirdCateObj = $scope.thirdCateObj;
		var cateId = '';
		if(thirdCateObj) {
			cateId = thirdCateObj.cateId;
		} else {
			cateId = '';
		}
		$scope.drugstoreIdSearch = localStorage.drugstoreId;//	分店ID取登录时获得的
		var drugstoreIdSearch = $scope.drugstoreIdSearch;
		if(!drugstoreIdSearch) {
			drugstoreIdSearch = '';
		}
		topicService.findinfosforrec(currentPageNo, currentPaseSize, $scope.infoNameSearch, cateId, drugstoreIdSearch, 1).then(
			function(result) {
				$scope.goodsList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			});
		return defer.promise;
	};
	//双击选择 添加热门商品
	$scope.dblclickGoods = function(res) {
		$scope.selectedGoodHot = clone(res);
		$scope.dialog2 = ngDialog.open({
			template: 'views/homemanagement/homeHotRecommendModel.html',
			className: 'ngdialog-theme-default',
			controller: 'HomeHotRecommendModelController',
			closeByDocument: false, //点击遮罩区域不关闭弹窗
			scope: $scope,
			width: 1150
		})
	}
}
//双击选择 添加/修改 热门商品    的Controller
function HomeHotRecommendModelController($scope, HomeHotRecommendService) {
	$scope.initEntity = function() {
		if($scope.dataId) { //修改
			HomeHotRecommendService
				.getByRecommendId($scope.dataId)
				.then(
					function(result) {
						$scope.dataEntity = result.data;
					},
					function(result) {

					});
		} else { //新增
			$scope.dataEntity = {
				'goodsName': $scope.selectedGoodHot.name1,
				'goodsImg': $scope.selectedGoodHot.masterImg,
				'goodsSpec': $scope.selectedGoodHot.specification, //规格信息
				'goodsPrice': $scope.selectedGoodHot.salesPrice, //商品销售价
				'drugstoreId': $scope.selectedGoodHot.storeId, //药店ID
				'sort': 1, //排序号 ,
				'hot': 0,
				'goodsId': $scope.selectedGoodHot.goodsId,
				'status': 1 //状态：0禁用，1启用，2删除 ,
			}
		}
	}
	$scope.initEntity();
	//添加/修改 热门推荐保存
	$scope.okModal = function() {
		if($scope.okModalDisabled) {
			return false;
		}
		$scope.okModalDisabled = true;
		if($scope.dataId) { //修改
			HomeHotRecommendService
				.update($scope.dataEntity)
				.then(
					function(result) {
						if(result.code >= 0) {
							$scope.cancelModal2();
							$scope.loadData();
						}
						$scope.okModalDisabled = false;
					},
					function(result) {
						$scope.okModalDisabled = false;
					});
		} else { //新增
			HomeHotRecommendService
				.addhotgoods($scope.dataEntity)
				.then(
					function(result) {
						if(result.code >= 0) {
							$scope.cancelModal2();
							$scope.cancelModal();
							$scope.loadData();
						}
						$scope.okModalDisabled = false;
					},
					function(result) {
						$scope.okModalDisabled = false;
					});
		}

	}
	//关闭弹窗
	$scope.cancelModal2 = function() {
		$scope.dialog2.close();
	}
}

angular
	.module('managerApp')
	.controller('HomeHotRecommendController', HomeHotRecommendController)
	.controller('HomeHotRecommendModelOnSaleController', HomeHotRecommendModelOnSaleController)
	.controller('HomeHotRecommendModelController', HomeHotRecommendModelController)