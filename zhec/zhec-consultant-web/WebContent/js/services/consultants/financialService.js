/**
 * 系统用户service定义
 */
angular
    .module('managerApp')
    .factory('financialService',function($http,$q,constCapiLocation){
    	var baseUrl= constCapiLocation + '/consultantwithdraw';
	    return {
	    	find:function(){
	            var defer = $q.defer();
	            var url = constCapiLocation+"/consultantnew/getconsultant";
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
	        getTime:function(){
	            var defer = $q.defer();
	            var url = baseUrl+"/consultantwithdrawalstime";
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
	    	//获取数据
	    	find1:function(currentPageNo,constPageSize){
	            var defer = $q.defer();
	            var url = baseUrl+"/consultantwithdrawhistory?pageNo="+currentPageNo+"&pageSize="+constPageSize;
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
//	        getMoney:function(){
//	            var defer = $q.defer();
//	            var url = constCapiLocation+"/consultantnew/getconsultant";
//	            $http({
//	                method:'get',
//	                url:url
//	            }).success(function(data){
//	            	defer.resolve(data);
//	            }).error(function(data){
//	            	defer.reject(data);
//	            });
//	            return defer.promise;
//	        },
	        post:function(money){
	            var defer = $q.defer();
	            var url = baseUrl+"/consultantwithdraw?money="+money+"&remark="+"";
	            $http({
	                method:'post',
	                url:url
	            }).success(function(data){
	            	defer.resolve(data);
	            }).error(function(data){
	            	defer.reject(data);
	            });
	            return defer.promise;
	        },
	        isallowwithdraw:function(){
	            var defer = $q.defer();
	            var url = baseUrl+"/isallowwithdraw";
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
	        consultantwithdrawreceipt:function(withdrawId){
	            var defer = $q.defer();
	            var url = baseUrl+"/consultantwithdrawreceipt?withdrawId="+withdrawId;
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
	    }
});
