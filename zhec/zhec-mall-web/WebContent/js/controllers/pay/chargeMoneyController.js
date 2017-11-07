/**
 * Created by shy on 2016/12/22.
 */

/**
 * 系统用户controller定义
 */
function chargeMoneyController($rootScope, $scope, $interval, $q, chargeMoneyService, constBaseLocation, ngDialog, $timeout) {

	//获取用户的ID
  //拦截器

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

  $scope.member = getCookie("loginManager");
  if($scope.member == "" || $scope.member == null || $scope.member == undefined) {
    /*$rootScope.showAlert(zhecDisplayMessage.goLogin);
    //var t = setTimeout('window.open(document.referrer, "_self");', 2000);
    var t = setTimeout('window.open("login.html#/login", "_self");', 1500);
    return 0;*/
  }else{
    $scope.member = JSON.parse($scope.member);
    $scope.memberId = $scope.member.id;
    $scope.memberLoginId = $scope.member.loginId;
  }




	//导航
	$scope.navigationBar = function() {
		var defer = $q.defer();
		chargeMoneyService
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
		chargeMoneyService
			.findcommenddata()
			.then(function(result) {
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	}

	//页面上的ng-show
	$scope.ifShowWeChat = true; //微信支付
	$scope.ifShowSavingsDepositCard = false; //储蓄卡
	$scope.ifShowCredit = false; //信用卡
	$scope.ifShowThirdPartyPayment = false; //第三方支付

	/*$scope.WeChat = function() { //微信支付
		$scope.ifShowWeChat = true; //微信支付
		$scope.ifShowSavingsDepositCard = false; //储蓄卡
		$scope.ifShowCredit = false; //信用卡
		$scope.ifShowThirdPartyPayment = false; //第三方支付
	};
	$scope.SavingsDepositCard = function() { //储蓄卡
		$scope.ifShowWeChat = false; //微信支付
		$scope.ifShowSavingsDepositCard = true; //储蓄卡
		$scope.ifShowCredit = false; //信用卡
		$scope.ifShowThirdPartyPayment = false; //第三方支付
	};
	$scope.Credit = function() { //信用卡
		$scope.ifShowWeChat = false; //微信支付
		$scope.ifShowSavingsDepositCard = false; //储蓄卡
		$scope.ifShowCredit = true; //信用卡
		$scope.ifShowThirdPartyPayment = false; //第三方支付
	};
	$scope.ThirdPartyPayment = function() { //第三方支付
		$scope.ifShowWeChat = false; //微信支付
		$scope.ifShowSavingsDepositCard = false; //储蓄卡
		$scope.ifShowCredit = false; //信用卡
		$scope.ifShowThirdPartyPayment = true; //第三方支付
	};*/

	$scope.WeChat = function() { //微信支付
		$scope.ifShowWeChat = true; //微信支付
		$scope.ifShowSavingsDepositCard = false; //支付宝
		$scope.ifShowThirdPartyPayment = false; //银联支付
	};
	$scope.SavingsDepositCard = function() { //支付宝
		$scope.ifShowWeChat = false; //微信支付
		$scope.ifShowSavingsDepositCard = true; //支付宝
		$scope.ifShowThirdPartyPayment = false; //银联支付
	};
	$scope.ThirdPartyPayment = function() { //银联支付
		$scope.ifShowWeChat = false; //微信支付
		$scope.ifShowSavingsDepositCard = false; //支付宝
		$scope.ifShowThirdPartyPayment = true; //银联支付
	};

	//微信刷二维码支付时执行的函数
	//每隔5秒执行一次 clock()
	$interval(function() {
		$scope.x = new Date().getSeconds();

		chargeMoneyService
			.getpayweixinstatus($scope.memberId, $scope.creatOrder)
			.then(
				function(result) {
					if(result) {
						window.open("cartinfo.html?type=4&pid=1&pcount=1", "_self");

					}
				}
			);
	}, 5000);

	//模拟微信扫码支付获取二维码链接接口

	$scope.rechargeType = GetQueryString("chargeStyle");
	$scope.money = GetQueryString("money");

	//首先生成二维码
  $timeout(function() {
    chargeMoneyService
      .getpayweixinqrcode($scope.memberId, $scope.rechargeType, $scope.money)
      .then(
      function(result) {
        $scope.textvalue = result.data;
        $scope.creatOrder = result.data.orderId;
        $scope.creatUrl = result.data.url;
        //首先拿到网址，调用 changeMoney.htm 上定义的makeCode方法
        makeCode($scope.creatUrl);
      }
    );
  },1000)

}

angular
	.module('chargeMoneyApp', ["ngDialog"])
	.controller('chargeMoneyController', chargeMoneyController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.directive('search', search)
	.directive('navigationBar', navigationBar)
	.constant('constBaseLocation', ConstBaseLocation)
	.factory('CommonService', CommonService)
	.factory('HttpInterceptor', ['$q', HttpInterceptor]) //定义一个 Service，作为 Interceptors 的处理函数
	.config(['$httpProvider', function($httpProvider) { //添加对应的 Interceptors
		$httpProvider.interceptors.push(HttpInterceptor);
	}])
	.factory('chargeMoneyService', function($q, $http, constBaseLocation) {
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
			getpayweixinqrcode: function(memberId, rechargeType, money) {
				var defer = $q.defer();
				var url = constBaseLocation + "/pay/rechargebyweixin?memberId=" + memberId + "&rechargeType=" + rechargeType + "&money=" + money;
				$http({
					method: 'post',
					url: url
				}).success(function(data) {

					defer.resolve(data);
				}).error(function(data, header, config, status) {
					defer.reject(data);
				});
				return defer.promise;
			},
			/*//模拟微信扫码支付接口
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
			},*/
			//模拟微信扫码支付心跳接口
			getpayweixinstatus: function(memberId, orderId) {
				var defer = $q.defer();
				var url = constBaseLocation + '/pay/getrechargestatus?memberId=' + memberId + "&orderId=" + orderId;
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
	});

//用JS获取地址栏参数的方法
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
