/**
 * controller定义
 */
function personalInformationController($rootScope,$scope,$rootScope,$timeout,$q,personalInformationService,ngDialog){
	$scope.member = getCookie("loginManager");			//获取登录信息
	if($scope.member != ""){
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
	}
	$scope.bindShow = true;
	//左侧菜单的样式
	$scope.$parent.sideIndex=2;
  $rootScope.memberTitle="我的信息-鹿医生";
	$rootScope.showAlert = function(message) {
		var dialog = ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default',
			controller: ['$scope', function($scope) {
				$scope.promptMessage = message;
			}],
		});

		$timeout(function() {
			dialog.close();
		}, 1500);
	}
	/**
	 * 获取信息
	 */
	$scope.getMessage = function(){
		personalInformationService
		.find($scope.memberId)
		.then(
			function(result) {
				$scope.memberMessage = result.data;
				$scope.memberMobile = $scope.memberMessage.mobile;
				if($scope.memberMobile == ""){
					$scope.bindShow = false;
				}
				$scope.status = $scope.memberMessage.sex;
				$scope.curSex = $scope.memberMessage.sex
				$scope.memberBirth = $scope.memberMessage.birthday;
				$scope.curBirth = $scope.memberMessage.birthday;
				$scope.memberName = $scope.memberMessage.name;
				$scope.curName = $scope.memberMessage.name;
				

				$scope.member = getCookie("loginManager"); //获取登录信息
				$scope.member = JSON.parse($scope.member);
				var loginManager = {
					'loginId': $scope.member.loginId,
					'id': $scope.member.id,
					'userToken': $scope.member.userToken,
					'name': $scope.memberName
				};
				loginManager = JSON.stringify(loginManager)
				setCookie("loginManager", "" + loginManager, "1")
				if($scope.memberMessage.image_path != "" && $scope.memberMessage.image_path != null){
					angular.element(document.querySelector('#changeViewImg')).attr("src",$scope.memberMessage.image_path)
					$scope.curImg = angular.element("#changeViewImg").attr("src")
				}
				$scope.curImg = angular.element("#changeViewImg").attr("src")
				console.log($scope.curImg)
			})
	}
	if(checkLogin()){
		$scope.getMessage()
	}

  //点击相同的侧边栏 重新刷新数据
  $scope.$on('sideIndex',function (e,data) {//data我们接受到的数据
    if($scope.$parent.sideIndex==data){
      $scope.getMessage();
    }
  });
	/**
	 * 改变图片路径
	 */
	$scope.changeHeadImg = function($event){
		angular.element(document.querySelector('#changeViewImg')).attr("src",angular.element($event.target).attr("src"))
		console.log(angular.element("#changeViewImg").attr("src"))
	}
  //启动时间插件
  var start = {
    format: 'YYYY-MM-DD',
    ishmsVal:false,
    isTime:false,
    maxDate: '2099-06-30 23:59:59', //最大日期
    choosefun: function(elem,datas){
      $scope.memberBirth=datas;
    }
  };
  $('#inpstart').jeDate(start);

	/**
	 * 修改信息
	 */
	$scope.saveMemmberMessage = function(){
		$scope.saveMessage = {};
		$scope.saveMessage.id = $scope.memberId;
		$scope.saveMessage.sex = $scope.status
		$scope.saveMessage.birthday = $scope.memberBirth
		$scope.saveMessage.name = $scope.memberName
		$scope.saveMessage.imagePath = angular.element(document.querySelector('#changeViewImg')).attr("src")
//		if($scope.memberBirth == null && $scope.memberName == ""){
//			$rootScope.showAlert("请填写要修改的信息！");
//			return;
//		}
		if($scope.curSex==$scope.status && $scope.curBirth==$scope.memberBirth&&$scope.curName==$scope.memberName&&$scope.curImg==$scope.saveMessage.imagePath){
			$rootScope.showAlert("请填写要修改的信息！");
			return;
		}
		personalInformationService
		.put($scope.saveMessage)
		.then(
			function(result) {
//				promptBox("保存成功");
				$rootScope.showAlert(zhecDisplayMessage.saveSuccess);
				$scope.getMessage()
				$timeout(function() {
		            ngDialog.close();
		            location.reload() 
		        }, 1500);
//				$time()

        //刷新会员中心表头公共头像
        $scope.findmemberproinfo($scope.memberID);
			})
	}
}
angular
    .module('memberApp')
    .controller('personalInformationController', personalInformationController)
	.factory('HttpInterceptor', ['$q', HttpInterceptor]) //定义一个 Service，作为 Interceptors 的处理函数
	.config(['$httpProvider', function($httpProvider) { //添加对应的 Interceptors
		$httpProvider.interceptors.push(HttpInterceptor);
	}]);
