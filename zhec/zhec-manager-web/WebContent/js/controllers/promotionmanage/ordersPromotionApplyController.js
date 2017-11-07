/**
 * 系统用户controller定义
 */
function ordersPromotionApplyController($scope, $q, constPageSize, ordersPromotionApplyService, ngDialog, promotionReminder) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.parmValue = ""; //搜索关键词 按会员姓名检索
	$scope.WdatePicker = {}; //WdatePicker时间   获取开始和结束时间
	$scope.okmodaldis = false; //保存按钮的disabled

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var parmValue = $scope.parmValue;
		if(undefined == $scope.WdatePicker.startTime) {
			$scope.WdatePicker.startTime = "";
		}
		if(undefined == $scope.WdatePicker.endTime) {
			$scope.WdatePicker.endTime = "";
		}
		var minTime = $scope.WdatePicker.startTime; //下单开始时间检索
		var maxTime = $scope.WdatePicker.endTime; //下单结束时间检索

		//列表
		ordersPromotionApplyService.find(parmValue, minTime, maxTime, currentPaseSize, currentPageNo).then(
			function(result) {
				$scope.ordersAllList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}

	/**
	 * 弹出模态框
	 */
	$scope.openModal = function(n, res) {
		$scope.ngif = n;
		if(res != undefined) {
			$scope.dataId = res.id;
			$scope.res = res;
		} else {
			$scope.dataId = undefined;
		}
		if(n == 1) { //添加   修改  基本信息
			$scope.dialog = ngDialog.open({
				template: 'views/promotionmanage/ordersPromotionApplyAddModal.html',
				className: 'ngdialog-theme-default',
				controller: 'ordersPromotionApplyAddModalController',
				scope: $scope,
				width: 960
			});
		}
		if(n == 2) { //选择商品
			//单击选中的
			$scope.selectedGoodsClick = [];
			//右边的   单击选中的
			$scope.removeGoodsClick = [];
			//右边的已经选中的
			$scope.selectedGoods = [];
			//搜索条件
			$scope.dialogSearch = {
				'cateId': '',
				'brandName': '',
				'goodsInfoName': ''
			};
			$scope.dialog = ngDialog.open({
				template: 'views/promotionmanage/ordersPromotionApplySelectGoodsModal.html',
				className: 'ngdialog-theme-default',
				controller: 'ordersPromotionApplySelectGoodsModalController',
				scope: $scope,
				width: 1160
			});
		}
		if(n == 3) { //选择分类
			//单击选中的
			$scope.selectedGoodsClick = [];
			//右边的   单击选中的
			$scope.removeGoodsClick = [];
			//右边的已经选中的
			$scope.selectedGoods = [];
			$scope.dialog = ngDialog.open({
				template: 'views/promotionmanage/ordersPromotionApplyClassifyModal.html',
				className: 'ngdialog-theme-default',
				controller: 'ordersPromotionApplyClassifyModalController',
				scope: $scope,
				width: 1160
			});
		}
		if(n == 4) { //选择品牌
			//单击选中的
			$scope.selectedGoodsClick = [];
			//右边的   单击选中的
			$scope.removeGoodsClick = [];
			//右边的已经选中的
			$scope.selectedGoods = [];
			$scope.dialog = ngDialog.open({
				template: 'views/promotionmanage/ordersPromotionApplyBrandModal.html',
				className: 'ngdialog-theme-default',
				controller: 'ordersPromotionApplyBrandModalController',
				scope: $scope,
				width: 1160
			});
		}
		if(n == 5) { //提交审核
			var reminder; //提示语
			reminder = promotionReminder.goodspromotion;
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
				ordersPromotionApplyService.commit(res.id).then(
					function(result) {
						$scope.loadData();
					});
			}, function(reason) {
			});
		}
		if(n == 7) { // 全站  添加商品
			var reminder; //提示语
			reminder = promotionReminder.addAllGoods;
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
				ordersPromotionApplyService
					.addproducts(res)
					.then(
						function(result) {
							$scope.loadData(true);
						});
			}, function(reason) {
			});
		}
	}

	/*
	 * 关闭弹窗
	 */
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};

	/**
	 * 分类信息 一级显示
	 */
	$scope.queryBrand = function() {
		var brandName = '';
		$scope.brandList = [];
		ordersPromotionApplyService
		//.findCate(1)
			.findIdCate(0)
			.then(
				function(result) {
					$scope.brandList = result.data;
				});
	}
	$scope.queryBrand();

	$scope.selectOne = function(id, m) {
		if(id == null) {
			return 0;
		}
		ordersPromotionApplyService
			.findIdCate(id)
			.then(
				function(result) {
					$scope.brandLt = [];
					//$scope.brandLta = [];
					$scope.brandLt = result.data;
					if(result.data.length == 0) { //没有子类
						//$scope.temporary = id;
					}
					if(m == 14) {
						$scope.selectTwo(14);
					}
				});
		for(var i = 0; i < $scope.brandList.length; i++) {
			if($scope.brandList[i].id == id) {
				$scope.selectedname1 = $scope.brandList[i].name;
			}
		}
	}

	$scope.selectedname1 = "";
	$scope.selectedname2 = "";

	$scope.selectTwo = function(id) {
		if(id == null) {
			return 0;
		}
		ordersPromotionApplyService
			.findIdCate(id)
			.then(
				function(result) {
					$scope.brandLta = [];
					$scope.brandLta = result.data;
				});
		for(var i = 0; i < $scope.brandLt.length; i++) {
			if($scope.brandLt[i].id == id) {
				$scope.selectedname2 = $scope.brandLt[i].name;
			}
		}
	};
	$scope.selectThird = function(id) {
		$scope.dialogSearch.cateId = id;
		$scope.loadDataDialog(true);
	};
}

