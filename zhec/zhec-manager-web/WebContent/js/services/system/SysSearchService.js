/**
 * Created by shy on 2016/11/24.
 */
/**
 * 搜索service
 */

angular
    .module('managerApp')
    .factory('SysSearchService', function ($http, $q, constMapiLocation) {
        var baseUrl = constMapiLocation + '/syssearch';
        return {
            //创建商品索引测试
            creategoodsindex: function (goodssearch) {
                var defer = $q.defer();
                var url = baseUrl + "/creategoodsindex";
                $http({
                    method: 'post',
                    url: url,
                    data: goodssearch
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            //获取商品索引测试
            getgoodsindex: function (goodsid) {
                var defer = $q.defer();
                var url = baseUrl + "/getgoodsindex/"+goodsid;
                $http({
                    method: 'get',
                    url: url,
                    data: goodsid
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            //删除商品索引测试
            deletegoodsindex: function (goodsid) {
                var defer = $q.defer();
                var url = baseUrl + "/deletegoodsindex/"+goodsid;
                $http({
                    method: 'delete',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            //删除商品索引测试
            querygoodsindex: function (goodsinfo) {
                var defer = $q.defer();
                var url = baseUrl + "/querygoodsindex?info="+goodsinfo;
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
            //创建商品索引测试
            creategoodsindextest: function () {
                var defer = $q.defer();
                var url = baseUrl + "/creategoodsindextest";
                $http({
                    method: 'post',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            //获取商品索引测试
            getgoodsindextest: function () {
                var defer = $q.defer();
                var url = baseUrl + "/getgoodsindextest";
                $http({
                    method: 'post',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            //删除商品索引测试
            deletegoodsindextest: function () {
                var defer = $q.defer();
                var url = baseUrl + "/deletegoodsindextest";
                $http({
                    method: 'post',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
        }
    });
