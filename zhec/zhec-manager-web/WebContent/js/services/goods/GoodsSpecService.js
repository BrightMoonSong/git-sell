/**
 * 系统用户service定义
 */

angular
    .module('managerApp')
    .factory('GoodsSpecService', function ($q, $http, constMapiLocation) {
        var baseUrl = constMapiLocation + "/goods";
        return {
            //查询数据
            find: function (specName, pageSize, pageNo) {
                var defer = $q.defer();
                var url = baseUrl + "/specifications?specName=" + specName + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
            //根据id查询一条数据方法
            get: function (id) {
                var defer = $q.defer();
                var url = baseUrl + '/specifications/' + id;
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
            //修改数据
            edit: function (sysuser) {
                var defer = $q.defer();
                var url = baseUrl + '/specifications';
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
            //新增数据
            add: function (sysuser) {
                var defer = $q.defer();
                var url = baseUrl + '/specifications';
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
            }
        }
    });