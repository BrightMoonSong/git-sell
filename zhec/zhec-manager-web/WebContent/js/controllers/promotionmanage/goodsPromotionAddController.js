/**
 * 系统用户controller定义
 */
function goodsPromotionAddController($scope, $q, constPageSize, goodsPromotionAddService, ngDialog, promotionReminder) {
	$scope.res = ""; //当前操作的数据
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
		var minTime = $scope.WdatePicker.startTime;
		var maxTime = $scope.WdatePicker.endTime;
		//暂时不用时间搜索        用的话注意和添加修改的时间相冲突
		minTime = '';
		maxTime = '';
		//列表
		goodsPromotionAddService.find(parmValue, minTime, maxTime, currentPaseSize, currentPageNo).then(
			function(result) {
				$scope.addAllList = result.data;
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
			$scope.n = n;
			$scope.res = res; //选中的促销类
			if(n == 1) { //选择商品
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
					template: 'views/promotionmanage/selectGoodsModal.html',
					className: 'ngdialog-theme-default',
					controller: 'goodsSelectGoodsAddModalController',
					scope: $scope,
					width: 1160
				});
			}
			if(n == 2) { //添加促销价格
				$scope.dialog = ngDialog.open({
					template: 'views/promotionmanage/addPromotionalPriceModal.html',
					className: 'ngdialog-theme-default',
					controller: 'goodsAddPromotionalPriceModalController',
					scope: $scope,
					width: 1160
				});
			}
			if(n == 3) { //添加   修改
				$scope.dialog = ngDialog.open({
					template: 'views/promotionmanage/goodsPromotionAddModal.html',
					className: 'ngdialog-theme-default',
					controller: 'goodsPromotionAddModalController',
					scope: $scope,
					width: 1160
				});
			}

			if(n == 4) { //选择分类
				//单击选中的
				$scope.selectedGoodsClick = [];
				//右边的   单击选中的
				$scope.removeGoodsClick = [];
				//右边的已经选中的
				$scope.selectedGoods = [];
				$scope.dialog = ngDialog.open({
					template: 'views/promotionmanage/classifyModal.html',
					className: 'ngdialog-theme-default',
					controller: 'goodsClassifyAddModalController',
					scope: $scope,
					width: 1160
				});
			}

			if(n == 5) { //选择品牌
				//单击选中的
				$scope.selectedGoodsClick = [];
				//右边的   单击选中的
				$scope.removeGoodsClick = [];
				//右边的已经选中的
				$scope.selectedGoods = [];
				$scope.dialog = ngDialog.open({
					template: 'views/promotionmanage/brandModal.html',
					className: 'ngdialog-theme-default',
					controller: 'goodsBrandAddModalController',
					scope: $scope,
					width: 1160
				});
			}

			if(n == 6) { //提交审核
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
					goodsPromotionAddService.commit(res.id).then(
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
					goodsPromotionAddService
						.addproducts(res)
						.then(
							function(result) {
								$scope.loadData(true);
							});
				}, function(reason) {
				});
			}
		}
		//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};

	/**
	 * 分类信息 一级显示
	 */
	$scope.queryBrand = function() {
		var brandName = '';
		$scope.brandList = [];
		goodsPromotionAddService
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
		goodsPromotionAddService
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
		goodsPromotionAddService
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
 * 弹出  选择分类 页面的controller定义
 */
function goodsClassifyAddModalController($scope, goodsPromotionAddService, $rootScope) {

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
		goodsPromotionAddService
			.auditdetail($scope.res.id)
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
		goodsPromotionAddService
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
function goodsBrandAddModalController($scope, goodsPromotionAddService, $rootScope) {
	$scope.brandName = "";
	$scope.gainBrandList = function() {
		goodsPromotionAddService
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
		goodsPromotionAddService
			.auditdetail($scope.res.id)
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
		goodsPromotionAddService
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

/**
 * 弹出  选择商品 页面的controller定义
 */
function goodsSelectGoodsAddModalController($scope, $q, goodsPromotionAddService, $rootScope, constPageSize) {
	//弹窗 分页
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		goodsPromotionAddService
			.onsalelist($scope.dialogSearch.cateId, $scope.dialogSearch.brandName, $scope.dialogSearch.goodsInfoName, currentPaseSize, currentPageNo)
			.then(
				function(result) {
					$scope.infoauditList = result.data;
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
		goodsPromotionAddService
			.auditdetail($scope.res.id)
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
		goodsPromotionAddService
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
 * 弹出  添加促销价格 页面的controller定义
 */
function goodsAddPromotionalPriceModalController($scope, $rootScope, goodsPromotionAddService) {
	$scope.ifClickShow = false;
	//选中的行数
	$scope.selectedtr = -1;
	//货品数组
	$scope.ProductList = [];
	//根据平台类型
	$scope.ifshowtype = "";

	//回显数据
	$scope.innitSales = function() {
		goodsPromotionAddService
			.auditdetail($scope.res.id)
			.then(
				function(result) {
					$scope.ifshowtype = result.data.applicablePlatform;
					$scope.selectedGoods = result.data.promotionGoodsList;
					if($scope.selectedGoods == null || $scope.selectedGoods == undefined) $scope.selectedGoods = [];
					

					$scope.promotionProductList = result.data.promotionProductList;
					if($scope.promotionProductList == null || $scope.promotionProductList == undefined) $scope.promotionProductList = [];
					for(var i = 0; i < $scope.selectedGoods.length; i++) {
						$scope.selectedGoods[i].productlists = [];
						for(var j = 0; j < $scope.promotionProductList.length; j++) {
							if($scope.promotionProductList[j].goodsId == $scope.selectedGoods[i].id) {
								$scope.selectedGoods[i].productlists.push($scope.promotionProductList[j]);
							}
						}
					}
				});
	};
	$scope.innitSales();

	$scope.salesPromotion = function(goodsid, n) {
		$scope.selectedtr = n;
		$scope.ifClickShow = true;
		$scope.ProductList = [];
		for(var i = 0; i < $scope.promotionProductList.length; i++) {
			if($scope.promotionProductList[i].goodsId == goodsid) {
				$scope.ProductList.push($scope.promotionProductList[i]);
			}
		}
	}

	//保存数据   修改货品促销价
	$scope.okModalAddp = function() {
		if($scope.okmodaldis == true) {
			return 0;
		}
		$scope.okmodaldis = true;
		var res = [];
		for(var i = 0; i < $scope.selectedGoods.length; i++) {
			res = res.concat($scope.selectedGoods[i].productlists);
		}
		goodsPromotionAddService
			.editpromotionprice(res)
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
 * 弹出 修改  添加 页面的controller定义
 */
function goodsPromotionAddModalController($scope, goodsPromotionAddService, $rootScope) {
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
	if($scope.res == null || $scope.res == undefined || $scope.res == '') {
		$scope.addData = {};
		$scope.addData.goodsSelectType = 1;
		$scope.checkbox1 = false;
		$scope.checkbox2 = false;
		$scope.checkbox3 = false;
		$scope.addData.applicablePlatform = '1';
		$scope.checkbox1 = true;
	} else {
		goodsPromotionAddService
			.auditdetail($scope.res.id)
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
	}

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

	//保存  添加    修改
	$scope.okModal = function() {
		if($scope.okmodaldis == true) {
			return 0;
		}
		$scope.okmodaldis = true;
		if($scope.res == null || $scope.res == undefined || $scope.res == '') { //添加
			if(undefined == $scope.WdatePicker.startTime) {
				$scope.WdatePicker.startTime = "";
			}
			if(undefined == $scope.WdatePicker.endTime) {
				$scope.WdatePicker.endTime = "";
			}
			$scope.addData.startTime = $scope.WdatePicker.startTime;
			$scope.addData.endTime = $scope.WdatePicker.endTime;
			if($scope.addData.startTime == "") {
				$rootScope.showAlert("您还没有选择促销开始时间！");
				$scope.okmodaldis = false;
				return 0;
			}
			var compare = $scope.addData.startTime.split(' ')[0]+' 23:59:59';
			if(!compare.comp()){
				$rootScope.showAlert("促销开始时间应该在今天之后！");
				$scope.okmodaldis = false;
				return 0;
			}
			if($scope.addData.endTime == "") {
				$rootScope.showAlert("您还没有选择促销结束时间！");
				$scope.okmodaldis = false;
				return 0;
			}
			goodsPromotionAddService
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
		} else {
			if(undefined == $scope.WdatePicker.startTime) {
				$scope.WdatePicker.startTime = "";
			}
			if($scope.WdatePicker.startTime != "") {
				$scope.addData.startTime = $scope.WdatePicker.startTime;
			}
			if(undefined == $scope.WdatePicker.endTime) {
				$scope.WdatePicker.endTime = "";
			}
			if($scope.WdatePicker.endTime != "") {
				$scope.addData.endTime = $scope.WdatePicker.endTime;
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
			goodsPromotionAddService
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
		}

	};
}

angular
	.module('managerApp')
	.controller('goodsPromotionAddController', goodsPromotionAddController)
	.controller('goodsPromotionAddModalController', goodsPromotionAddModalController)
	.controller('goodsAddPromotionalPriceModalController', goodsAddPromotionalPriceModalController)
	.controller('goodsSelectGoodsAddModalController', goodsSelectGoodsAddModalController)
	.controller('goodsBrandAddModalController', goodsBrandAddModalController)
	.controller('goodsClassifyAddModalController', goodsClassifyAddModalController)