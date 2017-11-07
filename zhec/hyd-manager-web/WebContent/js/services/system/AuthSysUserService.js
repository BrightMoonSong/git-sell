angular
	.module("managerApp")
	.factory("AuthSysUserService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + "/sysuser";
		var baseUrlRole = constMapiLocation + "/role";
		return {
			//平台用户条件查询分页列表
			find: function(pageSize, pageNo, userName, phone) {
				var defer = $q.defer();
				var url = baseUrl + "/find?pageSize=" + pageSize + "&pageNo=" + pageNo;
				if(userName) {
					url += "&userName=" + userName;
				}
				if(phone) {
					url += "&phone=" + phone;
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
			//平台用户详情
			get: function(userId) {
				var defer = $q.defer();
				var url = baseUrl + "/get/" + userId;
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
			//新增平台用户  必填字段：userName, phone, password, status
			add: function(res) {
				var defer = $q.defer();
				var url = baseUrl + "/add";
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
			//修改平台用户  必填字段：userId
			update: function(res) {
				var defer = $q.defer();
				var url = baseUrl + "/update";
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
			//启用禁用平台用户  status只能是0或1
			updatestatus: function(userId, status) {
				var defer = $q.defer();
				var url = baseUrl + "/updatestatus/" + userId + "?status=" + status;
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
			//平台角色列表
			findmanageroles: function() {
				var defer = $q.defer();
				var url = baseUrlRole + "/findmanageroles";
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