angular
    .module('managerApp')
    .factory('stockcheckService',function($http,$q,constMapiLocation){
        var baseUrl= constMapiLocation + '/verify';
        return {
            //1ҳ�����չʾ���й��λ��Ϣ
            find:function(pageSize,pageNo){
                var defer = $q.defer();
                var url = baseUrl+"/findProduct?pageSize="+pageSize+"&pageNo="+pageNo;

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
            search:function(pageSize,pageNo,productId){
                var defer = $q.defer();
                var url = baseUrl+"/findProductId?pageSize="+pageSize+"&pageNo="+pageNo+"&productId="+productId;

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

