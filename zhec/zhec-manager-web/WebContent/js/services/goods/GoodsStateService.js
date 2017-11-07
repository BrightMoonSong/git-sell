/**
 * Created by shy on 2016/12/12.
 */
/**
 * 系统用户service定义
 */

angular
	.module('managerApp')
	.factory('GoodsStateService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/goods';
		return {
			//查询数据方法
			find: function(infoName, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/goodsbystate?pageSize=" + pageSize + "&pageNo=" + pageNo + "&infoName=" + infoName;
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
			//根据id获取待售商品详情
			get: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/goodsbyid/' + id;
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
			//修改商品状态        禁用
			goodsbystate: function(res) {
				var defer = $q.defer();
				var url = baseUrl + "/disablegoodsbyid";
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
			},
			//修改商品状态        启用
			enabled: function(res) {
				var defer = $q.defer();
				var url = baseUrl + "/enablegoodsbyid";
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
			},
			//修改商品状态        维护
			repairgoodsbyid: function(res) {
				var defer = $q.defer();
				var url = baseUrl + "/repairgoodsbyid";
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
			},
			//修改商品状态        上架
			salegoodsbyid: function(res) {
				var defer = $q.defer();
				var url = baseUrl + "/salegoodsbyid";
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
			},
			//修改商品   提交审核
			auditgoods: function(res, goodsName, goodsId, updateName, updateId) {
				var defer = $q.defer();
				var url = baseUrl + "/auditgoods?goodsId=" + goodsId +'&updateId=' + updateId;
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
			},
			//审核列表
			findgoodsinfoaudit: function(id, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/findgoodsinfoaudit?id=" + id + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			//审核列表   byid
			findgoodsinfoauditbyid : function(id) {
				var defer = $q.defer();
				var url = baseUrl + "/findgoodsinfoauditbyid?id=" + id;
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
	});