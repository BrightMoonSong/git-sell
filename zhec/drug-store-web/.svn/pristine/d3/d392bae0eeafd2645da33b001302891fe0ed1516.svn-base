/**
 * 系统用户controller定义
 */
function SysUserController($scope, $http, $q, $filter, constPageSize, SysUserService, ngDialog, $rootScope) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.userNameSearch = ""; //搜索关键词
	$scope.roleListRoleId = [];

	$scope.ToExcel = function() {
		var obj = clone($scope.userList);
		
		JSONToExcelConvertor($scope.userList, localStorage.userName + '-资金结算'); //第二个是Excel文件名字
	}
	$scope.ToPdf = function() {
		htmlToPdf('userListToPdf', constPageSize);
	}
	//echarts 
	$scope.ToEcharts = function() {
		$scope.dialog = ngDialog.open({
			template: 'views/system/echerts.html',
			className: 'ngdialog-theme-default',
			controller: 'SysUserEchartsFormModalController',
			scope: $scope,
			width: 850
		})
	}
	$scope.availableroles = function() {
		//获取角色列表
		SysUserService
			.availableroles()
			.then(
				function(result) {
					$scope.roleList = result.data; //角色列表
					for(var i = 0; i < $scope.roleList.length; i++) {
						$scope.roleListRoleId.push($scope.roleList[i].roleId)
					}
				},
				function(result) {
					defer.reject(result);
				});
	}
	$scope.availableroles();
	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var userName = $scope.userNameSearch;
		SysUserService.find(userName, currentPaseSize, currentPageNo).then(
			function(result) {
				$scope.userList = result.data;
				//拖拽方法
				logicalProcesses($scope, $filter, SysUserDragData($scope.userList), 'userListToPdf');
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}

	//重置密码
	$scope.resetPassword = function(id) {
		var reminder = "确定重置密码吗？"; //提示语
		//reminder = goodsReminder.goodsinfo;

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
			SysUserService
				.resetpassword(id)
				.then(
					function(result) {
						$scope.loadData();
					}
				);
		}, function(reason) {

		});

	};

	/**
	 * 弹出修改数据模态框
	 */
	$scope.$parent.refresh = $scope.find;
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/system/SysUserFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'SysUserFormModalController',
			scope: $scope,
			width: 650
		})
	};

}

/**
 * 系统用户修改弹出页面controller定义
 */
function SysUserFormModalController($scope, SysUserService, $rootScope) {
	$scope.roleIdList = []; //选中得角色ID得集合
	$scope.initEntity = function() {
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
			SysUserService
				.get($scope.dataId)
				.then(
					function(result) {
						$scope.dataEntity = result.data;
						$scope.roleIdList = $scope.dataEntity.roleIds;
					}
				);
		} else { //如果参数dataId为空，说明是新增数据，设置默认值
			$scope.dataEntity = {
				"scope": 1,
				"status": 1
			};

		}
		//$scope.roleid = 4;
	}
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
	//保存
	$scope.okModal = function() {
		$scope.dataEntity.roleIds = $scope.roleIdList;
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //修改数据
			SysUserService
				.edit($scope.dataEntity)
				.then(
					function(result) {
						$scope.loadData();
						$scope.dialog.close();
					},
					function(result) {

					}
				)
		} else { //新增数据
			SysUserService
				.add($scope.dataEntity)
				.then(
					function(result) {
						$scope.loadData();
						$scope.dialog.close();
					},
					function(result) {}
				)
		}
	};

	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
	$scope.initEntity();
}

function SysUserEchartsFormModalController($scope, SysUserService, $timeout, $rootScope) {
	//柱形图
	$scope.sliderEcharts = function() {
		$timeout(function() {
			var titleText = 'ECharts 示例';
			var legendData = ['销量', '笑量'];
			var xAxisData = ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"];
			var seriesData = [];
			seriesData.push([5, 20, 36, 10, 10, 20]);
			seriesData.push([3, 23, 33, 13, 13, 40]);
			sliderEcharts(titleText, legendData, xAxisData, seriesData);
		}, 200);
	};
	//折线图
	$scope.lineEcharts = function() {
		$timeout(function() {
			var titleText = '对数轴示例';
			var legendData = ['1/2的指数', '2的指数', '3的指数'];
			var xAxisData = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
			var seriesData = [];
			seriesData.push([1, 3, 9, 27, 81, 847, 741, 2223, 6669]);
			seriesData.push([1, 2, 4, 8, 16, 32, 64, 128, 256]);
			seriesData.push([1 / 2, 1 / 4, 1 / 8, 1 / 16, 1 / 32, 1 / 64, 1 / 128, 1 / 256, 1 / 512]);
			lineEcharts(titleText, legendData, xAxisData, seriesData);
		}, 200);
	};
	//饼图
	$scope.pieEcharts = function() {
		$timeout(function() {
			var titleText = '某站点用户访问来源';
			var titleSubText = '纯属虚构'; ////副标题
			var legendData = ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'];
			var seriesData = [335, 310, 234, 135, 1548];
			pieEcharts(titleText, titleSubText, legendData, seriesData);
		}, 200);
	};

	//初始化
	$scope.sliderEcharts(); //-->柱形图
}

angular
	.module('managerApp')
	.controller('SysUserController', SysUserController)
	.controller('SysUserFormModalController', SysUserFormModalController)
	.controller('SysUserEchartsFormModalController', SysUserEchartsFormModalController)