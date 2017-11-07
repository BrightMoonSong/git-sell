angular
	.module('managerApp')
	.controller('AuthSysUserController', AuthSysUserController)
	.controller('AuthSysUserFormModalController', AuthSysUserFormModalController)

function AuthSysUserController($rootScope, $scope, $http, $q, constPageSize, AuthSysUserService, ngDialog) {
	//搜索
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		AuthSysUserService
			.find(currentPaseSize, currentPageNo, $scope.userNameSearch, $scope.phoneSearch)
			.then(function(result) {
					$scope.sysUserList = result.data;
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				})
		return defer.promise;
	};
	/**
	 * 弹出 添加 修改 数据模态框
	 */
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/system/AuthSysUserFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'AuthSysUserFormModalController',
			scope: $scope,
			width: 650
		})
	};

	//修改状态
	$scope.editStatus = function(userId, n) {
		var reminder; //提示语
		switch(n) {
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
			AuthSysUserService
				.updatestatus(userId, n)
				.then(
					function(result) {
						if(result.code > 0) {
							$scope.loadData(); //刷新
						}
					},
					function(result) {

					});
		}, function(reason) {

		});

	}
	//关闭弹出窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
}

//弹出 添加 修改 数据模态框
function AuthSysUserFormModalController($scope, AuthSysUserService, $rootScope, ngVerify) {
	$scope.roleIdList = []; //选中得角色ID得集合
	$scope.availableroles = function() {
		//获取角色列表
		AuthSysUserService
			.findmanageroles()
			.then(
				function(result) {
					$scope.roleList = result.data; //角色列表
				},
				function(result) {

				});
	}
	//根据id获取数据
	$scope.initEntity = function() {
		if($scope.dataId) { //如果参数dataId不为空，说明是修改数据
			AuthSysUserService
				.get($scope.dataId)
				.then(
					function(result) {
						$scope.dataEntity = result.data;
						$scope.dataEntitybirthday = $scope.dataEntity.birthday; //生日
						//把初始化的roles遍历一遍，然后把初始化的对象存入选中的对象
						//目的变色
						$scope.dataEntity.roles.forEach(function(element) {
							$scope.roleIdList.push(element.roleId);
						})
					},
					function(result) {

					}
				);
		} else { //如果参数dataId为空，说明是新增数据，设置默认值
			$scope.dataEntity = {
				"status": 1, //正常
				"sex": 1 //男
			};

		}
	}
	//监听生日的变化
	$scope.unbingWatch = $scope.$watch('dataEntitybirthday', function(newVal) {
		if(!newVal) {
			return false;
		}
		$scope.dataEntity.age = ages(newVal);
	});

	/**
	 * 选择角色
	 * @param {Number} roleId
	 */
	$scope.roleListSelct = function(roleId) {
		if($scope.roleIdList.contains(roleId)) {
			$scope.roleIdList.remove(roleId);
		} else {
			$scope.roleIdList.push(roleId);
		}
	}
	//性别和状态的单选
	$scope.check = function(n, m) {
		switch(m) {
			case 'status':
				$scope.dataEntity.status = n;
				break;
			case 'sex':
				$scope.dataEntity.sex = n;
				break;
		}
	}

	//保存
	$scope.okModal = function() {
		if($scope.okModalDisabled) {
			return false;
		}
		$scope.okModalDisabled = true;

		if($scope.dataEntitybirthday.comp()) {
			$rootScope.showAlert('生日日期必须在今天之前！');
			$scope.okModalDisabled = false;
			return false;
		}
		if($scope.dataEntity.age < 1) {
			$rootScope.showAlert('年龄不能小于一岁！');
			$scope.okModalDisabled = false;
			return false;
		}
		//返回所有未验证通过的表单元素，并标记
		//		ngVerify.check('myform', function(errEls) {
		//
		//		});

		$scope.dataEntity.birthday = $scope.dataEntitybirthday; //生日
		$scope.dataEntity.roles = [];
		//根据后台需求把对象所有的传回后台
		$scope.roleList.forEach(function(element, index, array) {
			if($scope.roleIdList.contains(element.roleId)) {
				$scope.dataEntity.roles.push(element);
			}
		})
		if($scope.dataId) { //修改
			if($scope.dataEntity.passwords){
				$scope.dataEntity.password = $scope.dataEntity.passwords;
			}			
			AuthSysUserService
				.update($scope.dataEntity)
				.then(
					function(result) {
						if(result.code >= 0) {
							$scope.cancelModal();
							$scope.unbingWatch(); //取消 监听生日的变化
							$scope.loadData(); //刷新
							$scope.okModalDisabled = false;
						}
					},
					function(result) {
						$scope.okModalDisabled = false;
					}
				);
		} else { //添加			
			AuthSysUserService
				.add($scope.dataEntity)
				.then(
					function(result) {
						if(result.code >= 0) {
							$scope.cancelModal();
							$scope.unbingWatch(); //取消 监听生日的变化
							$scope.loadData(); //刷新
							$scope.okModalDisabled = false;
						}
					},
					function(result) {
						$scope.okModalDisabled = false;
					}
				);
		}
	}

	//初始化
	$scope.initEntity(); //根据id获取数据
	$scope.availableroles(); //获取角色列表
}