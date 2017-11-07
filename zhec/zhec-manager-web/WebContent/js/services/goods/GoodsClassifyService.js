/**
 * 系统用户service定义
 */

angular
	.module('managerApp')
	.factory('GoodsClassifyService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + "/goods";
		return {
			//查询数据
			find: function(classifyName, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/classifies?classifyName=" + classifyName + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			//根据id查询一条数据方法
			get: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/classify/' + id;
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
			//修改数据
			edit: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/classify';
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
			//新增数据
			addclassify: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/addclassify';
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
			//修改 归类 状态
			editstatus: function(id, status) {
				var defer = $q.defer();
				var url = baseUrl + '/editclassifystatus?id=' + id + '&status=' + status;
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
			//获取属性列表
			proplist: function(parmValue, attrType) {
				var defer = $q.defer();
				var url = baseUrl + '/proplist?parmValue=' + parmValue + "&attrType=" + attrType;
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
			//创建分组
			editgroup: function(res,classifyId) {
				var defer = $q.defer();
				var url = baseUrl + '/editgroup?classifyId='+classifyId;
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
			//获取分组数据
			findgroups: function(classifyId) {
				var defer = $q.defer();
				var url = baseUrl + '/findgroups?classifyId=' + classifyId;
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
			//获取以前保存的数据
			findprops: function(classifyId) {
				var defer = $q.defer();
				var url = baseUrl + '/findprops?classifyId=' + classifyId;
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
			//保存选择的属性
			addclassifyprop: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/addclassifyprop';
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
		}
	});