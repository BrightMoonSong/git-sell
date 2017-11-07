angular
	.module('memberApp')
	.factory('collectService', function($http, $q, constBaseLocation) {
		var baseUrl = constBaseLocation + 'collection';
		return {
			//查询数据方法
			find: function(memberId, pageSize, pageNo, goodsType) {
				var defer = $q.defer();
				var url = baseUrl + "/collectiongoods?memberId=" + memberId + "&pageSize=" + pageSize + "&pageNo=" + pageNo + "&goodsType=" + goodsType;
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
			//删除收藏
			delete: function(arr) {
				var defer = $q.defer();
				var url = baseUrl + '/collectiongoods';
				$http({
					method: 'put',
					url: url,
					data: arr
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//加入购物车
			cart: function(Arr) {
				var defer = $q.defer();
				var url = baseUrl + '/collectiongoodsaddcart';
				$http({
					method: 'post',
					url: url,
					data: Arr
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},


		}
	})
