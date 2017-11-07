function timedtaskController($rootScope, $scope, $http, $q, constPageSize, timedtaskService, ngDialog) {



    $scope.consultant1 = function () {
        var defer = $q.defer();
        timedtaskService
            .consultant1()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };

    $scope.consultant2 = function () {
        var defer = $q.defer();
        timedtaskService
            .consultant2()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.consultant3 = function () {
        var defer = $q.defer();
        timedtaskService
            .consultant3()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.consultant4 = function () {
        var defer = $q.defer();
        timedtaskService
            .consultant4()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.expireOrder="";
    $scope.order1 = function (id) {
        var defer = $q.defer();
        timedtaskService
            .order1(id)
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.receiveOrder="";
    $scope.order2 = function () {
        var defer = $q.defer();
        timedtaskService
            .order2()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.safeOrder=""
    $scope.order3 = function () {
        var defer = $q.defer();
        timedtaskService
            .order3()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.balanceOrder=""
    $scope.order4 = function () {
        var defer = $q.defer();
        timedtaskService
            .order4()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.completeOrder=""
    $scope.order5 = function () {
        var defer = $q.defer();
        timedtaskService
            .order5()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.suspendOrder=""
    $scope.order6 = function () {
        var defer = $q.defer();
        timedtaskService
            .order6()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.sendOrder=""
    $scope.order7 = function () {
        var defer = $q.defer();
        timedtaskService
            .order7()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.returnOrder=""
    $scope.order8 = function () {
        var defer = $q.defer();
        timedtaskService
            .order8()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };

    $scope.http1 = function () {
        var defer = $q.defer();
        timedtaskService
            .http1()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.http2 = function () {
        var defer = $q.defer();
        timedtaskService
            .http2()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };


    $scope.verify1 = function (id) {
        var defer = $q.defer();
        timedtaskService
            .verify1()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.verify2 = function (id) {
        var defer = $q.defer();
        timedtaskService
            .verify2()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.verify3 = function (id) {
        var defer = $q.defer();
        timedtaskService
            .verify3()
            .then(
            function (result) {
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
}





angular
    .module('managerApp')
    .controller('timedtaskController', timedtaskController)



