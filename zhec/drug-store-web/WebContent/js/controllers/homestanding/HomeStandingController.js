function HomeStandingController($rootScope, $scope, $q, $http, constPageSize, goodsReminder, HomeStandingService, ngDialog) {
	$scope.standId = ""; //药品推荐Id$rootScope, $scope, $http, $q, constPageSize, goodsReminder, , ngDialog

	//列表
	$scope.find = function(currentPageNo, currentPaseSize) {
		$scope.drugstoreId = localStorage.drugstoreId; //	分店ID取登录时获得的
		var defer = $q.defer();
		HomeStandingService
			.find($scope.drugstoreId, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.standList = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result)
			})
		return defer.promise;
	}

	/**
	 * 弹出商品数据模态框
	 */
	$scope.openModal = function() {
		$scope.dialog = ngDialog.open({
			template: 'views/homestanding/HomeStandingformModel.html',
			className: 'ngdialog-theme-default',
			controller: 'HomeStandingformModelController',
			scope: $scope,
			width: 1150
		})
	};
	/**
	 * 弹出添加家庭药品数据模态框
	 */
	$scope.opengoods = function(standId, storeId, goodsId, storeName, name1, boller) {
		$scope.standId = standId;
		$scope.storeId = storeId;
		$scope.goodsId = goodsId;
		$scope.store = storeName;
		$scope.name1 = name1;
		$scope.databoll = boller
		$scope.dialog1 = ngDialog.open({
			template: 'views/homestanding/HomeStandingformModel1.html',
			className: 'ngdialog-theme-default',
			controller: 'HomeStandingformModel1Controller',
			scope: $scope,
			width: 1150
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
			HomeStandingService
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
			HomeStandingService
				.enable(id, status)
				.then(function(result) {
					$scope.loadData()
				}),
				function(reason) {}
		})
	}
	//弹窗在售关闭
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
	//弹窗新增关闭
	$scope.cancelModal1 = function() {
		$scope.dialog1.close();
	}

}

function HomeStandingformModelController($scope, $q, HomeStandingService) {
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var thirdCateObj = $scope.thirdCateObj;
		var cateId = '';
		if(thirdCateObj) {
			cateId = thirdCateObj.cateId;
		} else {
			cateId = '';
		}
		var drugstoreIdSearch = localStorage.drugstoreId; //	分店ID取登录时获得的
		if(!drugstoreIdSearch) {
			drugstoreIdSearch = '';
		}
		HomeStandingService
			.findgoods(currentPageNo, currentPaseSize, $scope.infoNameSearch, cateId, drugstoreIdSearch,3)
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
		HomeStandingService
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

		HomeStandingService
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
//操作弹窗新增药品controller
function HomeStandingformModel1Controller($scope, HomeStandingService) {
	if($scope.standId) {
		HomeStandingService
			.detali($scope.standId)
			.then(function(result) {
				$scope.recomEntiy = result.data

			}, function(reson) {

			})
	} else {
		$scope.recomEntiy = {
			"drugstoreId": localStorage.drugstoreId, //	分店ID取登录时获得的
			"goodsId": $scope.goodsId,
			"status": 1,
			"sort": 1
		}

	}
	//保存操作
	$scope.okModal = function() {
		if($scope.standId) {
			HomeStandingService
				.edit($scope.recomEntiy)
				.then(function(result) {
					$scope.cancelModal1()
					$scope.loadData()
				}, function(reason) {

				})

		} else {
			HomeStandingService
				.add($scope.recomEntiy)
				.then(function(result) {
					$scope.cancelModal1();
					$scope.cancelModal();
					$scope.loadData();
				}, function(reason) {

				})
		}
	}

}

angular
	.module('managerApp')
	.controller('HomeStandingController', HomeStandingController)
	.controller('HomeStandingformModelController', HomeStandingformModelController)
	.controller("HomeStandingformModel1Controller", HomeStandingformModel1Controller)