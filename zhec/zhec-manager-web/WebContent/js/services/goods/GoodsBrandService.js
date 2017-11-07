angular
    .module('managerApp')
    .factory('GoodsBrandService', function ($q, $http, constMapiLocation) {
        var baseUrl = constMapiLocation + '/goods';
        return {
            //查询数据
            find: function (brandName, pageSize, pageNo) {
                var defer = $q.defer();
                var url = baseUrl + "/goodsbrands?brandName=" + brandName + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
                $http({
                    method: 'get',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data)
                })
                return defer.promise;
            },
            //根据id查询一条数据方法
            get: function (id) {
                var defer = $q.defer();
                var url = baseUrl + '/goodsbrands/' + id;
                $http({
                    method: 'get',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                })
                return defer.promise;
            },
            //修改数据
            edit: function (brand) {
                var defer = $q.defer();
                var url = baseUrl + '/goodsbrands';
                $http({
                    method: 'put',
                    url: url,
                    data: brand
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                })
                return defer.promise;
            },
            //新增数据
            add: function (brand) {
                var defer = $q.defer();
                var url = baseUrl + '/goodsbrands';
                $http({
                    method: 'post',
                    url: url,
                    data: brand
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            }

        }
    })