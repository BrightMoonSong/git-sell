function AppCollapseController($scope, $q, $rootScope, AppCollapseService, constPageSize, ngDialog, goodsReminder) {
  $scope.WdatePicker = {};

  $scope.scopeList = [{
      id: 2,
      "name": "车主"
    },
    {
      id: 3,
      "name": "货主"
    }
  ];
  $scope.platformList = [{
      id: 1,
      "name": "android"
    },
    {
      id: 2,
      "name": "ios"
    }
  ];
  //APP崩溃日志记录列表
  $scope.find = function(currentPageNo, currentPaseSize) {
    var defer = $q.defer();
    var platform = $scope.platform;
    var scope = $scope.scope;
    var phoneBrands = $scope.phoneBrands;
    var phoneModel = $scope.phoneModel;
    var versionName = $scope.versionName;
    var versionCode = $scope.versionCode;
    var userId = $scope.userId;
    var phone = $scope.phone;
    $scope.startTimeStr = $scope.WdatePicker.startTimes;
    $scope.endTimeStr = $scope.WdatePicker.endTimes;
    AppCollapseService
      .find(platform, scope, phoneBrands, phoneModel, versionName, versionCode, userId, phone, $scope.startTimeStr, $scope.endTimeStr, currentPageNo, currentPaseSize)
      .then(function(result) {
        $scope.collList = result.data;
        defer.resolve(result)
      }, function(result) {
        defer.reject(result)
      })
    return defer.promise;
  }
  //弹出批量删除弹窗
  $scope.openModal1 = function() {
    $scope.dialog1 = ngDialog.open({
      template: 'views/log/AppCollapseFormModel.html',
      className: 'ngdialog-theme-default',
      controller: 'AppCollapseFormModelController',
      scope: $scope,
      width: 850
    })
  };
  //弹出详情弹窗
  $scope.openModal = function(id) {
    $scope.id = id;
    $scope.dialog = ngDialog.open({
      template: 'views/log/AppCollapseDetailFormModel.html',
      className: 'ngdialog-theme-default',
      controller: 'AppCollapseDetailFormModelController',
      scope: $scope,
      width: 850
    })
  };

  //删除APP崩溃日志记录
  $scope.delete = function(id) {
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
      AppCollapseService
        .delete(id)
        .then(function(result) {
          $scope.loadData()
        }),
        function(reason) {}
    })
  }
  //关闭批量删除弹窗
  $scope.cancelModal1 = function() {
    $scope.dialog1.close();
  }
  //关闭详情弹窗
  $scope.cancelModal = function() {
    $scope.dialog.close();
  }
}
//APP崩溃日志记录详情
function AppCollapseDetailFormModelController($scope, AppCollapseService) {
  $scope.init = function() {
    AppCollapseService
      .detail($scope.id)
      .then(function(result) {
        $scope.collEntiy = result.data;
      }, function(reson) {

      })
  }
  $scope.init();
}
//批量删除操作日志记录
function AppCollapseFormModelController($scope, $rootScope, AppCollapseService) {
  $scope.WdatePicker = {};

  $scope.okModal = function() {
    if ($scope.WdatePicker.startTimes || $scope.WdatePicker.endTimes) {
      $rootScope.showAlert("起始时间和结束时间不能为空");
      return 0;
    }
  
    $scope.startTimeStr = $scope.WdatePicker.startTime;
    $scope.endTimeStr = $scope.WdatePicker.endTime;
    AppCollapseService
      .deleteall($scope.startTimeStr, $scope.endTimeStr)
      .then(function(result) {
        $scope.cancelModal1();
        $scope.loadData()
      }, function(reson) {

      })
  }

}


angular
  .module("managerApp")
  .controller("AppCollapseController", AppCollapseController)
  .controller("AppCollapseDetailFormModelController", AppCollapseDetailFormModelController)
  .controller("AppCollapseFormModelController", AppCollapseFormModelController)
