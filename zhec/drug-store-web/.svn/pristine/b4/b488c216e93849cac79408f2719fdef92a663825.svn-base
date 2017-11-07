angular
	.module('managerApp')
	.factory('ChainStoreListService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/drugstoreschain';
		var baseUrlSeep = constMapiLocation + '/drugstore';
		return {
			//连锁店条件查询分页列表
			find: function(chainName, chainManagerName, chainManagerUserName, chainManagerPhone, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + "/find?&pageNo=" + pageNo + "&pageSize=" + pageSize;
				if(chainName) {
					url += '&chainName=' + chainName;
				}
				if(chainManagerName) {
					url += '&chainManagerName=' + chainManagerName;
				}
				if(chainManagerUserName) {
					url += '&chainManagerUserName=' + chainManagerUserName;
				}
				if(chainManagerPhone) {
					url += '&chainManagerPhone=' + chainManagerPhone;
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
			//新增连锁店
			add: function(chain) {
				var defer = $q.defer();
				var url = baseUrl + "/add";
				$http({
					method: "post",
					url: url,
					data: chain
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//连锁店详情
			detail: function(id) {
				var defer = $q.defer();
				var url = baseUrl + "/get/" + id;
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
			//修改连锁店
			edit: function(chain) {
				var defer = $q.defer();
				var url = baseUrl + '/update';
				$http({
					method: "put",
					url: url,
					data: chain
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//启用禁用连锁店
			enable: function(id, status) {
				var defer = $q.defer();
				var url = baseUrl + "/updatestatus/" + id + "?status=" + status;
				$http({
					method: "put",
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//新增子yao店
			addSeed: function(chain) {
				var defer = $q.defer();
				var url = baseUrlSeep + '/add';
				$http({
					method: 'post',
					url: url,
					data: chain
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			}
		}

	})