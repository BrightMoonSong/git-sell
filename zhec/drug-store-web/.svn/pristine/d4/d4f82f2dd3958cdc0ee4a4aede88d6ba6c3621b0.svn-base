angular
	.module('managerApp')
	.factory('ListAllBranchesService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/drugstore';
		return {
			//连锁店子药店条件查询分页列表
			find: function(chainId, drugstoreName, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + "/find?pageNo=" + pageNo + "&pageSize=" + pageSize
				if(chainId){
					url +="&chainId=" + chainId;
				}
				if(drugstoreName){
					url +="&drugstoreName=" + drugstoreName;
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//连锁店子药店详情
			detail: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/get/' + id;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//修改连锁店子药店:
			edit: function(allbrand) {
				var defer = $q.defer();
				var url = baseUrl + '/update'
				$http({
					method: 'put',
					url: url,
					data: allbrand
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//启用禁用连锁店子药店
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
			//删除连锁店子药店
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
			}
		}
	});