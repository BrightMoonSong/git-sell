angular
	.module("managerApp")
	.factory("HomeFloorRecommendService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + "/homefloorrec";
		var baseUrlFloor = constMapiLocation + '/homefloor';
		var baseUrlGoods = constMapiLocation + '/goodsonsale';
		var drugstoreschain = constMapiLocation + '/drugstoreschain';
		var drugstore = constMapiLocation + '/drugstore';
		var baseUrl2 = constMapiLocation + '/goodscate';
		return {
			//获取树形分类列表，返回全部分类数据
			floorall: function() {
				var defer = $q.defer();
				var url = baseUrlFloor + '/findall';
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
			//首页楼层商品推荐分页列表	
			find: function(drugstoreId, floorId, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/find?pageNo=' + pageNo + "&pageSize=" + pageSize;
				if(drugstoreId) {
					url += "&drugstoreId=" + drugstoreId;
				}
				if(floorId) {
					url += "&floorId=" + floorId;
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
			//首页楼层分页列表
			findfloor: function(name,pageNo,pageSize) {
				var defer = $q.defer();
				var url = baseUrlFloor + '/findfloors?pageNo=' + pageNo +"&pageSize=" + pageSize;
				if(name){
					url+="&name=" + name;
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
			//添加首页楼层商品推荐
			add: function(reco) {
				var defer = $q.defer()
				var url = baseUrl + "/add";
				$http({
					method: 'post',
					url: url,
					data: reco
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//逻辑删除首页楼层商品推荐
			delete: function(id) {
				var defer = $q.defer()
				var url = baseUrl + "/delete/" + id;
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
			//首页楼层商品推荐详情
			detail: function(id) {
				var defer = $q.defer()
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
			//修改首页楼层商品推荐
			edit: function(reco) {
				var defer = $q.defer()
				var url = baseUrl + "/update";
				$http({
					method: 'put',
					url: url,
					data: reco
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//启用禁用首页楼层商品推荐
			enable: function(id, status) {
				var defer = $q.defer()
				var url = baseUrl + "/updatestatus/" + id + "?status=" + status;
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