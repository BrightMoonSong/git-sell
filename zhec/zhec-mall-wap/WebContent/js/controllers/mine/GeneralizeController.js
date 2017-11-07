function GeneralizeController($rootScope, $scope, GeneralizeService, ngDialog) {
	// $scope.dataEntity = {}; //用来存储修改或者添加的数据
	$scope.userToken = '';
	$scope.member = getCookie('loginManager');
	if ($scope.member !== '') {
		$scope.member = JSON.parse($scope.member);
		$scope.userToken = $scope.member.userToken;
	}
	$scope.string = constWapLapiLocation + '/register.html?memberId=';
	$scope.onSuccess = function(data) {};
	$scope.onError = function(error) {};
	$rootScope.memberTitle = "会员推广-鹿医生";
	//获取会员推广相关信息
	$scope.find = function() {
		GeneralizeService
			.find($scope.userToken)
			.then(
				function(result) {
					console.log('推广相关信息');
					console.log(result);
					$scope.totalSize = result.totalSize;
					$scope.generalizeInfo = result.data; //将获取到的数据进行赋值，与DOM进行数据绑定

				},
				function(result) {

				}
			);
	};
	//获取推荐链接
	$scope.findLink = function() {
		GeneralizeService
			.findLink($scope.userToken)
			.then(
				function(result) {
					console.log('推广链接');
					console.log(result);
					$scope.totalSize = result.totalSize;
					$scope.string = $scope.string + result.data;
				},
				function(result) {

				}
			);
	};
	$scope.goToShare = function(string) {
		$("#shareCover").show();
		//		$scope.dialog1 = ngDialog.open({
		//			template: '../../../views/common/share.html',
		//          className: 'ngdialog-theme-default',
		//          scope:$scope,
		//          width:400,
		//          height:221,
		//          closeByDocument: false,
		//          controller: ['$scope', function($scope) {
		//          	$scope.resource = 1;
		//			}]
		//
		//     })
	}
	//取消分享
	$scope.cancleShare = function() {
		$("#shareCover").hide();
	}

	$scope.goBack = function() {
		window.open(constWapLocation + "/index.html#/main/mine", "_self");
	};


	// 初始化数据
	$scope.find();
	$scope.findLink();
}


app
	.controller('GeneralizeController', GeneralizeController);
