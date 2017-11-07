/**
 * Created by like on 2016/12/26.
 */
function myOrderController($rootScope,$scope, $http, $q, $timeout, myOrderService, constPageSize, ngDialog) {

  $scope.member = getCookie("loginManager");
  $scope.memberLoginId = "";
  if ($scope.member != "") {
    $scope.member = JSON.parse($scope.member);
    $scope.memberId = $scope.member.id;
  }
  //左侧菜单的样式
  $scope.$parent.sideIndex = 1;
  $rootScope.memberTitle="我的订单-鹿医生";
  //搜索框的订单名字
  $scope.parmValue = "";
  //订单列表的分类 （所有订单，待付款，代发货）
  $scope.orderState = 0;


  $scope.$on('sideIndex',function (e,data) {//data我们接受到的数据
    /*$scope.product.count = data/$scope.product.price;*/
    if($scope.$parent.sideIndex==data){
    	//定义分页指令调用
      $scope.loadData(true);
    }
  });
// 重复提交问题
  $scope.confirmOrderDisabled = false;
  //获取我的订单列表
  $scope.find = function (currentPageNo) {
    /* 请求不能为空的参数  menberID,pageSize,pageNo,orderState
     传参的顺序 memberId,pageSize,pageNo,orderState,startTime,endTime, parmValue*/
    if (!$scope.isSearch) {
      $scope.startTime = "";
      $scope.endTime = "";
      $scope.parmValue = "";
    }
    $scope.isSearch = false;
    var defer = $q.defer();
    myOrderService
      .find($scope.memberId, constPageSize, currentPageNo, $scope.orderState, $scope.startTime, $scope.endTime, $scope.parmValue)
      .then(
      function (result) {
        $scope.order_totalSize = result.totalSize;
        $scope.allOrders = result.data;
        if ($scope.allOrders != "") {
          if (!$scope.allOrders[0].ordersSub) {
            $scope.titalFlag = false;
            $scope.allOrders = [];
            $scope.allOrders = [{ordersSub: result.data}];

          } else {
            $scope.titalFlag = true;
          }
        }

        //orderLists 用于orderStatu==3时 渲染页面
        //$scope.orderLists=result.data;
        //控制总订单含有多个子订单和单个自订单的css  margin值 添加不同的css
        //treat_money_order_orli_margin:orderList.margin_botton
        if ($scope.allOrders != "") {
          if ($scope.allOrders[0].id === "" || $scope.allOrders[0].id === undefined || $scope.allOrders[0].id === null) {
            $scope.allOrders[0].margin_botton = true;
          } else {
            for (var i = 0; i < $scope.allOrders.length; i++) {
              $scope.allOrders[i].margin_botton = false;
            }

          }

          //控制再次购买的按钮
          //当所有子订单的状态为0时 continueBuy  =true

          for(var i=0;i<$scope.allOrders.length;i++){
            //控制立即付款的安建
            $scope.allOrders[i].immidiateBuy = false;
            $scope.allOrders[i].continueBuy = true;
            //取消订单的按钮
            $scope.allOrders[i].shiped = true;
            for(var j=0;j<$scope.allOrders[i].ordersSub.length;j++){
              if($scope.allOrders[i].ordersSub[j].orderStatus!=0){
                $scope.allOrders[i].continueBuy = false;
              }

              if($scope.allOrders[i].ordersSub[j].orderStatus==0){
                $scope.allOrders[i].immidiateBuy = true;
              }

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
        }



        //提炼优惠信息
        if ($scope.orderState != 3) {
          for (var i = 0; i < $scope.allOrders.length; i++) {
            var ordersDis = $scope.allOrders[i].ordersDiscount
            if (ordersDis == "") {
              continue;
            }
            for (var j = 0; j < ordersDis.length; j++) {
              if (ordersDis[j].promotionType == 2) {
                $scope.allOrders[i].promotionType2 = "满" + ordersDis[j].threshold + "减" + ordersDis[j].quota
              }
              if (ordersDis[j].promotionType == 3) {
                $scope.allOrders[i].promotionType3 = "使用" + ordersDis[j].quota + "的优惠券"
              }

            }
          }
        }

        $scope.findordersnum($scope.memberID);
        defer.resolve(result);
      }, function (result) {
        defer.reject(result);
      });

    return defer.promise;
  };

  checkLogin();
  /*orderState=1 未支付
   2 待发货
   3  待收货
   0  所有*/
  //查询全部订单
  $scope.findAllOrders = function () {
    $scope.orderState = 0;
    $scope.parmValue = "";
    $scope.startTime =$("#inpstart").val()+" 00:00:00";
    $scope.endTime = $("#inpend").val()+ " 23:59:59";
    $scope.isSearch = true;
    $scope.loadData(true);

  };
  //查询未支付订单
  $scope.findNotPay = function () {
    $scope.orderState = 1;
    $scope.parmValue = "";
    $scope.loadData(true);
  };
  /*//查询待发货订单
  $scope.findNotSent = function () {
    $scope.orderState = 2;
    $scope.parmValue = "";
    $scope.loadData(true);
  };*/
  //查询待收货订单
  $scope.findNotReceive = function () {
    $scope.orderState = 3;
    $scope.parmValue = "";
    $scope.loadData(true);
  };


  //判断order_status值，展现不同的内容

  $scope.showStatus = function (status) {
    $scope.order_status = orderStatus(status)
    return $scope.order_status
  };

  //取消子订单的弹窗
  $scope.cancleDialog = function (id, orderSn, orderStatus,memberId,memberLoginId,payStatus) {
    checkLogin()
    $scope.cancleDiaObj = {
      id: id,
      orderSn: orderSn,
      orderStatus: orderStatus,
      memberId: memberId,
      memberLoginId: $scope.loginID,
      parentOrderPayStatus:payStatus
    };
    $scope.showCancle1 = ngDialog.open({
      template: 'views/member/ordersCancleDialog.html',
      className: 'ngdialog-theme-default',
      controller: 'cancleDialog',
      scope: $scope,
      width: 800,
      height:415
    });
  };
  //关闭弹窗
  $scope.closeCancleDialog = function () {
    $scope.showCancle1.close();
  };
  //取消总订单的弹窗+++++++++++++++++++++++++++++++++++++++
  $scope.cancleParent = false;
  $scope.cancleOrder = function (id, memberId) {
    checkLogin()

    $scope.dialog1 = jDialog.confirm(zhecDisplayMessage.confirmCancleOrder, {
      handler: function (button, dialog) {
        if($scope.cancleParent == true){
          return 0;
        }
        $scope.cancleParent = true;
        var defer = $q.defer();
        myOrderService.putTotalOrder(id, memberId)
          .then(
          function (result) {
            $scope.loadData(false);
            promptBox(zhecDisplayMessage.cancleSuccess);
            $scope.dialog1.close();
            $scope.cancleParent = false;
          },function(result){
            $scope.cancleParent = false;
          });

      }
    }, {
      handler: function (button, dialog) {
        $scope.dialog1.close();
      }
    });
  }

  //确认收货的弹窗
  $scope.confirmOrder = function (id, orderSn, orderStatus, memberId, memberLoginId) {
    checkLogin()
    $scope.confirmOrderDisabled = false;
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
        $scope.confirmOrderDisabled = true
        /*collectService
         .delete($scope.deleteArr)
         .then(
         function(result) {
         $scope.dialog.close()
         $scope.loadData(true)
         promptBox("商品已删除");
         });*/
        var defer = $q.defer();
        myOrderService.putConfirm($scope.confirmObj)
          .then(
          function (result) {
            $scope.loadData(true);
            promptBox(zhecDisplayMessage.confirmReceiveSucess);
            $scope.dialog1.close();
            $scope.confirmOrderDisabled = false;
          },function(result){
            $scope.confirmOrderDisabled = false
          });

      }
    }, {
      handler: function (button, dialog) {
        $scope.dialog1.close();
      }
    });
  }
  //启动时间插件
  var start = {
    format: 'YYYY-MM-DD',
    ishmsVal: false,
    isTime: false,
    maxDate: '2099-06-30 23:59:59', //最大日期
    choosefun: function (elem, datas) {
      end.minDate = datas; //开始日选好后，重置结束日的最小日期
      $scope.startTime = "";
      $scope.startTime = datas + " 00:00:00";
    },
    clearfun: function () {
      $scope.startTime = "";
    }
  };
  var end = {
    format: 'YYYY-MM-DD',
    minDate: $.nowDate(0), //设定最小日期为当前日期
    festival: false,
    maxDate: '2099-06-16 23:59:59', //最大日期
    choosefun: function (elem, datas) {
      start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
      $scope.endTime = "";
      $scope.endTime = datas + " 23:59:59";
    },
    clearfun: function () {
      $scope.endTime = "";
    }
  };
  $('#inpstart').jeDate(start);
  $('#inpend').jeDate(end);


