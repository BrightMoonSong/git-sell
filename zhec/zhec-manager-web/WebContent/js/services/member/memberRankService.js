/**
 * 系统用户service定义
 */
angular
    .module('managerApp')
    .factory('memberRankService',function($http,$q,constMapiLocation){
    	var baseUrl= constMapiLocation + '/memberrank';
	    return {
	    	//查询数据方法
	        find:function(pageSize,pageNo){
	            var defer = $q.defer();
	            var url = baseUrl+"/findmemberrank?pageSize="+pageSize+"&pageNo="+pageNo;
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
	        add:function(message){
	            var defer = $q.defer();
	            var url = baseUrl+'/addmemberrank';
	            $http({
	                method:'post',
	                url:url,
	                data:message
	            }).success(function(data){
	                defer.resolve(data);
	            }).error(function(data){
	                defer.reject(data);
	            });
	            return defer.promise;
	        },
	      //会员启用
	        edit:function(message){
	            var defer = $q.defer();
	            $http({
	                method:'put',
	                url:baseUrl + '/editmemberrank',
	                data:message
	            }).success(function(data){
	                defer.resolve(data);
	            }).error(function(data){
	                defer.reject(data);
	            });
	            return defer.promise;
	        },
	      //会员启用
	        get:function(id){
	            var defer = $q.defer();
	            $http({
	                method:'get',
	                url:baseUrl + '/getmemberrank?id='+id
	            }).success(function(data){
	                defer.resolve(data);
	            }).error(function(data){
	                defer.reject(data);
	            });
	            return defer.promise;
	        },
	        
	    }
});