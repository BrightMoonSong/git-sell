/**
 * 系统用户service定义
 */
angular
    .module('managerApp')
    .factory('submitMessageService',function($http,$q,constCapiLocation){
    	var baseUrl= constCapiLocation + '/consultantnew';
	    return {
	    	//获取数据
	    	find:function(){
	            var defer = $q.defer();
	            var url = baseUrl+"/findaptitudeaudit";
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
	        auditMessage:function(id){
	            var defer = $q.defer();
	            var url = baseUrl+"/findaptitudeauditfiles?id="+id;
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
	        get:function(){
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
	        post:function(consultantMessage){
	            var defer = $q.defer();
	            var url = baseUrl+'/addaptitude';
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
	        //修改
	        edit:function(consultantMessage){
	            var defer = $q.defer();
	            var url = baseUrl+'/editaptitude';
	            $http({
	                method:'put',
	                url:url,
	                data:consultantMessage
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
