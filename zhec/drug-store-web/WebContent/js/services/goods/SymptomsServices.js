angular
	.module("managerApp")
	.factory("SymptomsServices", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/symptoms';
		return {
			//获取症状列表
			find: function(parmValue, pageSize, pageNo) {
				var defer = $q.defer();
				var url;
				if(parmValue) {
					url = baseUrl + "/findinfos?parmValue=" + parmValue + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
				} else {
					url = baseUrl + "/findinfos?pageSize=" + pageSize + "&pageNo=" + pageNo;
				}
				$http({
					method: "get",
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//获取树形列表，返回全部数据
			findall: function() {
				var defer = $q.defer();
				var url = baseUrl + '/findall?type=1';
				$http({
					method: "get",
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//添加症状
			addinfo: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/addinfo';
				$http({
					method: "post",
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//根据ID获取症状详情
			getinfo: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/getinfo/' + id;
				$http({
					method: "get",
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//修改症状
			updateinfo: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/updateinfo';
				$http({
					method: "put",
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//更改状态，状态值（0禁用 1正常 2已删除）
			updatestatus: function(id, status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + id + '?status=' + status;
				$http({
					method: "put",
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