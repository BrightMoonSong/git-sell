angular
	.module("managerApp")
	.factory("topicService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + "/topic";
		var baseUrlOnSale = constMapiLocation + "/goodsonsale";
		var baseUrl2 = constMapiLocation + '/goodscate';
		var drugstoreschain = constMapiLocation + '/drugstoreschain';
		var drugstore = constMapiLocation + '/drugstore';
		return {
			//专题条件查询分页列表
			find: function(name, addTime, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/find?pageNo=' + pageNo + '&pageSize=' + pageSize;
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
			//获取在售商品列表
			findinfosforrec: function(pageNo, pageSize, parmValue, cateId, storeId,recType) {
				var defer = $q.defer();
				var url = baseUrlOnSale + "/findinfosforrec?pageSize=" + pageSize + "&pageNo=" + pageNo + "&recType=" + recType;
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
			//添加专题
			add: function(topic) {
				var defer = $q.defer();
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
			//逻辑删除专题
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
			//专题详情
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
			//修改专题
			edit: function(topic) {
				var defer = $q.defer();
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
			//启禁用专题
			enable: function(id, status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + id + '?status=' + status;
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
			//新增专题推荐商品
			addrecommendgoods: function(res, topicId) {
				var defer = $q.defer();
				var url = baseUrl + '/addrecommendgoods?topicId=' + topicId;
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
			//获取专题推荐商品列表 
			findrecommendgoods: function(topicId, storeId) {
				var defer = $q.defer();
				var url = baseUrl + '/findrecommendgoods?topicId=' + topicId + "&storeId=" + storeId;
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
			findonsale: function(pageNo, pageSize, parmValue, cateId, storeId) {
				var defer = $q.defer();
				var url = baseUrlOnSale + "/findinfos?pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			}
		}
	})