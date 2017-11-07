function aboutController($scope, $q, aboutService) {
	var _url = window.location.href;
	if (/arc=\d+/g.test(_url)) {
		$scope.arcId = parseInt(_url.match(/arc=\d+/g)[0].replace("arc=", ""));
	}
	$scope.showChangeMessage = 1;

	/**
	 * 文章内容
	 */
	// $scope.find = function() {
	// 		var defer = $q.defer();
	// 		aboutService
	// 			.find($scope.arcId)
	// 			.then(
	// 				function(result) {
	// 					defer.resolve(result);
	// 					$scope.article = result.data;
	// 					console.log($scope.article)
	// 					$(".articalContent").html($scope.article.content)
	// 				},
	// 				function(result) {
	// 					defer.reject(result);
	// 				});
	// 		return defer.promise;
	// 	}
		// $scope.className = '';
		$scope.findOne = function() {
			var defer = $q.defer();
			aboutService
				.findOne(35)
				.then(
					function(result) {
						defer.resolve(result);
						$scope.articleList = result.data;
                        console.log($scope.articleList)
						$scope.articleTitle=$scope.articleList.parent[1].parent;
						console.log($scope.articleTitle)
						// for (var i = 0; i < $scope.articleList.parent.length; i++) {
						// 	for (var j = 0; j < $scope.articleList.parent[i].parent.length; j++) {
						// 		if ($scope.articleList.parent[i].parent[j].id == $scope.arcId) {
						// 			$scope.className = i;
						// 		}
						// 	}
						// }
					},
					function(result) {
						defer.reject(result);
					});
			return defer.promise;
		}
		$scope.findOne();
	// $scope.find();
}
app
	.controller('aboutController', aboutController)
