/**
 * Created by like on 2016/12/26.
 */
function couponController($rootScope,$scope,$http,$q,$timeout,couponService,constPageSize,ngDialog) {
  //左侧菜单的样式
  $scope.$parent.sideIndex=8;
  $rootScope.memberTitle="优惠券-鹿医生";
  $scope.member = getCookie("loginManager");
  $scope.memberLoginId="";
  if($scope.member != ""){
    $scope.member = JSON.parse($scope.member);
    $scope.memberId = $scope.member.id;
    $scope.loginId = $scope.member.loginId;

  }
  /* //搜索框的订单名字
   $scope.parmValue="";
   //订单列表的分类 （所有订单，待付款，代发货）
   $scope.orderState=0;*/

  //默认获取未使用优惠券
  $scope.type=1;
  $scope.type_button=true;
  //获取订单的列表
  $scope.find = function(currentPageNo){
    var defer = $q.defer();
    couponService
      .find($scope.memberId,constPageSize,currentPageNo,$scope.type)
      .then(
      function(result) {
        $scope.couponData=result;
        $scope.coupons= result.data;
        //applicablePlatform  判断适用平台
        for(var i=0;i<$scope.coupons.length;i++){
          $scope.coupons[i].applicablePlatform=$scope.coupons[i].applicablePlatform.replace(1,"PC端");
          $scope.coupons[i].applicablePlatform=$scope.coupons[i].applicablePlatform.replace(2,"手机端");
          $scope.coupons[i].applicablePlatform=$scope.coupons[i].applicablePlatform.replace(3,"App");
          $scope.coupons[i].arrPlatform = $scope.coupons[i].applicablePlatform.split(",");

          if($scope.coupons[i].arrPlatform.length==3){
            $scope.coupons[i].arrPlatform="线上";
          }else{
            $scope.coupons[i].arrPlatform=$scope.coupons[i].arrPlatform.join(",");
          }
        }


        defer.resolve(result);
      }, function(result) {
        defer.reject(result);
      });

    return defer.promise;
  };
  checkLogin();

  // 点击相同的侧边栏  刷新数据
  $scope.$on('sideIndex',function (e,data) {//data我们接受到的数据
    if($scope.$parent.sideIndex==data){
      $scope.loadData(true)
    }
  });

  $scope.toUse= function(){
    $scope.type=1;
    $scope.type_button=true;

    $scope.loadData(true)
  };
  $scope.alreadyUse= function(){
    $scope.type=2;
    $scope.type_button=false;
    $scope.loadData(true)
  };
  $scope.expired= function(){
    $scope.type=3;
    $scope.type_button=false;
    $scope.loadData(true)
  }
  $scope.lostEfficacy=function(){
    $scope.type=4;
    $scope.type_button=false;
    $scope.loadData(true)
  }

}





app.
  controller('couponController',couponController)
  .directive('datalistpager', datalistpager);




