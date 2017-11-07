angular
    .module('managerApp')
    .factory('functionconfigService',function($http,$q,constMapiLocation){
        var baseUrl= constMapiLocation + '/sysfunction';
        return {
            find:function(pageSize,pageNo,name){
                var defer = $q.defer();
                var url = baseUrl+"/find?pageSize="+pageSize+"&pageNo="+pageNo+"&name="+name;

                $http({
                    method:'GET',
                    url:url
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            update:function(message){
                var defer = $q.defer();
                var url = baseUrl+"/update?id="+message.id+"&parentId="+message.parentId+"&menuUrl="+message.menuUrl+"&functionUrl="+message.functionUrl+"&name="+message.name+"&scope="+message.scope+"&sort="+message.sort+"&status="+message.status;

                $http({
                    method:'PUT',
                    url:url
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            insert:function(message){
                var defer = $q.defer();
                var url = baseUrl+"/insert?parentId="+message.parentId+"&menuUrl="+message.menuUrl+"&functionUrl="+message.functionUrl+"&name="+message.name+"&scope="+message.scope+"&sort="+message.sort+"&status="+message.status;

                $http({
                    method:'POST',
                    url:url
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            findId:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/getFunction?id="+id;
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


