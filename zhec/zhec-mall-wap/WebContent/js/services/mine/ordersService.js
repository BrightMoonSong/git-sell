
app
	.factory('ordersService', function($http, $q, constWapLapiLocation) {
		var baseUrl = constWapLapiLocation +'/member';
		return {
      //查询数据方法
      find:function(memberId,pageSize,pageNo,orderState,startTime,endTime, parmValue){
        var defer = $q.defer();
        //不能为空的参数 menberID,pageSize,pageNo,orderState
        var url = baseUrl + '/findorders'+"?memberId="+memberId+"&pageSize="+pageSize+"&pageNo=5&orderState="+orderState+"&startTime="+startTime+"&endTime="+endTime+"&parmValue="+parmValue;

        $http({
          method:'get',
          url:url
        }).success(function(data){
          defer.resolve(data);
        }).error(function(data){
          console.log('出错了')
          defer.reject(data);
        });
        return defer.promise;
      },
     /* //取消订单
      putOrder:function(order){
        var defer = $q.defer();
        var url= constWapLapiLocation + '/cancel';
        $http({
          method:'put',
          url:url,
          data:order
        }).success(function(data){
          console.log(data)
          defer.resolve(data);
        }).error(function(data){
          defer.reject(data);
        });
        return defer.promise;
      },*/
      //确认收货
      putConfirm:function(order){
        var defer = $q.defer();
        var url= constWapLapiLocation + '/member/submit';
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
      }
    }
	});
