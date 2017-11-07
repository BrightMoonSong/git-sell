angular
	.module('managerApp')
	.factory('ArticlesService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/article';
		return {
			//查询数据方法
			find: function(articleTitle, articleCate1, articleCate2, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/findarticle?pageSize=" + pageSize + "&pageNo=" + pageNo;

				if (articleTitle !== null && articleTitle !== undefined && articleTitle !== '') {
					url = url + "&articleTitle=" + articleTitle;
				}
				if (articleCate1 !== null && articleCate1 !== undefined && articleCate1 !== '') {
					url = url + "&articleCate1=" + articleCate1;
				}
				if (articleCate2 !== null && articleCate2 !== undefined && articleCate2 !== '') {
					url = url + "&articleCate2=" + articleCate2;
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
			findArticleTypeByPid: function(typeId) {
				var defer = $q.defer();
                var url = baseUrl + "/getarticletypebypid";
				if (typeId !== null && typeId !== undefined && typeId !== '') {
				    url = url+"/"+typeId;
				}else{
                    url = url+"/"+'0';
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
			findByTypeId: function(typeId) {
				var defer = $q.defer();
				var url = baseUrl + '/findarticle/' + typeId;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				});
				return defer.promise;
			},
			//根据id查询一条数据方法
			get: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/article/' + id;
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
			//修改数据
			edit: function(article) {
				var defer = $q.defer();
				var url = baseUrl + "/article";
				$http({
					method: 'put',
					url: url,
					data: article
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//新增数据
			add: function(article) {
				var defer = $q.defer();
				var url = baseUrl + "/article";
				$http({
					method: 'post',
					url: url,
					data: article
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//修改文章
			description: function(res) {
				var defer = $q.defer();
				var url = baseUrl + "/editarticlecontent";
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
			}
		}
	})
