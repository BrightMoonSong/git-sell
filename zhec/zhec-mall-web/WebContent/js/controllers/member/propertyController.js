/**
 * Created by Administrator on 2017/1/16.
 */


function propertyController($rootScope,$scope,propertyservice,$q){
  $scope.member = getCookie("loginManager");
  $scope.memberLoginId="";
  if($scope.member != ""){
    $scope.member = JSON.parse($scope.member);
    $scope.memberId = $scope.member.id;
  }

  //左侧菜单的样式
  $scope.$parent.sideIndex=3;
  $rootScope.memberTitle="我的资产-鹿医生";
    //查询 余额和积分列表
    $scope.getmemberspentdate = function(memberID){
        var defer = $q.defer();
        propertyservice
            .getmemberspentdate(memberID)
            .then(function(result) {
                $scope.spentBillList  =result.data.empiricBill;
                $scope.spentScoreList  =result.data.balanceBill;
                defer.resolve(result);
            }, function(result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    $scope.getmemberspentdate($scope.memberID);
  //点击相同的侧边栏 重新刷新数据
  $scope.$on('sideIndex',function (e,data) {//data我们接受到的数据
    if($scope.$parent.sideIndex==data){
      $scope.getmemberspentdate($scope.memberID);
      $scope.findmemberproinfo($scope.memberID);
    }
  });

    //变化类型：1充值增加、2消费减少、3退货增加、4注册赠送增加、5提现减少changeType。
    $scope.estimateType = function(type){
        switch (type){
            case 1 :return "充值增加";  break;
            case 2 :return "消费减少";   break;
            case 3 :return "退货增加";   break;
            case 4 :return "注册赠送增加";   break;
            case 5 :return "提现减少";   break;
            case 6 :return "取消订单增加";   break;
            case 7 :return "推荐注册订单增加";   break;
            case 8 :return "会员推广增加";   break;
        }
    };
    //1、会员注册；2、会员注册；3、商品购买；4、商品评论；5、系统添加；6、系统减少
    //上面的是 余额 下面的是积分
    $scope.estimateScoreType = function(type){
        switch (type){
            case 1 :return "会员注册";   break;
            case 2 :return "会员注册";   break;
            case 3 :return "商品购买";   break;
            case 4 :return "商品评论";   break;
            case 5 :return "系统添加";   break;
            case 6 :return "系统减少";   break;
        }
    };
  //会员充值

  //充值金额
  $scope.money = "";

  $scope.chargeMoney = function(money,chargeStyle){
    if(money<1) return "充值不能小于1";
   /* switch (chargeStyle){
      case 1:
        chargeStyle="webChat";
            break;
      case 2:
        chargeStyle="alipy";
            break;
      case 3:
            chargeStyle="bankCard";
            break;
    }*/
    if(money==null&&money===undefined) return "充值不能为空";
    window.open("chargeMoney.html?money="+money+"&chargeStyle="+chargeStyle+"&memberId="+$scope.memberId);


  };

  //充值的按钮控制，提示信息的显示
  $scope.flag=false;

  //选择充值方式
  $scope.chargeStyle=1;

  $scope.warnSentence="";
  $scope.lostFocus = function(money){
   if(money<1){
      $scope.flag=true;
      $scope.warnSentence= "充值不能为空或输入小于1的数字";
    }else{
      $scope.warnSentence="";
    }
  }
}

app.controller('propertyController',propertyController);

