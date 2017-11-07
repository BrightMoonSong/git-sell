/**
 * 系统用户service定义
 */
angular
    .module('messageApp')
    .factory('messageBoardservice',function($http,$q,constBaseLocation){
    	var baseUrl= constBaseLocation + '/orders';
    	var userToken = "";
    	if (getCookie("loginManager") != '') {
			var member = JSON.parse(getCookie("loginManager")); //获取登录信息
			
			if (member != "") {
				userToken = member.userToken;
			}
		}
	    return {
	    	//查询数据方法
	        findMember:function(memberId){
	            var defer = $q.defer();
	            var member = getCookie("loginManager"); //获取登录信息
				var userToken = "";
				if(member != "") {
					member = JSON.parse(member);
					userToken = member.userToken;
				}
	            var url = constBaseLocation+"/membercenter/getmember/"+memberId+"?userToken="+userToken;
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
	        //导航 显示的第一行  和  搜索框下的字  
	        findcommenddata:function(){
	            var defer = $q.defer();
	            var url = constBaseLocation+"/homepage/findcommenddata?applyType=1";
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
	        //查询单个商品信息
	        getMessage:function(id){
	            var defer = $q.defer();
	            var url = baseUrl+"/findmembermessage?id="+id+"&pageSize="+"&pageNo=";
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
	        //导航
	        navigationBar:function(){
	            var defer = $q.defer();
	            var url = constBaseLocation+"/goods/categorylist";
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
	        //导航 显示的第一行  和  搜索框下的字  
	        findcommenddata:function(){
	            var defer = $q.defer();
	            var url = constBaseLocation+"/homepage/findcommenddata?applyType=1";
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
	        //发表留言
	        submitMessage:function(submitMessage){
	            var defer = $q.defer();
	            var url = baseUrl+"/addmembermessage"+"?userToken="+userToken;
	            $http({
	                method:'post',
	                url:url,
	                data:submitMessage
	            }).success(function(data){
	            	defer.resolve(data);
	            }).error(function(data){
	            	defer.reject(data);
	            });
	            return defer.promise;
	        },
	    }
});