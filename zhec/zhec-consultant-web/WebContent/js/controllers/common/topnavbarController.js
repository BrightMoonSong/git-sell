function topnavbarController($rootScope, $scope, constConsultantLocation) {

    $scope.quitLogin = function () {
        localStorage.removeItem("userToken");
        window.open(constConsultantLocation + "/login.html", "_self");
    }

    $rootScope.checkLogin();
}

angular
    .module('managerApp')
    .controller('topnavbarController', topnavbarController)
