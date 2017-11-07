angular
    .module('managerApp')
    .controller('promotionmembersController', promotionmembersController)
   .controller('promotionmembersFormModalController', promotionmembersFormModalController)
    .controller('promotionmembersOrderFormModalController', promotionmembersOrderFormModalController);
function promotionmembersController($scope, $http, $q, constPageSize, promotionmembersService, ngDialog) {
    $scope.dataId = ""; //当前操作的数据id
    $scope.membersName="";
    $scope.userToken = localStorage.dataLogin;
    $scope.find = function(currentPageNo, currentPaseSize) {
        var defer = $q.defer();
        var membersName=$scope.membersName;
        
        promotionmembersService.findmembers(membersName,$scope.userToken,currentPageNo, currentPaseSize).then(
            function(result) {
                $scope.promotionmembersList = result.data;
                defer.resolve(result);
            },
            function(result) {
                defer.reject(result);
            });
        return defer.promise;
    };
	
    
	
    /**
  * 弹出修改数据模态框
  */
 $scope.$parent.refresh = $scope.findmembers;
    $scope.openModal = function(dataId) {
        $scope.dataId = dataId;
        $scope.dialog = ngDialog.open({
            template: 'views/promotionTotal/promotionmembersFormModal.html',
            className: 'ngdialog-theme-default',
            controller: 'promotionmembersFormModalController',
            scope: $scope,
            width: 950
        })
    };

    $scope.openOrderModal = function(dataId) {
        $scope.dataId = dataId;
        $scope.dialog = ngDialog.open({
            template: 'views/promotionTotal/promotionmembersModal.html',
            className: 'ngdialog-theme-default',
            controller: 'promotionmembersOrderFormModalController',
            scope: $scope,
            width: 950
        })

    };



}

/**
 * 用户信息
 */
function promotionmembersFormModalController($scope, promotionmembersService) {

    $scope.initEntity = function() {
//如果参数dataId不为空，说明是修改数据
            promotionmembersService
                .get($scope.dataId)
                .then(
                    function(result) {
                        $scope.dataEntity = result.data;
                        $scope.dataEntity.typeId = $scope.cateId;

                    }
                );

        //$scope.roleid = 4;
    }
    $scope.cancelModal = function() {
        $scope.dialog.close();
    };
    $scope.initEntity();
}



/**
 * 订单历史
 */
function promotionmembersOrderFormModalController($scope, promotionmembersService) {
    $scope.initEntity = function() {
//如果参数dataId不为空，说明是修改数据
            promotionmembersService
                .getOrd($scope.dataId)
                .then(
                    function(result) {
                        $scope.dataEntityaa = result.data;

                    }
                );

        //$scope.roleid = 4;
    }
    $scope.cancelModal = function() {
        $scope.dialog.close();
    };
    $scope.initEntity();
}
