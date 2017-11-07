angular
	.module('managerApp')
	.factory('VersionService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/app';
		return {
			//查询数据列表
			//{"code":0,"totalSize":2,"data":[{"upTime":"2017-02-27 14:06:00","appType":1,"id":4,"versionName":"4444","versionCode":4,"versionStatus":0},{"upTime":"2017-02-27 14:05:30","appType":1,"id":3,"versionName":"33333","versionCode":3,"versionStatus":1}]}
			find: function(appType, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/findversion?appType=" + appType + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
			//{"code":0,"totalSize":null,"data":{"apkUrl":"44444","upTime":"2017-02-27 14:06:00","versionDesc":"测试4","optName":"666","appType":1,"id":4,"versionName":"4444","versionCode":4,"versionStatus":0,"optId":1}}
			get: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/getversion/' + id;
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
			//更新版本信息
			update: function(res) {
				var defer = $q.defer();
				var url = baseUrl + "/addnewversion";
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
			}
		};
	});
