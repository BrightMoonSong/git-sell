/**
 * Created by like on 2016/12/26.
 */
function centerController($rootScope,$scope,$http,$q,$timeout,centerService,constPageSize,ngDialog) {
    //左侧菜单的样式
  $scope.$parent.sideIndex=0;
  $rootScope.memberTitle="会员中心-鹿医生";
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
  // 重复提交问题
  $scope.confirmOrderDisabled = false;

    //获取订单的列表
    $scope.find = function(){
        var defer = $q.defer();
        centerService
            .find($scope.memberId)
            .then(
            function(result) {
                $scope.allOrders = result.data;
                $scope.total_size=$scope.allOrders.length;

              //控制总订单含有多个子订单和单个自订单的css  margin值 添加不同的css
              for(var i=0;i<$scope.allOrders.length;i++){
                if($scope.allOrders[i].ordersSub.length>1){
                  $scope.allOrders[i].margin_botton=false;
                }else{
                  $scope.allOrders[i].margin_botton=true;
                }
              }

              //提炼优惠信息

              for (var i=0;i<$scope.allOrders.length;i++){
                var ordersDis=$scope.allOrders[i].ordersDiscount
                if(ordersDis==""){
                  continue;
                }
                for(var j=0;j<ordersDis.length;j++){
                  if(ordersDis[j].promotionType==2){
                    $scope.allOrders[i].promotionType2="满"+ordersDis[j].threshold+"减"+ordersDis[j].quota
                  }
                  if(ordersDis[j].promotionType==3){
                    $scope.allOrders[i].promotionType3="使用"+ordersDis[j].quota+"的优惠券"
                  }

                }
              }

              //控制再次购买的按钮
              for(var i=0;i<$scope.allOrders.length;i++){
              //控制立即付款的安建
                $scope.allOrders[i].immidiateBuy = false;
                for(var j=0;j<$scope.allOrders[i].ordersSub.length;j++){
                  $scope.allOrders[i].continueBuy = true;

                  if($scope.allOrders[i].ordersSub[j].orderStatus!=0){
                    $scope.allOrders[i].continueBuy = false;
                  }

                  if($scope.allOrders[i].ordersSub[j].orderStatus==0){
                    //控制立即付款的安建
                    $scope.allOrders[i].immidiateBuy = true;
                  }

                  $scope.allOrders[i].shiped = true;
                  if($scope.allOrders[i].ordersSub[j].orderStatus >= 3){
                    $scope.allOrders[i].shiped = false;
                  }
                  for(var k=0;k<$scope.allOrders[i].ordersSub[j].ordersProduct.length;k++){
                    if($scope.allOrders[i].ordersSub[j].ordersProduct[k].goodsType==1){
                      $scope.allOrders[i].ordersSub[j].buyagain=false;
                    }else{
                      $scope.allOrders[i].ordersSub[j].buyagain=true;
                    }
                  }
                }

              }
                defer.resolve(result);
            }, function(result) {
                defer.reject(result);
            });

        return defer.promise;
    };
    checkLogin();
    $scope.find();
  //点击相同的侧边栏 重新刷新数据
  $scope.$on('sideIndex',function (e,data) {//data我们接受到的数据
    if($scope.$parent.sideIndex==data){
      $scope.find();
    }
  });
  //确认收货的弹窗
  $scope.confirmOrder = function (id, orderSn, orderStatus, memberId, memberLoginId) {
    checkLogin()
    $scope.operationalNotes = "";
    $scope.confirmObj = {
      id: id,
      orderSn: orderSn,
      orderStatus: orderStatus,
      memberId: memberId,
      memberLoginId: memberLoginId,
      operationalNotes: $scope.operationalNotes
    };
    $scope.dialog1 = jDialog.confirm(zhecDisplayMessage.confirmReceiveOrder, {
      handler: function (button, dialog) {
        if($scope.confirmOrderDisabled == true) {
          return 0;
        }
        $scope.confirmOrderDisabled = true;
        /*collectService
         .delete($scope.deleteArr)
         .then(
         function(result) {
         $scope.dialog.close()
         $scope.loadData(true)
         promptBox("商品已删除");
         });*/
        var defer = $q.defer();
        centerService.putConfirm($scope.confirmObj)
          .then(
          function (result) {
            $scope.find();
            promptBox(zhecDisplayMessage.confirmReceiveSucess);
            $scope.dialog1.close();
            $scope.confirmOrderDisabled = false;
          },function(result){
            $scope.confirmOrderDisabled = false;
          });

      }
    }, {
      handler: function (button, dialog) {
        $scope.dialog1.close();
      }
    });
  }

    //判断order_status值，展现不同的内容

    $scope.showStatus =function(status){
        $scope.order_status= orderStatus(status)
        return $scope.order_status
    };

    //取消订单的弹窗
    $scope.cancleDialog=function(id,orderSn, orderStatus,memberId,memberLoginId,payStatus){
      checkLogin()
        $scope.cancleDiaObj={
            id:id,
            orderSn:orderSn,
            orderStatus:orderStatus,
            memberId:memberId,
            memberLoginId:memberLoginId,
            parentOrderPayStatus:payStatus
        };
        $scope.showCancle=ngDialog.open({
            template:'views/member/centerCancleDialog.html',
            className:'ngdialog-theme-default',
            controller:'cancleDialog1',
            scope:$scope,
            width:800,
            height:415
        });
    };
  //关闭弹窗
  $scope.closeCancleDialog = function () {
    $scope.showCancle.close();
  };
  //取消总订单的弹窗+++++++++++++++++++++++++++++++++++++++
  $scope.cancleParent = false;
  $scope.cancleOrder = function (id, memberId) {
    checkLogin()
    $scope.dialog1 = jDialog.confirm(zhecDisplayMessage.confirmCancleOrder, {
      handler: function (button, dialog) {
        /*collectService
         .delete($scope.deleteArr)
         .then(
         function(result) {
         $scope.dialog.close()
         $scope.loadData(true)
         promptBox("商品已删除");
         });*/
        if($scope.cancleParent==true){
          return 0;
        }
        $scope.cancleParent =true;
        var defer = $q.defer();
        centerService.putTotalOrder(id, memberId)
          .then(
          function (result) {
            $scope.find();
            promptBox(zhecDisplayMessage.cancleSuccess);
            $scope.dialog1.close();
            $scope.cancleParent =false;
          },function(result){
            $scope.cancleParent =false;
          });

      }
    }, {
      handler: function (button, dialog) {
        $scope.dialog1.close();
      }
    });
  }

}

