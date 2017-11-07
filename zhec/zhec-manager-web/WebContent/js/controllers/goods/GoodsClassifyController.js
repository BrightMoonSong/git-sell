/**
 * 系统用户controller定义
 */
function GoodsClassifyController($rootScope, $scope, $http, $q, goodsReminder, constPageSize, GoodsClassifyService, ngDialog) {
	//定义变量
	$scope.nameSearch = ""; //搜索文本框的 model
	$scope.dataId = ""; //当前操作的数据id
	$scope.nameSearch = "";
	$scope.okModalDisabled = false; //保存按钮的disabled

	/**
	 * 搜索
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var name = $scope.nameSearch;
		GoodsClassifyService
			.find(name, currentPaseSize, currentPageNo)
			.then(
				function(result) {
					if(result.code == 0) {
						$scope.PropertiesList = result.data;
						defer.resolve(result);
					}
				},
				function(result) {
					defer.reject(result);
				})
		return defer.promise;
	}

	/**
	 * 弹出修改数据模态框
	 */
	$scope.openModal = function(dataId, n) {
		$scope.dataId = dataId;
		var reminder; //提示语
		if(n == 0) { //禁用
			reminder = goodsReminder.GoodsProperties.forbidden;
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
				GoodsClassifyService
					.editstatus(dataId, 0)
					.then(
						function(result) {
							$scope.loadData();
						});
			}, function(reason) {

			});
		} else if(n == 1) { //启用
			reminder = goodsReminder.GoodsProperties.enable;
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
				GoodsClassifyService
					.editstatus(dataId, 1)
					.then(
						function(result) {
							$scope.loadData();
						});
			}, function(reason) {

			});
		} else if(n == 2) { //选择属性
			//单击选中的
			$scope.selectedGoodsClick = [];
			//右边的   单击选中的
			$scope.removeGoodsClick = [];
			//右边的已经选中的
			$scope.selectedGoods = [];
			$scope.dialog = ngDialog.open({
				template: 'views/goods/GoodsClassifyFormModal.html',
				className: 'ngdialog-theme-default',
				controller: 'GoodsClassifyFormModalController',
				scope: $scope,
				width: 1220
			});
		} else if(n == 3) { //新增分组
			$scope.dialog = ngDialog.open({
				template: 'views/goods/GoodsClassifyFormModalgroup.html',
				className: 'ngdialog-theme-default',
				controller: 'GoodsClassifyFormModalgroupController',
				scope: $scope,
				width: 1220
			});
		} else { //修改  添加
			$scope.dialog = ngDialog.open({
				template: 'views/goods/GoodsClassifyFormModalAdd.html',
				className: 'ngdialog-theme-default',
				controller: 'GoodsClassifyFormModalAddController',
				scope: $scope,
				width: 1220
			});
		}
	}

	//取消
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
}

/**
 * 系统用户修改弹出页面controller定义
 */
function GoodsClassifyFormModalAddController($scope, $rootScope, GoodsClassifyService) {
	$scope.initEntity = function() {
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
			GoodsClassifyService
				.get($scope.dataId)
				.then(function(result) {
						$scope.dataEntity = result.data;
					},
					function(result) {

					});
		} else { //如果参数dataId为空，说明是新增数据，设置默认值
			$scope.dataEntity = {
				"status": 1 //状态 正常
			};
		}
	}

	$scope.okModal = function(updataPropertiesAttr, resfly) {
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") {
			GoodsClassifyService
				.edit($scope.dataEntity)
				.then(function(result) {
						$scope.loadData();
						$scope.okModalDisabled = false;
						$scope.cancelModal();
					},
					function(result) {
						$scope.okModalDisabled = false;
					});
		} else { //新增
			GoodsClassifyService
				.addclassify($scope.dataEntity)
				.then(function(result) {
						$scope.loadData();
						$scope.okModalDisabled = false;
						$scope.cancelModal();
					},
					function(result) {
						$scope.okModalDisabled = false;
					});
		}
	};

	$scope.initEntity();
}

/**
 * 系统用户  选择属性  弹出页面controller定义
 */
