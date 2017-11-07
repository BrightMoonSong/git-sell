/**
 * controller定义
 */
function ordersController($scope,$q,ordersService,ngDialog){

  //订单列表的分类  默认时获取所有的订单（所有订单，待付款，代发货）
  //$scope.orderState=0;

  //获取地址栏的信息
  $scope.locationUrl=window.location.href;
  if(/orderState=\d+/g.test($scope.locationUrl)){
    $scope.orderState=parseInt($scope.locationUrl.match(/orderState=\d+/g)[0].split("=")[1]);
  }
  //$scope.orderState 默认为0  即获取所有的数据
  if($scope.orderState==""||$scope.orderState==undefined){
    $scope.orderState=0;
  }
  /*$scope.member = getCookie("loginManager");
  $scope.memberLoginId="";
  if($scope.member != ""){
    $scope.member = JSON.parse($scope.member);
    $scope.memberId = $scope.member.id;
  }*/
  //左侧菜单的样式
  $scope.$parent.sideIndex=1;
  //搜索框的订单名字
  $scope.parmValue="";


  //获取我的订单列表
  //获取我的订单列表
  $scope.find = function(currentPageNo){
    /* 请求不能为空的参数  menberID,pageSize,pageNo,orderState
     传参的顺序 memberId,pageSize,pageNo,orderState,startTime,endTime, parmValue*/
    if(!$scope.isSearch){
      $scope.startTime="";
      $scope.endTime="";
      $scope.parmValue="";
    }
    $scope.isSearch=false;
    var defer = $q.defer();
    console.log(111111111111111111111111111111111111111111111)
    ordersService
      /*.find($scope.memberId,constPageSize,currentPageNo,$scope.orderState,$scope.startTime,$scope.endTime,$scope.parmValue)*/
      .find(16,10,1,$scope.orderState,$scope.startTime,$scope.endTime,$scope.parmValue)
      .then(
      function(result) {
        console.log(111111111111111111111111111111111)
        console.log(result);
        $scope.order_totalSize = result.totalSize;
        $scope.allOrders = result.data;
        //orderLists 用于orderStatu==3时 渲染页面
        $scope.orderLists=result.data;



        //算出每一个子订单的商品总量 num
        for(var i=0;i<$scope.allOrders.length;i++){
          for(var j=0;j<$scope.allOrders[i].ordersSub.length;j++){
            $scope.allOrders[i].ordersSub[j].num=0;
            for(var k=0;k<$scope.allOrders[i].ordersSub[j].ordersProduct.length;k++){
              $scope.allOrders[i].ordersSub[j].num=Number($scope.allOrders[i].ordersSub[j].num)+$scope.allOrders[i].ordersSub[j].ordersProduct[k].productNumber;
            }

          }
          if($scope.allOrders[i].ordersSub){
            if($scope.allOrders[i].ordersSub.length>1){
              $scope.allOrders[i].isHave_Son=false;

            }else{
              $scope.allOrders[i].isHave_Son=true;


              //$scope.orderSub = $scope.allOrders[i]
            }
          }else{
            return
          }
        }
        console.log(999);
        console.log($scope.allOrders);
        //$scope.findordersnum($scope.memberID);
        defer.resolve(result);
      }, function(result) {
        defer.reject(result);
      });

    return defer.promise;
  };

  $scope.find();
  //$scope.loadData(true);


  /*orderState=1 未支付
   2 待发货
   3  待收货
   0  所有*/
  //查询全部订单
  $scope.findAllOrders=function(){
    $scope.orderState=0;
    $scope.parmValue="";
   // $scope.loadData(true);
    $scope.find();
  };
  //查询未支付订单
  $scope.findNotPay = function(){
    $scope.orderState=1;
    $scope.parmValue="";
    //$scope.loadData(true);
    $scope.find();
  };
  //查询待发货订单
  $scope.findNotSent = function(){
    $scope.orderState=2;
    $scope.parmValue="";
    //$scope.loadData(true);
    $scope.find();
  };
  //查询待收货订单
  $scope.findNotReceive = function(){
    $scope.orderState=3;
    $scope.parmValue="";
    //$scope.loadData(true);
    $scope.find();
  };


  //判断总订单paystatue的值，展现不同的内容

  $scope.payStatus=function(payStatus) {
    if(payStatus == 0){
      return "未支付";
    }else if(payStatus == 1){
      return "已付款";
    }
  }

  //取消子订单的弹窗
  $scope.cancleDialog=function(id,orderSn, orderStatus,memberId){
    $scope.cancleDiaObj={
      id:id,
      orderSn:orderSn,
      orderStatus:orderStatus,
      memberId:memberId,
      memberLoginId:$scope.loginID
    };
    console.log('++++++++++++++++++++++++++++++');
    $scope.showCancle=ngDialog.open({
      template:'views/member/ordersCancleDialog.html',
      className:'ngdialog-theme-default',
      controller:'cancleDialog',
      scope:$scope,
      width:600
    });
  };
  //关闭弹窗
  $scope.closeCancleDialog = function(){
    $scope.showCancle.close();
  };
  //取消总订单的弹窗+++++++++++++++++++++++++++++++++++++++
  $scope.cancleDialog=function(id,orderSn, orderStatus,memberId){
    $scope.cancleDiaObj={
      id:id,
      orderSn:orderSn,
      orderStatus:orderStatus,
      memberId:memberId,
      memberLoginId:$scope.loginID
    };
    console.log('++++++++++++++++++++++++++++++');
    $scope.showCancle=ngDialog.open({
      template:'views/mine/ordersCancleDialog.html',
      className:'ngdialog-theme-default',
      controller:'cancleDialog',
      scope:$scope,
      width:600
    });
  };
  //再来一单 加入购物车
  //订单调用加入购物车的方法定义
  $scope.addOrderToCar =function(products){
    console.log(products)
    var defer = $q.defer();
    if(products.length==1){
      addGoodsToCart(products[0].productId,products[0].productNumber,products[0].consultantId)
    }else{
      var orderGoods = [];
      var orderGood  = {};
      for (var i=0;i<products.length;i++){
        orderGood  = {};
        orderGood.productId = products[i].productId;
        orderGood.count = products[i].productNumber;
        orderGood.loginId = $scope.loginID;
        orderGood.memberId = $scope.memberID;
        orderGood.consultantId = products[i].consultantId;
        orderGoods.push(orderGood)
      }
      batchAddGoodsToCart(orderGoods,2);
    }
  };
  //+++++++++++++++++++++++++++++++++++++++++++++++++
  //确认订单putConfirm
  //取消申请
  $scope.confirmOrder = function(id,orderSn,orderStatus,memberId,memberLoginId){
    $scope.operationalNotes="";
    $scope.confirmObj={
      id:id,
      orderSn:orderSn,
      orderStatus:orderStatus,
      memberId:memberId,
      memberLoginId:memberLoginId,
      operationalNotes:$scope.operationalNotes
    };

    $scope.dialogcle = jDialog.confirm('确认收货？', {
      handler: function(button, dialog) {
        var defer = $q.defer();
        ordersService
          .putConfirm($scope.confirmObj)
          .then(
          function(result) {
            $scope.find();
            promptBox("收货成功");
            $scope.dialogcle.close();
          });
      }
    }, {
      handler: function(button, dialog) {
        $scope.dialogcle.close();
      }
    });
  };





  /*$scope.confirmOrder = function(id,orderSn,orderStatus,memberId,memberLoginId){
    $scope.operationalNotes="";
    $scope.confirmObj={
      id:id,
      orderSn:orderSn,
      orderStatus:orderStatus,
      memberId:memberId,
      memberLoginId:memberLoginId,
      operationalNotes:$scope.operationalNotes
    };
    var whetherConfirmDialog = ngDialog.open({
      template:'<div> 你真的要收货成功吗？</div>',
      className:'ngdialog-theme-default',
      controller:'ordersController',
      scope:$scope,
      width:600
    });
    $scope.closeCancleDialog = function(){
      whetherConfirmDialog.close();
    }
    ordersService.putConfirm($scope.confirmObj)
      .then(
      function(result) {
        $scope.find();
        var dialog = ngDialog.open({
          template: '<h3>确认收货</h3>' +
          '<p> 恭喜你，你已经收货成功</p>',
          plain: true,
          closeByDocument: true,
          closeByEscape: true
        });
        $timeout(function() {
          dialog.close();
        }, 2000);
        console.log('确认订单成功');
        //defer.resolve(result);
      }, function(result) {
        // defer.reject(result);
      });

  };*/

    var orderSwiper = new Swiper ('.swiper-container', {
      spaceBetween: 30,
      freeModeMomentumBounce:true,
      slidesPerView:"auto",
      preventClicks:true,
      preventClicksPropagation:true,
      observer:true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents:true,//修改swiper的父元素时，自动初始化swiper
    });

}

function cancleDialog($scope,$http,$q,$timeout,ordersService,ngDialog){
  //确认取消订单
  $scope.sum=function(){
    $scope.cancleDiaObj.operationalNotes=$scope.haveSelect+";其他原因："+$scope.operationalNotes;
    ordersService.putOrder($scope.cancleDiaObj)
      .then(
      function(result) {
        $scope.showCancle.close();
        $scope.loadData(false);
        console.log('取消订单成功');
        //defer.resolve(result);
      }, function(result) {
        // defer.reject(result);
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
  }
  //取消订单，选择原因
  $scope.notBuyReason = ["不想买了","该商品众会降价了","其他渠道价格更低,支付方式有误/无法支付","重复下单/误下单","商品买错了,忘记使用优惠券","发票信息有误,配送信息有误","订单不能按预计时间送达"];
}
app
  .controller('ordersController', ordersController)
  .controller('cancleDialog', cancleDialog);
