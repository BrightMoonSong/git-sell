function AuthRoleController($scope, $q, $http, $rootScope, constPageSize, AuthRoleService, ngDialog, goodsReminder) {
	$scope.authId = ""; //操作当前ID
	$scope.roleName = ""; //角色名称
	$scope.scopeSearch = ""; //角色范围
//	$scope.scopeImgSrc1 = __uri('/../../img/unfold/zhankai.png');
//	$scope.scopeImgSrc2 = __uri('/../../img/unfold/shouqi.png');
	$scope.scopeImgSrc1 = '/../../img/unfold/zhankai.png';
	$scope.scopeImgSrc2 = '/../../img/unfold/shouqi.png';

	//角色条件查询分页列表
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var roleNames = $scope.roleName;
		var scopes = $scope.scopeSearch;
		if(!scopes) {
			scopes = '';
		}
		AuthRoleService
			.find(roleNames, scopes, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.roleList = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}
	$scope.scopeSearchList = [{
			'id': 1,
			'name': '平台web'
		},
		{
			'id': 2,
			'name': '商家web'
		},
		{
			'id': 3,
			'name': '商家手机端'
		},
		{
			'id': 4,
			'name': '配送员手机端'
		},
		{
			'id': 5,
			'name': '用户手机端'
		}
	];
	//角色范围
	$scope.scopes = function(n) {
		switch(n) {
			case 1:
				return '平台web';
				break;
			case 2:
				return '商家web';
				break;
			case 3:
				return '商家手机端';
				break;
			case 4:
				return '配送员手机端';
				break;
			case 5:
				return '用户手机端';
				break;
			default:
				return '';
				break;
		}
	}
	//弹出添加弹窗
	$scope.openModal = function(id, boller) {
		$scope.authId = id;
		$scope.datared = boller;
		$scope.dialog = ngDialog.open({
			template: 'views/system/AuthRoleFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'AuthRoleFormModelController',
			scope: $scope,
			width: 850
		})
	};
	//权限分配弹窗
	$scope.assignPurviewModal = function(id, scope) {
		$scope.dataId = id;
		$scope.scopeModal = scope;
		$scope.dialog = ngDialog.open({
			template: 'views/system/AuthRoleAssignPurview.html',
			className: 'ngdialog-theme-default',
			controller: 'assignPurviewController',
			scope: $scope,
			width: 950
		})
	}

	//启禁用操作
	$scope.enableId = function(id, status) {
		var authstouses;
		if(status == 1) {
			//0禁1启
			authstouses = goodsReminder.goodsState.enable;
		}
		if(status == 2) {
			authstouses = goodsReminder.goodsState.forbidden;
		}
		if(status ==3) {
			authstouses = goodsReminder.goodsbranddelete
		}
		ngDialog.openConfirm({
			template: '<p>' + authstouses + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			AuthRoleService
				.enable(id, status)
				.then(function(result) {
					$scope.loadData();
				}),
				function(reason) {

				}
		})

	}
	//状态选择
	$scope.check = function(n) {
		$scope.authlist.status = n;
	}
	//关闭弹出窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
}

function AuthRoleFormModelController($scope, AuthRoleService) {
	$scope.initer = function() {
		if($scope.authId) { //如果id为空则为添加，否则为修改数据
			AuthRoleService
				.detail($scope.authId)
				.then(function(result) {
					$scope.authlist = result.data;
				})
		} else {
			$scope.authlist = {
				"status": 1,
				"scope": 1
			}
		}
	}

	//角色范围
	$scope.scopeList = [ //1平台web，2商家web，3商家手机端，4配送员手机端，5用户手机端) ,
		{
			'id': 1,
			"name": '平台web'
		}, {
			'id': 2,
			"name": '商家web'
		}, {
			'id': 3,
			"name": '商家手机端'
		}, {
			'id': 4,
			"name": '配送员手机端'
		}, {
			'id': 5,
			"name": '用户手机端'
		}
	]
	$scope.okModal = function() {
		if($scope.authId) { //如果id为空则为添加，否则为修改数据
			AuthRoleService
				.edit($scope.authlist)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData();
				}, function(reason) {
					$scope.cancelModal();
				})
		} else {
			AuthRoleService
				.add($scope.authlist)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData();
				}, function(reason) {
					$scope.cancelModal();
				})
		}
	}
	$scope.initer();
}

