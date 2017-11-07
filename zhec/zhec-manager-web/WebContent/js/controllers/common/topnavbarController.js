function topnavbarController($rootScope, $scope, constManagerLocation,loginoutService) {

    $scope.quitLogin = function () {
		$scope.userToken = localStorage.userToken;
		loginoutService
            .loginout($scope.userToken)
            .then(function(result) {
                    if(result.code==0){
                    	localStorage.removeItem("userToken");
        				$rootScope.checkLogin();
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
                var url = constMapiLocation + "/shiro/loginout?userToken=" + userToken;
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