function cancleDialog1($scope,$http,$q,$timeout,centerService,constPageSize,ngDialog){
  //确认取消订单
  $scope.cancleSon=false;
  $scope.sum=function(){
    checkLogin()
    if($scope.cancleSon==true){
      return 0;
    }
    $scope.cancleSon=true;
    $scope.cancleDiaObj.operationalNotes=$scope.haveSelect+";其他原因："+$scope.operationalNotes;

    centerService.putOrder($scope.cancleDiaObj)
      .then(
      function(result) {
        $scope.showCancle.close();
        $scope.find();
        $scope.cancleSon=false;
        //defer.resolve(result);
      }, function(result) {
        // defer.reject(result);
        $scope.cancleSon=false;
      });
  };
  //所有原因开始是隐藏的
  $scope.selectNote = false;
  //输入框显示的取消原因
  $scope.haveSelect="";
  //单个取消原因
  $scope.selectOne = "";
  //选择的原因显示输入框
  $scope.selectSeason = function(selectOne){
    $scope.haveSelect =selectOne ;
  };
  //取消订单，选择原因
  $scope.notBuyReason = ["不想买了","该商品众会降价了","其他渠道价格更低,支付方式有误/无法支付","重复下单/误下单","发票信息有误,配送信息有误","订单不能按预计时间送达"];
}



app.controller('centerController',centerController)
    .controller('cancleDialog1',cancleDialog1);



