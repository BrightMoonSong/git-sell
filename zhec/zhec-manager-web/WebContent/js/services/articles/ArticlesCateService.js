angular
	.module('managerApp')
	.factory('ArticlesCateService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/article'; //各种基本路径****
		return {
			//获取所有文章分类，type为2的时候返回树形的结构（用于树的结构内容不全）
			find: function(type) {
				var defer = $q.defer();
				var url = baseUrl + "/articletype/" + type;
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
			//根据id返回单个分类的详细数据
			findId: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/getarticletype/' + id;
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

			//修改单个分类类型的信息
			editType: function(RequestData) {
				var defer = $q.defer();
				var url = baseUrl + "/articletype";
				$http({
					method: 'put',
					url: url,
					data: RequestData
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//新增一个
			postType: function(RequestData) {
				var defer = $q.defer();
				var url = baseUrl + "/articletype";
				$http({
					method: 'POST',
					url: url,
					data: RequestData
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			}
		};
	});
