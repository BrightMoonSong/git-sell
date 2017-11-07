function BrandGroomController($rootScope, $scope, $q, constPageSize, BrandGroomService, ngDialog) {

	$scope.applyType = "";
	$scope.floorName = "";
	$scope.dataId = "";
	$scope.id = "";
	$scope.applyTypes = "";




	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var applyType = $scope.applyType;
		var floorName = $scope.floorName;
		BrandGroomService
			.find(currentPaseSize, currentPageNo, applyType, floorName)
			.then(
				function(result) {
					$scope.adverData = result.data;
					console.log($scope.adverData)
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	}
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/web/BrandGroomModifyFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'BrandGroomModifyFormModalController',
			scope: $scope,
			width: 1100
		});
	}

	$scope.openModals = function(dataId, applyType) {
		$scope.dataId = dataId;
		$scope.applyTypes = applyType;
		$scope.dialog = ngDialog.open({
			template: 'views/web/BrandGroomDetailsFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'BrandGroomDetailsFormModalController',
			scope: $scope,
			width: 1100
		});
	}


}
/**
 * 弹出页面的controller定义  详情
 */
function BrandGroomModifyFormModalController($scope, BrandGroomService) {

	$scope.initEntitys = function() {

		BrandGroomService
			.get($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntitys = result.data;
					console.log(result.data.findBrand);

				}
			);

	}

	$scope.initEntitys();
	$scope.initEntity = function(mes) {
		$scope.currentTab = mes;
		BrandGroomService
			.get($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntity = result.data;

				}
			);

	}
	$scope.onClickTab = function(url) {
		$scope.currentTab = url;
	}
	$scope.onClickTab("brand.html");
	// $scope.initEntity('brand.html');

	$scope.cancelModal = function() {
		$scope.dialog.close();
		$scope.loadData();

	}
}

/**
 * 弹出页面的controller定义  修改
 */
