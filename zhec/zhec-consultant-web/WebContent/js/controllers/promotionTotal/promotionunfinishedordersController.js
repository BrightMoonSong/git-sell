
/**
 * 系统用户controller定义
 */
function promotionunfinishedordersController($scope, $q, constPageSize, promotionunfinishedordersService, ngDialog) {
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
        promotionunfinishedordersService
            .find(currentPaseSize,currentPageNo,2)
            .then(
                function(result) {
                	$scope.orderMessage = result.data;
                    $scope.orderList = result.data.listOrder;
                    defer.resolve(result);
                },
                function(result) {
                    defer.reject(result);
                });	
        return defer.promise;
    };

}


angular
    .module('managerApp')
    .controller('promotionunfinishedordersController', promotionunfinishedordersController)
//  .controller('PromotionOrdersFormModalController', PromotionOrdersFormModalController);
