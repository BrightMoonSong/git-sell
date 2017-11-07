angular
	.module("managerApp")
	.factory("CarModelService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/carmodel';
		return {
			//新增
			add: function(car) {
				var defer = $q.defer();
				var url = baseUrl + '/add';
				$http({
					method: 'post',
					url: url,
					data: car
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//列表
			find: function(modelName,pageNo,pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/carmodels?pageNo=' +pageNo + '&pageSize=' + pageSize;
				if(modelName){
					url+="&modelName=" + modelName;
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//详情
			detail: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/get/' +id;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//修改
			edit: function(car) {
				var defer = $q.defer();
				var url = baseUrl + '/update';
				$http({
					method: 'put',
					url: url,
					data: car
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//启禁用删除
			enable: function(id,status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' +id + "?status=" + status;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
		}
	})