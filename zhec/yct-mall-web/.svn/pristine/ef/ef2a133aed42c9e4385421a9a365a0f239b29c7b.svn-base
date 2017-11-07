function CompanydetailController($scope, $http, $q, ngDialog, $stateParams, $rootScope) {
	$rootScope.rootIsActiveId = 2;//公司概况
	$scope.isActiveId = 1;
	$scope.checkCompany = function(n) {
	$scope.isActiveId = n;
		switch(n) {
			case 1:
				$scope.newTitle = "公司介绍";
				$scope.isActiveId = 1;
				break;
			case 2:
				$scope.newTitle = "企业文化";
				$scope.isActiveId = 2;
				break;
			case 3:
				$scope.newTitle = "资质荣誉";
				$scope.isActiveId = 3;
				break;

		}
	}
	$scope.checkCompany(1)
}

app.controller('CompanydetailController', CompanydetailController);