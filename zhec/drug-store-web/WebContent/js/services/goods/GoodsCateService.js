angular
	.module('managerApp')
	.factory('GoodsCateService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/goodscate';
		return {
			//获取分类列表
			find: function(parmValue, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + '/findinfos?parmValue=' + parmValue + '&pageSize=' + pageSize + '&pageNo=' + pageNo;
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
			//获取树形分类列表，返回全部分类数据 type=1;type=2只返回状态是正常的
			findall: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/findall?type=1';
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
			//添加分类
			addinfo: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/addinfo';
				$http({
					method: 'post',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//根据PID获取子分类列表
			findinfosbypid: function(pid) {
				var defer = $q.defer();
				var url = baseUrl + '/findinfosbypid/' + pid;
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
			//根据ID获取分类详情
			getinfo: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/getinfo/' + id;
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
			//修改分类
			updateinfo: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/updateinfo';
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
			//根据ID删除分类
			deleteinfo: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/deleteinfo/' + id;
				$http({
					method: 'delete',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//更改状态，状态值（0禁用 1正常 2已删除）
			updatestatus: function(id, status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + id + '?status=' + status;
				$http({
					method: 'put',
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