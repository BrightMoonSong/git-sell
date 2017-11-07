
/**
 * 系统用户service定义
 */
app
    .factory('messageBoardService',function($http,$q){
    	var baseUrl= constWapLapiLocation + '/orders';
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
	            var url = constWapLapiLocation+"/membercenter/getmember/"+memberId;
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
	        //发表留言
	        submitMessage:function(submitMessage){
	            var defer = $q.defer();
	            var url = baseUrl+"/addmembermessage";
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