//权限分配
function assignPurviewController($scope, AuthRoleService, $rootScope) {
	//给角色赋权限时的functionId集合--->暂时用作存储3级ID集合
	$scope.functionIdsOkModel = [];

	$scope.firstFunIdList = []; //一级ID集合
	$scope.secFunIdList = []; //二级ID集合

	//根据scope列出其所有可选权限
	$scope.allfunctionsByScope = function() {
		AuthRoleService
			.findscopeallfunctions($scope.scopeModal)
			.then(function(result) {
				$scope.dataEntity = result.data;
				if(result.data.length == 0) {
					$rootScope.showAlert("没有可选权限！");
				}
			}, function(reason) {

			})
	}

	//通过角色ID查询角色拥有的相应权限列表--->回显
	$scope.getrolefunctionsByRoleId = function() {
		AuthRoleService
			.getrolefunctions($scope.dataId)
			.then(function(result) {
				if(result.data.length > 0) {
					$scope.$watch('dataEntity', function(newVal, oldVal) {
						if(newVal) {
							//数组去重
							/*$scope.dataEntity.forEach(function(element, index, array) {
								var attr = [],attr1 = [];
								element.functionVos.forEach(function(element, index, array) {
										if(!attr.contains(element.functionId)){
											attr.push(element.functionId);
											attr1.push(element);
										}
								});
								element.functionVos = attr1;
							});*/

							$scope.dataEntity.forEach(function(element, index, array) {
								try {
									if(result.data.contains(element.functionId)) {
										$scope.SaveIdList(element.functionId, 1);
										element.functionVos.forEach(function(element, index, array) {
											if(result.data.contains(element.functionId)) {
												$scope.SaveIdList(element.functionId, 2);
												element.functionVos.forEach(function(element, index, array) {
													if(result.data.contains(element.functionId)) {
														$scope.SaveIdList(element.functionId, 3);
													}
												})
											}
										})
									}
								} catch(e) {
									//TODO handle the exception
								}
							})
						}
					})

				}
			}, function(reason) {

			})
	}

	//点选一级二级三级--->重要
	$scope.SaveIdList = function(functionId, n) {
		switch(n) {
			case 1: //一级
				$scope.firstFunIdList.contains(functionId) ? $scope.firstFunIdList.remove(functionId) : $scope.firstFunIdList.push(functionId);
				break;
			case 2: //二级
				$scope.secFunIdList.contains(functionId) ? $scope.secFunIdList.remove(functionId) : $scope.secFunIdList.push(functionId);
				break;
			case 3: //三级
				$scope.functionIdsOkModel.contains(functionId) ? $scope.functionIdsOkModel.remove(functionId) : $scope.functionIdsOkModel.push(functionId);
				break;
		}
	}

	//保存---->给角色赋权限
	$scope.okModal = function() {
		if($scope.okModalDisabled == true) {
			return false;
		}
		$scope.okModalDisabled = true;
		var cloneFuntionIds = clone($scope.functionIdsOkModel);
		$scope.dataEntity.forEach(function(element, index, array) {
			try {
				var firstFunId = element.functionId;
				element.functionVos.forEach(function(element, index, array) {
					var secFunId = element.functionId;
					element.functionVos.forEach(function(element, index, array) {
						if(cloneFuntionIds.contains(element.functionId)) {
							if(!cloneFuntionIds.contains(firstFunId)) {
								cloneFuntionIds.push(firstFunId);
							}
							if(!cloneFuntionIds.contains(secFunId)) {
								cloneFuntionIds.push(secFunId);
							}
						}
					})
				})
			} catch(e) {
				//TODO handle the exception
			}
		})

		var str = {
			'functionIds': cloneFuntionIds,
			'roleId': $scope.dataId
		};
		AuthRoleService
			.addrolefunctions(str, $scope.scopeModal)
			.then(function(result) {
				if(result.code > 0) {
					$scope.cancelModal();
					$scope.loadData(); //刷新
				}
				$scope.okModalDisabled = false;
			}, function(reason) {
				$scope.okModalDisabled = false;
			})
	}

	//初始化
	$scope.allfunctionsByScope(); //根据scope列出其所有可选权限
	$scope.getrolefunctionsByRoleId(); //通过角色ID查询角色拥有的相应权限列表--->回显
}

angular
	.module("managerApp")
	.controller("AuthRoleController", AuthRoleController)
	.controller("AuthRoleFormModelController", AuthRoleFormModelController)
	.controller("assignPurviewController", assignPurviewController)