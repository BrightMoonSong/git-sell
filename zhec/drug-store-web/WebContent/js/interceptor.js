/**
 * 拦截器配置
 */
var formToken, formTokenCookie;

if(localStorage.formToken == '' || localStorage.formToken == undefined) {
	formTokenCookie = '';
} else {
	formTokenCookie = localStorage.formToken;
}

function HttpInterceptor($rootScope, $q, constMapiLocation, constMessageCode, constHttpCode, $stateParams) {
	return {
		request: function(config) {
			if(config.url.indexOf('getnotice') < 0&&config.url.indexOf('api/order/findinfos') < 0){
				$rootScope.showLoading();
			}
			if(config.url.indexOf('sapi') > 0) { //如果发送的是后台请求
				//$rootScope.showLoading(); //显示加载中提示框
				//增加userToken到url
				$rootScope.checkLogin(); //判断是否登录
				if(config.url.indexOf('userToken') < 0) { //判断是否已经加上userToken
					if(config.url.indexOf('?') < 0) {
						config.url += "?userToken=" + localStorage.userToken;
					} else {
						config.url += "&userToken=" + localStorage.userToken;
					}
				}
				//				if(config.url.indexOf('formtoken') < 0) { //判断是否已经加上 formtoken
				//					if(formToken == undefined) {
				//						formToken = localStorage.formToken;
				//					}
				//					if(config.url.indexOf('?') < 0) {
				//						config.url += "?formToken=" + formToken;
				//					} else {
				//						config.url += "&formToken=" + formToken;
				//					}
				//				}
				//				if(config.url.indexOf('funcId') < 0) { //判断是否已经加上 funcId
				//					if(config.url.indexOf('?') < 0) {
				//						config.url += "?funcId=" + localStorage.funcId;
				//					} else {
				//						config.url += "&funcId=" + localStorage.funcId;
				//					}
				//				}
				//				localStorage.removeItem("funcId");
				//				localStorage.setItem("funcId", $stateParams.funcId);
				if($stateParams.funcId) {
					if(config.url.indexOf('funcId') < 0) { //判断是否已经加上 funcId
						if(config.url.indexOf('?') < 0) {
							config.url += "?funcId=" + $stateParams.funcId;
						} else {
							config.url += "&funcId=" + $stateParams.funcId;
						}
					}
				}

			}
			config.url = config.url.replace(/#/g, '%23');
			return config;
		},
		requestError: function(err) {
			if(config.url.indexOf('getnotice') < 0&&config.url.indexOf('api/order/findinfos') < 0){
				$rootScope.showLoading();
			}
			return $q.reject(err);
		},
		response: function(res) {
			$rootScope.hideLoading(); //隐藏加载中提示框
			if(res.headers().formtoken != undefined) {
				formToken = res.headers().formtoken;
				localStorage.removeItem("formToken");
				localStorage.setItem("formToken", formToken);
			}

			if(res.config.url.indexOf('sapi') > 0) { //如果发送的是后台请求
				$rootScope.hideLoading(); //隐藏加载中提示框
				if(constMessageCode[res.data.code].type == '2') { //正常并alert信息												//执行失败，显示错误提示框
					$rootScope.showPrompt(constMessageCode[res.data.code].message);
				} else if(constMessageCode[res.data.code].type == '4') { //提示错误信息											//执行失败，显示错误提示框
					$rootScope.showFail(constMessageCode[res.data.code].message);
					return $q.reject(res);
				} else if(constMessageCode[res.data.code].type == '1') { //正常但不alert信息

				} else if(constMessageCode[res.data.code].type == '5') { //登录过期，需要重新登录
					$rootScope.showFail(constMessageCode[res.data.code].message);
					$rootScope.gotoLogin();
					return $q.reject(res);
				} else {
					return $q.reject(res);
				}
			}
			return res;
		},
		responseError: function(response) {
			$rootScope.hideLoading(); //隐藏加载中提示框
			if(response.headers().formtoken != undefined) {
				formToken = response.headers().formtoken;
				localStorage.removeItem("formToken");
				localStorage.setItem("formToken", formToken);
			}
			if(constHttpCode[response.status].type == '4') { //提示错误信息									//执行失败，显示错误提示框
				$rootScope.showFail(constHttpCode[response.status].message);
				//	$rootScope.gotoIndex();
				return $q.reject(response);
			} else if(constHttpCode[response.status].type == '5') { //提示错误信息								//执行失败，显示错误提示框
				$rootScope.showFail(constHttpCode[response.status].message);
				//	$rootScope.gotoLogin();
				return $q.reject(response);
			} else {
				return $q.reject(response);
			}
			return $q.reject(response);
		}
	};
}

//定义一个 Service，作为 Interceptors 的处理函数
angular
	.module('managerApp').factory('HttpInterceptor', HttpInterceptor);

//添加对应的 Interceptors
angular
	.module('managerApp').config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push(HttpInterceptor);
	}]);
