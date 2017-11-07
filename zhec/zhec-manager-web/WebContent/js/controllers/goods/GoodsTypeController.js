/**
 * 系统用户controller定义
 */

function GoodsTypeController($rootScope, constPageSize, $scope, $http, $q, GoodsTypeService, ngDialog) {
	//定义变量
	$scope.dataId = ""; //当前操作的数据id
	$scope.typeNameSearch = ""; //搜索关键词
	$scope.okModalDisabled = false; //保存按钮的disabled

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var typeName = $scope.typeNameSearch;
		GoodsTypeService.find(typeName, currentPaseSize, currentPageNo).then(
			function(result) {
				$scope.typeList = result.data;
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
			template: 'views/goods/GoodsTypeModal.html',
			className: 'ngdialog-theme-default',
			controller: 'GoodsTypeFormModalController',
			scope: $scope,
			width: 1220
		});

	};

}

/**
 * 类型管理弹出页面controller定义
 */
function GoodsTypeFormModalController($scope, $q, GoodsTypeService,$rootScope) {
	$scope.tabadd = true; //标签的隐藏
	$scope.attrIds = [];
	$scope.brandIds = []; //品牌
	$scope.specIds = []; //规格

	$scope.initEntity = function(n) {
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
			$scope.grab(); //关联品牌     关联规格   内容的显示
			$scope.tabadd = false; //标签的显示
			GoodsTypeService
				.findone($scope.dataId)
				.then(
					function(result) {
						$scope.attrIds = result.data.attrIds;
						$scope.brandIds = result.data.brandIds;
						$scope.specIds = result.data.specIds;
						//修改用户时显示用户详情
						$scope.repeat = []; //修改时用于循环展示的规格属性名称和排序号
						$scope.updataTypeAttr = []; //更新时的TypeAttr
						$scope.updateType = result.data.goodsType;
						$scope.dataEntity = result.data.goodsType; //添加时获取填写用户的基本信息
						if(result.data.goodsType != null) {
							$scope.repeat = result.data.goodsType.goodsTypeAttrs;
							//////表格信息-------------------------------------------------
							//自定义属性和过滤属性的赋值
							$scope.goodsTypeAttrs1 = []; //过滤属性 res.type=1新增时
							$scope.goodsTypeAttrs2 = []; //自定义属性 res.type=2新增时

							$scope.saveGoodsTypeAttrs1 = []; //过滤属性 res.type=1新增时   保存记录
							$scope.saveGoodsTypeAttrs2 = []; //自定义属性 res.type=2新增时   保存记录

							if(result.data.goodsType.goodsTypeAttrs != null ? result.data.goodsType.goodsTypeAttrs.length > 0 : false) {
								for(var a = 0; a < result.data.goodsType.goodsTypeAttrs.length; a++) {
									if(result.data.goodsType.goodsTypeAttrs[a].type == 1) {
										$scope.goodsTypeAttrs1.push(result.data.goodsType.goodsTypeAttrs[a]); // 添加到数组最后；a.unshift();-->添加到第一个位置
										$scope.saveGoodsTypeAttrs1.push(result.data.goodsType.goodsTypeAttrs[a]);
									} else if(result.data.goodsType.goodsTypeAttrs[a].type == 2) {
										$scope.goodsTypeAttrs2.push(result.data.goodsType.goodsTypeAttrs[a]); // 添加到数组最后
										$scope.saveGoodsTypeAttrs2.push(result.data.goodsType.goodsTypeAttrs[a]); // 添加到数组最后
									} else {

									}
								}
							}
							//add关联规格 goodsSpecIds

							$scope.selected = [];
							var lis = [];
							$scope.selectedTags = []; //name集合
							if(result.data.goodsType.goodsSpecIds != null) {
								if(result.data.goodsType.goodsSpecIds.indexOf(",") != -1) {
									lis = result.data.goodsType.goodsSpecIds.split(","); //id集合       字符串转换成数组
								} else {
									lis.push(result.data.goodsType.goodsSpecIds);
								}
								if(lis[0] == "") {
									$scope.selected = [];
								} else {
									for(var b = 0; b < lis.length; b++) {
										$scope.selected.push(parseInt(lis[b])); //字符串转换成数字
									}
								}

							}
							//add关联品牌 goodsBrandIds
							$scope.selected2 = [];
							var lis2 = [];
							if(result.data.goodsType.goodsBrandIds != null) {
								if(result.data.goodsType.goodsBrandIds.indexOf(",") != -1) {
									lis2 = result.data.goodsType.goodsBrandIds.split(","); //id集合       字符串转换成数组
								} else {
									lis2.push(result.data.goodsType.goodsBrandIds);
								}
								if(lis2[0] == "") {
									$scope.selected2 = [];
								} else {
									for(var b = 0; b < lis2.length; b++) {
										$scope.selected2.push(parseInt(lis2[b])); //字符串转换成数字
									}
								}

							}
						}
						//初始化
						if(n == 4) {
							$scope.onClickTab('filterType.html'); //过滤属性页面
						} else if(n == 5) {
							$scope.onClickTab('customType.html'); //自定义属性
						} else if(n == 2) {
							$scope.onClickTab('goodsSpecIds.html'); //关联规格
						} else if(n == 3) {
							$scope.onClickTab('goodsBrandIds.html'); //关联品牌
						} else {
							$scope.onClickTab('basicInformation.html'); //基本信息页面
						}
					},
					function(result) {
						//alert("该用户不存在");
					}
				)
		} else { //如果参数dataId为空，说明是新增数据，设置默认值,隐藏除了基本信息外的标签
			//$scope.dataEntity = {"scope":1,"status":1};
			$scope.tabadd = true;
		}
	}

	//"获取品牌的ID以及名称列表" and  “获取规格id和名称列表”
	$scope.grab = function() {
		//清空添加的表格信息
		$scope.dataEntity = {}; //添加时获取填写用户的基本信息
		$scope.goodsTypeAttrs1 = []; //过滤属性 res.type=1新增时
		$scope.goodsTypeAttrs2 = []; //自定义属性 res.type=2新增时
		//add关联规格
		$scope.selected = []; //id集合
		$scope.selectedTags = []; //name集合
		//add关联品牌
		$scope.selected2 = []; //id集合
		//初始化
		$scope.onClickTab('basicInformation.html'); //基本信息页面

		//获取品牌的ID以及名称列表
		var defer = $q.defer();
		GoodsTypeService
			.findGoodsbrands()
			.then(
				function(result) {
					//获取品牌的ID以及名称列表;
					$scope.GoodsbrandsArray = result.data;
				},
				function(result) {
					//alert("服务器忙");
				}
			);
		//获取规格id和名称列表
		GoodsTypeService
			.findSpecifications()
			.then(
				function(result) {
					//获取规格id和名称列表;
					$scope.SpecificationsArray = result.data;
				},
				function(result) {
					//alert("服务器忙");
				}
			);
	};

	/**
	 * 在model增加一行 规格值 排序号
	 */
	$scope.add_li = function(n) {
		if(n == 1) {
			//在过滤属性标签页  增加一行 属性名称、排序号、属性值;
			$scope.goodsTypeAttrs1.push({
				"name": "",
				"sort": "",
				"value": ""
			});
		} else {
			//在自定义属性标签页  增加一行 属性名称、排序号;
			$scope.goodsTypeAttrs2.push({
				"name": "",
				"sort": ""
			});
		}
	};

	/**
	 * 点击radio时更改保存的值
	 */
	$scope.checkedRadioUpdata = function(n) {
			$scope.updateSpec.state = n;
		}
		/**
		 *   获取选中的规格ID
		 */
	$scope.updateSelected = function(action, id, name) {
		var ids = "" + id;
		if($scope.specIds.indexOf(ids) < 0) {
			if(action == 'add' && $scope.selected.indexOf(id) == -1) {
				$scope.selected.push(id);
				$scope.selectedTags.push(name);
				$scope.dataEntity.goodsSpecIds = $scope.selected.join(",");
			}
			if(action == 'remove' && $scope.selected.indexOf(id) != -1) {
				var idx = $scope.selected.indexOf(id);
				$scope.selected.splice(idx, 1);
				$scope.selectedTags.splice(idx, 1);
				$scope.dataEntity.goodsSpecIds = $scope.selected.join(",");
			}
		}
	}
	$scope.updateSelection = function($event, id, name) {
		var checkbox = $event.target;
		var action = (checkbox.checked ? 'add' : 'remove');
		if('add' == action) {
			if($scope.selected.length > 0) {
				$rootScope.showAlert("规格只能选择一个！");
			} else {
				$scope.updateSelected(action, id, name);
			}
		} else {
			$scope.updateSelected(action, id, name);
		}

	}
	$scope.isSelected = function(id) {
		return $scope.selected.indexOf(id) >= 0;
	}

	/**
	 *  获取选中的品牌ID
	 */
	$scope.updateSelected2 = function(action, id, name) {
		var ids = "" + id;
		if($scope.brandIds.indexOf(ids) < 0) {
			if(action == 'add' && $scope.selected2.indexOf(id) == -1) {
				$scope.selected2.push(id);
				$scope.dataEntity.goodsBrandIds = $scope.selected2.join(","); //字符串转换成数组
			}
			if(action == 'remove' && $scope.selected2.indexOf(id) != -1) {
				var idx = $scope.selected2.indexOf(id);
				$scope.selected2.splice(idx, 1);
				$scope.dataEntity.goodsBrandIds = $scope.selected2.join(","); //字符串转换成数组
			}
		}
	}
	$scope.updateSelection2 = function($event, id, name) {
		var checkbox = $event.target;
		var action = (checkbox.checked ? 'add' : 'remove');
		$scope.updateSelected2(action, id, name);
	}
	$scope.isSelected2 = function(id) {
		return $scope.selected2.indexOf(id) >= 0;
	}

	//过滤属性是否可以删除
	$scope.isDel1 = function(id) {
		if(undefined == id) {
			return true;
		}
		return $scope.saveGoodsTypeAttrs1.indexOf(id) >= 0;
	}

	//自定义属性是否可以删除
	$scope.isDel2 = function(id) {
		if(undefined == id) {
			return true;
		}
		return $scope.saveGoodsTypeAttrs2.indexOf(id) >= 0;
	}

	/**
	 * 保存
	 */
	$scope.okModal = function(res, n) {
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		for(var i = 0; i < $scope.goodsTypeAttrs1.length; i++) { //过滤属性
			$scope.goodsTypeAttrs1[i].type = 1;
		}
		for(var j = 0; j < $scope.goodsTypeAttrs2.length; j++) { //自定义属性
			$scope.goodsTypeAttrs2[j].type = 2;
		}
		res.goodsTypeAttrs = $scope.goodsTypeAttrs1.concat($scope.goodsTypeAttrs2);
		if(undefined == res.id) {
			GoodsTypeService
				.add(res)
				.then(
					function(result) {
						//alert("添加保存成功！");
						$scope.okModalDisabled = false;
						$scope.loadData();
						$scope.dialog.close();
					},
				function(result) {
					$scope.okModalDisabled = false;
				}
				)
		} else {
			//res.goodsSpecIds=res.goodsSpecIds+',';
			for(var m = 0; m < res.goodsTypeAttrs.length; m++) {
				if(res.goodsTypeAttrs[m].type == 1) {
					if(res.goodsTypeAttrs[m].value2 != undefined && res.goodsTypeAttrs[m].value2 != null && res.goodsTypeAttrs[m].value2 != '') {
						res.goodsTypeAttrs[m].value += ',' + res.goodsTypeAttrs[m].value2;
						delete res.goodsTypeAttrs[m].value2;
					}
				}
			}
			//return 0;
			GoodsTypeService
				.saveUpdate(res)
				.then(
					function(result) {
						$scope.okModalDisabled = false;
						$scope.initEntity(n);
						$scope.loadData();
					},
				function(result) {
					$scope.okModalDisabled = false;
				}
				)
		}
	};

	/**
	 * 标签页click事件
	 */
	$scope.onClickTab = function(url) {
		$scope.currentTab = url;
	}

	$scope.cancelModal = function() {
		$scope.loadData();
		$scope.dialog.close();
	};

	//初始化
	$scope.initEntity();
	$scope.grab();

}

angular
	.module('managerApp')
	.controller('GoodsTypeController', GoodsTypeController)
	.controller('GoodsTypeFormModalController', GoodsTypeFormModalController)