angular
    .module('managerApp')
    .factory('consultantlistService',function($http,$q,constMapiLocation){
        var baseUrl= constMapiLocation + '/verify';
        return {
            //1页面加载展示所有广告位信息
            find:function(pageSize,pageNo){
                var defer = $q.defer();
                var url = baseUrl+"/findConsultantAll?pageSize="+pageSize+"&pageNo="+pageNo;

                $http({
                    method:'get',
                    url:url
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            search:function(pageSize,pageNo,consultantId){
                var defer = $q.defer();
                var url = baseUrl+"/findConsultantId?pageSize="+pageSize+"&pageNo="+pageNo+"&consultantId="+consultantId;

                $http({
                    method:'get',
                    url:url
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            }
        }
    });


