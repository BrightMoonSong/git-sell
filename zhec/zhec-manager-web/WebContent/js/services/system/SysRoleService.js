/**
 * Created by shy on 2016/11/24.
 */

angular
	.module('managerApp')
	.factory('SysRoleService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/shiro';
		return {
			find: function(name, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/roles?name=" + name + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			get: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/roles/' + id;
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
			edit: function(sysuser) {
				var defer = $q.defer();
				var url = baseUrl + '/roles';
				$http({
					method: 'put',
					url: url,
					data: sysuser
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			add: function(sysuser) {
				var defer = $q.defer();
				var url = baseUrl + '/roles';
				$http({
					method: 'post',
					url: url,
					data: sysuser
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			delete: function(id) {
				var defer = $q.defer();
				var url = baseUrl + "/roles/" + id;
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
			//根据roleid列出所有可选的权限
			functionsbyscope: function(scope) {
				var defer = $q.defer();
				var url = baseUrl + '/functionsbyscope?scope=' + scope;
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
			rolefunctions: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/rolefunctions';
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
			getRoleFunctions: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/rolefunctions?roleId=' + id;
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
			//ͨ查询角色下的用户
			findroleusers: function(roleId, scope, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/findroleusers?roleId=" + roleId + "&scope=" + scope + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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