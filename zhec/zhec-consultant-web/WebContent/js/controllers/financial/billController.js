/**
 * 系统用户controller定义
 */
function billController($scope, $q, constPageSize, billService, ngDialog) {
    $scope.orderId = ""; //当前操作的数据id
    $scope.orderSnSearch = ""; //搜索关键词
    $scope.orderStatu = ""; //订单状态值
    $scope.WdatePicker = {}; //WdatePicker时间   获取开始和结束时间
    $scope.userToken = localStorage.dataLogin;
	
    /**
     * 数据初始化
     */
    $scope.find = function(currentPageNo, currentPaseSize) {
        var defer = $q.defer();
        
        var minTime = $scope.WdatePicker.startTime; //下单开始时间检索
        var maxTime = $scope.WdatePicker.endTime; //下单结束时间检索
        var orderStatuS = "";
//      if (null !== $scope.orderStatu && null !== $scope.orderStatu.position && undefined !== $scope.orderStatu.position) {
//          orderStatuS = $scope.orderStatu.position;
//      }
        billService
            .find(currentPaseSize,currentPageNo,1)
            .then(
                function(result) {
                	console.log(result)
                	$scope.orderList = result.data;
//                  $scope.orderList = result.data.listOrder;
                    defer.resolve(result);
                },
                function(result) {
                    defer.reject(result);
                });	
        return defer.promise;
    };

    //打开弹出框
    $scope.openModal = function(orderId) {
        $scope.orderId = orderId;
        $scope.dialog = ngDialog.open({
            template: 'views/recommend/PromotionOrdersFormModal.html',
            className: 'ngdialog-theme-default',
            controller: 'PromotionOrdersFormModalController',
            scope: $scope,
            width: 650		
        });
    };
}

/**
 * 显示订单详情
 */
function PromotionOrdersFormModalController($scope, billService) {
    $scope.initEntity = function() {
    	billService
            .findOrderById($scope.orderId, $scope.userToken)
            .then(
                function(result) {
                    $scope.dataEntity = result.data;
                }
            );
    };
    $scope.cancelModal = function() {
        $scope.dialog.close();
    };
    $scope.initEntity();
}

angular
    .module('managerApp')
    .controller('billController', billController)
    .controller('PromotionOrdersFormModalController', PromotionOrdersFormModalController);