//根据商品名搜索订单
  $scope.searchOrders = function (name) {
    checkLogin()
    var defer = $q.defer();
    $scope.parmValue = name;
    $scope.orderState = 0;
    $scope.isSearch = true;
    $scope.loadData(true);
  }
}

function cancleDialog($scope, $http, $q, $timeout, myOrderService, constPageSize, ngDialog) {
  //确认取消订单
  $scope.operationalNotes = "";
  $scope.cancleSon = false;
  $scope.sum = function () {
    checkLogin()
    if($scope.cancleSon==true){
      return 0;
    }
    $scope.cancleSon=true;
    $scope.cancleDiaObj.operationalNotes = $scope.haveSelect + ";其他原因：" + $scope.operationalNotes;
    myOrderService.putOrder($scope.cancleDiaObj)
      .then(
      function (result) {
        $scope.showCancle1.close();
        $scope.loadData(false);
        $scope.cancleSon=false;
        //defer.resolve(result);
      }, function (result) {
        $scope.cancleSon=false;
        // defer.reject(result);
      });
  };
  //所有原因开始是隐藏的
  $scope.selectNote = false;
  //输入框显示的取消原因
  $scope.haveSelect = "";
  //单个取消原因
  $scope.selectOne = "";
  //选择的原因显示输入框
  $scope.selectSeason = function (selectOne) {
    $scope.haveSelect = selectOne;
  }
  //取消订单，选择原因
  $scope.notBuyReason = ["不想买了", "该商品鹿医生降价了", "重复下单/误下单", "发票信息有误。配送信息有误","订单不能按预计时间送达", "其他渠道价格更低，支付方式有误/无法支付"];
}


angular
  .module('memberApp')
  .controller('myOrderController', myOrderController)
  .controller('cancleDialog', cancleDialog)
  .directive('datalistpager', datalistpager);


