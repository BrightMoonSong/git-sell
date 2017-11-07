/**
 * 系统用户controller定义
 */
function AllConsultantController($scope, $http, $q, constPageSize, AllConsultantService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.userNameSearch = ""; //搜索关键词
	$scope.auditStatus = "";
	$scope.consultantsName = "";
	$scope.consultantId = "";
	$scope.okModalDisabled = false; //保存按钮的disabled
	$scope.addModalDisabled = false; //保存按钮的disabled
	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, constPageSize) {
			var defer = $q.defer();
			var auditStatus = $scope.auditStatus;
			var consultantsName = $scope.consultantsName;
			AllConsultantService
				.find(constPageSize, currentPageNo, auditStatus, consultantsName)
				.then(
					function(result) {
						$scope.consultantList = result.data;
						defer.resolve(result);
					},
					function(result) {
						defer.reject(result);
					})
			return defer.promise;
		}
		/**
		 * 弹出修改数据模态框
		 */
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/consultant/AllConsultantFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'AllConsultantModalController',
			scope: $scope,
			width: 900
		})
	};

	$scope.openModals = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/consultant/AllConsultantFormModals.html',
			className: 'ngdialog-theme-default',
			controller: 'AllConsultantModalControllers',
			scope: $scope,
			width: 1200
		})
	};

	$scope.add = function() {
		$scope.dialog = ngDialog.open({
			template: 'views/consultant/AddConsultantFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'AddConsultantModalController',
			scope: $scope,
			width: 900
		})
	};




}


/**
 * 弹出页面的controller定义
 */
function AddConsultantModalController($scope, AllConsultantService) {

	$scope.addcon = function() {
		if ($scope.addModalDisabled == true) {
			return 0;
		}
		$scope.addModalDisabled = true;
		var res = {
			'mobile': $scope.phone,
		};
		AllConsultantService
			.adds(res)
			.then(
				function(result) {
					$scope.addModalDisabled = false;
					$scope.cancelModal();
					$scope.loadData();
				},
				function(result) {
					$scope.addModalDisabled = false;
					$scope.cancelModal();
					$scope.loadData();
				}
			);

	}

	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
}
/**
 * 弹出页面的controller定义
 */
function AllConsultantModalControllers($scope, AllConsultantService) {

	$scope.initEntitys = function() {
		AllConsultantService
			.get($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntity = result.data[0];
				}
			);

	}
	$scope.initEntitys();
	$scope.cancelModal = function() {
		$scope.dialog.close();
		$scope.loadData();
	}
}



/**
 * 系统用户修改弹出页面controller定义
 */
function AllConsultantModalController($scope, $q, AllConsultantService) {
	$scope.initEntity = function() {
		AllConsultantService
			.get($scope.dataId)
			.then(
				function(result) {
					$scope.consultantList = result.data[0];
				}
			);

	}
	$scope.okModal = function() {
		if ($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		var defer = $q.defer();
		var res = {
			'id': $scope.consultantList.id,
			'name': $scope.consultantList.name,
			'cardId': $scope.consultantList.cardId,
			'sex': $scope.consultantList.sex,
			'birthday': $scope.consultantList.birthday,
			'email': $scope.consultantList.email,
			'qq': $scope.consultantList.qq,
			'mobile': $scope.consultantList.mobile,
			'phone':$scope.consultantList.phone,
			'validityTime': $scope.consultantList.validity,
			'status': $scope.consultantList.status
		};
		AllConsultantService
			.put(res)
			.then(
				function(result) {
					defer.resolve(result);
					$scope.okModalDisabled = false;
					$scope.loadData();
					$scope.cancelModal();
				},
				function(result) {
					defer.reject(result);
					$scope.okModalDisabled = false;
				})
		return defer.promise;
	};

	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
	$scope.initEntity();
}

angular
	.module('managerApp')
	.controller('AllConsultantController', AllConsultantController)
	.controller('AllConsultantModalController', AllConsultantModalController)
	.controller('AllConsultantModalControllers', AllConsultantModalControllers)
	.controller('AddConsultantModalController', AddConsultantModalController)
	// .controller('confirmController', confirmController)
