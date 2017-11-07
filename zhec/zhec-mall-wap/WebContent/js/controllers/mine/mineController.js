/**
 * controller定义
 */
function mineController($scope,$rootScope,$http,$q,ngDialog,mineService,$timeout){
	$rootScope.clickPage = 4;
	
	//成功提示，相当于alert
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
  var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    autoplay:2000,
    autoplayDisableOnInteraction:false,
    // 如果需要分页器
    pagination: '.swiper-pagination'
  });
  //选择订单的状态
  $scope.selectOrderStatus=function(){}
  //获取cookie
  $scope.memberInformation = getCookie("loginManager");
  if ($scope.memberInformation != "") {
    $scope.memberInformation = JSON.parse($scope.memberInformation);
    $scope.loginID = $scope.memberInformation.loginId;
    $scope.memberID = $scope.memberInformation.id;
  }else{
  	 var min=setTimeout('window.open("/index.html#/info/login", "_self");', 1500);
  }
  //获取头像等基本信息

  $scope.findPersonalInfo =function(memberID){
    var defer = $q.defer();
    mineService
      .findmemberproinfo(memberID)
      .then(function(result) {
      	console.log(result)
        $scope.memberproinfo = result.data;
        console.log($scope.memberproinfo);
//      if($scope.balance=""||$scope.balance==null||$scope.balance==undefined){
//      	$rootScope.showAlert(zhecDisplayMessage.pleaseLoginFirst);
//      	return 0;
//      	$rootScope.showAlert(zhecDisplayMessage.pleaseLoginFirst)
//      }else{
//      	 $scope.balance = $scope.memberproinfo.balance;
//      }
       

        $scope.likelyName = $scope.memberproinfo.name;
         if ($scope.likelyName == "" || $scope.likelyName == undefined) {
         $scope.likelyName = $scope.memberproinfo.loginId
         }
        //处理图片的路径
        if($scope.memberproinfo.image_path!=""&&$scope.memberproinfo.image_path!=null&&$scope.memberproinfo.image_path!=null){
          $scope.image_path =$scope.memberproinfo.image_path.split("/")[3];
          $scope.image_path="img/head/"+$scope.image_path;
        }else{
          $scope.image_path="img/fl.png";
        }
        $scope.integral = $scope.memberproinfo.integral;
        defer.resolve(result);
      }, function(result) {
        defer.reject(result);
      });
    return defer.promise;
  }
  if(checkLogin()){
		$scope.findPersonalInfo($scope.memberID);
	}
  

}
app
  .controller('mineController', mineController)
