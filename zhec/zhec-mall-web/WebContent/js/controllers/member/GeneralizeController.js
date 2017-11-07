function GeneralizeController($rootScope,$scope, GeneralizeService,ngDialog) {
	// $scope.dataEntity = {}; //用来存储修改或者添加的数据
	$scope.userToken = '';
	$scope.member = getCookie('loginManager');
	if ($scope.member !== '') {
		$scope.member = JSON.parse($scope.member);
		$scope.userToken = $scope.member.userToken;
	}
	$scope.string = constMallLocation + '/register.html?memberId=';
	$scope.onSuccess = function(data) {
	};
	$scope.onError = function(error) {
	};
	//左侧菜单的样式
	$scope.$parent.sideIndex = 9;
  $rootScope.memberTitle="会员推广-鹿医生";
	//获取会员推广相关信息
	$scope.find = function() {
		GeneralizeService
			.find($scope.userToken)
			.then(
				function(result) {
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
					$scope.totalSize = result.totalSize;
					$scope.string = $scope.string + result.data;
				},
				function(result) {

				}
			);
	};
	$scope.goToShare = function(string){
		$("#shareCover").show()
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
	$scope.cancleShare = function(){
		$("#shareCover").hide()
	}

	// 初始化数据
	$scope.find();
	$scope.findLink();
  //点击相同的侧边栏 重新刷新数据
  $scope.$on('sideIndex',function (e,data) {//data我们接受到的数据
    if($scope.$parent.sideIndex==data){
      $scope.find();
    }
  });

}


angular
	.module('memberApp')
	.controller('GeneralizeController', GeneralizeController);
