
/**
 * 系统用户service定义
 */
app
  .factory('couponService',function($http,$q,lapiBaseLocation){

    return {
      //查询数据方法
      find:function(memberId,pageSize,pageNo,type){
        var defer = $q.defer();
        var baseUrl= lapiBaseLocation + "/membercenter/findmembercoupons";
        var url = baseUrl+"?memberId="+memberId+"&pageSize="+pageSize+"&pageNo="+pageNo+"&type="+type;
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
      }
    }
  });
