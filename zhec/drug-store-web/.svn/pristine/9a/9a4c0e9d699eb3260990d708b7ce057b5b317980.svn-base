angular
	.module("managerApp")
	.factory("HomeTopicService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/hometopic';
		var baseUrlTop = constMapiLocation + "/topic";
		return {
			//专题条件查询分页列表
			search: function(name, addTime, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrlTop + '/find?pageNo=' + pageNo + '&pageSize=' + pageSize;
				if(name) {
					url += "&name=" + name;
				}
				if(addTime) {
					url += "&addTime=" + addTime;
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise
			},
			//添加首页专题推荐
			add: function(topic) {
				var defer = $q.defer()
				var url = baseUrl + '/add';
				$http({
					method: 'post',
					url: url,
					data: topic
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//逻辑删除首页专题推荐
			delete: function(id) {
				var defer = $q.defer()
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
			//首页专题推荐分页列表
			find: function(pageNo, pageSize) {
				var defer = $q.defer()
				var url = baseUrl + '/find?pageNo=' + pageNo + "&pageSize=" + pageSize;
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
			//首页专题推荐详情
			detail: function(id) {
				var defer = $q.defer()
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
			//修改首页专题推荐
			edit: function(topic) {
				var defer = $q.defer()
				var url = baseUrl + '/update';
				$http({
					method: 'put',
					url: url,
					data: topic
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//启禁用首页专题推荐
			enable: function(id, status) {
				var defer = $q.defer()
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
			}
		}
	})