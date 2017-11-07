
/**
 * 系统用户service定义
 */
app
  .factory('myOrderService',function($http,$q,constBaseLocation){

    return {
      //查询数据方法
      find:function(memberId,pageSize,pageNo,orderState,startTime,endTime, parmValue){
        var defer = $q.defer();
        var baseUrl= constBaseLocation + '/findorders';
        //不能为空的参数 menberID,pageSize,pageNo,orderState
        var url = baseUrl+"?memberId="+memberId+"&pageSize="+pageSize+"&pageNo="+pageNo+"&orderState="+orderState+"&startTime="+startTime+"&endTime="+endTime+"&parmValue="+parmValue;

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
      //总取消订单
      putTotalOrder:function(id,memberId){
        var defer = $q.defer();
        var url= constBaseLocation + '/cancelparentorder?orderId='+id+"&memberId="+memberId;
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
      }
    }
  });
