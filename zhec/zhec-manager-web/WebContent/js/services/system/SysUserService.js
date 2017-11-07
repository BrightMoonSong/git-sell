/**
 * 系统用户service定义
 */

angular
    .module('managerApp')
    .factory('SysUserService',function($http,$q,constMapiLocation){
    	var baseUrl= constMapiLocation + '/sys/';
	    return {
	    	//查询数据方法
	        find:function(userName,pageSize,pageNo){
	            var defer = $q.defer();
	            var url = baseUrl+"sysusers?userName="+userName+"&pageSize="+pageSize+"&pageNo="+pageNo;
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
	        //根据id查询一条数据方法
	        get:function(id){
	            var defer = $q.defer();
	            var url = baseUrl+'sysusers/'+id;
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
	        //重置密码
	        resetpassword:function(id){
	            var defer = $q.defer();
	            var url = baseUrl+'resetpassword/'+id;
	            $http({
	                method:'put',
	                url:url
	            }).success(function(data){
	                defer.resolve(data);
	            }).error(function(data){
	                defer.reject(data);
	            });
	            return defer.promise;
	        },
	        //修改数据
	        edit:function(sysuser){
	            var defer = $q.defer();
	            var url = baseUrl+'sysusers';
	            $http({
	                method:'put',
	                url:url,
	                data:sysuser
	            }).success(function(data){
	                defer.resolve(data);
	            }).error(function(data){
	                defer.reject(data);
	            });
	            return defer.promise;
	        },
	        //新增数据
	        add:function(sysuser){
	            var defer = $q.defer();
	            var url = baseUrl+'sysusers';
	            $http({
	                method:'post',
	                url:url,
	                data:sysuser
	            }).success(function(data){
	                defer.resolve(data);
	            }).error(function(data){
	                defer.reject(data);
	            });
	            return defer.promise;
	        },
			//查询角色
			availableroles:function(){
				var defer = $q.defer();
				var url =constMapiLocation + '/shiro/availableroles';
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
