function membercheckController($rootScope, $scope, $http, $q, constPageSize, checkmemberService, ngDialog) {

    $scope.find = function (currentPageNo, currentPaseSize) {
        var defer = $q.defer();
        checkmemberService
            .find(currentPaseSize, currentPageNo)
            .then(
            function (result) {
                $scope.members = result.data;
                for(var i=0;i<$scope.members.length;i++){
                    if($scope.members[i].balance!=$scope.members[i].sumBalance){
                        $scope.members[i].balback=true;
                    }
                    if($scope.members[i].empiric!=$scope.members[i].sumEmpiric){
                        $scope.members[i].empback=true;
                    }
                    if($scope.members[i].integral!=$scope.members[i].sumIntegral){
                        $scope.members[i].intback=true;
                    }
                }
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };


    /**
     * 弹出模态框  展示单个广告位的信息
     */
    $scope.openModalOne = function (id,type) {
        $scope.memberId = id;
        $scope.type = type;
        $scope.dialog = ngDialog.open({
            template: 'views/research/propertyModal.html',
            className: 'ngdialog-theme-default',
            controller: 'propertyModalController',
            scope: $scope,
            width: 1000
        })
    };
}
function propertyModalController($rootScope, $scope, $http, $q, constPageSize, checkmemberService, ngDialog){
    $scope.search = function (currentPageNo, currentPaseSize) {
        var defer = $q.defer();
        checkmemberService
            .search(currentPaseSize, currentPageNo,$scope.type,$scope.memberId)
            .then(
            function (result) {
                $scope.property = result.data;
                if($scope.type==1){
                    for(var i=0;i<$scope.property.length;i++){
                        switch ($scope.property[i].changeType){
                            case 1:
                                $scope.property[i].changetype="充值增加";
                                break;
                            case 2:
                                $scope.property[i].changetype="消费减少";
                                break;
                            case 3:
                                $scope.property[i].changetype="退货增加";
                                break;
                            case 4:
                                $scope.property[i].changetype="注册赠送增加";
                                break;
                            case 5:
                                $scope.property[i].changetype="提现减少";
                                break;
                            case 6:
                                $scope.property[i].changetype="取消订单增加";
                                break;
                            case 7:
                                $scope.property[i].changetype="推荐注册订单结算增加";
                                break;
                        }
                    }
                }
                if($scope.type==2){
                    for(var i=0;i<$scope.property.length;i++){
                        switch ($scope.property[i].changeType){
                            case 1:
                                $scope.property[i].changetype="会员注册";
                                break;
                            case 2:
                                $scope.property[i].changetype="会员登录";
                                break;
                            case 3:
                                $scope.property[i].changetype="商品购买";
                                break;
                            case 4:
                                $scope.property[i].changetype="商品评论";
                                break;
                            case 5:
                                $scope.property[i].changetype="系统添加";
                                break;
                            case 6:
                                $scope.property[i].changetype="系统减少";
                                break;
                        }
                    }
                }

                if($scope.type==3){
                    for(var i=0;i<$scope.property.length;i++){
                        switch ($scope.property[i].changeType){
                            case 1:
                                $scope.property[i].changetype="会员注册";
                                break;
                            case 2:
                                $scope.property[i].changetype="会员登录";
                                break;
                            case 3:
                                $scope.property[i].changetype="商品购买";
                                break;
                            case 4:
                                $scope.property[i].changetype="商品评论";
                                break;
                            case 5:
                                $scope.property[i].changetype="系统添加";
                                break;
                            case 6:
                                $scope.property[i].changetype="系统减少";
                                break;
                        }
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
    .controller('membercheckController', membercheckController)
    .controller('propertyModalController', propertyModalController);

