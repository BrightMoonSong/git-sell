/**
 * 系统用户controller定义
 */
function AuditConsultantListController($scope, $http, $q, constPageSize, AuditConsultantListService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.auditStatus = "";
	$scope.auditstatus = "";
	$scope.userNameSearch = ""; //搜索关键词
	$scope.consultantsName = "";
	$scope.consultantId = "";
	$scope.WdatePicker = {};
	$scope.showBigPic = false; //是否显示大图
	$scope.fileNameType = false;
	$scope.remark = "";
	$scope.okModalDisabled = false; //保存按钮的disabled

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, constPageSize) {
			var defer = $q.defer();
			var auditStatus = $scope.auditStatus;
			var consultantsName = $scope.consultantsName;
			AuditConsultantListService
				.find(constPageSize, currentPageNo, auditStatus, consultantsName)
				.then(
					function(result) {
						$scope.consultantAuditList = result.data;
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
	$scope.openModal = function(dataId, auditstatus) {
		$scope.dataId = dataId;
		$scope.auditstatus = auditstatus;
		$scope.dialog = ngDialog.open({
			template: 'views/consultant/AuditConsultantModal.html',
			className: 'ngdialog-theme-default',
			controller: 'AuditPassConsultantModalController',
			scope: $scope,
			width: 900
		})
	};
	//点击显示大图
	$scope.showBigImg = function(imgsrc) {
		$scope.showPic = imgsrc;
		$scope.dialog = ngDialog.open({
			template: 'firstDialogId',
			className: 'ngdialog-theme-default',
			scope: $scope,
			width: 800,
			controller: showBigImgController
		})

	}

}

function showBigImgController($scope, $http, $q, $compile, AuditConsultantListService) {
	$scope.currentImg = $scope.showPic;
	$scope.closeModal = function() {
		$scope.dialog.close()
	}
}

/**
 * 顾问通过审核controller定义
 */
function AuditPassConsultantModalController($scope, AuditConsultantListService, ngDialog) {
	$scope.saveMessage = {};
	$scope.initEntity = function() {
			AuditConsultantListService
				.get($scope.dataId)
				.then(
					function(result) {
						$scope.consultantAuditList = result.data;
						$scope.consultantId = $scope.consultantAuditList[0].consultantId;

					}
				);
		}
		//审核
	$scope.cancelAudit = function(auditStatus) {
		$scope.auditStatuss = auditStatus;
		$scope.dialog1 = ngDialog.open({
			template: 'views/consultant/AuditFailConsultantModal.html',
			className: 'ngdialog-theme-default',
			width: 650,
			controller: 'AuditFailConsultantModalController',
			scope: $scope
		})
	}
	$scope.initEntity();
}
/**
 * 顾问通过审核controller定义
 */
function AuditFailConsultantModalController($scope, $q, AuditConsultantListService, $rootScope, constPageSize) {
	$scope.sendMessage = function() {
		if ($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		var defer = $q.defer();
		if (undefined == $scope.WdatePicker.startTime) {
			$scope.WdatePicker.startTime = "";
		}
		var validityTime = $scope.WdatePicker.startTime;
		var userId = localStorage.userId;
		var userName = localStorage.userName;
		var res = {
			'id': $scope.dataId,
			'consultantsId': $scope.consultantId,
			'auditStatus': $scope.auditStatuss,
			'validityTime': validityTime,
			'auditId': userId,
			'auditName': userName,
			'remark': $scope.remark
		};
		if ($scope.auditStatuss == 2) {
			if (validityTime == '' || validityTime == null || validityTime == undefined) {
				$rootScope.showAlert("请输入时间！");
				$scope.okModalDisabled = false;
				return 0;
			}
		}

		if ($scope.auditStatuss == 3) {
			if ($scope.remark == '' || $scope.remark == null || $scope.remark == undefined) {
				$rootScope.showAlert("拒绝申请时，备注为必填项！");
				$scope.okModalDisabled = false;
				return 0;
			}
		}
		AuditConsultantListService
			.put(res)
			.then(
				function(result) {
					defer.resolve(result);
					$scope.okModalDisabled = false;
					$scope.cancelFailAudit();
					$scope.dialog1.close();
					$scope.dialog.close();
					$scope.loadData();


				},
				function(result) {
					defer.reject(result);
					$scope.okModalDisabled = false;
				})
		return defer.promise;

	}
	$scope.cancelFailAudit = function() {
		$scope.dialog1.close()
	}

}

angular
	.module('managerApp')
	.controller('AuditConsultantListController', AuditConsultantListController)
	.controller('AuditPassConsultantModalController', AuditPassConsultantModalController)
	.controller('AuditFailConsultantModalController', AuditFailConsultantModalController)
