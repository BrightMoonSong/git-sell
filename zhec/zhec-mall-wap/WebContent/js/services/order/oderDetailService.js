/**
 * 系统用户service定义
 */
angular
    .module('oderDetailApp')
    .factory('orderDetailService',function($http,$q,constWapLapiLocation){
    	var baseUrl= constWapLapiLocation + '/member';
	    return {
	    	//查询数据方法
	        findMemberOrder:function(id){
	            var defer = $q.defer();
	            var url = baseUrl+"/getorder/"+id;
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
	        //获取物流信息
	        getlogistics:function(logisticsNumber){
	            var defer = $q.defer();
	            var url = baseUrl+'/getlogistics?logisticsNumber='+logisticsNumber;
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
	      //确认收货
	        submit:function(order){
	            var defer = $q.defer();
	            var url = baseUrl + '/submit';
	            $http({
	                method:'put',
	                url:url,
	                data:order
	            }).success(function(data){
	            	defer.resolve(data);
	            }).error(function(data){
	            	defer.reject(data);
	            });
	            return defer.promise;
	        },
	        //删除多个
	        deleteMore:function(arr){
	            var defer = $q.defer();
	            var url = baseUrl + '/shoppingcarts';
	            $http({
	                method:'delete',
	                url:url,
	                data:arr
	            }).success(function(data){
	            	defer.resolve(data);
	            }).error(function(data){
	            	defer.reject(data);
	            });
	            return defer.promise;
	        },
	      //cookie中商品展示
	        findCookieGoods:function(arr){
	            var defer = $q.defer();
	            var url = baseUrl + '/productinfos?productIds='+arr;
	            $http({
	                method:'get',
	                url:url
	            }).success(function(data){
	            	defer.resolve(data);
	            }).error(function(data){
	            	console.log(url)
	            	defer.reject(data);
	            });
	            return defer.promise;
	        },
	        //移入收藏
	        membercollection:function(collectionGoods){
	            var defer = $q.defer();
	            var url = constWapLapiLocation + '/membercollection/collectiongoods';
	            $http({
	                method:'post',
	                url:url,
	                data:collectionGoods
	            }).success(function(data){
	            	defer.resolve(data);
	            }).error(function(data){
	            	defer.reject(data);
	            });
	            return defer.promise;
	        },
	        pay:function(payGoods){
	        	var defer = $q.defer();
	            var url = baseUrl + '/shoppingcarts';
	            $http({
	                method:'put',
	                url:url,
	                data:payGoods
	            }).success(function(data){
	            	defer.resolve(data);
	            }).error(function(data){
	            	defer.reject(data);
	            });
	            return defer.promise;
	        }
	    }
});