angular
	.module("managerApp")
	.factory("HomeFloorService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/homefloor';
		return {
			//添加楼层
			add: function(home) {
				var defer = $q.defer();
				var url = baseUrl + '/add';
				$http({
					method: 'post',
					url: url,
					data: home
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.resject(data)
				})
				return defer.promise;
			},
			//逻辑删除首页楼层
			delete: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/delete/' + id;
				$http({
					method: 'delete',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.resject(data)
				})
				return defer.promise;
			},
			//首页楼层分页列表
			find: function(name, pageNo, pageSize) {
				var defer = $q.defer();
				if(name) {
					var url = baseUrl + '/find?pageNo=' + pageNo + "&pageSize=" + pageSize + "&name=" + name;
				} else {
					var url = baseUrl + '/find?pageNo=' + pageNo + "&pageSize=" + pageSize;
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.resject(data)
				})
				return defer.promise;
			},
			//首页楼层详情
			detail: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/get/' + id;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.resject(data)
				})
				return defer.promise;
			},
			//首页修改楼层
			edit: function(home) {
				var defer = $q.defer();
				var url = baseUrl + '/update';
				$http({
					method: 'put',
					url: url,
					data: home
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.resject(data)
				})
				return defer.promise;
			},
			//启禁用楼层
			enable: function(id, status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + id + "?status=" + status;
				$http({
					method: 'put',
					url: url,
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.resject(data)
				})
				return defer.promise;
			}
		}
	})