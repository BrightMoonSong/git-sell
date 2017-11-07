/**
 * 系统用户service定义
 */
angular
    .module('managerApp')
    .factory('NavBarService',function($http,$q,constMapiLocation){
    	var baseUrl= constMapiLocation + '/web/webnavigation';
	    return {
	    	//查询数据方法
	        find:function(parmValue,minTime,maxTime,pageSize,pageNo){
	            var defer = $q.defer();
	            var url = baseUrl+"?parmValue="+parmValue+"&minTime="+minTime+"&maxTime="+maxTime+"&pageSize="+pageSize+"&pageNo="+pageNo;
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
	        //修改数据
	        edit:function(navBarList){
	            var defer = $q.defer();
	            var url = baseUrl;
	            $http({
	                method:'put',
	                url:url,
	                data:navBarList
	            }).success(function(data){
	                defer.resolve(data);
	            }).error(function(data){
	                defer.reject(data);
	            });
	            return defer.promise;
	        },
	        //新增数据
	        add:function(navBarList){
	            var defer = $q.defer();
	            var url = baseUrl;
	            $http({
	                method:'post',
	                url:url,
	                data:navBarList
	            }).success(function(data){
	                defer.resolve(data);
	            }).error(function(data){
	                defer.reject(data);
	            });
	            return defer.promise;
	        },
	      //删除数据
	        deleteData:function(id){
	            var defer = $q.defer();
	            var url = baseUrl;
	            $http({
	                method:'delete',
	                url:url + "/" + id
	            }).success(function(data){
	                defer.resolve(data);
	            }).error(function(data){
	            	alert(2)
	                defer.reject(data);
	            });
	            return defer.promise;
	        }
	    }
});