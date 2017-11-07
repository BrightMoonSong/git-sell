function CarownerFeedBacksController($scope, $q, $http, $rootScope, CarownerFeedBacksService, constPageSize, ngDialog, goodsReminder) {

  //意见反馈列表
  $scope.find = function(currentPageNo, currentPaseSize) {
    var defer = $q.defer();
    var realName = $scope.realName;
    var phone = $scope.phone;
    var carLicenseNo = $scope.carLicenseNo;
    var startTime = $scope.startTime;
    CarownerFeedBacksService
      .find(realName, phone, currentPageNo, currentPaseSize)
      .then(function(result) {
        $scope.carList = result.data;
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
    $scope.curentNum = 0;

    switch (url) {
      case 'carowner.html':
        $scope.find = function(currentPageNo, currentPaseSize) {
          var defer = $q.defer();
          var realName = $scope.realName;
          var phone = $scope.phone;
          var carLicenseNo = $scope.carLicenseNo;
          var startTime = $scope.startTime;
          CarownerFeedBacksService
            .find(realName, phone, currentPageNo, currentPaseSize)
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
          // var carLicenseNo = $scope.carLicenseNo;
          // var startTime = $scope.startTime;
          CarownerFeedBacksService
            .shipperfind(realNames, phones, currentPageNo, currentPaseSize)
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

  //弹出弹窗
  $scope.openModal = function(id, dataBoolea) {
    $scope.carOwnerId = id;
    $scope.dataBoolea = dataBoolea;
    $scope.dialog = ngDialog.open({
      template: 'views/carowner/CarownerFeedBacksFormModel.html',
      className: 'ngdialog-theme-default',
      controller: 'CarownerFeedBacksFormModelController',
      scope: $scope,
      width: 850
    })
  };
  //关闭详情弹窗
  $scope.cancelModal = function() {
    $scope.dialog.close();
  }

  // huozu
  //弹出弹窗
	$scope.openModal1 = function(ids, dataBlea) {
		$scope.shipperId = ids;
		$scope.dataBoolea = dataBlea;
		$scope.dialog1 = ngDialog.open({
			template: 'views/carowner/ShipperFeedBacksFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'ShipperFeedBacksFormModelController',
			scope: $scope,
			width: 850
		})
	};
	//关闭详情弹窗
	$scope.cancelModal1 = function() {
		$scope.dialog1.close();
	}
  $scope.onClickTab('carowner.html')
}
//弹窗操作
function CarownerFeedBacksFormModelController($scope, CarownerFeedBacksService) {
  //初始化
  $scope.innter = function() {
    if ($scope.carOwnerId) {
      CarownerFeedBacksService
        .detail($scope.carOwnerId)
        .then(function(result) {
          $scope.carOwnerEntiy = result.data;
        }, function(reson) {

        })
    }
  }
  $scope.innter();
  //保存操作
  $scope.okModal = function() {
    if ($scope.carOwnerId) {
      CarownerFeedBacksService
        .feedback($scope.carOwnerId, $scope.carOwnerEntiy.handleRemark)
        .then(function(result) {
          $scope.cancelModal();
          $scope.loadData();
        }, function(reson) {

        })
    }
  }
}
// huozu
function ShipperFeedBacksFormModelController($scope, CarownerFeedBacksService) {
	//初始化
	$scope.innter = function() {
		if($scope.shipperId) {
			CarownerFeedBacksService
				.shipperdetail($scope.shipperId)
				.then(function(result) {
					$scope.shipperEntiy = result.data;
				}, function(reson) {

				})
		}
	}
	$scope.innter();
	//保存操作
	$scope.okModal = function() {
		if($scope.shipperId) {
			CarownerFeedBacksService
				.shipperfeedback($scope.shipperId, $scope.shipperEntiy.handleRemark)
				.then(function(result) {
					$scope.cancelModal1();
					$scope.loadData();
				}, function(reson) {

				})
		}
	}
}


angular
  .module("managerApp")
  .controller("CarownerFeedBacksController", CarownerFeedBacksController)
  .controller("CarownerFeedBacksFormModelController", CarownerFeedBacksFormModelController)
  .controller("ShipperFeedBacksFormModelController", ShipperFeedBacksFormModelController)