function GoodsClassifyFormModalController($scope, $rootScope, GoodsClassifyService) {
	$scope.removeGoodsClickid = [];
	$scope.selectedGoodsClickid = [];
	$scope.selectedGoodsid = [];
	$scope.propList = [ //属性类型：1 筛选属性、2 自定义属性
		{
			attrType: "1",
			name: "筛选属性"
		}, {
			attrType: "2",
			name: "自定义属性"
		}
	];
	//获取属性列表 proplist
	$scope.proplistfun = function() {
		if($scope.parmValue == undefined) {
			$scope.parmValue = '';
		}
		if($scope.dialogSearchSelect1 == undefined) {
			$scope.dialogSearchSelect1 = 0;
		}
		console.log('$scope.dialogSearchSelect1');
		console.log($scope.dialogSearchSelect1);
		GoodsClassifyService
			.proplist($scope.parmValue, $scope.dialogSearchSelect1)
			.then(
				function(result) {
					console.log('获取属性列表 proplist');
					console.log(result);
					$scope.brandLta = result.data;
				},
				function(result) {

				});
	};
	$scope.proplistfun();

	//左边的   选择商品的  双击  点击事件
	$scope.selected = function(res) {
		if($.inArray(res.propId, $scope.selectedGoodsid) == 0 || $.inArray(res.propId, $scope.selectedGoodsid) > 0) {
			return 0;
		}
		if($.inArray(res.propId, $scope.selectedGoodsClickid) == 0 || $.inArray(res.propId, $scope.selectedGoodsClickid) > 0) {
			$scope.selectedGoodsClickid.remove(res.propId);
		}
		var value = clone(res);

		if($scope.dialogSearchSelect == 0 || $scope.dialogSearchSelect == null || $scope.dialogSearchSelect == undefined) {
			value.group = '默认';
			value.groupId = 0;
		} else {
			for(var m = 0; m < $scope.groupList.length; m++) {
				if($scope.groupList[m].id == $scope.dialogSearchSelect) {
					value.group = $scope.groupList[m].name;
					value.groupId = $scope.groupList[m].id;
				}
			}
		}

		$scope.selectedGoods.push(value);
		for(var i = 0; i < $scope.selectedGoods.length; i++) {
			$scope.selectedGoodsid.push($scope.selectedGoods[i].propId);
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);

	};
	//左边的   选择商品的  单击  点击事件
	$scope.selected1 = function(res) {
		if($.inArray(res.propId, $scope.selectedGoodsid) == 0 || $.inArray(res.propId, $scope.selectedGoodsid) > 0) {
			return 0;
		}
		if($.inArray(res.propId, $scope.selectedGoodsClickid) < 0) {
			$scope.selectedGoodsClick.push(res);
			$scope.selectedGoodsClickid.push(res.propId);
		} else {
			$scope.selectedGoodsClick.remove(res);
			$scope.selectedGoodsClickid.remove(res.propId);
		}
	};
	//右边的  去除商品的  双击  点击事件
	$scope.remove = function(res) {
		//array.splice(start,delCount);//从start的位置开始向后删除delCount个元素
		$scope.selectedGoods.remove(res);
		$scope.selectedGoodsid = [];
		for(var i = 0; i < $scope.selectedGoods.length; i++) {
			$scope.selectedGoodsid.push($scope.selectedGoods[i].propId);
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);
		if($.inArray(res.propId, $scope.removeGoodsClickid) == 0 || $.inArray(res.propId, $scope.removeGoodsClickid) > 0) {
			$scope.removeGoodsClickid.remove(res.propId);
		}
	};
	//右边的  去除商品的  单击  点击事件
	$scope.remove1 = function(res) {
		if($.inArray(res.propId, $scope.removeGoodsClickid) < 0) {
			$scope.removeGoodsClick.push(res);
			$scope.removeGoodsClickid.push(res.propId);
		} else {
			$scope.removeGoodsClick.remove(res);
			$scope.removeGoodsClickid.remove(res.propId);
		}
	};
	//左边的 单选的全变为选中
	$scope.allChecked = function() {
		for(var i = 0; i < $scope.selectedGoodsClick.length; i++) {
			$scope.selected($scope.selectedGoodsClick[i]);
		}
		$scope.selectedGoodsClickid = [];
		$scope.selectedGoodsClick = [];
	};
	//右边的单选的全移除
	$scope.allRemove = function() {
		for(var i = 0; i < $scope.removeGoodsClick.length; i++) {
			$scope.selectedGoods.remove($scope.removeGoodsClick[i]);
		}
		$scope.selectedGoodsid = [];
		for(var i = 0; i < $scope.selectedGoods.length; i++) {
			$scope.selectedGoodsid.push($scope.selectedGoods[i].propId);
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);

		$scope.removeGoodsClickid = [];
		$scope.removeGoodsClick = [];
	};

	//获取分组数据
	$scope.initClassifyGroup = function() {
		GoodsClassifyService
			.findgroups($scope.dataId)
			.then(
				function(result) {
					console.log('获取分组数据');
					console.log(result);
					$scope.groupList = result.data;
				},
				function(result) {

				});
	};
	$scope.initClassifyGroup();
	//获取以前保存的数据
	$scope.initprop = function() {
		GoodsClassifyService
			.findprops($scope.dataId)
			.then(
				function(result) {
					console.log('获取以前保存的数据');
					console.log(result);
					for(var j = 0; j < result.data.length; j++) {
						if(result.data[j].groupName == null || result.data[j].groupName == '' || result.data[j].groupName == undefined) {
							$scope.selectedGoods.push({
								'propId': result.data[j].propId,
								'groupId': result.data[j].groupId,
								'group': '默认',
								'editName': result.data[j].editName
							});
						} else {
							$scope.selectedGoods.push({
								'propId': result.data[j].propId,
								'groupId': result.data[j].groupId,
								'group': result.data[j].groupName,
								'editName': result.data[j].editName
							});
						}

					}
					$scope.selectedChecked = clone(result.data);
					if($scope.selectedGoods == null || $scope.selectedGoods == undefined) $scope.selectedGoods = [];
					for(var i = 0; i < $scope.selectedGoods.length; i++) {
						$scope.selectedGoodsid.push($scope.selectedGoods[i].propId);
					}
				},
				function(result) {

				});
	};
	$scope.initprop();

	//保存
	$scope.okModalBrand = function() {
		if($scope.okmodaldis == true) {
			return 0;
		}
		$scope.okmodaldis = true;
		if($scope.selectedGoods.length == 0) {
			$rootScope.showAlert("您还没有选择属性！");
			$scope.okmodaldis = false;
			return 0;
		}
		var res = [];
		for(var m = 0; m < $scope.selectedGoods.length; m++) {
			res.push({
				'propId': $scope.selectedGoods[m].propId,
				'classifyId': $scope.dataId,
				'groupId': $scope.selectedGoods[m].groupId
			})
		}
		for(var n = 0; n < res.length; n++) {
			for(var i = 0; i < $scope.selectedChecked.length; i++) {
				if(res[n].classifyId == $scope.selectedChecked[i].classifyId && res[n].propId == $scope.selectedChecked[i].propId && res[n].groupId == $scope.selectedChecked[i].groupId) {
					res[n].propId = $scope.selectedChecked[i].propId;
				}
			}

		}
		console.log(res);

		GoodsClassifyService
			.addclassifyprop(res)
			.then(
				function(result) {
					$scope.okmodaldis = false;
					$scope.cancelModal();
				},
				function(result) {
					$scope.okmodaldis = false;
				});
	};
}

