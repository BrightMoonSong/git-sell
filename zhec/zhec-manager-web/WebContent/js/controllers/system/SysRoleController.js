/**
 * Created by shy on 2016/11/24.
 */
/**
 * 系统用户controller定义
 */
function SysRoleController($rootScope, $scope, $http, $q, constPageSize, sysReminder, SysRoleService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.nameSearch = ""; //搜索关键词

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var name = $scope.nameSearch;
		//测试
		SysRoleService.find(name, currentPaseSize, currentPageNo).then(
			function(result) {
				$scope.roleList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			});
		return defer.promise;
	}
	//删除
	$scope.deleteById = function(id) {
		var reminder; //提示语
		reminder = sysReminder.sysDelete;
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
			SysRoleService
				.delete(id)
				.then(
					function(result) {
						$scope.loadData(true);
					})
		}, function(reason) {

		});

	};
	/**
	 * 弹出 修改 添加 数据模态框
	 */
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/system/SysRoleFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'SysRoleFormModalController',
			scope: $scope,
			width: 650
		})
	};
	/**
	 * 弹出设置权限模态框
	 */
	$scope.openPermissionModal = function(dataId, scope) {
		$scope.scope = scope;
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/system/SysRolePerFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'SysRolePerFormModal',
			scope: $scope,
			width: 1050
		})
	};

	/**
	 * ͨ查询角色下的用户
	 */
	$scope.openFindroleusersList = function(dataId, scope) {
		$scope.scope = scope;
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/system/SysRoleFindRoleUsersFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'findroleusersListController',
			scope: $scope,
			width: 1050
		})
	};

	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
}
/**
 * 修改 添加 弹出页面controller定义
 */
function SysRoleFormModalController($scope, SysRoleService) {
	$scope.dataEntity = {};
	$scope.initEntity = function() {
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
			//测试
			SysRoleService
				.get($scope.dataId)
				.then(
					function(result) {
						$scope.dataEntity = result.data;
					}
				);
		} else { //如果参数dataId为空，说明是新增数据，设置默认值
			$scope.dataEntity = {
				"scope": 1,
				"status": 1
			};
		}
	}
	//radio选中的值
	$scope.check = function(n, name) {
		if('scope' == name) {
			$scope.dataEntity.scope = n;
		}
		if('status' == name) {
			$scope.dataEntity.status = n;
		}
	}
	$scope.okModal = function() {
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //修改数据
			//测试
			SysRoleService
				.edit($scope.dataEntity)
				.then(
					function(result) {
						$scope.loadData();
						$scope.dialog.close();
					}
				)
		} else { //新增数据
			SysRoleService
				.add($scope.dataEntity)
				.then(
					function(result) {
						$scope.loadData();
						$scope.dialog.close();
					}
				)
		}
	};

	$scope.initEntity();

}
/**
 * 设置权限弹出页面controller定义
 */
