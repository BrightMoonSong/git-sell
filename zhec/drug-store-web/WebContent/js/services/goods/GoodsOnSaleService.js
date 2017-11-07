angular
	.module('managerApp')
	.factory('GoodsOnSaleService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/goodsonsale';
		var baseUrl2 = constMapiLocation + '/goodscate';
		var drugstoreschain = constMapiLocation + '/drugstoreschain';
		var drugstore = constMapiLocation + '/drugstore';
		return {
			//获取在售商品列表
			find: function(pageNo, pageSize, parmValue, cateId, storeId) {
				var defer = $q.defer();
				var url = baseUrl + "/findinfos?pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			//获取库存更改记录
			findstockbills: function(goodsId, pageSize, pageNo, startTime, endTime) {
				var defer = $q.defer();
				var url = baseUrl + "/findstockbills?pageSize=" + pageSize + "&pageNo=" + pageNo;
				if(goodsId) {
					url += "&goodsId=" + goodsId;
				}
				if(startTime) {
					url += "&startTime=" + startTime;
				}
				if(endTime) {
					url += "&endTime=" + endTime;
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
			//根据ID获取商品详情
			getinfo: function(id) {
				var defer = $q.defer();
				var url = baseUrl + "/getinfo/" + id;
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
			//更改状态，状态（0禁用 1待售 2已删除 3在售 ）
			updatestatus: function(id, status) {
				var defer = $q.defer();
				var url = baseUrl + "/updatestatus/" + id + '?status=' + status;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//修改库存
			updatestock: function(res) {
				var defer = $q.defer();
				var url = baseUrl + "/updatestock";
				$http({
					method: 'put',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			}
		};
	});