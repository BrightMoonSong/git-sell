app
  .factory('returnOrderService',function($http,$q,constBaseLocation,lapiBaseLocation ){
    return {
      //退货订单的列表
      find:function(memberId,pageSize,pageNo){
        var defer = $q.defer();
        var baseUrl= constBaseLocation + '/getrefundorders';
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
        var url= constBaseLocation + '/cancel';
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
        var url= constBaseLocation + '/submit';
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
        var url= lapiBaseLocation + '/orders/cancelrefund?orderRefundId='+orderId+"&memberId="+memberId;
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
