angular
    .module('managerApp')
    .factory('GoodsCateService', function ($http, $q, constMapiLocation) {
        var baseUrl = constMapiLocation + '/goods';
        return {
            find: function (type) {
                var defer = $q.defer();
                var url = baseUrl;
                $http({
                    method: 'get',
                    url: baseUrl + "/categories?type=" + type
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            findId: function (id) {
                var defer = $q.defer();
                var url = baseUrl + '/getcategorybyid/' + id;
                $http({
                    method: 'get',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);

                }).error(function (data) {
                    defer.reject(data)
                });
                return defer.promise;
            },
            findAllType: function () {
                var defer = $q.defer();
                var url = baseUrl + '/findgoodstypes';
                $http({
                    method: 'get',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data)
                });
                return defer.promise;
            },
            findType: function (id) {
                var defer = $q.defer();
                var url = baseUrl + '/goodstypes';
                $http({
                    method: 'get',
                    url: url + "/" + id
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data)
                });
                return defer.promise;
            },
            edit: function (ResultData) {
                var defer = $q.defer();
                var url = baseUrl + '/categories';
                $http({
                    method: 'put',
                    url: url,
                    data: ResultData
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data)
                });
                return defer.promise;
            },
            postGoods: function (ResultData) {
                var defer = $q.defer();
                var url = baseUrl + '/categories';
                $http({
                    method: 'POST',
                    url: url,
                    data: ResultData
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data)
                });
                return defer.promise;
            },
            search: function (pageSize,pageNo,propName) {
                var defer = $q.defer();
                var url = constMapiLocation + '/goodscate/list?pageSize='+pageSize+"&pageNo="+pageNo+"&attrType="+1+"&propName="+propName;
                $http({
                    method: 'get',
                    url: url,
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data)
                });
                return defer.promise;
            },
            init:function (id) {
                var defer = $q.defer();
                var url = constMapiLocation + '/goodscate/findBycateId?cateId='+id;
                $http({
                    method: 'get',
                    url: url,
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data)
                });
                return defer.promise;
            },
            addAttr:function (id,propIds) {
                var defer = $q.defer();
                var url = constMapiLocation + '/goodscate/cateSaveProp?cateId='+id+"&propIds="+propIds;
                $http({
                    method: 'get',
                    url: url,
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data)
                });
                return defer.promise;
            },
        }
    })