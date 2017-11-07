/**
 * 系统用户service定义
 */
angular
    .module('managerApp')
    .factory('consultantfinancialService',function($http,$q,constMapiLocation){
    	var baseUrl= constMapiLocation + '/consultant';
	    return {
	    	//查询数据方法
	        find:function(pageSize,pageNo,status){
	            var defer = $q.defer();
	            var url = baseUrl+"/findconsultantswithdraw?pageSize="+pageSize+"&pageNo="+pageNo+"&status="+status;
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
	        //根据id查询一条数据方法  获取顾问提现详情

			get:function(id){
	            var defer = $q.defer();
	            var url = baseUrl+'/getconsultantswithdraw?id='+id;
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
	        submit:function(message){
	            var defer = $q.defer();
	            var url = baseUrl+'/editconsultantswithdraw';
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
	        
	    }
});