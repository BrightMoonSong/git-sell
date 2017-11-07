/**
 * 购物车controller定义
 */
function articleController($scope, $q, articleService) {
	var _url = window.location.href;
	if(/arc=\d+/g.test(_url)) {
		$scope.arcId = parseInt(_url.match(/arc=\d+/g)[0].replace("arc=", ""));
	}
	$scope.showChangeMessage = 1;

	/**
	 * 文章内容
	 */
	$scope.find = function() {
		var defer = $q.defer();
		articleService
			.find($scope.arcId)
			.then(
				function(result) {
					defer.resolve(result);
					$scope.article = result.data;
					$(".articalContent").html($scope.article.content)
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	}
	$scope.className = '';
	$scope.findOne = function() {
		var defer = $q.defer();
		articleService
			.findOne($scope.arcId)
			.then(
				function(result) {
					defer.resolve(result);
					$scope.articleList = result.data;
					for(var i = 0; i < $scope.articleList.parent.length; i++) {
						for(var j = 0; j < $scope.articleList.parent[i].parent.length; j++) {
							if($scope.articleList.parent[i].parent[j].id == $scope.arcId) {
								$scope.className = i;
							}
						}
					}
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	}
	$scope.findOne();
	$scope.find();
}
angular
	.module('ArticleApp')
	.controller('articleController', articleController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.directive('search', search)
	.directive('navigationBar', navigationBar);