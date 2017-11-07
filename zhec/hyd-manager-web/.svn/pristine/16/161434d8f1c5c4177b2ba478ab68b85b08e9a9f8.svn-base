angular
	.module("managerApp")
	.factory("ExceptionService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/log';
		return {
			//删除操作日志记录
			delete: function(logId) {
				var defer = $q.defer();
				var url = baseUrl + '/deleteexception?logId=' + logId;
				$http({
					method: 'delete',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//操作日志记录列表
			find: function(pageNo, pageSize, requestMethod, interfaceName, phone, startTimeStr, endTimeStr, platform, requestUri,code) {
				var defer = $q.defer();
				var url = baseUrl + '/findexception?pageNo=' + pageNo + '&pageSize=' + pageSize;
				if(requestMethod) {
					url += "&requestMethod=" + requestMethod;
				}
				if(interfaceName) {
					url += "&interfaceName=" + interfaceName;
				}
				if(phone) {
					url += "&phone=" + phone;
				}
				if(startTimeStr) {
					url += "&startTimeStr=" + startTimeStr;
				}
				if(endTimeStr) {
					url += "&endTimeStr=" + endTimeStr;
				}
				if(platform) {
					url += "&platform=" + platform;
				}
				if(requestUri) {
					url += "&requestUri=" + requestUri;
				}
				if(code) {
					url += "&code=" + code;
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
			//批量删除操作日志记录
			alldelete: function(startTimeStr, endTimeStr) {
				var defer = $q.defer();
				var url = baseUrl + '/deleteexceptionbatch?startTimeStr=' + startTimeStr + '&endTimeStr=' + endTimeStr;
				$http({
					method: 'delete',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//操作日志记录详情
			detail: function(logId) {
				var defer = $q.defer();
				var url = baseUrl + '/getexception?logId=' + logId;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			}
		}
	})