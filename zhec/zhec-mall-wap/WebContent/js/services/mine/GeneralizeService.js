app
	.factory('GeneralizeService', function($http, $q) {
		var baseUrl = constWapLapiLocation; //各种基本路径****
		return {
			//获取推广链接
			findLink: function(userToken) {
				var defer = $q.defer();
				var url = baseUrl + '/recommend/recommendreg?userToken=' + userToken;

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
			//获取会员推广相关信息
			find: function(userToken) {
				var defer = $q.defer();
				var url = baseUrl + '/recommend/recommendData?userToken=' + userToken;

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


		};
	});
