angular
	.module('managerApp')
	.factory('stockService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/goodsstock';
		return {
			//查询数据
			find: function(pageSize, pageNo, cateId,cateId1,cateId2, infoName) {
				var defer = $q.defer();
				var url = baseUrl + "/findproductstock?pageSize=" + pageSize + "&pageNo=" + pageNo + "&infoName=" + infoName;


				if (cateId2 !== null && cateId2 !== undefined && cateId2 !== '') {
					url = url + "&cateId="+cateId2;
				}else if (cateId1 !== null && cateId1 !== undefined && cateId1 !== '') {
					url = url + "&cateId="+cateId1;
				}else if (cateId !== null && cateId !== undefined && cateId !== '') {
					url = url + "&cateId="+cateId;
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
			//根据货品ID获取该货品库存修改历史纪录
			get: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/findproductstockprocess?productId=' + id;
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
			//根据货品ID获取该货品库存详情
			gets: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/getproductstock?productId=' + id;
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

			//搜索
			seach: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/findgoodscate';
				if (id !== null && id !== undefined && id !== '') {
					url = url + "?id="+id;
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
			//根据货品ID修改该货品库存数量
			put: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/editproductstock';
				$http({
					method: 'put',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},



		}
	})
