/**
 * 系统用户service定义
 */
angular
    .module('managerApp')
    .factory('GoodsTypeService', function ($http, $q, constMapiLocation) {
        var baseUrl = constMapiLocation + "/goods";
        return {
            find: function (typeName, pageSize, pageNo) {
                var defer = $q.defer();
                var url = baseUrl + "/goodstypes?typeName=" + typeName + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
                $http({
                    method: 'get',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            findone: function (id) {
                var defer = $q.defer();
                var url = baseUrl + '/goodstypes/' + id;
                $http({
                    method: 'get',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            update: function (sysuser) {
                var defer = $q.defer();
                var url = sysuser.id ? baseUrl + '/goodstypes/' + sysuser.id : baseUrl + '/goodstypes';
                $http({
                    method: 'post',
                    url: url,
                    data: sysuser
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            saveUpdate: function (sysuser) {
                var defer = $q.defer();
                var url = baseUrl + '/goodstypes';
                $http({
                    method: 'put',
                    url: url,
                    data: sysuser
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            add: function (sysuser) {
                var defer = $q.defer();
                var url = baseUrl + '/goodstypes';
                $http({
                    method: 'post',
                    url: url,
                    data: sysuser
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            findGoodsbrands: function () {//获取品牌的ID以及名称列表
                var defer = $q.defer();
                var url = baseUrl + "/findgoodsbrands";
                $http({
                    method: 'get',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            findSpecifications: function () {//获取规格id和名称列表
                var defer = $q.defer();
                var url = baseUrl + "/findspecifications";
                $http({
                    method: 'get',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            }
        }
    });