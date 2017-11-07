app.factory('OrderPayService', function($q, $http) {
	return {
		//导航
		navigationBar: function() {
			var defer = $q.defer();
			var url = constWapLapiLocation + "/goods/categorylist";
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
			var url = constWapLapiLocation + "/homepage/findcommenddata?applyType=1";
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
			var url = constWapLapiLocation + "/pay/getpayweixinqrcode?memberId=" + memberId + "&orderId=" + orderId;
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
			var url = constWapLapiLocation + '/pay/payweixin?memberId=' + memberId + "&orderId=" + orderId;
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
			var url = constWapLapiLocation + '/pay/getpayweixinstatus?memberId=' + memberId + "&orderId=" + orderId;
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
			var url = constWapLapiLocation + '/orders/getinitdataforpay?orderId=' + orderId + '&memberId=' + memberId;
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
			var url = constWapLapiLocation + '/pay/sendpaybybalancesms?userToken=' + userToken;
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
			var url = constWapLapiLocation + '/pay/paybybalance?userToken=' + userToken + '&smsCode=' + smsCode + '&orderId=' + orderId + '&money=' + money;
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
			var url = constWapLapiLocation + '/pay/getpaybybalance?userToken=' + userToken + '&orderId=' + orderId;
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
})