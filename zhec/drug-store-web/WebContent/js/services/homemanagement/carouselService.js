angular
	.module("managerApp")
	.factory("carouselService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + "/homebanner";
		return {
			//首页banner图条件查询分页列表	
			find: function(type, status, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/find?pageNo=' + pageNo + "&pageSize=" + pageSize;
				if(type) {
					url += "&type=" + type;
				}
				if(status === 0) {
					url += "&status=" + status;
				} else {
					if(status) {
						url += "&status=" + status;
					}
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//首页添加	
			add: function(banner) {
				var defer = $q.defer();
				var url = baseUrl + '/add';

				$http({
					method: 'post',
					url: url,
					data: banner
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//逻辑删除首页banner图
			delete: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/delete/' + id;
				$http({
					method: 'delete',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//首页banner图详情
			get: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/get/' + id;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//修改首页banner图
			edit: function(banner) {
				var defer = $q.defer();
				var url = baseUrl + '/update';
				$http({
					method: 'put',
					url: url,
					data: banner
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//首页banner图详情
			enable: function(id, status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + id + "?status=" + status;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},

		}
	})