function BrandGroomDetailsFormModalController($rootScope, $scope, BrandGroomService, ngDialog) {
	$scope.dataEntitys = "";
	$scope.application = "1";
	$scope.brandName = "";
	$scope.goodsId = "";
	$scope.cateId1 = "";
	$scope.cateId2 = "";
	$scope.type = "";
	$scope.applyTypess=$scope.applyTypes;
	//获取品牌列表
	$scope.initEntity = function(brandName) {
		BrandGroomService
			.gets(brandName)
			.then(
				function(result) {
					$scope.dataEntity = result.data;
					console.log($scope.dataEntity)

				}
			);

	}

	$scope.initEntity("");

	//初始化搜索控件，一级分类
	$scope.Type1Init = function() {
		BrandGroomService.seach(0).then(
			function(result) {
				$scope.TypeList1 = result.data;
				$scope.type = result.data;

			},
			function(result) {})
	}
	$scope.Type1Init();

	//一级分类下拉控件的change事件方法，用于实现级连i
	$scope.TypeChange1 = function(id) {
		$scope.cateId = id;
		BrandGroomService.seach(id).then(
			function(result) {
				$scope.TypeList2 = result.data;
				$scope.type = result.data;
				// $scope.loadData();
			},
			function(result) {})
	}

	$scope.TypeChange2 = function(id) {
		$scope.cateId1 = id;
		BrandGroomService.seach(id).then(
			function(result) {
				$scope.TypeList3 = result.data;
				$scope.type = result.data;
				// $scope.loadData();

			},
			function(result) {})

	}
	$scope.TypeChange3 = function(id) {
		$scope.cateId2 = id;
		// $scope.loadData();

	}

	//品牌历史
	$scope.initEntitys = function() {

		BrandGroomService
			.get($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntitys = result.data;
					console.log(result.data.findBrand[0]);
					for (var i = 0; i < $scope.dataEntitys.findBrand.length; i++) {
						$scope.selectedGoods.push($scope.dataEntitys.findBrand[i])
					};
					console.log($scope.selectedGoods)
					if ($scope.selectedGoods == null || $scope.selectedGoods == undefined) $scope.selectedGoods = [];
					for (var i = 0; i < $scope.selectedGoods.length; i++) {
						$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
					}
					for (var i = 0; i < $scope.dataEntitys.findCate.length; i++) {
						$scope.selectedGoods1.push($scope.dataEntitys.findCate[i])
					}
					if ($scope.selectedGoods1 == null || $scope.selectedGoods1 == undefined) $scope.selectedGoods1 = [];
					for (var i = 0; i < $scope.selectedGoods1.length; i++) {
						$scope.selectedGoodsid1.push($scope.selectedGoods1[i].id);
					}
					$scope.selectedGoodsids = $scope.selectedGoodsid;
					$scope.selectedGoodsids1 = $scope.selectedGoodsid1;
				}
			);

	}
	$scope.initEntitys();
	$scope.selectedGoodsClick = [];
	//右边的   单击选中的
	$scope.removeGoodsClick = [];
	//右边的已经选中的
	$scope.selectedGoods = [];
	$scope.removeGoodsClickid = [];
	$scope.selectedGoodsClickid = [];
	$scope.selectedGoodsid = [];
	$scope.selectedGoodsids = [];
	//左边的   选择商品的  双击  点击事件
	$scope.selected = function(res) {
		if ($.inArray(res.id, $scope.selectedGoodsid) == 0 || $.inArray(res.id, $scope.selectedGoodsid) > 0) {
			return 0;
		}
		if ($.inArray(res.id, $scope.selectedGoodsClickid) == 0 || $.inArray(res.id, $scope.selectedGoodsClickid) > 0) {
			$scope.selectedGoodsClickid.remove(res.id);
		}
		$scope.selectedGoods.push(res);
		for (var i = 0; i < $scope.selectedGoods.length; i++) {
			$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);
		$scope.selectedGoodsids = $scope.selectedGoodsid;
		console.log($scope.selectedGoodsids)
	};
	//左边的   选择商品的  单击  点击事件
	$scope.selected1 = function(res) {
		console.log(res)
		if ($.inArray(res.id, $scope.selectedGoodsid) == 0 || $.inArray(res.id, $scope.selectedGoodsid) > 0) {
			return 0;
		}
		if ($.inArray(res.id, $scope.selectedGoodsClickid) < 0) {
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
		for (var i = 0; i < $scope.selectedGoods.length; i++) {
			if ($scope.selectedGoods[i].id != undefined && $scope.selectedGoods[i].id != null && $scope.selectedGoods[i].id != "") {
				$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
			} else {
				$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
			}
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);
		if ($.inArray(res.id, $scope.removeGoodsClickid) == 0) {
			$scope.removeGoodsClickid.remove(res.id);
		} else if ($.inArray(res.id, $scope.removeGoodsClickid) == 0) {
			$scope.removeGoodsClickid.remove(res.id);
		}
		console.log($scope.selectedGoodsid)
	};
	//右边的  去除商品的  单击  点击事件
	$scope.remove1 = function(res) {
		if (res.id != undefined && res.id != null && res.id != "") {
			if ($.inArray(res.id, $scope.removeGoodsClickid) < 0) {
				$scope.removeGoodsClick.push(res);
				$scope.removeGoodsClickid.push(res.id);
			} else {
				$scope.removeGoodsClick.remove(res);
				$scope.removeGoodsClickid.remove(res.id);
			}
		} else {
			if ($.inArray(res.id, $scope.removeGoodsClickid) < 0) {
				$scope.removeGoodsClick.push(res);
				$scope.removeGoodsClickid.push(res.id);
			} else {
				$scope.removeGoodsClick.remove(res);
				$scope.removeGoodsClickid.remove(res.id);
			}
		}
	};

	//左边的 单选的全变为选中
	$scope.allChecked = function() {
		for (var i = 0; i < $scope.selectedGoodsClick.length; i++) {
			$scope.selected($scope.selectedGoodsClick[i]);
		}
		$scope.selectedGoodsClickid = [];
		$scope.selectedGoodsClick = [];
	};
	//右边的单选的全移除
	$scope.allRemove = function() {
		for (var i = 0; i < $scope.removeGoodsClick.length; i++) {
			$scope.selectedGoods.remove($scope.removeGoodsClick[i]);
		}
		$scope.selectedGoodsid = [];
		for (var i = 0; i < $scope.selectedGoods.length; i++) {
			if ($scope.selectedGoods[i].id != undefined && $scope.selectedGoods[i].id != null && $scope.selectedGoods[i].id != "") {
				$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
			} else {
				$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
			}
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);
		console.log($scope.selectedGoodsid)

		$scope.removeGoodsClickid = [];
		$scope.removeGoodsClick = [];
	};




	$scope.selectedGoodsClick1 = [];
	//右边的   单击选中的
	$scope.removeGoodsClick1 = [];
	//右边的已经选中的
	$scope.selectedGoods1 = [];
	$scope.removeGoodsClickid1 = [];
	$scope.selectedGoodsClickid1 = [];
	$scope.selectedGoodsid1 = [];
	$scope.selectedGoodsids1 = [];


	//左边的   选择商品的  双击  点击事件
	$scope.selected2 = function(res) {
		if ($.inArray(res.id, $scope.selectedGoodsid1) == 0 || $.inArray(res.id, $scope.selectedGoodsid1) > 0) {
			return 0;
		}
		if ($.inArray(res.id, $scope.selectedGoodsClickid1) == 0 || $.inArray(res.id, $scope.selectedGoodsClickid1) > 0) {
			$scope.selectedGoodsClickid1.remove(res.id);
		}
		$scope.selectedGoods1.push(res);
		for (var i = 0; i < $scope.selectedGoods1.length; i++) {
			$scope.selectedGoodsid1.push($scope.selectedGoods1[i].id);
		}
		//数组去重
		$scope.selectedGoodsid1 = unique($scope.selectedGoodsid1);
		$scope.selectedGoodsids1 = $scope.selectedGoodsid1;
		console.log($scope.selectedGoodsids1)
	};
	//左边的   选择商品的  单击  点击事件
	$scope.selected3 = function(res) {
		console.log(res)
		if ($.inArray(res.id, $scope.selectedGoodsid1) == 0 || $.inArray(res.id, $scope.selectedGoodsid1) > 0) {
			return 0;
		}
		if ($.inArray(res.id, $scope.selectedGoodsClickid1) < 0) {
			$scope.selectedGoodsClick1.push(res);
			$scope.selectedGoodsClickid1.push(res.id);
		} else {
			$scope.selectedGoodsClick1.remove(res);
			$scope.selectedGoodsClickid1.remove(res.id);
		}
	};
	//右边的  去除商品的  双击  点击事件
	$scope.remove2 = function(res) {
		//array.splice(start,delCount);//从start的位置开始向后删除delCount个元素
		$scope.selectedGoods1.remove(res);
		$scope.selectedGoodsid1 = [];
		for (var i = 0; i < $scope.selectedGoods1.length; i++) {
			if ($scope.selectedGoods1[i].id != undefined && $scope.selectedGoods[i].id != null && $scope.selectedGoods[i].id != "") {
				$scope.selectedGoodsid1.push($scope.selectedGoods1[i].id);
			} else {
				$scope.selectedGoodsid1.push($scope.selectedGoods1[i].id);
			}
		}
		//数组去重
		$scope.selectedGoodsid1 = unique($scope.selectedGoodsid1);
		if ($.inArray(res.id, $scope.removeGoodsClickid1) == 0) {
			$scope.removeGoodsClickid1.remove(res.id);
		} else if ($.inArray(res.id, $scope.removeGoodsClickid1) == 0) {
			$scope.removeGoodsClickid1.remove(res.id);
		}
	};
	//右边的  去除商品的  单击  点击事件
	$scope.remove3 = function(res) {
		if (res.id != undefined && res.id != null && res.id != "") {
			if ($.inArray(res.id, $scope.removeGoodsClickid1) < 0) {
				$scope.removeGoodsClick1.push(res);
				$scope.removeGoodsClickid1.push(res.id);
			} else {
				$scope.removeGoodsClick1.remove(res);
				$scope.removeGoodsClickid1.remove(res.id);
			}
		} else {
			if ($.inArray(res.id, $scope.removeGoodsClickid1) < 0) {
				$scope.removeGoodsClick1.push(res);
				$scope.removeGoodsClickid.push(res.id);
			} else {
				$scope.removeGoodsClick1.remove(res);
				$scope.removeGoodsClickid1.remove(res.id);
			}
		}
	};

	//左边的 单选的全变为选中
	$scope.allChecked1 = function() {
		for (var i = 0; i < $scope.selectedGoodsClick1.length; i++) {
			$scope.selected2($scope.selectedGoodsClick1[i]);
		}
		$scope.selectedGoodsClickid1 = [];
		$scope.selectedGoodsClick1 = [];
	};
	//右边的单选的全移除
	$scope.allRemove1 = function() {
		for (var i = 0; i < $scope.removeGoodsClick1.length; i++) {
			$scope.selectedGoods1.remove($scope.removeGoodsClick1[i]);
		}
		$scope.selectedGoodsid1 = [];
		for (var i = 0; i < $scope.selectedGoods1.length; i++) {
			if ($scope.selectedGoods1[i].id != undefined && $scope.selectedGoods1[i].id != null && $scope.selectedGoods[i].id != "") {
				$scope.selectedGoodsid1.push($scope.selectedGoods1[i].id);
			} else {
				$scope.selectedGoodsid1.push($scope.selectedGoods1[i].id);
			}
		}
		//数组去重
		$scope.selectedGoodsid1 = unique($scope.selectedGoodsid1);

		$scope.removeGoodsClickid1 = [];
		$scope.removeGoodsClick1 = [];
	};

		//保存选择的商品
	$scope.selectGoodsOkModal = function() {
		if ($scope.okmodaldis == true) {
			return 0;
		}
		$scope.okmodaldis = true;



		var attr = $scope.selectedGoodsid;
		console.log(attr)
		var res = $scope.res;
		$scope.propIds = "";
		$scope.propIds = attr.join(",");
		var attr1 = $scope.selectedGoodsid1;
		$scope.cateId = "";
		$scope.cateId = attr1.join(",");
		console.log($scope.propIds)
		console.log($scope.cateId)



		BrandGroomService
			.put($scope.dataId, $scope.propIds, $scope.cateId, $scope.applyTypess)
			.then(
				function(result) {
					console.log(result)
					$scope.okmodaldis = false;
					$scope.cancelModal();

				},
				function(result) {
					$scope.okmodaldis = false;
				});
	};







	$scope.onClickTab = function(url) {
		$scope.currentTab = url;
	}
	$scope.onClickTab("brand.html");
	// $scope.initEntity('brand.html');

	$scope.cancelModal = function() {
		$scope.dialog.close();
		$scope.loadData();

	}
}

angular
	.module('managerApp')
	.controller('BrandGroomController', BrandGroomController)
	.controller('BrandGroomModifyFormModalController', BrandGroomModifyFormModalController)
	.controller('BrandGroomDetailsFormModalController', BrandGroomDetailsFormModalController)
