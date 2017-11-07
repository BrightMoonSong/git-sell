/**
 * 系统用户service定义
 */
angular
  .module('returnOderDetailApp')
  .factory('returnOrderDetailService',function($http,$q,constBaseLocation){
    var baseUrl= constBaseLocation;
    return {
      //查询数据方法
      findMemberOrder:function(memberId,orderId
      ){
        var defer = $q.defer();
        var url = baseUrl+"/orders/getrefunddetail?memberId="+memberId+"&orderId="+orderId;
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
      //确认发货退单
      sendReturnNo:function(data
      ){
        var defer = $q.defer();
        var url = baseUrl+"/member/ship?logisticsNumber="+data.logisticsNumber+"&memberId="+data.memberId+"&orderId="+data.orderId+"&logisticsName="+data.logisticsName+"&logisticsCode="+data.logisticsCode;
        $http({
          method:'put',
          url:url,
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
        var url = baseUrl+"/member/addmessage";
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
      //取消申请
      cancleApply:function(orderId,memberId){
        var defer = $q.defer();
        var url= constBaseLocation + '/orders/cancelrefund?orderRefundId='+orderId+"&memberId="+memberId;
        $http({
          method:'put',
          url:url,
        }).success(function(data){
          defer.resolve(data);
        }).error(function(data){
          defer.reject(data);
        });
        return defer.promise;
      },
      //获取物流公司的列表
      findlogisticscompany:function(memberId,orderId
      ){
        var defer = $q.defer();
        var url = baseUrl+"/orders/findlogisticscompany";
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
      //获取物流信息
      /*getlogistics:function(logisticsNumber){
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
      },*/
      //确认收货
      /*submit:function(order){
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
      },*/
      //删除多个
      /*deleteMore:function(arr){
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
      },*/
      //cookie中商品展示
      /*findCookieGoods:function(arr){
        var defer = $q.defer();
        var url = baseUrl + '/productinfos?productIds='+arr;
        $http({
          method:'get',
          url:url
        }).success(function(data){
          defer.resolve(data);
        }).error(function(data){
          defer.reject(data);
        });
        return defer.promise;
      },*/
      //移入收藏
      /*membercollection:function(collectionGoods){
        var defer = $q.defer();
        var url = constBaseLocation + '/membercollection/collectiongoods';
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
      },*/
      /*pay:function(payGoods){
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
      }*/
    }
  });
