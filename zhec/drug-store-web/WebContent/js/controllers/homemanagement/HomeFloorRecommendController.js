/**
 * 品牌管理
 */
function HomeFloorRecommendController($rootScope, $scope, $http, $q, constPageSize, goodsReminder, HomeFloorRecommendService, ngDialog) {
	$scope.recommendId = ""; //当前操作的数据id
	/**
	 * 搜索
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		$scope.drugstoreId = localStorage.drugstoreId; //	分店ID取登录时获得的
		var drugstoresId = $scope.drugstoreId;
		var floorsId = $scope.floorId;
		HomeFloorRecommendService
			.find(drugstoresId, floorsId, currentPageNo, currentPaseSize)
			.then(function(result) {
					$scope.recomList = result.data;
					defer.resolve(result);
				},
				function(result) {
					//alert("该用户不存在");
					defer.reject(result);
				})
		return defer.promise;
	}
	//获取楼层分类数据
	$scope.floorall = function() {
		HomeFloorRecommendService
			.floorall()
			.then(function(result) {
				$scope.floorList = result.data
			}, function(result) {})
	}
	$scope.floorall();

	/**
	 * 弹出添加弹窗  --- 楼层管理的列表 --第一个弹窗
	 */
	$scope.addFoolOpenModal = function() {
		$scope.dialog = ngDialog.open({
			template: 'views/homemanagement/HomeFloorRecommendformModel1.html',
			className: 'ngdialog-theme-default',
			controller: 'HomeFloorRecommendformModel1Controller',
			scope: $scope,
			width: 1150
		})
	};
	/**
	 * 添加时---点击新增---弹出在售商品  ---第二个弹窗
	 */
	$scope.openModal2 = function(floorId, name) {
		$scope.floorIds = floorId;
		$scope.name = name;
		$scope.dialog2 = ngDialog.open({
			template: 'views/homemanagement/HomeFloorRecommendformModel2.html',
			className: 'ngdialog-theme-default',
			controller: 'HomeFloorRecommendformModel2Controller',
			scope: $scope,
			width: 1150
		})
	};
	/**
	 * 添加时---点击新增---弹出添加的首页楼层商品推荐信息  ---第三个弹窗
	 */
	$scope.openModal3 = function(recommendId, goodsId, drugId, goodsname, boller) {
		$scope.recommendId = recommendId
		$scope.databoll = boller;
		$scope.goodsId = goodsId;
		$scope.chainId = drugId;
		$scope.name1 = goodsname;
		$scope.dialog3 = ngDialog.open({
			template: 'views/homemanagement/HomeFloorRecommendformModel3.html',
			className: 'ngdialog-theme-default',
			controller: 'HomeFloorRecommendformModel3Controller',
			scope: $scope,
			width: 850
		})
	};

	//删除操作
	$scope.deleteById = function(id) {
		var chainstouses;
		chainstouses = goodsReminder.goodsbranddelete;
		ngDialog.openConfirm({
			template: '<p>' + chainstouses + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			HomeFloorRecommendService
				.delete(id)
				.then(function(result) {
					$scope.loadData()
				}),
				function(reason) {}
		})
	}
	//启禁用操作
	$scope.enableById = function(id, status) {
		var chainstouses;
		if(status == 1) {
			//0禁1启
			chainstouses = goodsReminder.goodsState.enable;
		} else {
			chainstouses = goodsReminder.goodsState.forbidden;
		}
		ngDialog.openConfirm({
			template: '<p>' + chainstouses + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			HomeFloorRecommendService
				.enable(id, status)
				.then(function(result) {
					$scope.loadData()
				}),
				function(reason) {}
		})
	}
	//弹窗楼层关闭
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
	//弹窗在售商品关闭
	$scope.cancelModal2 = function() {

		$scope.dialog2.close();
	}
	//弹窗在售商品关闭
	$scope.cancelModal3 = function() {

		$scope.dialog3.close();
	}
}

//操纵弹窗controller 楼层
function HomeFloorRecommendformModel1Controller($scope, $q, $http, HomeFloorRecommendService, ngDialog) {
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var names= $scope.names;
		if(!names){
			names="";
		}
		HomeFloorRecommendService
			.findfloor(names,currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.homefloorList = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			})
			return defer.promise;
	}
}
//在售商品controller
function HomeFloorRecommendformModel2Controller($scope, $q, $http, HomeFloorRecommendService, ngDialog) {
	/**
	 * 数据初始化
	 */
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var thirdCateObj = $scope.thirdCateObj;
		var secCateObjs=$scope.secCateObj;
		var cateId = '';
		if(thirdCateObj) {
			cateId = thirdCateObj.cateId;
		} else {
			cateId = '';
		}
		var drugstoreIdSearch = localStorage.drugstoreId; //	分店ID取登录时获得的
		HomeFloorRecommendService
			.findgoods(currentPageNo, currentPaseSize, $scope.infoNameSearch, cateId, drugstoreIdSearch,2)
			.then(function(result) {
					$scope.goodsList = result.data;
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	};
	/**
	 * 获取树形分类列表，返回全部分类数据
	 */
	$scope.findallCate = function() {
		HomeFloorRecommendService
			.findall()
			.then(
				function(result) {
					$scope.allCateList = result.data;
				},
				function(result) {

				});
	}
	$scope.findallCate();

	/**
	 * 根据PID获取子分类列表
	 */
	$scope.findinfosbypid = function(id, n) {
		if(!id) {
			switch(n) {
				case 1: //一级选中的
					$scope.secCateList = [];
					$scope.thirdCateList = [];
					break;
				case 2: //二级选中的
					$scope.thirdCateList = [];
					break;
			}
			return 0;
		}
		HomeFloorRecommendService
			.findinfosbypid(id)
			.then(function(result) {
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
}
//操作添加商品controller
function HomeFloorRecommendformModel3Controller($scope, HomeFloorRecommendService) {
	if($scope.recommendId) {
		HomeFloorRecommendService
			.detail($scope.recommendId)
			.then(function(result) {
				$scope.recomEntiy = result.data;
			}, function(result) {

			})
	} else {
		$scope.recomEntiy = {
			"status": 1,
			"floorId": $scope.floorIds,
			"goodsId": $scope.goodsId,
			"drugstoreId": localStorage.drugstoreId, //	分店ID取登录时获得的
			"sort": 1
		}
	}
	//保存操作
	$scope.okModal = function() {
		if($scope.recommendId) {
			HomeFloorRecommendService
				.edit($scope.recomEntiy)
				.then(function(result) {
					$scope.cancelModal3();
					$scope.loadData();
				}, function(reson) {

				})
		} else {
			HomeFloorRecommendService
				.add($scope.recomEntiy)
				.then(function(result) {
					$scope.cancelModal();
					$scope.cancelModal2();
					$scope.cancelModal3();
					$scope.loadData();
				})
		}
	}
}
angular
	.module('managerApp')
	.controller('HomeFloorRecommendController', HomeFloorRecommendController)
	.controller("HomeFloorRecommendformModel1Controller", HomeFloorRecommendformModel1Controller)
	.controller("HomeFloorRecommendformModel2Controller", HomeFloorRecommendformModel2Controller)
	.controller("HomeFloorRecommendformModel3Controller", HomeFloorRecommendformModel3Controller)