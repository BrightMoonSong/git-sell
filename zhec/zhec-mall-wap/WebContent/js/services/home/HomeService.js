app
	.factory('HomeService', function($http, $q) {
		var baseUrl = constWapLapiLocation; //各种基本路径****

		return {
			//首页推荐品牌
			findBrands: function(floorId, applyType, size) {
				var defer = $q.defer();
				var url = baseUrl + '/mallfloor/findfloor?floorId=' + floorId + '&applyType=' + applyType + '&size=' + size;
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

		};
	});