/**
 * 弹出  添加   修改  基本信息 页面的controller定义
 */
function ordersPromotionApplyAddModalController($scope, ordersPromotionApplyService, $rootScope) {
	//addData    使用平台    1web  2wap   参与商品选择类型  1 按个别商品  2 按分类  3 按品牌 4 全站
	$scope.goodsBrandIdList = [{
		id: 1,
		name: '按个别商品'
	}, {
		id: 2,
		name: '按分类'
	}, {
		id: 3,
		name: '按品牌'
	}, {
		id: 4,
		name: '全站'
	}, ];

	//回显
	$scope.initEntity = function() {
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
			ordersPromotionApplyService
				.auditdetail($scope.dataId)
				.then(
					function(result) {
						$scope.addData = result.data;
						$scope.checkbox1 = false;
						$scope.checkbox2 = false;
						$scope.checkbox3 = false;

						if($scope.addData.applicablePlatform.split(',').contains(1)) {
							$scope.checkbox1 = true;
						} else {
							$scope.checkbox1 = false;
						}
						if($scope.addData.applicablePlatform.split(',').contains(2)) {
							$scope.checkbox2 = true;
						} else {
							$scope.checkbox2 = false;
						}
						if($scope.addData.applicablePlatform.split(',').contains(3)) {
							$scope.checkbox3 = true;
						} else {
							$scope.checkbox3 = false;
						}
					});
		} else {
			$scope.addData = {};
			$scope.addData.goodsSelectType = 1;
			$scope.checkbox1 = false;
			$scope.checkbox2 = false;
			$scope.checkbox3 = false;
			$scope.addData.applicablePlatform = '1';
			$scope.checkbox1 = true;
		}
	};
	$scope.initEntity();

	//选择使用平台
	$scope.check = function() {
		$scope.addData.applicablePlatform = "";
		if($scope.checkbox1) {
			if($scope.addData.applicablePlatform == "") {
				$scope.addData.applicablePlatform += 1;
			} else {
				$scope.addData.applicablePlatform = 1 + "," + $scope.addData.applicablePlatform;
			}
		}
		if($scope.checkbox2) {
			if($scope.addData.applicablePlatform == "") {
				$scope.addData.applicablePlatform += 2;
			} else {
				$scope.addData.applicablePlatform = 2 + "," + $scope.addData.applicablePlatform;
			}
		}
		if($scope.checkbox3) {
			if($scope.addData.applicablePlatform == "") {
				$scope.addData.applicablePlatform += 3;
			} else {
				$scope.addData.applicablePlatform = $scope.addData.applicablePlatform + "," + 3;
			}
		}
	};

	$scope.okModal = function() {
		if($scope.okmodaldis == true) {
			return 0;
		}
		$scope.okmodaldis = true;
		
		if($scope.addData.threshold<=$scope.addData.quota) {//使用门槛必须大于优惠额度
			$rootScope.showAlert("优惠额度必须小于使用门槛！");
			$scope.okmodaldis = false;
			return 0;
		}
		
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
			if(undefined == $scope.WdatePicker.startTimes) {
				$scope.WdatePicker.startTimes = "";
			}
			if($scope.WdatePicker.startTimes != "") {
				$scope.addData.startTime = $scope.WdatePicker.startTimes;
			}
			if(undefined == $scope.WdatePicker.endTimes) {
				$scope.WdatePicker.endTimes = "";
			}
			if($scope.WdatePicker.endTimes != "") {
				$scope.addData.endTime = $scope.WdatePicker.endTimes;
			}
			if($scope.addData.startTime == "") {
				$rootScope.showAlert("您还没有选择促销开始时间！");
				$scope.okmodaldis = false;
				return 0;
			}
			if($scope.addData.endTime == "") {
				$rootScope.showAlert("您还没有选择促销结束时间！");
				$scope.okmodaldis = false;
				return 0;
			}
			ordersPromotionApplyService
				.edit($scope.addData)
				.then(
					function(result) {
						$scope.okmodaldis = false;
						$scope.loadData(true);
						$scope.cancelModal();
					},
					function(result) {
						$scope.okmodaldis = false;
					});
		} else {
			if(undefined == $scope.WdatePicker.startTimes) {
				$scope.WdatePicker.startTimes = "";
			}
			if(undefined == $scope.WdatePicker.endTimes) {
				$scope.WdatePicker.endTimes = "";
			}
			$scope.addData.startTime = $scope.WdatePicker.startTimes;
			$scope.addData.endTime = $scope.WdatePicker.endTimes;
			if($scope.addData.startTime == "") {
				$rootScope.showAlert("您还没有选择促销开始时间！");
				$scope.okmodaldis = false;
				return 0;
			}
			if($scope.addData.endTime == "") {
				$rootScope.showAlert("您还没有选择促销结束时间！");
				$scope.okmodaldis = false;
				return 0;
			}
			ordersPromotionApplyService
				.add($scope.addData)
				.then(
					function(result) {
						$scope.okmodaldis = false;
						$scope.loadData(true);
						$scope.cancelModal();
					},
					function(result) {
						$scope.okmodaldis = false;
					});
		}

	};
}

