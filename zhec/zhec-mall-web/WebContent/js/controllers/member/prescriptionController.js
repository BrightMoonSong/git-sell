/**
 * controller定义
 */
function prescriptionController($rootScope,$scope,$http,$q,constPageSize,prescriptionService){
	$scope.member = getCookie("loginManager");			//获取登录信息
	if($scope.member != ""){
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
	}
  //左侧菜单的样式
  $scope.$parent.sideIndex=7;
  $rootScope.memberTitle="处方申请-鹿医生";
	checkLogin();
	/**
	 * 获取信息
	 */
	$scope.find = function(currentPageNo){
		var defer = $q.defer();
		prescriptionService
		.find($scope.memberId,constPageSize,currentPageNo)
		.then(
			function(result) {
				console.log(result)
				$scope.prescriptionList = result.data
				defer.resolve(result);
			})
		 return defer.promise;
	}
  //点击相同的侧边栏 重新刷新数据
  $scope.$on('sideIndex',function (e,data) {//data我们接受到的数据
    if($scope.$parent.sideIndex==data){
      $scope.loadData(true);
    }
  });
//	/**
//	 * 改变图片路径
//	 */
//	$scope.changeHeadImg = function($event){
//		angular.element(document.querySelector('#changeViewImg')).attr("src",angular.element($event.target).attr("src"))
//	}
////启动时间插件
//var start = {
//  format: 'YYYY-MM-DD',
//  ishmsVal:false,
//  isTime:false,
//  maxDate: '2099-06-30 23:59:59', //最大日期
//  choosefun: function(elem,datas){
//    $scope.memberBirth=datas;
//  }
//};
//$('#inpstart').jeDate(start);
}
angular
    .module('memberApp')
    .controller('prescriptionController', prescriptionController)
	.directive('datalistpager', datalistpager)
