/**
 * 拦截器配置
 */
var formToken, formTokenCookie;

if(localStorage.formTokenCapi == ''||localStorage.formTokenCapi == undefined) {
	formTokenCookie = '';
} else {
	formTokenCookie = localStorage.formTokenCapi;
}

function HttpInterceptor($rootScope,$q,constMessageCode,constHttpCode) {
	return {
		request : function(config) {
			if(config.url.indexOf('capi') > 0){  				   //如果发送的是后台请求
				$rootScope.showLoading();  //显示加载中提示框
				//增加userToken到url
				$rootScope.checkLogin();  //判断是否登录
				if(config.url.indexOf('userToken') < 0){  //判断是否已经加上userToken
					if(config.url.indexOf('?') < 0){
						config.url += "?userToken=" + localStorage.dataLogin;
					}else{
						config.url += "&userToken=" + localStorage.dataLogin;
					}
				}
				if(config.url.indexOf('formtoken') < 0) { //判断是否已经加上 formtoken
					if(formToken == undefined) {
						formToken = localStorage.formTokenCapi;
					}
					if(config.url.indexOf('?') < 0) {
						config.url += "?formToken=" + formToken;
					} else {
						config.url += "&formToken=" + formToken;
					}
				}
				if(config.url.indexOf('funcId') < 0) { //判断是否已经加上 formtoken
					if(config.url.indexOf('?') < 0) {
						config.url += "?funcId=" + localStorage.funcIdCapi;
					} else {
						config.url += "&funcId=" + localStorage.funcIdCapi;
					}
				}
			}
			console.log(config.url)
			return config;
		},
		requestError : function(err) {
			return $q.reject(err);
		},
		response : function(res) {
			if(res.headers().formtoken != undefined) {
				formToken = res.headers().formtoken;
				localStorage.removeItem("formTokenCapi");
				localStorage.setItem("formTokenCapi", formToken);
			}
			if(res.config.url.indexOf('capi') > 0){  					//如果发送的是后台请求
//				if(res.headers().formtoken != undefined) {
//					formtoken = res.headers().formtoken;
//				}
				$rootScope.hideLoading(); 	//隐藏加载中提示框
				//某些接口没有返回code值时允许通过，例如验证手机号是否注册
				if(constMessageCode[res.data.code] == undefined || constMessageCode[res.data.code] == null || constMessageCode[res.data.code] == ""){
					return $q.reject(res);
				}
				else if(constMessageCode[res.data.code].type == '2'){ 			//正常并alert信息												//执行失败，显示错误提示框
					$rootScope.showPrompt(constMessageCode[res.data.code].message);
				}
				else if(constMessageCode[res.data.code].type == '4'){ 			//提示错误信息											//执行失败，显示错误提示框
					$rootScope.showFail(constMessageCode[res.data.code].message);
					return $q.reject(res);
				}
				else if(constMessageCode[res.data.code].type == '1'){ 			//正常但不alert信息
					
				}
				else{
					return $q.reject(res);
				}
			}
			return res;
		},
		responseError : function(response) {
			$rootScope.hideLoading();  	//隐藏加载中提示框
			if(constHttpCode[response.status].type == '4'){ 			//提示错误信息											//执行失败，显示错误提示框
				$rootScope.showFail(constHttpCode[response.status].message);
				// $rootScope.gotoIndex();
				return $q.reject(response);
			}
			else if(constHttpCode[response.status].type == '5'){ 			//提示错误信息											//执行失败，显示错误提示框
				$rootScope.showFail(constHttpCode[response.status].message);
				$rootScope.gotoLogin();
				return $q.reject(response);
			}
			else if(constMessageCode[res.data.code].type == '1'){ 			//正常
					return $q.reject(res);
			}else{
				return $q.reject(response);
			}
			return $q.reject(response);
		}
	};
}

//定义一个 Service，作为 Interceptors 的处理函数
angular
.module('managerApp').factory('HttpInterceptor', [ '$q', HttpInterceptor ]);

//添加对应的 Interceptors
angular
.module('managerApp').config([ '$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push(HttpInterceptor);
}]);
