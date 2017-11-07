angular
    .module('managerApp')
    .factory('CommendService',function($http,$q,constMapiLocation){
        var baseUrl= constMapiLocation + '/web';
        return {
            //1页面加载展示所有推荐位信息
            find:function(pageSize,pageNo,conmName,num){
                var defer = $q.defer();
                var url = baseUrl+"/commend?pageSize="+pageSize+"&pageNo="+pageNo+"&applyType="+ num+"&commendName="+conmName;

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
            //2 根据推荐位的id获取它的所有商品信息
            get:function(id){
                var defer = $q.defer();
                var url = baseUrl+'/commendgoods/'+id;
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
            //3 修改推荐位单张图片的信息
            edit:function(goodmessage){
                var defer = $q.defer();
                var url = baseUrl+'/commendgoods';
                $http({
                    method:'put',
                    url:url,
                    data:goodmessage
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            //4 推荐位新增图片
            add:function(imgmessage){
                var defer = $q.defer();
                var url = baseUrl+'/commendgoods';
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
            //5根据分类id获取它的所有信息

            search: function(pageSize, pageNo, cateId,cateId1,cateId2, infoName) {
                var defer = $q.defer();
                var url = baseUrl + "/findgoods?pageSize=" + pageSize + "&pageNo=" + pageNo + "&name=" + infoName;


                if (cateId2 !== null && cateId2 !== undefined && cateId2 !== '') {
                    url = url + "&cateId="+cateId2;
                }else if (cateId1 !== null && cateId1 !== undefined && cateId1 !== '') {
                    url = url + "&cateId="+cateId1;
                }else if (cateId !== null && cateId !== undefined && cateId !== '') {
                    url = url + "&cateId="+cateId;
                }
                $http({
                    method: 'get',
                    url: url
                }).success(function(data) {
                    defer.resolve(data);
                }).error(function(data) {
                    defer.reject(data);
                })
                return defer.promise;
            },
            //搜索
            seach: function(id) {
                var defer = $q.defer();
                var url = baseUrl + '/findgoodscate';
                if (id !== null && id !== undefined && id !== '') {
                    url = url + "?id="+id;
                }
                $http({
                    method: 'get',
                    url: url
                }).success(function(data) {
                    defer.resolve(data);
                }).error(function(data) {
                    defer.reject(data);
                })
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
