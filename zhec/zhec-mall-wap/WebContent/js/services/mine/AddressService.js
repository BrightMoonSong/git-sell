app
	.factory('AddressService', function($http, $q) {
		var baseUrl = constWapLapiLocation + '/member/'; //各种基本路径****
		var areaUrl = constWapLapiLocation;
		return {
			//根据用户id来获取该用户的所有地址列表
			find: function(memberId) {
				var defer = $q.defer();
				var url = baseUrl + 'findaddress?memberId=' + memberId;
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
			//根据id返回单个地址的详细数据
			findId: function(addressId) {
				var defer = $q.defer();
				var url = baseUrl + 'getaddress/' + addressId;
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

			//修改一个地址
			editAddress: function(RequestData) {
				var defer = $q.defer();
				var url = baseUrl + 'editaddress';
				$http({
					method: 'put',
					url: url,
					data: RequestData
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//新增一个地址
			postAddress: function(RequestData) {
				var defer = $q.defer();
				var url = baseUrl + 'addaddress';
				$http({
					method: 'POST',
					url: url,
					data: RequestData
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//删除一个地址
			deleteAddress: function(addressId) {
				var defer = $q.defer();
				var url = baseUrl + 'deleteaddress?addressId=' + addressId;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//设置为默认地址
			defaultAddress: function(addressId, memberId) {
				var defer = $q.defer();
				var url = baseUrl + 'setdefault?addressId=' + addressId + '&memberId=' + memberId;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//获取一级区域列表
			findtoplevelareas: function() {
				var defer = $q.defer();
				var url = areaUrl + '/area/findtoplevelareas';
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
			//根据pid获取下级区域列表
			findareasbypid: function(id) {
				var defer = $q.defer();
				var url = areaUrl + '/area/findareasbypid/' + id;
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
