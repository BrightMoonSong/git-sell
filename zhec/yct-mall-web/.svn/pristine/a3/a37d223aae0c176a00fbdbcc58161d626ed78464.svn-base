/**
 * 系统用户controller定义
 */
function HomeController($scope, $http, $q, HomeService, ngDialog, $rootScope,$stateParams) {
	$rootScope.rootIsActiveId = 1; //首页
	$scope.images = [];
	$scope.findImages = function() {
		var defer = $q.defer();
		setTimeout(function() {
			$scope.images = [{
				"href": "http://www.baidu.com",
				"src": "img/lunbo/1.jpg",
				"alt": "1"
			}, {
				"href": "http://www.baidu.com",
				"src": "img/lunbo/2.jpg",
				"alt": "2"
			}, {
				"href": "http://www.baidu.com",
				"src": "img/lunbo/3.jpg",
				"alt": "3"
			}, {
				"href": "http://www.baidu.com",
				"src": "img/lunbo/4.jpg",
				"alt": "4"
			}, {
				"href": "http://www.baidu.com",
				"src": "img/lunbo/5.jpg",
				"alt": "5"
			}];
			defer.resolve($scope.images);
		}, 200)
		return defer.promise;
	}
	$scope.finddrugclassification = function() {
		HomeService
			.finddrugclassification()
			.then(function(result) {
				console.log(result)
				$scope.homeList = result.data
			}, function(resutl) {

			})

	}
	$scope.finddrugclassification();
}
app.controller('HomeController', HomeController);