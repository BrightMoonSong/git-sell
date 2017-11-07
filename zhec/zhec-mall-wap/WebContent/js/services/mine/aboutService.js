app
	.factory('aboutService', function($http, $q) {
		var baseUrl = constWapLapiLocation + '/article';
		return {
			findOne: function(arcId) {
				var defer = $q.defer();
				var url = baseUrl + "/findarticletypefortreebyid/" + arcId;

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
	});
