/**
 * Created by shy on 2016/12/22.
 */

/**
 * 系统用户controller定义
 */
function payMoneyController($rootScope, $scope, $interval, $q, payService, constBaseLocation, ngDialog, $timeout) {
	//成功提示，相当于alert
//	if(/cartinfo.html/g.test(document.referrer)){
//		window.open("index.html","_self")
// //	}
// 	window.onunload=function goBack(){
// 		alert(onunload)
// 	}
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
		var t = setTimeout('window.open("login.html#/login", "_self");', 1500);
		return 0;
	}

  $scope.member = JSON.parse($scope.member);
	$scope.memberId = $scope.member.id;
	$scope.memberLoginId = $scope.member.loginId;
	//memberuserToken=$scope.member.userToken;
	$scope.orderSource = 1; //web端
	$scope.btnMessage = '获取手机验证码';

	$scope.moneyPayBalanceHide = true; //用过余额支付的时候为false
	//页面上的ng-show
	$scope.ifShowWeChat = true; //微信支付
	$scope.ifShowSavingsDepositCard = false; //支付宝
	$scope.ifShowThirdPartyPayment = false; //银联支付
	$scope.balancePayment = false; //用余额支付
	//用于防止页面刚加载时一瞬间先显示出余额支付  加的display none   在这里移除
	document.getElementById("displaynoneang").style.display = '';

	var orderId = GetQueryString("orderId");

	//导航
	$scope.navigationBar = function() {
		var defer = $q.defer();
		payService
			.navigationBar()
			.then(function(result) {
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	};
	//导航 显示的第一行  和  搜索框下的字
	$scope.findcommenddata = function() {
		var defer = $q.defer();
		payService
			.findcommenddata()
			.then(function(result) {
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	}

	$scope.first = function() {
		//获取收货人信息     初始化数据
		payService
			.getinitdataforpay($scope.memberId, orderId)
			.then(
				function(result) {
					if(result.code == -1) {
						$rootScope.showAlert(zhecDisplayMessage.orderError);
						var t = setTimeout('window.open("login.html#/login", "_self");', 1500);
						return 0;
					}
					$scope.dataEntity = result.data;
					//第三方应支付的金额
					$scope.thirdpay = $scope.dataEntity.orderMoney;
					//生成二维码
					$scope.qrcode();
				}
			);
	};
	/**
	 * 生成二维码
	 */
	$scope.qrcode = function() {
		//二维码信息
		payService
			.getpayweixinqrcode($scope.memberId, orderId)
			.then(
				function(result) {
					$scope.textvalue = result.data;
					//在此处生成二维码
					qrcode.makeCode(result.data);
				}
			);
	};

	$scope.WeChat = function() { //微信支付
		if(!$scope.balancePayment && $scope.successSend) {
			$scope.ifShowWeChat = true; //微信支付
			$scope.ifShowSavingsDepositCard = false; //支付宝
			$scope.ifShowThirdPartyPayment = false; //银联支付
		} else {
			$scope.ifShowWeChat = false; //微信支付
			$scope.ifShowSavingsDepositCard = false; //支付宝
			$scope.ifShowThirdPartyPayment = false; //银联支付
		}
	};
	$scope.SavingsDepositCard = function() { //支付宝
		if(!$scope.balancePayment && $scope.successSend) {
			$scope.ifShowWeChat = false; //微信支付
			$scope.ifShowSavingsDepositCard = true; //支付宝
			$scope.ifShowThirdPartyPayment = false; //银联支付
		} else {
			$scope.ifShowWeChat = false; //微信支付
			$scope.ifShowSavingsDepositCard = false; //支付宝
			$scope.ifShowThirdPartyPayment = false; //银联支付
		}
	};
	$scope.ThirdPartyPayment = function() { //银联支付
		if(!$scope.balancePayment && $scope.successSend) {
			$scope.ifShowWeChat = false; //微信支付
			$scope.ifShowSavingsDepositCard = false; //支付宝
			$scope.ifShowThirdPartyPayment = true; //银联支付
		} else {
			$scope.ifShowWeChat = false; //微信支付
			$scope.ifShowSavingsDepositCard = false; //支付宝
			$scope.ifShowThirdPartyPayment = false; //银联支付
		}
	};

	$scope.payChange = function() {
		if($scope.balancePayment == false && $scope.successSend) {
			$scope.WeChat();
		} else {
			$scope.ifShowWeChat = false; //微信支付
			$scope.ifShowSavingsDepositCard = false; //支付宝
			$scope.ifShowThirdPartyPayment = false; //银联支付
		}
	}

	//混合支付之余额支付发送短信验证码
	$scope.paraclass = true;
	$scope.sendpaybybalancesms = function() {
		if($scope.paraclass == true) {
			payService
				.sendpaybybalancesms($scope.member.userToken)
				.then(
					function(result) {

						$scope.time = Number(60);
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
		payService
			.getpaybybalance($scope.member.userToken, orderId)
			.then(
				function(result) {
					//防止用户刷新页面的一瞬间 先看到页面上angular隐藏的东西
					document.getElementById('moneyPayBalanceHide').style.display = '';

					if(result.data.moneyPayBalance != undefined && result.data.moneyPayBalance != null && result.data.moneyPayBalance != "") {
						if(result.data.moneyPayBalance > 0) {
							$scope.moneyPayBalanceHide = false; //将众会账户支付（余额支付）隐藏掉
						}
					}
					if(n != 1) {
						$rootScope.showAlert("还需要支付  " + result.data.lavePayMoney + "  元");
					}

					/**
					 * lavePayMoney:66                  还需其他支付的金额
						moneyOrder:166                   订单价格
						moneyPayBalance:100     余额支付的
					 */
					//第三方应支付的金额
					$scope.thirdpay = result.data.lavePayMoney;
					//生成二维码
					$scope.qrcode();

					//打开微信支付
					if(result.data != null && result.data != undefined && result.data != "") {
						if(result.data.lavePayMoney > 0) {
							$scope.balancePayment = false;
							$scope.successSend = true;
							$scope.WeChat();
						}
					}

				}
			);
	}

	//混合支付之余额支付        userToken,smsCode, orderId,money
	$scope.successSend = true;
	$scope.balancedisabled = false;
	$scope.paybybalance = function() {
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
		payService
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
						location.replace("cartinfo.html?type=2&pid=1&pcount=1");
					}
					if(result.code > 0 || result.code == 0) {
						$scope.successSend = false;
						$scope.balancedisabled = true;
					}
					if(result.code == 1) { //部分支付  1
						$scope.getpaybybalanceInitialization();
						$scope.first();
					}
					if(result.code == -204) {
						$rootScope.showAlert(zhecDisplayMessage.repeatedPayment);
					}
					if(result.code == -203) {
						$rootScope.showAlert(zhecDisplayMessage.orderNotExist);
					}
				}
			);
	};

	//微信刷二维码支付时执行的函数
	//每隔5秒执行一次 clock()
	$interval(function() {
		/*$scope.x = new Date().getSeconds();
		alert($scope.x)*/
		payService
			.getpayweixinstatus($scope.memberId, orderId)
			.then(
				function(result) {
					if(result) {
						location.replace("cartinfo.html?type=2&pid=1&pcount=1", "_self");
					}
				}
			);
	}, 5000);

	//初始化方法
	$scope.first();
	//初始化  查询余额支付情况
	$scope.getpaybybalanceInitialization(1);
}

function payService($q, $http, constBaseLocation) {
	return {
		//导航
		navigationBar: function() {
			var defer = $q.defer();
			var url = constBaseLocation + "/goods/categorylist";
			$http({
				method: 'get',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//导航 显示的第一行  和  搜索框下的字
		findcommenddata: function() {
			var defer = $q.defer();
			var url = constBaseLocation + "/homepage/findcommenddata?applyType=1";
			$http({
				method: 'get',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//模拟微信扫码支付获取二维码链接接口
		getpayweixinqrcode: function(memberId, orderId) {
			var defer = $q.defer();
			var url = constBaseLocation + "/pay/getpayweixinqrcode?memberId=" + memberId + "&orderId=" + orderId;
			$http({
				method: 'get',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data, header, config, status) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//模拟微信扫码支付接口
		payweixin: function(memberId, orderId) {
			var defer = $q.defer();
			var url = constBaseLocation + '/pay/payweixin?memberId=' + memberId + "&orderId=" + orderId;
			$http({
				method: 'get',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//模拟微信扫码支付心跳接口
		getpayweixinstatus: function(memberId, orderId) {
			var defer = $q.defer();
			var url = constBaseLocation + '/pay/getpayweixinstatus?memberId=' + memberId + "&orderId=" + orderId;
			$http({
				method: 'get',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//初始化获取数据的接口
		getinitdataforpay: function(memberId, orderId) {
			var defer = $q.defer();
			var url = constBaseLocation + '/orders/getinitdataforpay?orderId=' + orderId + '&memberId=' + memberId;
			$http({
				method: 'get',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//混合支付之余额支付发送短信验证码
		sendpaybybalancesms: function(userToken) {
			var defer = $q.defer();
			var url = constBaseLocation + '/pay/sendpaybybalancesms?userToken=' + userToken;
			$http({
				method: 'post',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//混合支付之余额支付
		paybybalance: function(userToken, smsCode, orderId, money) {
			var defer = $q.defer();
			var url = constBaseLocation + '/pay/paybybalance?userToken=' + userToken + '&smsCode=' + smsCode + '&orderId=' + orderId + '&money=' + money;
			$http({
				method: 'post',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//混合支付之查询已支付余额
		getpaybybalance: function(userToken, orderId) {
			var defer = $q.defer();
			var url = constBaseLocation + '/pay/getpaybybalance?userToken=' + userToken + '&orderId=' + orderId;
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
	}
}

//用JS获取地址栏参数的方法
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

//二维码
var qrcode = new QRCode(document.getElementById("qrcode"), {
	width: 300,
	height: 300,
	colorDark: "#000000",
	colorLight: "#eeeeee",
	correctLevel: QRCode.CorrectLevel.H
});

angular
	.module('payMoneyApp', ['ngDialog'])
	.controller('payMoneyController', payMoneyController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.directive('search', search)
	.filter('priceFormatFilter', priceFormatFilter)
	.directive('navigationBar', navigationBar)
	.constant('constBaseLocation', ConstBaseLocation)
	.factory('CommonService', CommonService)
	.factory('payService', payService)
	.factory('HttpInterceptor', ['$q', HttpInterceptor]) //定义一个 Service，作为 Interceptors 的处理函数
	.config(['$httpProvider', function($httpProvider) { //添加对应的 Interceptors
		$httpProvider.interceptors.push(HttpInterceptor);
	}])