/**
 * 弹出  选择商品 页面的controller定义
 */
function ordersPromotionApplySelectGoodsModalController($scope, $q, ordersPromotionApplyService, $rootScope, constPageSize) {
	//弹窗 分页
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		ordersPromotionApplyService
			.onsalelist($scope.dialogSearch.cateId, $scope.dialogSearch.brandName, $scope.dialogSearch.goodsInfoName, currentPaseSize, currentPageNo)
			.then(
				function(result) {
					$scope.infoauditList = result.data;
					/*if(result.data.length == 0) {
						$scope.dialog.close();
					}*/
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	};
	$scope.removeGoodsClickid = [];
	$scope.selectedGoodsClickid = [];
	$scope.selectedGoodsid = [];
	//左边的   选择商品的  双击  点击事件
	$scope.selected = function(res) {
		if($.inArray(res.id, $scope.selectedGoodsid) == 0 || $.inArray(res.id, $scope.selectedGoodsid) > 0) {
			return 0;
		}
		if($.inArray(res.id, $scope.selectedGoodsClickid) == 0 || $.inArray(res.id, $scope.selectedGoodsClickid) > 0) {
			$scope.selectedGoodsClickid.remove(res.id);
		}
		$scope.selectedGoods.push(res);
		for(var i = 0; i < $scope.selectedGoods.length; i++) {
			$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);
	};
	//左边的   选择商品的  单击  点击事件
	$scope.selected1 = function(res) {
		if($.inArray(res.id, $scope.selectedGoodsid) == 0 || $.inArray(res.id, $scope.selectedGoodsid) > 0) {
			return 0;
		}
		if($.inArray(res.id, $scope.selectedGoodsClickid) < 0) {
			$scope.selectedGoodsClick.push(res);
			$scope.selectedGoodsClickid.push(res.id);
		} else {
			$scope.selectedGoodsClick.remove(res);
			$scope.selectedGoodsClickid.remove(res.id);
		}
	};
	//右边的  去除商品的  双击  点击事件
	$scope.remove = function(res) {
		//array.splice(start,delCount);//从start的位置开始向后删除delCount个元素
		$scope.selectedGoods.remove(res);
		$scope.selectedGoodsid = [];
		for(var i = 0; i < $scope.selectedGoods.length; i++) {
			$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);
		if($.inArray(res.id, $scope.removeGoodsClickid) == 0 || $.inArray(res.id, $scope.removeGoodsClickid) > 0) {
			$scope.removeGoodsClickid.remove(res.id);
		}
	};
	//右边的  去除商品的  单击  点击事件
	$scope.remove1 = function(res) {
		if($.inArray(res.id, $scope.removeGoodsClickid) < 0) {
			$scope.removeGoodsClick.push(res);
			$scope.removeGoodsClickid.push(res.id);
		} else {
			$scope.removeGoodsClick.remove(res);
			$scope.removeGoodsClickid.remove(res.id);
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
			$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);

		$scope.removeGoodsClickid = [];
		$scope.removeGoodsClick = [];
	};

	//回显数据
	$scope.innit = function() {
		ordersPromotionApplyService
			.auditdetail($scope.dataId)
			.then(
				function(result) {
					$scope.selectedGoods = result.data.promotionGoodsList;
					if($scope.selectedGoods == null || $scope.selectedGoods == undefined) $scope.selectedGoods = [];
					for(var i = 0; i < $scope.selectedGoods.length; i++) {
						$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
					}
				});
	};
	$scope.innit();
	//保存选择的商品
	$scope.selectGoodsOkModal = function() {
		if($scope.okmodaldis == true) {
			return 0;
		}
		$scope.okmodaldis = true;
		var attr = [];
		for(var i = 0; i < $scope.selectedGoods.length; i++) {
			attr.push($scope.selectedGoods[i].id);
		}
		if(attr.length == 0) {
			$rootScope.showAlert("您还没有选择商品！");
			return 0;
		}
		var res = $scope.res;
		res.promotionGoodsList = [];
		for(var m = 0; m < attr.length; m++) {
			res.promotionGoodsList.push({
				'id': attr[m]
			})
		}
		ordersPromotionApplyService
			.addproducts(res)
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
 * 弹出  选择分类 页面的controller定义
 */
function ordersPromotionApplyClassifyModalController($scope, ordersPromotionApplyService, $rootScope) {

	$scope.removeGoodsClickid = [];
	$scope.selectedGoodsClickid = [];
	$scope.selectedGoodsid = [];
	//左边的   选择商品的  双击  点击事件
	$scope.selected = function(res) {
		if($.inArray(res.id, $scope.selectedGoodsid) == 0 || $.inArray(res.id, $scope.selectedGoodsid) > 0) {
			return 0;
		}
		if($.inArray(res.id, $scope.selectedGoodsClickid) == 0 || $.inArray(res.id, $scope.selectedGoodsClickid) > 0) {
			$scope.selectedGoodsClickid.remove(res.id);
		}
		var value = clone(res);
		value.name = $scope.selectedname1 + ">" + $scope.selectedname2 + ">" + res.name;
		$scope.selectedGoods.push(value);
		for(var i = 0; i < $scope.selectedGoods.length; i++) {
			$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);
	};
	//左边的   选择商品的  单击  点击事件
	$scope.selected1 = function(res) {
		if($.inArray(res.id, $scope.selectedGoodsid) == 0 || $.inArray(res.id, $scope.selectedGoodsid) > 0) {
			return 0;
		}
		if($.inArray(res.id, $scope.selectedGoodsClickid) < 0) {
			$scope.selectedGoodsClick.push(res);
			$scope.selectedGoodsClickid.push(res.id);
		} else {
			$scope.selectedGoodsClick.remove(res);
			$scope.selectedGoodsClickid.remove(res.id);
		}
	};
	//右边的  去除商品的  双击  点击事件
	$scope.remove = function(res) {
		//array.splice(start,delCount);//从start的位置开始向后删除delCount个元素
		$scope.selectedGoods.remove(res);
		$scope.selectedGoodsid = [];
		for(var i = 0; i < $scope.selectedGoods.length; i++) {
			$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);
		if($.inArray(res.id, $scope.removeGoodsClickid) == 0 || $.inArray(res.id, $scope.removeGoodsClickid) > 0) {
			$scope.removeGoodsClickid.remove(res.id);
		}
	};
	//右边的  去除商品的  单击  点击事件
	$scope.remove1 = function(res) {
		if($.inArray(res.id, $scope.removeGoodsClickid) < 0) {
			$scope.removeGoodsClick.push(res);
			$scope.removeGoodsClickid.push(res.id);
		} else {
			$scope.removeGoodsClick.remove(res);
			$scope.removeGoodsClickid.remove(res.id);
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
			$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);

		$scope.removeGoodsClickid = [];
		$scope.removeGoodsClick = [];
	};

	//回显
	$scope.initcate = function() {
		ordersPromotionApplyService
			.auditdetail($scope.dataId)
			.then(
				function(result) {
					$scope.selectedGoods = result.data.promotionCateList;
					if($scope.selectedGoods == null || $scope.selectedGoods == undefined) $scope.selectedGoods = [];
					for(var i = 0; i < $scope.selectedGoods.length; i++) {
						$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
					}
					/**
					 * 默认回显的下拉框、左边的列表  默认一级选中ID=1  二级选中ID=14
					 */
					$scope.selectOne(1, 14);
					$scope.dialogSearch = {};
					$scope.dialogSearch.cateId1 = 1;
					$scope.dialogSearch.cateId2 = 14;
				});
	}
	$scope.initcate();

	//保存
	$scope.okModalBrand = function() {
		if($scope.okmodaldis == true) {
			return 0;
		}
		$scope.okmodaldis = true;
		var attr = [];
		for(var i = 0; i < $scope.selectedGoods.length; i++) {
			attr.push($scope.selectedGoods[i].id);
		}
		if(attr.length == 0) {
			$rootScope.showAlert("您还没有选择分类！");
			return 0;
		}
		var res = $scope.res;
		res.promotionCateList = [];
		for(var m = 0; m < attr.length; m++) {
			res.promotionCateList.push({
				'id': attr[m]
			})
		}
		ordersPromotionApplyService
			.addproducts(res)
			.then(
				function(result) {
					$scope.okmodaldis = false;
					if(result.code == 0 && result.data != null) {
						$rootScope.showAlert("“" + result.data + "”分类下无商品！");
						return 0;
					}
					$scope.cancelModal();
				},
				function(result) {
					$scope.okmodaldis = false;
				});
	};
}

/**
 * 弹出  选择品牌 页面的controller定义
 */
function ordersPromotionApplyBrandModalController($scope, ordersPromotionApplyService, $rootScope) {
	$scope.brandName = "";
	$scope.gainBrandList = function() {
		ordersPromotionApplyService
			.findgoodsbrands($scope.brandName)
			.then(
				function(result) {
					$scope.brandNameList = result.data;
				});
	};

	$scope.removeGoodsClickid = [];
	$scope.selectedGoodsClickid = [];
	$scope.selectedGoodsid = [];
	//左边的   选择商品的  双击  点击事件
	$scope.selected = function(res) {
		if($.inArray(res.id, $scope.selectedGoodsid) == 0 || $.inArray(res.id, $scope.selectedGoodsid) > 0) {
			return 0;
		}
		if($.inArray(res.id, $scope.selectedGoodsClickid) == 0 || $.inArray(res.id, $scope.selectedGoodsClickid) > 0) {
			$scope.selectedGoodsClickid.remove(res.id);
		}
		$scope.selectedGoods.push(res);
		for(var i = 0; i < $scope.selectedGoods.length; i++) {
			$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);
	};
	//左边的   选择商品的  单击  点击事件
	$scope.selected1 = function(res) {
		if($.inArray(res.id, $scope.selectedGoodsid) == 0 || $.inArray(res.id, $scope.selectedGoodsid) > 0) {
			return 0;
		}
		if($.inArray(res.id, $scope.selectedGoodsClickid) < 0) {
			$scope.selectedGoodsClick.push(res);
			$scope.selectedGoodsClickid.push(res.id);
		} else {
			$scope.selectedGoodsClick.remove(res);
			$scope.selectedGoodsClickid.remove(res.id);
		}
	};
	//右边的  去除商品的  双击  点击事件
	$scope.remove = function(res) {
		//array.splice(start,delCount);//从start的位置开始向后删除delCount个元素
		$scope.selectedGoods.remove(res);
		$scope.selectedGoodsid = [];
		for(var i = 0; i < $scope.selectedGoods.length; i++) {
			$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);
		if($.inArray(res.id, $scope.removeGoodsClickid) == 0 || $.inArray(res.id, $scope.removeGoodsClickid) > 0) {
			$scope.removeGoodsClickid.remove(res.id);
		}
	};
	//右边的  去除商品的  单击  点击事件
	$scope.remove1 = function(res) {
		if($.inArray(res.id, $scope.removeGoodsClickid) < 0) {
			$scope.removeGoodsClick.push(res);
			$scope.removeGoodsClickid.push(res.id);
		} else {
			$scope.removeGoodsClick.remove(res);
			$scope.removeGoodsClickid.remove(res.id);
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
			$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);

		$scope.removeGoodsClickid = [];
		$scope.removeGoodsClick = [];
	};

	//初始化获取品牌列表
	$scope.gainBrandList();

	//回显数据
	$scope.innitBrand = function() {
		ordersPromotionApplyService
			.auditdetail($scope.dataId)
			.then(
				function(result) {
					$scope.selectedGoods = result.data.promotionBrandsList;
					if($scope.selectedGoods == null || $scope.selectedGoods == undefined) $scope.selectedGoods = [];
					for(var i = 0; i < $scope.selectedGoods.length; i++) {
						$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
					}
				});
	};
	$scope.innitBrand();

	//保存选择的品牌
	$scope.okModalBrand = function() {
		if($scope.okmodaldis == true) {
			return 0;
		}
		$scope.okmodaldis = true;
		var attr = [];
		for(var i = 0; i < $scope.selectedGoods.length; i++) {
			attr.push($scope.selectedGoods[i].id);
		}
		if(attr.length == 0) {
			$rootScope.showAlert("您还没有选择商品！");
			return 0;
		}
		var res = $scope.res;
		res.promotionBrandsList = [];
		for(var m = 0; m < attr.length; m++) {
			res.promotionBrandsList.push({
				'id': attr[m]
			})
		}
		ordersPromotionApplyService
			.addproducts(res)
			.then(
				function(result) {
					$scope.okmodaldis = false;
					if(result.code == 0 && result.data != null) {
						$rootScope.showAlert("“" + result.data + "”品牌下无商品！");
						return 0;
					}
					$scope.cancelModal();
				},
				function(result) {
					$scope.okmodaldis = false;
				});
	};
}

angular
	.module('managerApp')
	.controller('ordersPromotionApplyController', ordersPromotionApplyController)
	.controller('ordersPromotionApplyAddModalController', ordersPromotionApplyAddModalController)
	.controller('ordersPromotionApplySelectGoodsModalController', ordersPromotionApplySelectGoodsModalController)
	.controller('ordersPromotionApplyClassifyModalController', ordersPromotionApplyClassifyModalController)
	.controller('ordersPromotionApplyBrandModalController', ordersPromotionApplyBrandModalController)