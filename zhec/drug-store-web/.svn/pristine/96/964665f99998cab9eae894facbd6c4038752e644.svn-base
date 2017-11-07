angular
	.module('managerApp')
	.controller('SysAreaController', SysAreaController)
	.controller('SysAreaModalController', SysAreaModalController)
	.controller('SysAreaModalSonController', SysAreaModalSonController)

function SysAreaController($rootScope, $scope, $http, $q, constPageSize, SysAreaService, ngDialog, $compile) {
	$scope.typeSearch = false; //查询类型 1：查询所有 2：仅查询正常状态
	$scope.findall = function() {
		var type;
		$scope.typeSearch ? type = 2 : type = 1;
		SysAreaService
			.findall(type)
			.then(
				function(result) {
					$scope.cateAllList = result.data;
				},
				function(result) {
				});
	}
	$scope.findall();
	/**
	 * 保存点击了的cateid
	 */
	$scope.firstCateId = '';
	$scope.secondCateId = '';
	$scope.thirdCateId = '';
	$scope.saveCateId = function(cateId, n) {
		switch(n) {
			case 1:
				if($scope.firstCateId == cateId) {
					$scope.firstCateId = '';
					$scope.secondCateId = '';
					$scope.thirdCateId = '';
					return false;
				}
				$scope.firstCateId = cateId;
				$scope.secondCateId = '';
				$scope.thirdCateId = '';
				break;
			case 2:
				if($scope.secondCateId == cateId) {
					$scope.secondCateId = '';
					$scope.thirdCateId = '';
					return false;
				}
				$scope.secondCateId = cateId;
				$scope.thirdCateId = '';
				break;
			case 3:
				if($scope.thirdCateId == cateId) {
					$scope.thirdCateId = '';
					return false;
				}
				$scope.thirdCateId = cateId;
				break;
		}

	}
	//弹出  添加/修改  一级区域弹窗
	$scope.openModal = function(id) {
		$scope.dataId = id;
		$scope.dataPid = '';
		$scope.dialog = ngDialog.open({
			template: 'views/system/SysAreaModal.html',
			className: 'ngdialog-theme-default',
			controller: 'SysAreaModalController',
			scope: $scope,
			width: 850
		})
	};
	//弹出添加子级弹窗
	$scope.openModalSon = function(id) {
		$scope.dataPid = id;
		$scope.dataId = '';
		$scope.dialog = ngDialog.open({
			template: 'views/system/SysAreaModal.html',
			className: 'ngdialog-theme-default',
			controller: 'SysAreaModalSonController',
			scope: $scope,
			width: 850
		})
	};

	//更改状态
	$scope.updateStatusById = function(id, status) {
		var reminder; //提示语
		switch(status) {
			case 0:
				reminder = "确定禁用吗？"; //提示语
				break;
			case 1:
				reminder = "确定启用吗？"; //提示语
				break;
			case 2:
				reminder = "确定删除吗？"; //提示语
				break;
		}

		ngDialog.openConfirm({
			template: '<p>' + reminder + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			SysAreaService
				.updatestatus(id, status)
				.then(
					function(result) {
						if(result.code >= 0) {
							$scope.findall(); //刷新
						}
					},
					function(result) {

					});
		}, function(reason) {

		});

	};
	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
}
//添加子级的弹窗
function SysAreaModalSonController($scope, SysAreaService, $rootScope) {
	$scope.initEntity = function() {
		$scope.dataEntity = {
			"status": 1, //正常
			'sort': 1,
			'pid': $scope.dataPid //pid
		};
	}
	//保存
	$scope.okModal = function() {
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;

		SysAreaService
			.addinfo($scope.dataEntity)
			.then(function(result) {
					if(result.code >= 0) {
						$scope.okModalDisabled = false;
						$scope.findall();
						$scope.cancelModal();
					}
				},
				function(result) {
					$scope.okModalDisabled = false;
					$scope.cancelModal();
				});
	};
	//初始化
	$scope.initEntity();
}

//添加修改的弹窗
function SysAreaModalController($scope, SysAreaService, $rootScope) {
	$scope.initEntity = function() {
		if($scope.dataId) { //如果参数dataId不为空，说明是修改数据
			SysAreaService
				.getinfo($scope.dataId)
				.then(function(result) {
					$scope.dataEntity = result.data;
				});
		} else { //如果参数dataId为空，说明是新增数据，设置默认值
			$scope.dataEntity = {
				"levelType": 1,
				"name": "",
				"pid": 0,
				"status": 1 //正常
			};

		}
	}
	//保存
	$scope.okModal = function() {
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		if($scope.dataId) { //修改时
			SysAreaService
				.updateinfo($scope.dataEntity)
				.then(function(result) {
						if(result.code >= 0) {
							$scope.okModalDisabled = false;
							$scope.findall();
							$scope.cancelModal();
						}
					},
					function(result) {
						$scope.okModalDisabled = false;
						$scope.cancelModal();
					});
		} else { //添加时
			SysAreaService
				.addinfo($scope.dataEntity)
				.then(function(result) {
						if(result.code >= 0) {
							$scope.okModalDisabled = false;
							$scope.findall();
							$scope.cancelModal();
						}
					},
					function(result) {
						$scope.okModalDisabled = false;
						$scope.cancelModal();
					});
		}
	};
	//初始化
	$scope.initEntity();
}