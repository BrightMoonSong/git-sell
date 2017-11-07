angular
    .module('managerApp')
    .factory('AdvertiseService',function($http,$q,constMapiLocation){
        var baseUrl= constMapiLocation + '/web';
        return {
            //1页面加载展示所有广告位信息
            find:function(pageSize,pageNo,advertName,num){
                var defer = $q.defer();
                var url = baseUrl+"/advert?pageSize="+pageSize+"&pageNo="+pageNo+"&applyType="+num+"&advertName="+advertName;

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
            //2 根据广告位的id获取它的所有图片信息
            get:function(id){
                var defer = $q.defer();
                var url = baseUrl+'/findadvertimages'+'?advertId='+id;
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
            //3 修改广告位单张图片的信息
            edit:function(imgmessage){
                var defer = $q.defer();
                var url = baseUrl+'/advertimages';
                $http({
                    method:'put',
                    url:url,
                    data:imgmessage
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            //4 广告位新增图片
            add:function(imgmessage){
                var defer = $q.defer();
                var url = baseUrl+'/advertimages';
                $http({
                    method:'post',
                    url:url,
                    data:imgmessage
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            //5根据图片的单张id获取它的所有信息
            search:function(id){
                var defer = $q.defer();
                var url = baseUrl+'/advertimages/'+id;
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



            //通过角色ID查询角色拥有的相应权限列表
            getRoleFunctions:function(id){
                var defer = $q.defer();
                var url = constMapiLocation + '/shiro/rolefunctions?roleId='+id;
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
