angular
	.module("managerApp")
	.factory("VersionService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/version';
		return {
			//新增版本
			add: function(version) {
				var defer = $q.defer();
				var url = baseUrl + '/add';
				$http({
					method: 'post',
					url: url,
					data: version
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//版本详情
			detail: function(versionId) {
				var defer = $q.defer();
				var url = baseUrl + '/get/' + versionId;
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
			//获取历史版本信息列表
			find: function(versionName, versionCode, platform, scope, updateType, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/historys?pageNo=' + pageNo + '&pageSize=' + pageSize;
				if(versionName) {
					url += "&versionName=" + versionName;
				}
				if(versionCode) {
					url += "&versionCode=" + versionCode;
				}
				if(platform) {
					url += "&platform=" + platform;
				}
				if(scope) {
					url += "&scope=" + scope;
				}
				if(updateType) {
					url += "&updateType=" + updateType;
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
				//版本修改
			edit: function(version) {
				var defer = $q.defer();
				var url = baseUrl + '/update' ;
				$http({
					method: 'put',
					url: url,
					data:version
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
				//版本修改
			enable: function(versionId,status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' +versionId + '?status=' + status;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			}
		}
	})