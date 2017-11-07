/**
 * 系统用户service定义
 */
angular
    .module('managerApp')
    .factory('MemberService',function($http,$q,constMapiLocation){
    	var baseUrl= constMapiLocation + '/member';
	    return {
	    	//查询数据方法
	        find:function(parmValue,minTime,maxTime,pageSize,pageNo){
	            var defer = $q.defer();
	            var url = baseUrl+"/members?parmValue="+parmValue+"&minTime="+minTime+"&maxTime="+maxTime+"&pageSize="+pageSize+"&pageNo="+pageNo;
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
	            var url = baseUrl+'/members/'+id;
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
	      //会员启用
	        enablemember:function(id){
	            var defer = $q.defer();
	            $http({
	                method:'put',
	                url:baseUrl + '/enablemember/'+id
	            }).success(function(data){
	                defer.resolve(data);
	            }).error(function(data){
	                defer.reject(data);
	            });
	            return defer.promise;
	        },
	        //会员禁用
	        disablemember:function(id){
	            var defer = $q.defer();
	            var url = baseUrl;
	            $http({
	                method:'put',
	                url:baseUrl + '/disablemember/'+id
	            }).success(function(data){
	                defer.resolve(data);
	            }).error(function(data){
	                defer.reject(data);
	            });
	            return defer.promise;
	        },
	        //会员密码重置
	        reset:function(id){
	            var defer = $q.defer();
	            $http({
	                method:'put',
	                url:baseUrl + '/resetpassword/'+id
	            }).success(function(data){
	                defer.resolve(data);
	            }).error(function(data){
	                defer.reject(data);
	            });
	            return defer.promise;
	        }
	        
	    }
});