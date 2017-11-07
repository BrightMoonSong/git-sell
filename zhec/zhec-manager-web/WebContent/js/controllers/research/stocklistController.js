function stocklistController($rootScope, $scope, $http, $q, constPageSize, stocklistService, ngDialog) {

    $scope.find = function (currentPageNo, currentPaseSize) {
        var defer = $q.defer();
        stocklistService
            .find(currentPaseSize, currentPageNo)
            .then(
            function (result) {
                $scope.stocks = result.data;


                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };


    /**
     * 弹出模态框  展示单个广告位的信息
     */
    $scope.openModalOne = function (id) {
        $scope.productId = id;
        $scope.dialog = ngDialog.open({
            template: 'views/research/stockModal.html',
            className: 'ngdialog-theme-default',
            controller: 'stockModalController',
            scope: $scope,
            width: 1000
        })
    };
}
function stockModalController($rootScope, $scope, $http, $q, constPageSize, stocklistService, ngDialog){
    $scope.search = function (currentPageNo, currentPaseSize) {
        var defer = $q.defer();
        stocklistService
            .search(currentPaseSize,currentPageNo,$scope.productId)
            .then(
            function (result) {
                $scope.products = result.data;

                for(var i=0;i<$scope.products.length;i++){
                    switch ($scope.products[i].changeType){
                        case 1:
                            $scope.products[i].changetype="提交订单减少";
                            break;
                        case 2:
                            $scope.products[i].changetype="订单取消增加";
                            break;
                        case 3:
                            $scope.products[i].changetype="退货增加";
                            break;
                        case 4:
                            $scope.products[i].changetype="管理员后台手动修改";
                            break;
                    }
                }

                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
}

angular
    .module('managerApp')
    .controller('stocklistController', stocklistController)
    .controller('stockModalController', stockModalController);

