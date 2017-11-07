angular
    .module('managerApp')
    .factory('syscodeService',function($http,$q,constMapiLocation){
        var baseUrl= constMapiLocation + '/syscode';
        return { //1页面加载展示所有广告位信息
            find:function(pageSize,pageNo){
                var defer = $q.defer();
                var url = baseUrl+"/findlist?pageSize="+pageSize+"&pageNo="+pageNo;

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
            getTypes:function(){
                var defer = $q.defer();
                var url = baseUrl+"/group";

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
            search:function(type,codeId){
                var defer = $q.defer();
                var url = baseUrl+"/findByCode?codeType="+type+"&codeId="+codeId;
                if((type==""||type==undefined)&&codeId==""){
                    url=baseUrl+"/findlist?pageSize="+10+"&pageNo="+1;
                }else if(codeId==""||codeId==undefined||codeId==null){
                    url=baseUrl+"/findByCode?codeType="+type
                }
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
            delete:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/del?id="+id;

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
            update:function(codeObj){
                var defer = $q.defer();
                var url = baseUrl+"/update?id="+codeObj.id+"&codeType="+codeObj.codeType+"&codeId="+codeObj.codeId+"&codeText="+codeObj.codeText+"&status="+codeObj.status+"&codeExplain="+codeObj.codeExplain+"&sort="+codeObj.sort;
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
            add:function(codeObj){
                var defer = $q.defer();
                var url = baseUrl+"/insert?id="+codeObj.id+"&codeType="+codeObj.codeType+"&codeId="+codeObj.codeId+"&codeText="+codeObj.codeText+"&status="+codeObj.status+"&codeExplain="+codeObj.codeExplain+"&sort="+codeObj.sort;
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
        }
    });


