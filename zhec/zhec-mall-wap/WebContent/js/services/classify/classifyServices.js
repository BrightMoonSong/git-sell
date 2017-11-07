/**
 * Created by shy on 2017/2/20.
 */
app
	.factory('classifyService', function($http, $q) {
		var baseUrl = constWapLapiLocation + '/goods';
		return {
			//分类
			find: function() {
				var defer = $q.defer();
				var url = baseUrl + "/categorylist";
				console.log(url);
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
