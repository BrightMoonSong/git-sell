function consultantlistController($rootScope, $scope, $http, $q, constPageSize, consultantlistService, ngDialog) {

    $scope.find = function (currentPageNo, currentPaseSize) {
        var defer = $q.defer();
        consultantlistService
            .find(currentPaseSize, currentPageNo)
            .then(
            function (result) {
                $scope.consultants = result.data;
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
        $scope.consultantId = id;
        $scope.dialog = ngDialog.open({
            template: 'views/research/consultantModal.html',
            className: 'ngdialog-theme-default',
            controller: 'consultantModalController',
            scope: $scope,
            width: 1000
        })
    };
}
function consultantModalController($rootScope, $scope, $http, $q, constPageSize, consultantlistService, ngDialog){
    $scope.search = function (currentPageNo, currentPaseSize) {
        var defer = $q.defer();
        consultantlistService
            .search(currentPaseSize,currentPageNo,$scope.consultantId)
            .then(
            function (result) {
                $scope.contantdetails = result.data;

                for(var i=0;i<$scope.contantdetails.length;i++){
                    switch ($scope.contantdetails[i].changeType){
                        case 1:
                            $scope.contantdetails[i].changetype="推广结算增加";
                            break;
                        case 2:
                            $scope.contantdetails[i].changetype="提现失败金额退还增加";
                            break;
                        case 6:
                            $scope.contantdetails[i].changetype="提现结算减少";
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
    .controller('consultantlistController', consultantlistController)
    .controller('consultantModalController', consultantModalController);


