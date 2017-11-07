/**
 * 系统用户controller定义
 */
function promotionCodeMemberController($scope, $http, $q, constPageSize,constMallLocation, promotionCodeMemberService) {
    $scope.userToken = localStorage.dataLogin;
    $scope.string = constMallLocation + "register.htm?consultantId=";
    /**
     * 数据初始化
     */
    $scope.onSuccess = function(data) {
   };
   $scope.onError = function(error) {
   };
	//获取顾问id
	$scope.getConsoultId = function(){
		promotionCodeMemberService
		.find($scope.userToken)
		.then(
			function(result) {
				$scope.consoultId = result.data.id;
				$scope.string += $scope.consoultId
			})
	}
	$scope.getConsoultId()
}

angular
    .module('managerApp')
    .controller('promotionCodeMemberController', promotionCodeMemberController)
