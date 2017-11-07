function topnavbarController($rootScope, $scope, loginoutService) {

    $scope.quitLogin = function () {
		$scope.userToken = localStorage.userToken;
		loginoutService
            .loginout($scope.userToken)
            .then(function(result) {
                    if(result.code==0){
                    	localStorage.removeItem("userToken");
						$rootScope.showAlert("退出成功!", 1000);
						$rootScope.gotoLogin();
                    }
                },
                function(result) {
                })
    }

    $rootScope.checkLogin();
}

angular
    .module('managerApp')
    .controller('topnavbarController', topnavbarController)
    .factory('loginoutService', function($q, $http, constMapiLocation) {
        return {
            loginout: function(userToken) {
                var defer = $q.defer();
                var url = constMapiLocation + "/shiro/logout?userToken=" + userToken;
                $http({
                    method: 'delete',
                    url: url
                }).success(function(data) {
                    defer.resolve(data);
                }).error(function(data) {
                    defer.reject(data)
                })
                return defer.promise;
            }
        }
    })
