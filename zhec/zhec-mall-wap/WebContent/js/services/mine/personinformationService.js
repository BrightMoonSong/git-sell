/**
 * 系统用户service定义
 */
 app
 	.factory('personinformationService', function($http, $q) {
		var baseUrl = constWapLapiLocation + '/membercenter';
		var userToken = "";
		if (getCookie("loginManager") != '') {
			var member = JSON.parse(getCookie("loginManager")); //获取登录信息

			if (member != "") {
				userToken = member.userToken;
			}
		}
		return {
			//查询数据方法
			find: function(memberId) {
				var defer = $q.defer();
				var url = baseUrl + "/getmember/" + memberId + "?userToken=" + userToken;
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
			//改变信息
			put: function(memberMessage) {
				var defer = $q.defer();
				var url = baseUrl + '/editmember' + "?userToken=" + userToken;
				$http({
					method: 'put',
					url: url,
					data: memberMessage
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
		}
	});
