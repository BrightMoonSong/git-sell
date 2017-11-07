angular
    .module('managerApp')
    .factory('timedtaskService',function($http,$q){
        var baseUrl= constManagerLocation;
        return {
            //顾问相关 校验有效期：每天凌晨执行，判断顾问有效期是否过期，如过期，修改顾问状态为已过期
            consultant1:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/consultant/1?id="+id;
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
            //临近有效期提醒：每天执行，顾问有效期到期前30天、10天、3天各短信提醒一次
            consultant2:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/consultant/2?id="+id;
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
            //提现流程状态自动确认：每天执行，提现流程状态为已转账超过5天，自动变为已确认
            consultant3:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/consultant/3?id="+id;
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
            //自动停止提现流程：每月末，财务结账日，自动把待审批的提现流程改为审批不通过
            consultant4:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/consultant/4?id="+id;
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
        //订单相关  取消24小时未支付的过期订单
            order1:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/1?id="+id;
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
            //已发货订单30天未操作，自动变为已收货订单（间隔时间从15天——————变为——————>30天，每天执行一次）
            order2:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/2?id="+id;
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
            //已收货超过15天自动变为已安全订单(每天执行)
            order3:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/3?id="+id;
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
            //已安全订单判断退货标识字段为无退货或退货完成，变为待结算订单(每天执行)
            order4:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/4?id="+id;
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
            //待结算订单执行结算操作，并把状态改为已完成订单（每月执行）
            order5:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/5?id="+id;
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
            //已审核退单7天内未发货，自动变为已中止退单(每天执行)
            order6:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/6?id="+id;
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
            //已发货退单30天内未收到货，自动变为已中止退单(每天执行)
            order7:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/7?id="+id;
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
            //查询所有退货中子订单，看该子订单的退货订单中是否全部完成或者中止，如果全部完成或中止，则修改子订单状态(每天执行)
            order8:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/8?id="+id;
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
            //搜索相关http接口
            //将goods_info表中的index_status为0的添加到ES索引库中，并将index_status状态从0改成1
            http1:function(){
                var defer = $q.defer();
                var url = baseUrl+"/test/search/1";
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
            //将goods_info表中的index_status为3的从ES索引库中删除，并将index_status状态从3改成2
            http2:function(){
                var defer = $q.defer();
                var url = baseUrl+"/test/search/2";
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
            //校验相关
            //1校验用户余额、积分、经验
            verify1:function(){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/verifytest/1";
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
            //2校验顾问余额
            verify2:function(){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/verifytest/2";
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
            //3校验库存
            verify3:function(){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/verifytest/3";
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
        }
    });



