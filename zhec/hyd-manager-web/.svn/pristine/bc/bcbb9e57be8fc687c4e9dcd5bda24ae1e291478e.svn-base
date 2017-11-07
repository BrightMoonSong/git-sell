angular
	.module("managerApp")
	.factory("CarModelDictionaryService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/dictionary';
		return {
			//新增用户字典
			add: function(dictionary) {
				var defer = $q.defer();
				var url = baseUrl + '/add';
				$http({
					method: 'post',
					url: url,
					data: dictionary
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//用户字典列表
			find: function(content,pageNo,pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/dictionarys?pageNo=' + pageNo + '&pageSize=' +pageSize;
				if(content){
					url+= "&content=" + content;
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//用户字典详情
			detail: function(dictionaryId) {
				var defer = $q.defer();
				var url = baseUrl + '/get/' + dictionaryId;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//修改用户字典
			edit: function(dictionary) {
				var defer = $q.defer();
				var url = baseUrl + '/update';
				$http({
					method: 'put',
					url: url,
					data:dictionary
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//启禁用删除用户字典
			enable: function(dictionaryId,status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + dictionaryId + "?status=" + status;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
		}
	})