/**
 * 拦截器配置
 */
var memberuserToken,formToken;

   
function HttpInterceptor($rootScope, $injector, $q) {
	return {
		request: function(config) {
			//增加userToken到url
			if(/ifcollection/g.test(config.url)) {
				return config;
			}
			else {
				if(config.url.indexOf('userToken') < 0) { //判断是否已经加上userToken
					if(getCookie("loginManager") == '' || getCookie("loginManager") == undefined) {
						memberuserToken = '';
					} else {
						memberuserToken = JSON.parse(getCookie("loginManager")).userToken;
					}
					if(config.url.indexOf('?') < 0) {
						config.url += "?userToken=" + memberuserToken;
					} else {
						config.url += "&userToken=" + memberuserToken;
					}
				}
				if(config.url.indexOf('formToken') < 0) { //判断是否已经加上 formToken
					if(getCookie("formToken")!=undefined&&getCookie("formToken")!=null&&getCookie("formToken")!=""){
						formToken = JSON.parse(getCookie("formToken"));
					}else{
						formToken = "";
					}
					
					if(config.url.indexOf('?') < 0) {
						config.url += "?formToken=" + formToken;
					} else {
						config.url += "&formToken=" + formToken;
					}
				}

				return config;
			}

		},
		requestError: function(err) {
			return $q.reject(err);
		},
		responseError: function(response) {
			console.log(response)
			return $q.reject(response);
		},
		response: function(res) {
			console.log( res.data.code)
			if(res.data.code == "401") {
				//$injector.get('CommonService').showAlert(zhecDisplayMessage.injector401);
//				$rootScope.showAlert(zhecDisplayMessage.injector401);
//				delCookie("formToken");
//				delCookie("loginManager");
//				var t = setTimeout('window.open("index.html#/info/login", "_self");', 1000)
			}
			if(res.data.code == "406") {
				//$injector.get('CommonService').showAlert(zhecDisplayMessage.injector401);
				$rootScope.showAlert(zhecDisplayMessage.injector406);
//				delCookie("formToken");
//				delCookie("loginManager");
//				var t = setTimeout('window.open("index.html#/info/login", "_self");', 1000)
			}
			if(res.headers().formtoken != undefined && res.headers().formtoken != "" && res.headers().formtoken != null) {
				formToken = res.headers().formtoken;
				//存cookie
				var formToken1 = JSON.stringify(formToken);
				delCookie("formToken");
				setCookie("formToken", "" + formToken1, "1");
			}
			return res;
		},
	};
}
//定义一个 Service，作为 Interceptors 的处理函数
angular
	.module('mywapApp').factory('HttpInterceptor', ['$q', HttpInterceptor]);

//添加对应的 Interceptors
angular
	.module('mywapApp').config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push(HttpInterceptor);
	}]);