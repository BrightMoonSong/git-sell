/**
 * 系统用户service定义
 */
angular
	.module('ArticleApp')
	.factory('articleService', function($http, $q, constBaseLocation) {
		var baseUrl = constBaseLocation + '/article';
		return {
			//查询文章内容
			find: function(arcId) {
				var defer = $q.defer();
				var url = baseUrl + "/getarticle/" + arcId;
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
			//查询左侧文章树
			findOne: function(arcId) {
				var defer = $q.defer();
				var url = baseUrl + "/findarticletypefortreebyid/" + arcId;
				
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

		}
	});
