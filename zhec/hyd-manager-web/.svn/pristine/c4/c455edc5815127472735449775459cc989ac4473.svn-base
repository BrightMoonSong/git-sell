function CarownerOkController($scope, $q, $http, $rootScope, CarownerOkService, constPageSize, ngDialog, goodsReminder) {
  $scope.WdatePicker = {}; //日期

  //审核通过列表
  $scope.find = function(currentPageNo, currentPaseSize) {
    var defer = $q.defer();
    var realName = $scope.realName;
    var phone = $scope.phone;
    var carLicenseNo = $scope.carLicenseNo;
    $scope.startTime = $scope.WdatePicker.startTimes;
    CarownerOkService
      .find(realName, phone, carLicenseNo, $scope.startTime, currentPageNo, currentPaseSize)
      .then(function(result) {
        $scope.carList = result.data;
        defer.resolve(result);
      }, function(result) {
        defer.reject(result)
      })
    return defer.promise;
  }
  // huozhu
  $scope.onClickTab = function(url) {
    if ($scope.currentTab == url) {
      return true;
    }
    $scope.currentTab = url;
    $scope.curentNum = 0;
      $scope.WdatePicker = {}; //日期
    switch (url) {
      case 'carowner.html':
        $scope.find = function(currentPageNo, currentPaseSize) {
          var defer = $q.defer();
          var realName = $scope.realName;
          var phone = $scope.phone;
          var carLicenseNo = $scope.carLicenseNo;
          $scope.startTime = $scope.WdatePicker.startTimes;
          CarownerOkService
            .find(realName, phone, carLicenseNo, $scope.startTime, currentPageNo, currentPaseSize)
            .then(function(result) {
              $scope.carList = result.data;
              defer.resolve(result);
            }, function(result) {
              defer.reject(result)
            })
          return defer.promise;
        }
        if ($scope.curentNum != 0) {
          $scope.loadData(true);
        }
        $scope.curentNum++;
        break;
      case 'shipper.html':
        //审核未通过列表
        $scope.find = function(currentPageNo, currentPaseSize) {

          var defer = $q.defer();
          var realNames = $scope.realNames;
          var phones = $scope.phones;
          $scope.startTime = $scope.WdatePicker.startTimes;
          CarownerOkService
            .shipperfind(realNames, phones, $scope.startTime, currentPageNo, currentPaseSize)
            .then(function(result) {
              $scope.shipperList = result.data;
              defer.resolve(result);
            }, function(result) {
              defer.reject(result)
            })
          return defer.promise;
        }
        $scope.loadData(true)
        break;


    }
  }
  //弹出详情菜单弹窗
  $scope.openModal = function(id, dataBollea) {
    $scope.carOwnerId = id;
    $scope.dataBollea = dataBollea;
    $scope.dialog = ngDialog.open({
      template: 'views/carowner/CarownerDetailFormModel.html',
      className: 'ngdialog-theme-default',
      controller: 'CarownerOkDetailFormModelController',
      scope: $scope,
      width: 1150
    })
  };

  //启禁用操作
  $scope.enableId = function(id, status) {
    var chainstouses;
    if (status == 1) {
      //0禁1启
      chainstouses = goodsReminder.goodsState.enable;
    } else if (status == 2) {
      chainstouses = goodsReminder.goodsState.forbidden;
    } else if (status == 3) {
      chainstouses = goodsReminder.goodsbranddelete;
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
      CarownerOkService
        .detel(id, status)
        .then(function(result) {
          $scope.loadData()
        }),
        function(reason) {}
    })
  }
  //关闭详情弹窗
  $scope.cancelModal = function() {
    $scope.dialog.close();
  }

  // huozhu
  //弹出详情菜单弹窗
  $scope.openModalshipper = function(id, dataBollea) {
    $scope.shipperId = id;
    $scope.dataBollea = dataBollea;
    $scope.dialogshipper = ngDialog.open({
      template: 'views/carowner/ShipperDetailFormModel.html',
      className: 'ngdialog-theme-default',
      controller: 'ShipperDetailFormModelController',
      scope: $scope,
      width: 1150
    })
  };
  //弹出修改菜单弹窗
  $scope.openSetModalshipper = function(id, settlementMethod) {
    $scope.shipperId = id;
    $scope.settlementMethod = settlementMethod;
    $scope.dialogshipper1 = ngDialog.open({
      template: 'views/carowner/ShipperOkFormModel.html',
      className: 'ngdialog-theme-default',
      controller: 'ShipperOkFormModelController',
      scope: $scope,
      width: 850
    })
  };
  //启禁用操作
  $scope.deteletes = function(id, status) {
    var chainstouses;
    if (status == 1) {
      //0禁1启
      chainstouses = goodsReminder.goodsState.enable;
    } else if (status == 2) {
      chainstouses = goodsReminder.goodsState.forbidden;
    } else if (status == 3) {
      chainstouses = goodsReminder.goodsbranddelete;
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
      CarownerOkService
        .shipperenable(id, status)
        .then(function(result) {
          $scope.loadData()
        }),
        function(reason) {}
    })
  }
  //关闭详情弹窗
  $scope.cancelModalshipper = function() {
    $scope.dialogshipper.close();
  }
  //关闭修改弹窗
  $scope.cancelModalshipper1 = function() {
    $scope.dialogshipper1.close();
  }
  $scope.check = function(q) {
    $scope.settlementMethod = q;
  }
	  $scope.onClickTab('carowner.html');
}
//弹窗详情操作
function CarownerOkDetailFormModelController($scope, ngDialog, CarownerOkService, $q) {
  $scope.companyNatures = function(n) {
    switch (n) {
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
    switch (j) {
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
  //弹出Gps菜单弹窗
  $scope.openModals = function(id, isGps) {
    $scope.carOwnerId = id;
    $scope.isGps = isGps;
    $scope.dialog1 = ngDialog.open({
      template: 'views/carowner/CarownerisGpsFormModel.html',
      className: 'ngdialog-theme-default',
      controller: 'CarownerisGpsFormModelController',
      scope: $scope,
      width: 1150
    })
  };
  //关闭详情弹窗
  $scope.cancelModal1 = function() {
    $scope.dialog1.close();
  }
  //详情初始化
  $scope.innter = function() {
    if ($scope.carOwnerId) {
      CarownerOkService
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
    CarownerOkService
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
    if ($scope.currentTab == url) {
      return true;
    }
    $scope.currentTab = url;
    switch (url) {
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
//修改Gps弹窗操作
function CarownerisGpsFormModelController($scope, CarownerOkService) {
  $scope.okModal = function() {
    CarownerOkService
      .editGps($scope.isGps, $scope.carOwnerId)
      .then(function(result) {
        $scope.cancelModal1();
        $scope.cancelModal();
      })
  }
  ////操作Gps
  $scope.checked = function(n) {
    $scope.isGps = n;
  }
}
// huozhu
//弹窗详情操作
function ShipperDetailFormModelController($scope, $q,CarownerOkService) {
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
		if($scope.shipperId) {
			CarownerOkService
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
		CarownerOkService
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

	$scope.onClickTab('cardetail.html');
}
//修改弹窗操作
function ShipperOkFormModelController($scope, CarownerOkService) {

	$scope.okModal = function() {
		if($scope.shipperId) {
			CarownerOkService
				.shipperedit($scope.shipperId, $scope.settlementMethod)
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
  .controller("CarownerOkController", CarownerOkController)
  .controller("CarownerOkDetailFormModelController", CarownerOkDetailFormModelController)
  .controller("CarownerisGpsFormModelController", CarownerisGpsFormModelController)
	.controller("ShipperDetailFormModelController", ShipperDetailFormModelController)
	.controller("ShipperOkFormModelController", ShipperOkFormModelController)
