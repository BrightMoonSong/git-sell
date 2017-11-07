app.factory('ForgetPwdService', function($q, $http) {
		return {
			//判断手机是否已注册
			get: function(mobile) {
				var defer = $q.defer();
				var url = constWapLapiLocation + "/memberregister/ifmobile/" + mobile;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//获取验证码
			put: function(mobile, type) {
				var defer = $q.defer();
				var url = constWapLapiLocation + "/memberregister/sendsmscode?mobile=" + mobile;
				$http({
					method: 'post',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			forgetput: function(res) {
				var defer = $q.defer();
				var url = constWapLapiLocation + "/memberlogin/updatepwd";
				$http({
					method: 'put',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			}
		}
	})