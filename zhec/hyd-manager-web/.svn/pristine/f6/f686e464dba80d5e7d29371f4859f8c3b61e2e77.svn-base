function CarownerRegnochecksController($scope, $q, $http, $rootScope, CarownerRegnochecksService, constPageSize, ngDialog, goodsReminder) {
  $scope.WdatePicker = {}; //日期
  //注册未审核用户列表
  $scope.find = function(currentPageNo, currentPaseSize) {
    var defer = $q.defer();
    var phone = $scope.phone;
    $scope.startTime = $scope.WdatePicker.startTimes;
    CarownerRegnochecksService
      .carfind(phone, $scope.startTime, currentPageNo, currentPaseSize)
      .then(function(result) {
        $scope.regList = result.data;
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
    $scope.WdatePicker = {}; //日期
    switch (url) {
      case 'carowner.html':
        //注册未审核用户列表
				console.log($scope.curentNum);
        $scope.find = function(currentPageNo, currentPaseSize) {
          var defer = $q.defer();
          var phone = $scope.phone;
          $scope.startTime = $scope.WdatePicker.startTimes;
          CarownerRegnochecksService
            .carfind(phone, $scope.startTime, currentPageNo, currentPaseSize)
            .then(function(result) {
              $scope.regList = result.data;
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
						//注册未审核用户列表
						console.log($scope.curentNum);
						$scope.find = function(currentPageNo, currentPaseSize) {
							var defer = $q.defer();
							var phones = $scope.phones;
							$scope.startTime = $scope.WdatePicker.startTimes;
							var startTimes=$scope.startTime
							CarownerRegnochecksService
								.shipperfind(phones,startTimes, currentPageNo, currentPaseSize)
								.then(function(result) {
									$scope.regbList = result.data;
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
      CarownerRegnochecksService
        .cardetel(id, status)
        .then(function(result) {
          $scope.loadData()
        }),
        function(reason) {}
    })
  }
	//货主启禁用操作
	$scope.deteles = function(id, status) {
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
			CarownerRegnochecksService
				.shipperenable(id, status)
				.then(function(result) {
					$scope.loadData()
				}),
				function(reason) {}
		})
	}
	$scope.onClickTab('carowner.html')
}

angular
  .module("managerApp")
  .controller("CarownerRegnochecksController", CarownerRegnochecksController)
