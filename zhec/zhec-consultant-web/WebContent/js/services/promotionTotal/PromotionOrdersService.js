angular
    .module('managerApp')
    .factory('PromotionOrdersService', function($http, $q, constCapiLocation) {
        var baseUrl = constCapiLocation + '/consultantorder'; //各种基本路径****
        return {
        	find:function(pageSize,pageNo,orderType) {
                var defer = $q.defer();
                var url = baseUrl + '/findconsultantorderbalancebill?pageSize='+pageSize+"&pageNo="+pageNo+"&orderType="+orderType;
                $http({
                    method: 'get',
                    url: url
                }).success(function(data) {
                    defer.resolve(data);
                }).error(function(data) {
                    defer.reject(data);
                });
                return defer.promise;
            }
            //根据顾问令牌和搜索条件获取顾问推荐的订单列表
//          findOrders: function(userToken, currentPageNo, currentPaseSize, orderSnSearch, orderStatusSearch, startTime, endTime) {
//              var defer = $q.defer();
//              var url = baseUrl + "/memberorders" + "?userToken=" + userToken + "&pageNo=" + currentPageNo + "&PageSize=" + currentPaseSize;
//              if (null !== orderSnSearch && undefined !== orderSnSearch && "" !== orderSnSearch) {
//                  url = url + "&orderSn=" + orderSnSearch;
//              }
//              if (null !== orderStatusSearch && undefined !== orderStatusSearch && "" !== orderStatusSearch) {
//                  url = url + "&orderStatus=" + orderStatusSearch;
//              }
//              if (null !== startTime && undefined !== startTime && "" !== startTime) {
//                  url = url + "&startTime=" + startTime;
//              }
//              if (null !== endTime && undefined !== endTime && "" !== endTime) {
//                  url = url + "&endTime=" + endTime;
//              }
//              $http({
//                  method: 'get',
//                  url: url
//              }).success(function(data) {
//                  defer.resolve(data);
//              }).error(function(data) {
//                  defer.reject(data);
//              });
//              return defer.promise;
//          },
            //根据订单id返回单个订单的详细数据
//          findOrderById: function(orderId, userToken) {
//              var defer = $q.defer();
//              var url = baseUrl + '/memberorders/' + orderId + "?userToken=" + userToken;
//              $http({
//                  method: 'get',
//                  url: url
//              }).success(function(data) {
//                  defer.resolve(data);
//              }).error(function(data) {
//                  defer.reject(data);
//              });
//              return defer.promise;
//          }
        };
    });
