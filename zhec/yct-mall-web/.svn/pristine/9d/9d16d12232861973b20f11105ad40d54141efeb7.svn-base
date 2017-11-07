app.factory('HomeService', function($q, $http, constMapiLocation) {
	var baseUrl = constMapiLocation + '/drug';
	return {
		//药品分类接口
		finddrugclassification: function() {
			var defer = $q.defer();
			var url = baseUrl + "/finddrugclassification";
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
	}
})