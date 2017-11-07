/**
 * 购物车controller定义
 */
function cartinfoController($scope, $q, cartinfoService, CommonService) {
	var _url = window.location.href;
	
	$scope.urlList = "";
	if (/type=\d+/g.test(_url)) {
		$scope.urlList = _url.split("?")[1].split("&");
	}
	if ($scope.urlList != "") {
		$scope.type = $scope.urlList[0].split("=")[1];
		$scope.pid = $scope.urlList[1].split("=")[1];
		$scope.pcount = $scope.urlList[2].split("=")[1];

	}
	if ($scope.urlList == null || $scope.urlList == undefined || $scope.urlList == "") {
		window.open("index.html", "_self")
	}
	$scope.cartinfo = $scope.pid;

	$scope.find = function() {
		cartinfoService
			.productInfo($scope.pid)
			.then(
				function(result) {
					$scope.consultantAuditList = result.data;
				},
				function(result) {
					defer.reject(result);
				})
	}

	//商品推荐位
	$scope.goodsrecommend = function() {
		var defer = $q.defer();
		cartinfoService
			.findRecommend()
			.then(function(result) {
				$scope.goodsindown = result.data;
				//对商品数据做处理,提取出来ID
				var goodsIds = '';
				var temp = result.data;
				for (var i = 0; i < temp.length; i++) {
					goodsIds = goodsIds + temp[i].id;
					if (i < temp.length - 1) {
						goodsIds = goodsIds + ',';
					}
				}
				//得到动态价格
				CommonService.getGoodsPrice($scope.memberId, goodsIds, 1, 0, 0, $scope.goodsindown);

				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	}
	$scope.find();
	$scope.goodsrecommend();

}
angular
	.module('CartinfoApp')
	.controller('cartinfoController', cartinfoController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.directive('search', search)
	.directive('navigationBar', navigationBar);
