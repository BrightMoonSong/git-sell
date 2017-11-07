angular
    .module('managerApp')
    .factory('functionService',function($q,$http,constCapiLocation){
        var baseUrl=constCapiLocation+'/shiro/userfunctions';
        return {
            //查询数据
            find:function(userToken){
                var defer=$q.defer();
                var url=baseUrl+"?userToken="+userToken;
                $http({
                    method:'get',
                    url:url
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data)
                })
                return defer.promise;
            },
            updatepassword:function(mobile,password,code){
                var defer=$q.defer();
                var url=constCapiLocation+"/consultantlogin/consultanteditpassword?mobile="+mobile+"&&password="+password+"&code="+code;
                $http({
                    method:'put',
                    url:url
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data)
                })
                return defer.promise;
            },
            //验证手机号是否注册过
    	ifmobile: function (mobile) {
            var defer = $q.defer();
            var url = constCapiLocation + "/consultantregister/ifmobile?mobile=" + mobile;
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
        //获取验证码
        put: function (mobile) {
            var defer = $q.defer();
            var url = constCapiLocation + "/consultantregister/sendsmscode?mobile=" + mobile;
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

        post: function (mobile,password,code) {
            var defer = $q.defer();
            var url = constCapiLocation + "/consultantlogin/addconsultant?mobile="+mobile+"&password="+password+"&code="+code;
            $http({
                method: 'POST',
                url: url,
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data) {
                defer.reject(data)
            })
            return defer.promise;
        },
        }
    })