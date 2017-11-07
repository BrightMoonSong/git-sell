/**
 * 系统用户service定义
 */

angular
    .module('managerApp')
    .factory('SysPermissionConfigurationService',function($http,$q,constMapiLocation){
    	var baseUrl= constMapiLocation + '/sysfu/';
	    return {
	        //获取列表
	        sysfunctionlist:function(id){
	            var defer = $q.defer();
	            var url = baseUrl+'sysfunctionlist';
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
