
/**
 * 系统用户service定义
 */
app
    .factory('centerService',function($http,$q,constBaseLocation){

        return {
            //查询数据方法
            find:function(memberId){
                var defer = $q.defer();
                var baseUrl= constBaseLocation + '/findrecentorders';
                var url = baseUrl+"?memberId="+memberId;
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
