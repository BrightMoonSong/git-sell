/**
 * Created by shy on 2016/12/22.
 */

/**
 * 系统用户controller定义
 */
function OrderPayController($rootScope, $scope, $interval, $q, OrderPayService, ngDialog, $timeout, $stateParams) {
	$rootScope.showAlert = function(message) {
		var dialog = ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default',
			controller: ['$scope', function($scope) {
				$scope.promptMessage = message;
			}],
		});

		$timeout(function() {
			dialog.close();
		}, 1500);
	};
	$scope.title = titleManage.payMoney;
	$scope.member = getCookie("loginManager");
	if($scope.member == "" || $scope.member == null || $scope.member == undefined) {
		$rootScope.showAlert(zhecDisplayMessage.goLogin);
		//var t = setTimeout('window.open(document.referrer, "_self");', 2000);
		var t = setTimeout('window.open("index.html#/info/login", "_self");', 1500);
		return 0;
	}

	$scope.member = JSON.parse($scope.member);
	$scope.memberId = $scope.member.id;
	$scope.memberLoginId = $scope.member.loginId;
	$scope.orderSource = 2; //web端  1   wap端  2   
	$scope.btnMessage = '获取手机验证码';

	var orderId = $stateParams.orderId;
	$scope.checked = "img/kgg.png"; //余额支付开关  初始为  关闭状态
	$scope.thirdOnline = false; //在线支付的选择 微信 支付宝 初始不展示
	$scope.subbut = '去支付'; //按钮

	$scope.first = function() {
		//获取收货人信息     初始化数据
		OrderPayService
			.getinitdataforpay($scope.memberId, orderId)
			.then(
				function(result) {
					if(result.code == -1) {
						$rootScope.showAlert(zhecDisplayMessage.orderError);
						var t = setTimeout('window.open("index.html#/info/login", "_self");', 1500);
						return 0;
					}
					$scope.dataEntity = result.data;
					//第三方应支付的金额
					//$scope.thirdpay = $scope.dataEntity.orderMoney;

				}
			);
	};

	/**
	 * 余额支付 开关
	 */
	//	$scope.balancePay = new LSwiperMaker({
	//			bind: document.getElementById("rect"), // 绑定的DOM对象
	//			dire_h: true, //true 判断左右， false 判断上下
	//			backfn: function(o) { //回调事件
	//				if(o.dire == 'R'){
	//					alert("向" + o.dire + "滑")
	//					$scope.baePay();
	//					return true;
	//				}else{
	//					return $scope.checked = "img/kgg.png";
	//				}
	//			}
	//		})
	//	$scope.baePay = function() {
	//		$scope.checked = "img/kgk.png";
	//	}
	$scope.balancePay = function() {
		if($scope.moneyPayBalance != 0 && $scope.moneyPayBalance != null) {
			$rootScope.showAlert("已经使用过余额支付，还需要支付  " + $scope.thirdpay + "  元");
			return false;
		}
		if($scope.checked == "img/kgk.png") {
			//关闭
			$scope.checked = "img/kgg.png"; //余额支付开关  初始为  关闭状态
		} else {
			//开启
			$scope.checked = "img/kgk.png";
		}
	};

	//混合支付之余额支付发送短信验证码
	$scope.paraclass = true;
	$scope.sendpaybybalancesms = function() {
		if($scope.dataEntity.balance == 0) {
			$rootScope.showAlert(zhecDisplayMessage.balanceBeEmpty); //您还没余额
			return false;
		}
		if($scope.paraclass == true) {
			OrderPayService
				.sendpaybybalancesms($scope.member.userToken)
				.then(
					function(result) {
						$scope.time = Number(60);
						if(result.code==-204){
							$scope.time = Number(result.data);
						}
						$interval(function() {
							if($scope.time <= 0) {
								$scope.btnMessage = "重发验证码";
								$scope.paraclass = true;
							} else {
								$scope.btnMessage = $scope.time + "秒后可重发";
								$scope.paraclass = false;
								$scope.time--;
							}
						}, 1000, 100);
					}
				);
		}
	};

	$scope.getpaybybalanceInitialization = function(n) {
		//混合支付之查询已支付余额
		OrderPayService
			.getpaybybalance($scope.member.userToken, orderId)
			.then(
				function(result) {
					if(result.data.moneyPayBalance != undefined && result.data.moneyPayBalance != null && result.data.moneyPayBalance != "") {
						if(result.data.moneyPayBalance > 0) {
							$scope.moneyPayBalanceHide = false; //将众会账户支付（余额支付）隐藏掉
							switches['demo-size-3'].disable();
						}
					}
					if(n != 1) {
						$rootScope.showAlert("还需要支付  " + result.data.lavePayMoney + "  元");
						$scope.thirdOnline = true;
					}

					/**
					 * lavePayMoney:66                  还需其他支付的金额
						moneyOrder:166                   订单价格
						moneyPayBalance:100     余额支付的
					 */
					//第三方应支付的金额
					$scope.thirdpay = result.data.lavePayMoney;
					$scope.moneyPayBalance = result.data.moneyPayBalance;

				}
			);
	}

	//混合支付之余额支付        userToken,smsCode, orderId,money
	$scope.successSend = true;
	$scope.balancedisabled = false;
	$scope.paybybalance = function(m) {
		if($scope.smsCode == null || $scope.smsCode == undefined || $scope.smsCode == "") {
			$rootScope.showAlert(zhecDisplayMessage.codeNotBeEmpty);
			return 0;
		}
		//账户余额：$scope.dataEntity.balance
		//订单金额：$scope.dataEntity.orderMoney
		var money;
		if($scope.dataEntity.orderMoney < $scope.dataEntity.balance) {
			money = $scope.dataEntity.orderMoney;
		} else {
			money = $scope.dataEntity.balance;
		}
		if(m == 0) {
			$scope.subbut = '支付中...';
		}
		OrderPayService
			.paybybalance($scope.member.userToken, $scope.smsCode, orderId, money)
			.then(
				function(result) {
					if(result.code == -201) { //验证码输入有误
						$rootScope.showAlert(zhecDisplayMessage.phoneCodeChecked1);
					}
					if(result.code == -200) { //验证码已经失效
						$rootScope.showAlert(zhecDisplayMessage.phoneCodeChecked2);
					}
					if(result.code == 0) { //余额支付成功  0
						$rootScope.showAlert(zhecDisplayMessage.orderBalanceSucess);
						//location.replace("cartinfo.html?type=2&pid=1&pcount=1");
						
						$timeout(function() {
							window.open("index.html#/main/orderlist", "_self");
						}, 1500);
					}
					if(result.code > 0 || result.code == 0) {
						$scope.successSend = false;
						$scope.balancedisabled = true;
					}
					if(result.code == 1) { //部分支付  1
						//alert('余额支付成功,部分支付');
						$scope.getpaybybalanceInitialization();
						$scope.first();
						$scope.onlineshow();
					}
					if(result.code == -204) {
						$rootScope.showAlert(zhecDisplayMessage.repeatedPayment);
					}
					if(result.code == -203) {
						$rootScope.showAlert(zhecDisplayMessage.orderNotExist);
					}
					$scope.subbut = '去支付'; //重置按钮
					if(result.code == 406) {
						console.log('406')
					}
				}
			);
	};
	//去支付按钮
	$scope.submitPay = function() {
		if($scope.checked == "img/kgk.png") {
			$scope.paybybalance(0); //余额支付
		} else { //余额支付关闭状态     分两种情况  1 已经用余额支付过的    2 不启用余额支付的
			//alert("余额支付关闭状态     分两种情况  1 已经用余额支付过的    2 不启用余额支付的");
			//$scope.thirdOnline = true; //第三方显示
			//$(".all_bill_div").slideDown(500);
			window.open('http://wxpay.wxutil.com/mch/pay/h5.v2.php', '_self');
		}
	};
	//选择第三方
	$scope.onlineshow = function() {
		$scope.thirdOnline = true; //第三方显示
		$(".all_bill_div").slideDown(500);
	};
	//完成按钮
	$scope.succthird = function() {
		$(".all_bill_div").slideUp(500);
		$timeout(function() {
			$scope.thirdOnline = false; //第三方隐藏
		}, 500);
		switch ($scope.payMethodValue){
			case 'wxpay'://微信支付
				window.open('http://wxpay.wxutil.com/mch/pay/h5.v2.php', '_self');
				break;
			case 'zfbpay'://支付宝支付
				$rootScope.showAlert('选择的支付宝支付，暂未开通');
				break;
			default://case 'ylpay'://银联支付
				$rootScope.showAlert('选择的银联支付，暂未开通');
				break;
		}
	}
	//选择  支付  方式
	$scope.payMethod = function(obj) {
		$scope.payMethodValue = obj;
	}	

	//初始化方法
	$scope.first();
	//初始化  查询余额支付情况
	$scope.getpaybybalanceInitialization(1);
	//初始化  选择微信支付
	$scope.payMethodValue = 'wxpay';
}

app.controller('OrderPayController', OrderPayController);
