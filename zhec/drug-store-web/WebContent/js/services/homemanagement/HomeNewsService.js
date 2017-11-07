angular
	.module("managerApp")
	.factory("HomeNewsService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/homenews';
		return {
			//添加首页头条
			add: function(news) {
				var defer = $q.defer();
				var url = baseUrl + '/add';
				$http({
					method: 'post',
					url: url,
					data: news
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//逻辑删除首页药到头条
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
			//首页药到头条条件查询分页列表
			find: function(title, status, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/find?pageNo=' + pageNo + "&pageSize=" + pageSize;
				if(title) {
					url += "&title=" + title;
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
			//首页药到头条详情
			detail: function(id) {
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
			//修改药到头条
			edit: function(news) {
				var defer = $q.defer();
				var url = baseUrl + '/update';
				$http({
					method: 'put',
					url: url,
					data: news
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//启禁用药到头条
			enable: function(id, status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + id + "?status=" + status;
				$http({
					method: 'put',
					url: url,
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
		}
	})