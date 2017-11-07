/**
 * controller定义
 */
function prescriptionController($rootScope,$scope,$q,constPageSize,prescriptionService){
	$scope.member = getCookie("loginManager");			//获取登录信息
	if($scope.member != ""){
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
	}
	$scope.allPage = 0
	$scope.currentPage = 1;
	$scope.prescriptionList = [];
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
				$scope.allPage = result.totalSize/constPageSize;
				var re = /\d+\.[0-9]/g;   						//判断数字是否为小数
				if(re.test($scope.allPage)){
					$scope.allPage = Number($scope.allPage.toString().split(".")[0]) + 1
				}
				
				$scope.prescriptionList1 = result.data;
				for(var i = 0; i < $scope.prescriptionList1.length; i++){
					$scope.prescriptionList.push( $scope.prescriptionList1[i])
				}
				$scope.loadding = false;
				defer.resolve(result);
			})
		 return defer.promise;
	}
	if(checkLogin()){

		$scope.find($scope.currentPage)
	}
	$(window).scroll(function(){
　　	   var scrollTop = $(this).scrollTop();
	　　var scrollHeight = $(document).height();
	　　var windowHeight = $(this).height();
	　　if(scrollTop + windowHeight +1  >= scrollHeight ){
			console.log($scope.allPage,$scope.currentPage)
			$scope.currentPage++;
			if($scope.allPage != 0 && $scope.currentPage <= $scope.allPage){	
				$scope.loadding = true;
				
				// $timeout(function() {
					$scope.find($scope.currentPage)
				// }, 1000);
				$scope.scrollFoot = false;
			}else{
				
				$scope.loadding = false;
			}
	　　}
		if($scope.currentPage >= $scope.allPage){
			$scope.scrollFoot = true;
		}
	});
}
app
    .controller('prescriptionController', prescriptionController)
	// .directive('datalistpager', datalistpager)
