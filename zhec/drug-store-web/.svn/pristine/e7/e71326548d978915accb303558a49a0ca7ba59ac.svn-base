angular
	.module("managerApp")
	.factory("HomeStandingService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/homestandingrec';
		var baseUrlGoods = constMapiLocation + '/goodsonsale';
		var drugstore = constMapiLocation + '/drugstore';
		var drugstoreschain = constMapiLocation + '/drugstoreschain';
		var baseUrl2 = constMapiLocation + '/goodscate';
		return {
			//添加家庭常备药品推荐
			add: function(stand) {
				var defer = $q.defer();
				var url = baseUrl + '/add';
				$http({
					method: 'post',
					url: url,
					data: stand
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//逻辑删除家庭常备药品推荐
			delete: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/delete/' + id;
				$http({
					method: 'delete',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},

			//页热门商品推荐详情
			detali: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/get/' + id;
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
			//修改页热门商品推荐详情
			edit: function(stand) {
				var defer = $q.defer();
				var url = baseUrl + '/update';
				$http({
					method: 'put',
					url: url,
					data: stand
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//启禁用页热门商品推荐详情
			enable: function(id, status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + id + "?status=" + status;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//根据PID获取子分类列表
			findinfosbypid: function(id) {
				var defer = $q.defer();
				var url = baseUrl2 + '/findinfosbypid/' + id;
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
			//所有连锁店列表
			drugfindall: function() {
				var defer = $q.defer();
				var url = drugstoreschain + '/findall';
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
			//根据连锁店ID列出所有连锁店子药店列表
			drugstoreById: function(chainId) {
				var defer = $q.defer();
				var url = drugstore + '/findall?chainId=' + chainId;
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
			//家庭常备药品推荐分页列表
			find: function(drugstoreId, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/find?pageNo=' + pageNo + "&pageSize=" + pageSize;
				if(drugstoreId) {
					url += "&drugstoreId=" + drugstoreId;
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
				//获取树形分类列表，返回全部分类数据
			findall: function() {
				var defer = $q.defer();
				var url = baseUrl2 + '/findall?type=2';
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
			//获取在售商品列表
			findgoods: function(pageNo, pageSize, parmValue, cateId, storeId,recType) {
				var defer = $q.defer();
				var url = baseUrlGoods + "/findinfosforrec?pageSize=" + pageSize + "&pageNo=" + pageNo + "&recType=" + recType;
				if(parmValue) {
					url += "&parmValue=" + parmValue;
				}
				if(cateId) {
					url += "&cateId=" + cateId;
				}
				if(storeId) {
					url += "&storeId=" + storeId;
				}
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
		}
	})