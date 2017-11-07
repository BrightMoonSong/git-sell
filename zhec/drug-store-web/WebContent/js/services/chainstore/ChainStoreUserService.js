angular
	.module("managerApp")
	.factory("ChainStoreUserService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/drugstoreuser';
		var baseUrl2 = constMapiLocation + '/drugstoreschain';
		var baseUrl3 = constMapiLocation + '/drugstore';
		return {
			//连锁店子药店用户条件查询分页列表
			find: function(chainId, drugstoreId,  realName, phone, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + "/find?pageNo=" + pageNo + "&pageSize=" + pageSize;
				if(chainId) {
					url += "&chainId=" + chainId;
				}
				if(drugstoreId) {
					url += "&drugstoreId=" + drugstoreId;
				}
			
				if(realName) {
					url += "&realName=" + realName;
				}
				
				if(phone) {
					url += "&phone=" + phone;
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//角色集合
			findstoreroles: function() {
				var defer = $q.defer();
				var url = baseUrl + '/findstoreroles';
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
			//新增连锁店子药店用户
			add: function(userlist) {
				var defer = $q.defer();
				var url = baseUrl + '/add';
				$http({
					method: 'post',
					url: url,
					data: userlist
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//连锁店子药店用户详情
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
			//修改连锁店子药店用户
			edit: function(userlist) {
				var defer = $q.defer();
				var url = baseUrl + '/update'
				$http({
					method: 'put',
					url: url,
					data: userlist
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//逻辑删除连锁店子药店用户
			delete: function(userId) {
				var defer = $q.defer();
				var url = baseUrl + '/delete/' + userId;
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
			//启禁用
			enable: function(userId, status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + userId + "?status=" + status;
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

			//所有连锁店列表
			getall: function(chainName) {
				var defer = $q.defer();
				var url = baseUrl2 + '/findall?chainName+' + chainName;
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
			//根据连锁店ID列出所有连锁店子药店列表
			getallList: function(chainId, drugstoreName) {
				var defer = $q.defer();
				if(drugstoreName) {
					var url = baseUrl3 + '/findall?chainId=' + chainId + "&drugstoreName=" + drugstoreName;
				} else {
					var url = baseUrl3 + '/findall?chainId=' + chainId;
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
			}

		}

	})