function SysRolePerFormModal($scope, SysRoleService) {
	$scope.selectedOrders = [];
	$scope.selectedTagsOrders = [];
	$scope.initEntity = function() {
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
			SysRoleService
				.functionsbyscope($scope.scope) //显示列表
				.then(
					function(result) {
						$scope.dataEntity = result.data;
						$('html, body').animate({
							scrollTop: 0
						}, 'slow');
						SysRoleService
							.getRoleFunctions($scope.dataId) //回显数据
							.then(
								function(result) {
									$scope.selectedOrders = result.data;
									$('html, body').animate({
										scrollTop: 0
									}, 'slow');
								}
							);
					}
				);
		} else { //如果参数dataId为空，-------错误

		}
	}
	$scope.okModal = function() {
		var res = {
			"roleId": $scope.dataId,
			"functions": $scope.selectedOrders
		};
		SysRoleService
			.rolefunctions(res)
			.then(
				function(result) {
					$scope.loadData();
					$scope.dialog.close();
				}
			)
	};

	/**
	 *   获取选中的
	 */
	$scope.updateSelectedOrders = function(action, id, name) {
		if(action == 'add' && $scope.selectedOrders.indexOf(id) == -1) {
			$scope.selectedOrders.push(id);
			$scope.selectedTagsOrders.push(name);
			//$scope.dataEntity.goodsSpecIds = $scope.selectedOrders.join(",");
		}
		if(action == 'remove' && $scope.selectedOrders.indexOf(id) != -1) {
			var idx = $scope.selectedOrders.indexOf(id);
			$scope.selectedOrders.splice(idx, 1);
			$scope.selectedTagsOrders.splice(idx, 1);
			//$scope.dataEntity.goodsSpecIds = $scope.selectedOrders.join(",");
		}
	}
	$scope.updateSelectionOrders = function($event, id, name, fatherId, fatherName) {
		var checkbox = $event.target;
		var action = (checkbox.checked ? 'add' : 'remove');
		$scope.updateSelectedOrders(action, id, name);
		for(var i = 0; i < $scope.dataEntity.length; i++) {
			//移除父级时，子类跟着全部移除
			if(action == 'remove' && $scope.dataEntity[i].parentId == 0 && $scope.dataEntity[i].id == id) {
				for(var a = 0; a < $scope.dataEntity.length; a++) {
					if($scope.dataEntity[a].parentId == id) {
						$scope.updateSelectedOrders('remove', $scope.dataEntity[a].id, $scope.dataEntity[a].name);
					}
				}
			}
			//移除子类，子类移除时遍历所有，如果当前子类的父类无子类了，父类跟着移除
			if(action == 'remove') {
				var list = [];
				for(var b = 0; b < $scope.dataEntity.length; b++) {
					if($scope.dataEntity[b].parentId == fatherId) {
						list.push($scope.dataEntity[b].id);
					}
				}
				if(list.length > 0) {
					var bool = true;
					for(var m = 0; m < list.length; m++) {
						if($scope.selectedOrders.indexOf(list[m]) >= 0) {
							bool = false;
						}
					}
					if(bool) {
						$scope.updateSelectedOrders('remove', fatherId, fatherName);
					}
				}
			}
			//选中子类，对应的父类也自动选中
			if($scope.dataEntity[i].id == fatherId) {
				if($scope.selectedOrders.indexOf(id) >= 0) {
					if($scope.selectedOrders.indexOf(fatherId) >= 0) {

					} else {
						$scope.updateSelectedOrders('add', fatherId, fatherName);
					}
				}
			}
			//选中父类，父类下的子类全部选中
			if($scope.dataEntity[i].parentId == 0 && id == $scope.dataEntity[i].id) {
				if(action == 'add') {
					for(var j = 0; j < $scope.dataEntity.length; j++) {
						if($scope.dataEntity[j].parentId == id) {
							if($scope.selectedOrders.indexOf($scope.dataEntity[j].id) >= 0) {

							} else {
								$scope.updateSelectedOrders('add', $scope.dataEntity[j].id, $scope.dataEntity[j].name);
							}
						}
					}
				}
			}
		}

	}
	$scope.isSelectedOrders = function(id) {
		return $scope.selectedOrders.indexOf(id) >= 0;
	}

	$scope.initEntity();

}

/**
 * 弹出页面    ͨ查询角色下的用户   controller定义  
 */
function findroleusersListController($scope, $q, $rootScope, constPageSize, SysRoleService) {
	//弹窗 分页
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		SysRoleService
			.findroleusers($scope.dataId, $scope.scope, currentPaseSize, currentPageNo)
			.then(
				function(result) {
					$scope.userList = result.data;
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	};

}

angular
	.module('managerApp')
	.controller('SysRoleController', SysRoleController)
	.controller('SysRoleFormModalController', SysRoleFormModalController)
	.controller('SysRolePerFormModal', SysRolePerFormModal)
	.controller('findroleusersListController', findroleusersListController)