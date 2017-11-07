app.factory('MessageService', function($q, $http, constMapiLocation) {
	var baseUrl = constMapiLocation + '/feedback';
	return {
		//药品分类接口
		addfeedback : function(res) {
			var defer = $q.defer();
			var url = baseUrl + "/addfeedback";
			$http({
				method: 'post',
				url: url,
				data:res
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		}
	}
})