/**
 * 系统用户 新增分组 弹出页面controller定义
 */
function GoodsClassifyFormModalgroupController($scope, $rootScope, GoodsClassifyService) {
	$scope.updataPropertiesAttr = [];
	$scope.add_li = function() {
		$scope.updataPropertiesAttr.push({
			"name": ""
		});
	};

	//获取分组数据
	$scope.initGroup = function() {
		GoodsClassifyService
			.findgroups($scope.dataId)
			.then(
				function(result) {
					console.log('获取分组数据');
					console.log(result);
					$scope.updataPropertiesAttr = result.data;
					if($scope.updataPropertiesAttr.length == 0) {
						$scope.add_li();
					}
				},
				function(result) {

				});
	};

	$scope.okModalGroup = function(res) {
		console.log(res)
		if($scope.okmodaldis == true) {
			return 0;
		}
		$scope.okmodaldis = true;
		for(var i = 0; i < res.length; i++) {
			res[i].classifyId = $scope.dataId;
		}
		GoodsClassifyService
			.editgroup(res,$scope.dataId)
			.then(
				function(result) {
					$scope.okmodaldis = false;
					$scope.cancelModal();
				},
				function(result) {
					$scope.okmodaldis = false;
				});
	}

	//初始化	
	$scope.initGroup();
}

angular
	.module('managerApp')
	.controller('GoodsClassifyController', GoodsClassifyController)
	.controller('GoodsClassifyFormModalAddController', GoodsClassifyFormModalAddController)
	.controller('GoodsClassifyFormModalgroupController', GoodsClassifyFormModalgroupController)
	.controller('GoodsClassifyFormModalController', GoodsClassifyFormModalController)