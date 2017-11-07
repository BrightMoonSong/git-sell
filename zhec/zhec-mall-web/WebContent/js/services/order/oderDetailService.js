/**
 * 系统用户service定义
 */
angular
    .module('oderDetailApp')
    .factory('orderDetailService',function($http,$q,constBaseLocation){
    	var baseUrl= constBaseLocation + '/member';
    	var userToken = "";
    	if (getCookie("loginManager") != '') {
			var member = JSON.parse(getCookie("loginManager")); //获取登录信息
			
			if (member != "") {
				userToken = member.userToken;
			}
		}
	    return {
	    	//商品价格
	    	getPrice: function(memberId, goodsIds, platform, returnPromotion, showOriginalPrice) {
				var defer = $q.defer();
				var url = constBaseLocation + "/goods/getprice?memberId=" + memberId + "&goodsIds=" + goodsIds + "&platform=" + platform + "&returnPromotion=" + returnPromotion + "&returnOriginalPrice=" + showOriginalPrice;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
	    	//查询数据方法
	        findMemberOrder:function(id){
	            var defer = $q.defer();
	            var url = baseUrl+"/getorder/"+id+"?userToken="+userToken;
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
	        getlogistics:function(code,logisticsNumber){
	            var defer = $q.defer();
	            var url = baseUrl+'/getlogistics?expCode='+code+"&logisticsNumber="+logisticsNumber+"&userToken="+userToken;
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