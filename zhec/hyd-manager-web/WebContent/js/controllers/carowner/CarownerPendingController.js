function CarownerPendingController($scope, $q, $http, $rootScope, CarownerPendingService, constPageSize, ngDialog, goodsReminder) {
	$scope.id = "" //操作当前id
	$scope.WdatePicker = {}; //日期
	//待审核列表
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var realName = $scope.realName;
		var phone = $scope.phone;
		var carLicenseNo = $scope.carLicenseNo;
		$scope.startTime = $scope.WdatePicker.startTimes;
		CarownerPendingService
			.find(realName, phone, carLicenseNo, $scope.startTime, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.carList = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result)
			})
		return defer.promise;
	}
	//biaoqian
	$scope.onClickTab=function (url){
		if($scope.currentTab==url){
			return true;
		}
		$scope.currentTab=url;
		$scope.curentNum=0;
		$scope.WdatePicker = {}; //日期
		switch (url) {
			case 'carowner.html':
			$scope.find = function(currentPageNo, currentPaseSize) {
				var defer = $q.defer();
				var realName = $scope.realName;
				var phone = $scope.phone;
				var carLicenseNo = $scope.carLicenseNo;
				$scope.startTime = $scope.WdatePicker.startTimes;
				CarownerPendingService
					.find(realName, phone, carLicenseNo, $scope.startTime, currentPageNo, currentPaseSize)
					.then(function(result) {
						$scope.carList = result.data;
						defer.resolve(result);
					}, function(result) {
						defer.reject(result)
					})
				return defer.promise;
			}
			if($scope.curentNum!=0){
				$scope.loadData(true);
			}
			$scope.curentNum++;

				break;
				case 'shipper.html':
				$scope.find = function(currentPageNo, currentPaseSize) {
					var defer = $q.defer();
					var realNames = $scope.realNames;
					var phones = $scope.phones;
					$scope.startTime = $scope.WdatePicker.startTimes;
					CarownerPendingService
						.shipperfind(realNames, phones, $scope.startTime, currentPageNo, currentPaseSize)
						.then(function(result) {
							$scope.shipperList = result.data;
							defer.resolve(result);
						}, function(result) {
							defer.reject(result)
						})
					return defer.promise;
				}
				$scope.loadData(true);
					break;


		}
	}
	//弹出详情菜单弹窗
	$scope.openModal = function(id) {
		$scope.carOwnerId = id;
		$scope.dialog = ngDialog.open({
			template: 'views/carowner/CarownerPendingDetailFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'CarownerPendingDetailFormModelController',
			scope: $scope,
			width: 1150
		})
	};
	//弹出审核备注弹窗
	$scope.openCheck = function(id, checkStatus) {
		$scope.carOwnerId = id;
		$scope.checkStatus = checkStatus;
		$scope.dialog1 = ngDialog.open({
			template: 'views/carowner/CarownerPendingFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'CarownerPendingFormModelController',
			scope: $scope,
			width: 850
		})
	};
	//关闭详情弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
	//关闭审核弹窗
	$scope.cancelModal1 = function() {
		$scope.dialog1.close();
	}
	// huozhu
	//弹出详情菜单弹窗
	$scope.openModalshipper = function(id) {
		$scope.shipperId = id;
		$scope.dialogshipper = ngDialog.open({
			template: 'views/carowner/ShipperPendingDetailFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'ShipperPendingDetailFormModelController',
			scope: $scope,
			width: 1150
		})
	};
	//弹出审核菜单弹窗
	$scope.openCheckshipper = function(id, checkStatus) {
		$scope.shipperId = id;
		$scope.checkStatus = checkStatus;
		$scope.dialogshipper1 = ngDialog.open({
			template: 'views/carowner/ShipperPendingFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'ShipperPendingFormModelController',
			scope: $scope,
			width: 850
		})
	};

	//关闭弹窗
	$scope.cancelModalshipper = function() {
		$scope.dialogshipper.close();
	}
	//关闭弹窗
	$scope.cancelModalshipper1 = function() {
		$scope.dialogshipper1.close();
	}
	$scope.onClickTab('carowner.html')
}
//弹窗详情操作
function CarownerPendingDetailFormModelController($scope, $q,CarownerPendingService) {
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

	$scope.innter = function() {
		if($scope.carOwnerId) {
			CarownerPendingService
				.detail($scope.carOwnerId)
				.then(function(result) {
					$scope.carOwnerEntiy = result.data;
					$scope.dataArry = [1, 2, 3, 4, 5, 6, 7, 8];
				}, function(reason) {

				})
		}
	}
	//弹窗页面
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		CarownerPendingService
			.seach($scope.carOwnerId, currentPageNo, currentPaseSize)
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

	$scope.onClickTab('cardetail.html');

}
//弹窗操作
function CarownerPendingFormModelController($scope, CarownerPendingService) {
	$scope.carOwnerEntiy = {};
	$scope.disabledtrue=false;
	if($scope.checkStatus==4){
		if(!$scope.carOwnerEntiy.remark){
			$scope.disabledtrue=true;
		}
	}
	//保存操作
	$scope.okModal = function() {
		CarownerPendingService
			.check($scope.carOwnerId, $scope.checkStatus, $scope.carOwnerEntiy.remark)
			.then(function(result) {
				$scope.cancelModal();
				$scope.cancelModal1();
				$scope.loadData();
			}, function(reason) {

			})
	}
	//切换操作
	$scope.checks = function(n) {
		$scope.carEntiy.checkStatus = n;
	}
	//关闭详情弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
	//关闭审核弹窗
	$scope.cancelModal1 = function() {
		$scope.dialog1.close();
	}

}

//huozhu
//操作弹出详情
function ShipperPendingDetailFormModelController($scope, $q,CarownerPendingService) {
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
			CarownerPendingService
				.shipperdetail($scope.shipperId)
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
		CarownerPendingService
			.shipperseach($scope.shipperId, currentPageNo, currentPaseSize)
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
function ShipperPendingFormModelController($scope, CarownerPendingService) {
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
			CarownerPendingService
				.shippercheck($scope.shipperId, $scope.checkStatus, $scope.shipperEntiy.remark, $scope.settlementMethod)
				.then(function(result) {
					$scope.cancelModalshipper();
					$scope.cancelModalshipper1();
					$scope.loadData();
				}, function(reason) {

				})
		}
	}
}

angular
	.module("managerApp")
	.controller("CarownerPendingController", CarownerPendingController)
	.controller("CarownerPendingDetailFormModelController", CarownerPendingDetailFormModelController)
	.controller("CarownerPendingFormModelController", CarownerPendingFormModelController)
	.controller("ShipperPendingDetailFormModelController", ShipperPendingDetailFormModelController)
	.controller("ShipperPendingFormModelController", ShipperPendingFormModelController)
