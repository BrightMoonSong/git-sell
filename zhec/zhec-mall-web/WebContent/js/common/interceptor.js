/**
 * 拦截器配置
 */
var memberuserToken, formTokenCookie;
if(getCookie("loginManager") == '' || getCookie("loginManager") == undefined) {
	memberuserToken = '';
} else {
	memberuserToken = JSON.parse(getCookie("loginManager")).userToken;
}
if(getCookie("formToken") == '' || getCookie("formToken") == undefined) {
	formTokenCookie = '';
} else {
	formTokenCookie = JSON.parse(getCookie("formToken"));
}

var formToken;

function HttpInterceptor($rootScope, $injector, $q, constBaseLocation) {
	return {
		request: function(config) {
			//增加userToken到url
			if(/ifcollection/g.test(config.url)) {
				return config;
			} else {
				if(config.url.indexOf('userToken') < 0) { //判断是否已经加上userToken
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
				config.url = config.url.replace(/#/g, '%23');
				return config;
			}

		},
		requestError: function(err) {
			return $q.reject(err);
		},
		responseError: function(response) {
			if(response.status == 401) {
				//$injector.get('CommonService').showAlert(zhecDisplayMessage.injector401);
				$rootScope.showAlert(zhecDisplayMessage.injector401);
				delCookie("loginManager");
				delCookie("prePage");
				delCookie("formToken");
				if(/payMoney.html/g.test(window.location.href)){
					setCookie("prePage", 'member.html#/orders', '1');
				}else{
					setCookie("prePage", '' + window.location.href, '1');
				}
				
				var t = setTimeout('window.open("login.html#/login", "_self");', 1500);
			}
			if(response.status == 406) {
				//$injector.get('CommonService').showAlert(zhecDisplayMessage.injector401);
				$rootScope.showAlert(zhecDisplayMessage.injector401);
				delCookie("loginManager");
				delCookie("formToken");
				var t = setTimeout('window.open("login.html#/login", "_self");', 1500);
			}
			return $q.reject(response);
		},
		response: function(res) {
			if(res.headers().formtoken != undefined) {
				formToken = res.headers().formtoken;
				//存cookie
				var formToken1 = JSON.stringify(formToken)
				setCookieTime("formToken", "" + formToken1, "30");
			}
			return res;
		},
	};
}
