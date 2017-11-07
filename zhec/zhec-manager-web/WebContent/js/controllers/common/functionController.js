function functionController($rootScope, $scope, $http, $q, constPageSize, ngDialog, functionService, constMapiLocation) {
	/**
	 * 搜索
	 */
	$scope.find = function() {
			var userToken = localStorage.userToken;
			// if (userToken == null || userToken == "") {
			//     window.open(constMapiLocation + "views/login.html", "_self");
			// }
			functionService
				.find(userToken)
				.then(function(result) {
						$scope.dataEntityfun = result.data;

						$scope.ordersFunc = [];
						$scope.refundFunc = [];
						$scope.goodsFunc = [];
						$scope.sysconfigFunc = [];
						$scope.memberFunc = [];
						$scope.webFunc = [];
						$scope.consultantFunc = [];
						$scope.articleconfigFunc = [];
						$scope.financialconfigFunc = [];
						$scope.appconfigFunc = [];
						$scope.promotionmanageFunc = [];
						$scope.researchconfigFunc = [];
						for(var i = 0; i < $scope.dataEntityfun.length; i++) {
							if($scope.dataEntityfun[i].parentId == 1) {
								$scope.ordersFunc.push($scope.dataEntityfun[i]);
							} else if($scope.dataEntityfun[i].parentId == 2) {
								$scope.goodsFunc.push($scope.dataEntityfun[i]);
							} else if($scope.dataEntityfun[i].parentId == 3) {
								$scope.sysconfigFunc.push($scope.dataEntityfun[i]);
							} else if($scope.dataEntityfun[i].parentId == 4) {
								$scope.memberFunc.push($scope.dataEntityfun[i]);
							} else if($scope.dataEntityfun[i].parentId == 5) {
								$scope.webFunc.push($scope.dataEntityfun[i]);
							} else if($scope.dataEntityfun[i].parentId == 6) {
								$scope.consultantFunc.push($scope.dataEntityfun[i]);
							} else if($scope.dataEntityfun[i].parentId == 7) {
								$scope.articleconfigFunc.push($scope.dataEntityfun[i]);
							} else if($scope.dataEntityfun[i].parentId == 8) {
								$scope.financialconfigFunc.push($scope.dataEntityfun[i]);
							} else if($scope.dataEntityfun[i].parentId == 9) {
								$scope.refundFunc.push($scope.dataEntityfun[i]);
							} else if($scope.dataEntityfun[i].parentId == 10) {
								$scope.appconfigFunc.push($scope.dataEntityfun[i]);
							} else if($scope.dataEntityfun[i].parentId == 11) {
								$scope.promotionmanageFunc.push($scope.dataEntityfun[i]);
							} else if($scope.dataEntityfun[i].parentId == 12) {
								$scope.researchconfigFunc.push($scope.dataEntityfun[i]);
							}

						}
						$scope.ifshowOrders = ($scope.ordersFunc.length > 0);
						$scope.ifshowRefund = ($scope.refundFunc.length > 0);
						$scope.ifshowappconfig = ($scope.appconfigFunc.length > 0);
						$scope.ifshowGoods = ($scope.goodsFunc.length > 0);
						$scope.ifshowSysconfig = ($scope.sysconfigFunc.length > 0);
						$scope.ifshowMember = ($scope.memberFunc.length > 0);
						$scope.ifshowWeb = ($scope.webFunc.length > 0);
						$scope.ifshowConsultant = ($scope.consultantFunc.length > 0);
						$scope.ifshowArticleconfig = ($scope.articleconfigFunc.length > 0);
						$scope.ifshowfinancialconfig = ($scope.financialconfigFunc.length > 0);
						$scope.ifshowPromotionmanage = ($scope.promotionmanageFunc.length > 0);
						$scope.ifshowresearchconfig = ($scope.researchconfigFunc.length > 0);
							//清空localStorage
							//localStorage.clear();
					},
					function(result) {
					})
		}
		//登出   清除缓存
	$scope.quitLogin = function() {
			$scope.userToken = localStorage.userToken;
			functionService
				.loginout($scope.userToken)
				.then(function(result) {
						if(result.code == 0) {
							localStorage.removeItem("userToken");
							$rootScope.checkLogin();
						}
					},
					function(result) {
					})
		}
		//修改密码
	$scope.modifyPassword = function() {
		$scope.userId = localStorage.userId;
		$scope.dialog = ngDialog.open({
			template: 'views/common/updatePassword.html',
			className: 'ngdialog-theme-default',
			controller: 'updatePasswordModalController',
			scope: $scope,
			width: 650
		})
	}
//
//	$scope.funcIdPower = function(funcId) {
//		localStorage.removeItem("funcId");
//		localStorage.setItem("funcId", funcId);
//	};
	

	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};

	$scope.find();

}
//修改密码弹窗
function updatePasswordModalController($scope, functionService, $rootScope) {
	//修改密码
	$scope.updatePassword = function() {
		functionService
			.updatepassword($scope.userId, $scope.oldPwd, $scope.newPwd)
			.then(
				function(result) {
					$scope.quitLogin();
				}
			)
	};
}

angular
	.module('managerApp')
	.controller('functionController', functionController)
	.controller('updatePasswordModalController', updatePasswordModalController)