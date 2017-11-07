app
  .factory('returnOrderService',function($http,$q){
    return {
      //退货订单的列表
      find:function(memberId,pageSize,pageNo){
        var defer = $q.defer();
        var baseUrl= constWapLocation + '/lapi/member/getrefundorders';
        var url = baseUrl+"?memberId="+memberId+"&pageSize="+pageSize+"&pageNo="+pageNo;
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
      //取消订单
      putOrder:function(order){
        var defer = $q.defer();
        var url= constWapLocation + 'lapi/member/cancel';
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
      //确认收货
      putConfirm:function(order){
        var defer = $q.defer();
        var url= constWapLocation + 'lapi/member/submit';
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
      cancleApply:function(orderId,memberId){
        var defer = $q.defer();
        var url= constWapLapiLocation + '/orders/cancelrefund?orderRefundId='+orderId+"&memberId="+memberId;
        $http({
          method:'put',
          url:url,
        }).success(function(data){
          defer.resolve(data);
        }).error(function(data){
          defer.reject(data);
        });
        return defer.promise;
      }
    }
  });
