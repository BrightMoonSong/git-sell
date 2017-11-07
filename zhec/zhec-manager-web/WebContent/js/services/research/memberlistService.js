angular
    .module('managerApp')
    .factory('memberlistService',function($http,$q,constMapiLocation){
        var baseUrl= constMapiLocation + '/verify';
        return {
            //1ҳ�����չʾ���й��λ��Ϣ
            find:function(pageSize,pageNo){
                var defer = $q.defer();
                var url = baseUrl+"/findmemberAll?pageSize="+pageSize+"&pageNo="+pageNo;

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
            search:function(pageSize,pageNo,type,memberId){
                var defer = $q.defer();
                var url = baseUrl+"/findMemberId?pageSize="+pageSize+"&pageNo="+pageNo+"&type="+type+"&memberId="+memberId;

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

