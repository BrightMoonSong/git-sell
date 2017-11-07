
/**
 * 系统用户service定义
 */
app
  .factory('couponService',function($http,$q){

    return {
      //查询数据方法
      find:function(memberId,pageSize,pageNo,type){
        var defer = $q.defer();
        var baseUrl= constWapLapiLocation + "/membercenter/findmembercoupons";
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
      }
    }
  });
