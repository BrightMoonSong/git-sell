/**
 * 系统用户service定义
 */
angular
    .module('managerApp')
    .factory('consultantsService',function($http,$q,constCapiLocation){
    	var baseUrl= constCapiLocation + '/consultantnew';
	    return {
	    	//获取数据
	    	find:function(){
	            var defer = $q.defer();
	            var url = baseUrl+"/getconsultant";
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
	    	//修改数据方法
	        editMessage:function(message){
	            var defer = $q.defer();
	            var url = baseUrl+"/editconsultant";
	            $http({
	                method:'put',
	                url:url,
	                data: message
	            }).success(function(data){
	            	defer.resolve(data);
	            }).error(function(data){
	            	defer.reject(data);
	            });
	            return defer.promise;
	        },
	        post:function(consultantMessage){
	            var defer = $q.defer();
	            var url = baseUrl+'/consultantaudit';
	            $http({
	                method:'post',
	                url:url,
	                data:consultantMessage
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
	            var url = baseUrl+'/'+id;
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

	        //新增数据
	        add:function(sysuser){
	            var defer = $q.defer();
	            var url = baseUrl;
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
	        }
	    }
});
