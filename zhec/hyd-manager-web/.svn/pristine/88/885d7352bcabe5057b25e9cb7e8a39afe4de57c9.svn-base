function ShipperPendingController($scope, $q, $http, $rootScope, ShipperPendingService, constPageSize, ngDialog, goodsReminder) {
	$scope.WdatePicker = {}; //日期
	//待审核列表
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var realName = $scope.realName;
		var phone = $scope.phone;
		$scope.startTime = $scope.WdatePicker.startTimes;
		ShipperPendingService
			.find(realName, phone, $scope.startTime, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.shipperList = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result)
			})
		return defer.promise;
	}
	//弹出详情菜单弹窗
	$scope.openModal = function(id) {
		$scope.shipperId = id;
		$scope.dialog = ngDialog.open({
			template: 'views/shipper/ShipperPendingDetailFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'ShipperPendingDetailFormModelController',
			scope: $scope,
			width: 1150
		})
	};
	//弹出审核菜单弹窗
	$scope.openCheck = function(id, checkStatus) {
		$scope.shipperId = id;
		$scope.checkStatus = checkStatus;
		$scope.dialog1 = ngDialog.open({
			template: 'views/shipper/ShipperPendingFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'ShipperPendingFormModelController',
			scope: $scope,
			width: 850
		})
	};

	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
	//关闭弹窗
	$scope.cancelModal1 = function() {
		$scope.dialog1.close();
	}
}

//操作弹出详情
function ShipperPendingDetailFormModelController($scope, $q,ShipperPendingService) {
	$scope.checkStatus = function(j) {
		switch(j) {
			case 1:
				return '注册未提交审核';
				break;
			case 2:
				return '提交审核（待审核）';
				break;
			case 3:
				return '审核通过';
				break;
			case 4:
				return '审核不通过';
				break;
		}
	}
	$scope.companyNatures = function(n) {
		switch(n) {
			case 1:
				return '国有';
				break;
			case 2:
				return '集体';
				break;
			case 3:
				return '有限责任';
				break;
			case 4:
				return '股份有限';
				break;
			case 5:
				return '中外合资';
				break;
			case 6:
				return '外商投资';
				break;
		}
	}
	//初始化
	$scope.innter = function() {
		if($scope.shipperId) {
			ShipperPendingService
				.detail($scope.shipperId)
				.then(function(result) {
					$scope.shipperEntiy = result.data;
					$scope.dataArry = [1, 2, 3, 8];
				}, function(reason) {

				})
		}
	}
	//弹窗页面
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		ShipperPendingService
			.seach($scope.shipperId, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.carowerSear = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result)
			})
		return defer.promise;
	}
	//标签页
	$scope.onClickTab = function(url) {
		if($scope.currentTab == url) {
			return true;
		}
		$scope.currentTab = url;
		switch(url) {
			case 'cardetail.html': //车主详情
				$scope.innter(); //初始化基本信息数据
				break;
			case 'carownerch.html': //审核记录
//				$scope.search(); //初始化基本信息数据
				break;
		}
	}
//初始化页面
	$scope.onClickTab('cardetail.html');
}
//审核操作
function ShipperPendingFormModelController($scope, ShipperPendingService) {
	$scope.shipperEntiy = {};
	$scope.settlementMethod=1
	
	$scope.check = function(n) {
		$scope.settlementMethod = n;
	}
	console.log($scope.shipperEntiy)
	$scope.disabledtrue=false;
		if($scope.checkStatus==4){
				if(!$scope.shipperEntiy.remark){
					$scope.disabledtrue=true;
				}
			}
	$scope.okModal = function() {
		if($scope.shipperId) {
		console.log( $scope.settlementMethod)
			ShipperPendingService
				.check($scope.shipperId, $scope.checkStatus, $scope.shipperEntiy.remark, $scope.settlementMethod)
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
	.module("managerApp")
	.controller("ShipperPendingController", ShipperPendingController)
	.controller("ShipperPendingDetailFormModelController", ShipperPendingDetailFormModelController)
	.controller("ShipperPendingFormModelController", ShipperPendingFormModelController)