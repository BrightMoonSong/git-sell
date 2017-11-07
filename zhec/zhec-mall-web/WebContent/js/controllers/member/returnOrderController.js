/**
 * Created by Administrator on 2017/1/16.
 */

/**
 * Created by like on 2016/12/26.
 */
function returnOrderController($rootScope,$scope,returnOrderService,$q,$http,$timeout,constPageSize,ngDialog){
  //左侧菜单的样式
  $scope.$parent.sideIndex=6;
  $rootScope.memberTitle="退货订单-鹿医生";
  $scope.member = getCookie("loginManager");
  $scope.memberLoginId="";
  if($scope.member != ""){
    $scope.member = JSON.parse($scope.member);
    $scope.memberId = $scope.member.id;
  }
  /* //搜索框的订单名字
   $scope.parmValue="";
   //订单列表的分类 （所有订单，待付款，代发货）
   $scope.orderState=0;*/


  //获取我的订单列表
  $scope.find = function(currentPageNo){
    var defer = $q.defer();

    returnOrderService
      .find($scope.memberId,constPageSize,currentPageNo)
      .then(
      function(result) {
        $scope.order_totalSize = result.totalSize;
        $scope.orderLists = result.data;
        console.log($scope.orderLists)
        defer.resolve(result);
      }, function(result) {
        defer.reject(result);
      });

    return defer.promise;
  };
  checkLogin();
  //点击相同的侧边栏 重新刷新数据
  $scope.$on('sideIndex',function (e,data) {//data我们接受到的数据
    if($scope.$parent.sideIndex==data){
      $scope.loadData(true);
    }
  });
  /*//确认订单putConfirm
  $scope.confirmOrder = function(id,orderSn,orderStatus,memberId){
    $scope.operationalNotes="";
    $scope.confirmObj={
      id:id,
      orderSn:orderSn,
      orderStatus:orderStatus,
      memberId:memberId,
      memberLoginId:$scope.loginID,
      operationalNotes:$scope.operationalNotes
    };
    centerService.putConfirm($scope.confirmObj)
      .then(
      function(result) {
        $scope.find();
        //defer.resolve(result);
      }, function(result) {
        // defer.reject(result);
      });

  };*/


  //根据退单的状态展现退单不同的状态
  $scope.returnOrderStatues = function(statue){
    switch (statue){
      case 1:
        $scope.sentenceStatus = "待审核退单";
      break;
      case 2:
        $scope.sentenceStatus = "退单审核通过";
        break;
      case 3:
        $scope.sentenceStatus = "买家已发货退单";
        break;
      case 4:
        $scope.sentenceStatus = "卖家已收货退单";
        break;
      case 5:
        $scope.sentenceStatus = "已退款退单";
        break;
      case 6:
        $scope.sentenceStatus = "已中止退单";
        break;
    }
  };
  //取消订单的申请
  $scope.cancleReturn = false;
  $scope.cancleApply=function(orderId){
    var defer = $q.defer();
    if($scope.cancleReturn ==true){
      return 0;
    }
    $scope.cancleReturn = true;
    returnOrderService
      .cancleApply(orderId,$scope,memberId)
      .then(
      function(result) {
        $scope.loadData(true);
        $scope.cancleReturn = false;
        defer.resolve(result);
      }, function(result) {
        $scope.cancleReturn = false;
        defer.reject(result);
      });

    return defer.promise;
  };
  //取消申请的弹窗
  $scope.cancleApply = function(orderId){
    $scope.dialog1 = jDialog.confirm(zhecDisplayMessage.cancleOrderApply, {
      handler: function(button, dialog) {
        /*collectService
          .delete($scope.deleteArr)
          .then(
          function(result) {
            $scope.dialog.close()
            $scope.loadData(true)
            promptBox("商品已删除");
          });*/
        var defer = $q.defer();
        returnOrderService
          .cancleApply(orderId,$scope.memberId)
          .then(
          function(result) {
            $scope.loadData(true);
            promptBox(zhecDisplayMessage.cancleOrderApplySuccess);
            $scope.dialog1.close();
          });

      }
    }, {
      handler: function(button, dialog) {
        $scope.dialog1.close();
      }
    });
  }
  }


app.controller('returnOrderController',returnOrderController)
	.directive('datalistpager', datalistpager)

