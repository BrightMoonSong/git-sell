angular
	.module("managerApp")
	.factory("HomeHotRecommendService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + "/homehotrec";
		return {
			//首页banner图条件查询分页列表	
			find: function(pageNo, pageSize, drugstoreId) {
				var defer = $q.defer();
				var url = baseUrl + '/find?pageNo=' + pageNo + "&pageSize=" + pageSize;
				if(drugstoreId) {
					url += "&drugstoreId=" + drugstoreId;
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
			//添加首页热门商品推荐
			addhotgoods: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/add';
				$http({
					method: 'post',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//首页专题推荐详情
			getByRecommendId: function(recommendId) {
				var defer = $q.defer();
				var url = baseUrl + '/get/' + recommendId;
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
			//启用禁用首页热门商品推荐
			updatestatus: function(recommendId, status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + recommendId + '?status=' + status;
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
			//修改首页热门商品推荐
			update: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/update';
				$http({
					method: 'put',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//启用禁用首页热门商品推荐
			delete: function(recommendId) {
				var defer = $q.defer();
				var url = baseUrl + '/delete/' + recommendId;
				$http({
					method: 'delete',
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