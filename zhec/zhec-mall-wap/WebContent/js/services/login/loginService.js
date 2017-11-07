app.factory('loginService', function($q, $http) {
		return {
			getcaptcha: function() {
				var defer = $q.defer();
				var url = constWapLapiLocation + "/captcha/getcaptcha?" + Math.random();
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
			login: function(res) {
				var defer = $q.defer();
				var url = constWapLapiLocation + '/memberlogin/login';
				$http({
					method: 'post',
					url: url,
					data: res
				}).then(function(resp) {
					//响应成功时调用，resp是一个响应对象
					delCookie("formToken");
					setCookieTime("formToken", "" + JSON.stringify(resp.headers('formToken')), "30");
					var getALLGoods = getCookie("cartManager");
					if(getALLGoods != "") {
						addMultipleGoodsToCart()
					}
					defer.resolve(resp.data);
				}, function(resp) {
					// 响应失败时调用，resp带有错误信息
					defer.resolve(resp.data);
				});
				return defer.promise;
			}
		}
	})