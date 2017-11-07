//oss图片富文本
var imgPathEditorOss = imgPathGoods;

/**
 * 系统用户controller定义
 */
function GoodsInfoController($rootScope, $scope, $http, $q, goodsReminder, constPageSize, GoodsInfoService, ngDialog) {
	$scope.modalType = ""; //模态框类型：edit、add
	$scope.dataId = ""; //当前操作的数据id
	$scope.infoNameSearch = ""; //搜索关键词
	$scope.infoContainer = true; //数据列表
	$scope.editorModel = false; //富文本
	$scope.expOrDes = ''; //说明书或者商品描述信息
	$scope.okModalDisabled = false; //保存按钮的disabled

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var name1 = $scope.infoNameSearch;
		GoodsInfoService.find(name1, currentPaseSize, currentPageNo).then(
			function(result) {
				$scope.infoList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			});
		return defer.promise;
	}

	$scope.submit = function(id) {
		var reminder = "确定提交吗？"; //提示语
		reminder = goodsReminder.goodsinfo;

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
			GoodsInfoService
				.submit(id)
				.then(
					function(result) {
						$scope.loadData();
					}
				);
		}, function(reason) {

		});
	};
	//跳转预览页面
	$scope.gotoGoodsDetail = function(goodsId) {
		if(goodsId !== null && goodsId !== undefined) {
			window.open(constMallLocation + "/goodsPreview.html?id=" + goodsId, "_blank");
		}
	};

	/**
	 * 弹出修改数据模态框
	 */
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsInfoModal.html',
			className: 'ngdialog-theme-default',
			controller: 'goodsInfoFormModalController',
			scope: $scope,
			width: 1150
		})
	};

	/**
	 * 弹出 规格图片上传LIST 模态框
	 */
	$scope.openModalSpecOssList = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsInfoSpecOssModalList.html',
			className: 'ngdialog-theme-default',
			controller: 'goodsInfoSpecOssFormModalListController',
			scope: $scope,
			width: 1150
		})
	};

	/**
	 * 弹出商品  描述信息  说明书  模态框
	 */
	$scope.openGoodsDetailsModal = function(dataId, res) {
		$scope.dataId = dataId;
		$scope.infoContainer = false;
		$scope.editorModel = true;
		if(res == 'explain') { //说明书
			$scope.instructions = false;
			//oss图片富文本
			imgPathEditorOss = imgPathGoods + '/' + dataId + '/instructions';
			$scope.expOrDes = 'explain';
			GoodsInfoService
				.get($scope.dataId)
				.then(
					function(result) {

						setContent(false, result.data.goodsInfo.instruction);
					}
				);
		} else if(res == 'describe') { //描述信息
			//oss图片富文本
			imgPathEditorOss = imgPathGoods + '/' + dataId + '/detail';
			$scope.expOrDes = 'describe';
			GoodsInfoService
				.get($scope.dataId)
				.then(
					function(result) {

						setContent(false, result.data.goodsInfo.description);
					}
				);
		}
	};

	/**
	 * 获取富文本内容----------------保存
	 */
	$scope.getContentAngular = function() {
			var arr = [];
			//arr.push("使用editor.getContent()方法可以获得编辑器的内容");
			//arr.push("内容为：");
			arr.push(UM.getEditor('myEditor').getContent());
			//alert(arr.join("\n"));
			var res;
			if($scope.expOrDes == 'explain') { //说明书
				res = {
					id: $scope.dataId,
					text: arr.join("\n"), //返回一个字符串。该字符串是通过把 arrayObject 的每个元素转换为字符串，然后把这些字符串连接起来，在两个元素之间插入 separator 字符串而生成的。
					type: 2
				};

				if(res.text == null || res.text == '' || res.text == undefined) {
					$rootScope.showAlert("说明书内容为空，不能保存！");
					return 0;
				}
				GoodsInfoService
					.description(res)
					.then(
						function(result) {

						}
					);
			} else if($scope.expOrDes == 'describe') { //描述信息
				res = {
					id: $scope.dataId,
					text: arr.join("\n"),
					type: 1
				};
				if(res.text == null || res.text == '' || res.text == undefined) {
					$rootScope.showAlert("商品描述内容为空，不能保存！");
					return 0;
				}

				GoodsInfoService
					.description(res)
					.then(
						function(result) {

						}
					);
			}

			$scope.infoContainer = true;
			$scope.editorModel = false;
		}
		/**
		 * 返回list页面
		 */
	$scope.goBack = function() {
		$scope.infoContainer = true;
		$scope.editorModel = false;
	}

	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};

};
/**
 * 用户修改弹出页面controller定义
 */
function goodsInfoFormModalController($scope, $rootScope, $filter, GoodsInfoService, ngDialog, goodsReminder, ngVerify, $timeout) {
	//定义变量
	$scope.selectList = []; //用作暂时的储存select选中的值
	$scope.temporary = ""; //用作暂时的储存id值
	$scope.dataProductEntity = {
		"costPrice": 1,
		"salesWebPrice": 1,
		"salesWapPrice": 1,
		"salesAppPrice": 1,
		"basePrice": 1,
		"actualSales": 0
	};
	$scope.WdatePicker = {}; //WdatePicker时间   获取开始和结束时间
	$scope.currentSpec = ''; //保存原有的规格的启用与否
	$scope.originalData = ''; //原始的值
	$scope.addProduct = true;

	$scope.initEntity = function() {
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
			$scope.editHide = true;
			$scope.currentTab = "basicInformation.html";
			$scope.addHide = true; //展示 基本信息
			GoodsInfoService
				.get($scope.dataId)
				.then(
					function(result) {
						$scope.dataEntity = result.data.goodsInfo;
						$scope.selectedGoodsidInit = [];
						$scope.specAttrsSpliceId = [];
						for(var i = 0; i < result.data.specsInfo.length; i++) {
							$scope.selectedGoodsidInit.push(result.data.specsInfo[i].id);
							for(var e = 0; e < result.data.specsInfo[i].specAttrs.length; e++) {
								$scope.specAttrsSpliceId.push(result.data.specsInfo[i].specAttrs[e].id);
							}
						}
						$scope.selectedGoodsidInit = unique($scope.selectedGoodsidInit);
						$scope.specAttrsSpliceId = unique($scope.specAttrsSpliceId);

						$scope.queryBrand();

						$scope.searchCate(result.data.goodsInfo.goodsCateId); //查询品牌信息
						$scope.dataInfoImages = [];
						$scope.dataInfoImages = $scope.dataEntity.goodsInfoImages;
						$scope.enabledSpec = false;
						$scope.currentSpec = $scope.dataEntity.isSpec; //保存原有的规格的启用与否

						if($scope.dataEntity.isSpec == 1) { //不启用
							$scope.addProduct = true; //不启用时显示详细信息
							$scope.checkedRadio(1, "isSpec");
							$scope.originalData = 1;
							$scope.ifEnabled = false; //不启用规格时隐藏规格属性
						} else if($scope.dataEntity.isSpec == 2) { //启用
							$scope.checkedRadio(2, "isSpec");
							$scope.originalData = 2;
							$scope.ifEnabled = true; //启用规格时显示规格属性
						}
						if($scope.dataEntity.goodsInfoProduct.length > 0) {
							$scope.enabledSpec = false;
						}
						$scope.dataInfoImages2 = [];
						$(":button").removeAttr("disabled"); // 移除disabled属性 
						//返回所有未验证通过的表单元素，并标记
						ngVerify.check('myform', function(errEls) {

						});
					}
				);

		} else { //如果参数dataId为空，说明是新增数据，设置默认值
			$scope.dataEntity = {
				"masterImg": " ",
				"description": " ",
				"instruction": " "
			};
			$scope.editHide = false;
			$scope.currentTab = "cate.html";
			$scope.addHide = false;

			$scope.queryBrand();
			$(":button").removeAttr("disabled"); // 移除disabled属性 
		}
	}

	$scope.isSelectedOrders = function(id) {
		return $scope.selectedOrders.indexOf(id) >= 0;
	}

	$scope.priceRatio = function() {
		//costPrice         //成本价
		//salesWebPrice     //web站销售价格
		//salesWapPrice     //wap站销售价格
		//salesAppPrice     //app站销售价格
		//basePrice         //销售底价
		if($scope.dataProductEntity == undefined) {
			$scope.dataProductEntity = {
				"costPrice": 1,
				"salesWebPrice": 1,
				"salesWapPrice": 1,
				"salesAppPrice": 1,
				"basePrice": 1,
				"actualSales": 0
			};
		}
		if($scope.dataProductEntity.costPrice == undefined) {
			$scope.dataProductEntity.costPrice = 1;
		}
		if($scope.dataProductEntity.salesWebPrice == undefined) {
			$scope.dataProductEntity.salesWebPrice = 1;
		}
		if($scope.dataProductEntity.salesWapPrice == undefined) {
			$scope.dataProductEntity.salesWapPrice = 1;
		}
		if($scope.dataProductEntity.salesAppPrice == undefined) {
			$scope.dataProductEntity.salesAppPrice = 1;
		}
		if($scope.dataProductEntity.basePrice == undefined) {
			$scope.dataProductEntity.basePrice = 1;
		}

	}

	//展示货品信息
	$scope.clickSpecData = function(res) {
		$scope.dataProductEntity = res;
		$scope.addProduct = false;
	}
	$scope.okModal = function(dataEntity) {
		$scope.okModalDisabled = true;
		if(dataEntity.packing == undefined || dataEntity.packing == null || dataEntity.packing == '') {
			dataEntity.packing = '';
		}
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //修改数据
			if(undefined == $scope.WdatePicker.minDateTime) {
				$scope.WdatePicker.minDateTime = dataEntity.addTime;
			}
			dataEntity.addTime = $scope.WdatePicker.minDateTime;
			dataEntity.state = 1; //为商品状态加默认‘维护’
			GoodsInfoService
				.edit(dataEntity)
				.then(
					function(result) {

						$scope.okModalDisabled = false;
						$scope.loadData();
					},
					function(result) {
						$scope.okModalDisabled = false;
					}
				)
		} else { //新增数据
			dataEntity.isSpec = 1; //默认不启用
			dataEntity.state = 1; //为商品状态加默认‘维护’
			if(dataEntity.goodsBrandId == null || dataEntity.goodsBrandId == undefined) {
				$rootScope.showAlert("请选择品牌！");
				$scope.okModalDisabled = false;
				return 0;
			}
			GoodsInfoService
				.add(dataEntity)
				.then(
					function(result) {
						$scope.loadData();
						$scope.okModalDisabled = false;
						$scope.dialog.close();
					},
					function(result) {
						$scope.okModalDisabled = false;
					}
				)
		}
	};

	$scope.dataIdOss = ""; //当前操作的数据id
	/**
	 * 打开OSS弹窗
	 * @param dataIds
	 */
	$scope.openModalOss = function(dataIds) {
		$scope.dataIdOss = $scope.dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsInfoModalOss.html',
			className: 'ngdialog-theme-default',
			controller: 'goodsInfoOssFormModalController',
			//closeByDocument:false,
			scope: $scope,
			width: 1150
		})
	};

	/**
	 * 标签页分类信息页
	 */
	$scope.queryBrand = function() {
		var brandName = '';
		GoodsInfoService
			.findCate(1)
			.then(
				function(result) {
					$scope.brandList = [];
					for(var i = 0; i < result.data.length; i++) {
						if(result.data[i].pid == 0) {
							$scope.brandList.push(result.data[i]);
						}
					}
					if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //修改数据
						var arr = $scope.dataEntity.goodsCateInfo.split(":");

						for(var i in $scope.brandList) {
							if($scope.brandList[i].id == arr[0]) { //将id是4的设为选中项.
								$scope.brandListId = $scope.brandList[i];
								break;
							}
						}
						$scope.implementone = true; //是否执行过一次 默认 true
						$scope.implementtwo = true; //是否执行过一次 默认 true
						$scope.clickone(parseInt(arr[0]));
					}

				},
				function(result) {
					//alert("该用户不存在");
				}
			);
	}

	$scope.brandLt = [];
	$scope.brandLta = [];
	$scope.selectedWhich1 = function(row) { //点击选中改变颜色
		$scope.selectedRow1 = row;
		$scope.selectedRow2 = null;
		$scope.selectedRow3 = null;
	}
	$scope.selectedWhich2 = function(row) { //点击选中改变颜色
		$scope.selectedRow2 = row;
		$scope.selectedRow3 = null;
	}
	$scope.selectedWhich3 = function(row) { //点击选中改变颜色
		$scope.selectedRow3 = row;
	}

	$scope.clickone = function(id) {
		if(id == undefined) {
			return true;
		}
		var pam = $scope.brandLt;
		$scope.ifThirdShow = true; //置灰下一步按钮
		GoodsInfoService
			.findIdCate(id)
			.then(
				function(result) {
					$scope.brandLt = [];
					$scope.brandLta = [];
					$scope.brandLt = result.data;
					if(result.data.length == 0) { //没有子类
						//$scope.temporary = id;
					}

					if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "" && $scope.implementone) { //修改数据
						var arr = $scope.dataEntity.goodsCateInfo.split(":");

						for(var i in $scope.brandLt) {
							if($scope.brandLt[i].id == arr[1]) { //将id是4的设为选中项.
								$scope.brandLtId = $scope.brandLt[i];
								break;
							}
						}
						if($scope.implementone) {
							$scope.clicktwo(parseInt(arr[1]));
						}

						$scope.implementone = false; //是否执行过一次
					}
				},
				function(result) {
					//alert("该用户不存在");
				}
			);
	}
	$scope.clicktwo = function(id) {
		if(id == undefined) {
			return false;
		}
		var pam = $scope.brandLt;
		$scope.ifThirdShow = true; //置灰下一步按钮
		GoodsInfoService
			.findIdCate(id)
			.then(
				function(result) {
					$scope.brandLta = [];
					$scope.brandLta = result.data;
					if(result.data.length == 0) { //没有子类
						//$scope.temporary = id;
					}

					if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "" && $scope.implementtwo) { //修改数据
						var arr = $scope.dataEntity.goodsCateInfo.split(":");

						for(var i in $scope.brandLta) {
							if($scope.brandLta[i].id == arr[2]) { //将id是4的设为选中项.
								$scope.brandLtaId = $scope.brandLta[i];
								break;
							}
						}
						if($scope.implementtwo) {
							$scope.clickThird(parseInt(arr[2]));
						}
						$scope.implementtwo = false;

					}
					for(var j = 0; j < $scope.brandLta.length; j++) {
						if($scope.brandLta[j].id == id) {
							$scope.brandLtaId = $scope.brandLta[j];
						}
					}
				},
				function(result) {
					//alert("该用户不存在");
				}
			)
	};
	$scope.clickThird = function(id, name) {
		if(name == undefined && id == undefined) {
			return false;
		}
		$scope.ifThirdShow = false; //恢复下一步按钮
		$scope.temporary = id;
		$scope.dataEntity.goodsCateId = $scope.temporary;

		if(name == undefined) {
			for(var i = 0; i < $scope.brandLta.length; i++) {
				if($scope.brandLta[i].id == id) {
					$scope.dataEntity.goodsCateName = $scope.brandLta[i].name;
				}
			}
		} else {
			$scope.temporaryName = name;
			$scope.dataEntity.goodsCateName = name;
			for(var j = 0; j < $scope.brandLta.length; j++) {
				if($scope.brandLta[j].id == id) {
					$scope.brandLtaId = $scope.brandLta[j];
				}
			}
		}

	};
	//标签 分类信息  和 基本信息切换
	$scope.addHide = false; //展示分类信息
	$scope.ifThirdShow = true; //置灰下一步按钮
	$scope.okModalCate = function() {
		$scope.okModalDisabled = true;
		if($scope.temporary == "" || $scope.temporary == null || $scope.temporary == undefined) {} else {
			$scope.addHide = true; //展示 基本信息
			$scope.currentTab = "basicInformation.html";
			$scope.dataEntity.goodsCateId = $scope.temporary;
			$scope.searchCate($scope.temporary); //查询品牌信息
			$scope.dataEntity.state = 1; //为商品状态加默认‘维护’
			$scope.dataEntity.isTop = 0; //为是否推荐加默认‘不推荐’ 
			$scope.dataEntity.goodsType = 3; //药品类型   其它
			$scope.dataEntity.isHealthInsurance = 0; //是否医保范围  否
			$scope.dataEntity.isGift = 0; //是否赠品  否
			$scope.dataEntity.returnType = 0; //退货类型  不可退货
			$scope.dataEntity.logisticsType = 1; //商品物流类型  药品
			$scope.temporary = "";
		}

		$scope.okModalDisabled = false;
	};
	//^^标签页分类信息页

	//查询品牌信息
	$scope.searchCate = function(id) {
		GoodsInfoService
			.getBrandsByCate(id)
			.then(
				function(result) {
					$scope.goodsBrandIdList = result.data;
				},
				function(result) {
					//alert("无品牌信息");
				}
			);
	}

	/**
	 * 点击radio时更改保存的值
	 * @param n
	 * @param name
	 */
	$scope.checkedRadio = function(n, name) {
			$scope.okModalDisabled = false;
			//$(":button").removeAttr("disabled"); // 移除disabled属性 
			if("isTop" == name) {
				$scope.dataEntity.isTop = n;
			}
			if("state" == name) {
				$scope.dataEntity.state = n;
			}
			if("logisticsType" == name) {
				$scope.dataEntity.logisticsType = n;
			}
			if("goodsType" == name) {
				$scope.dataEntity.goodsType = n;
			}
			if("returnType" == name) {
				$scope.dataEntity.returnType = n;
			}
			if("isHealthInsurance" == name) {
				$scope.dataEntity.isHealthInsurance = n;
			}
			if("isGift" == name) {
				$scope.dataEntity.isGift = n;
			}
			if("isSpec" == name) {
				$scope.dataEntity.isSpec = n;
				if(n == 2) {
					$scope.ifEnabled = true; //启用规格时显示规格属性
					$scope.dataSpec = []; //启用规格

					$scope.addProduct = true; //启用时隐藏详细信息
					if($scope.originalData == 1) { //不启用(1)
						$scope.dataProductEntity = {
							"costPrice": 1,
							"salesWebPrice": 1,
							"salesWapPrice": 1,
							"salesAppPrice": 1,
							"basePrice": 1,
							"actualSales": 0
						};
					}
				} else {
					$scope.enabledSpec = false; //不启用时隐藏规格属性列表
					$scope.addProduct = false; //不启用时隐藏详细信息
					$scope.ifEnabled = false; //不启用规格时隐藏规格属性
					if($scope.originalData == 2) {
						$scope.dataProductEntity = {
							"costPrice": 1,
							"salesWebPrice": 1,
							"salesWapPrice": 1,
							"salesAppPrice": 1,
							"basePrice": 1,
							"actualSales": 0
						};
					} else {
						if($scope.dataEntity.isSpec == 2) { //不启用(1)
							$scope.dataProductEntity = {
								"costPrice": 1,
								"salesWebPrice": 1,
								"salesWapPrice": 1,
								"salesAppPrice": 1,
								"basePrice": 1,
								"actualSales": 0
							};
						} else {
							$scope.dataProductEntity = $scope.dataEntity.goodsInfoProduct[0]; //显示原来的数据
							if($scope.dataEntity.goodsInfoProduct[0] == undefined) {
								$scope.dataProductEntity = {
									"costPrice": 1,
									"salesWebPrice": 1,
									"salesWapPrice": 1,
									"salesAppPrice": 1,
									"basePrice": 1,
									"actualSales": 0
								};
							} else {
								$scope.dataProductEntity = $scope.dataEntity.goodsInfoProduct[0];
							}

						}
					}
				}
			}
		}
		/**
		 * 在修改modal页面增加一行
		 */
	$scope.dataInfoImages2 = [];
	$scope.add_li = function() {
		//加默认值
		$scope.dataInfoImages2.push({
			"imagePath": " ",
			"sort": " ",
			"state": 1,
			"goodsId": $scope.dataEntity.id
		});
	};
	//上传完图片的确定
	$scope.imgPathSet = function() {
		$scope.previewHide = true; //上传前的预览隐藏
		for(var i = 0; i < imgPath.length; i++) {
			$scope.dataInfoImages2.push({
				"imagePath": imgPath[i],
				"sort": 1,
				"state": 1,
				"goodsId": $scope.dataEntity.id
			});
		}
		var str1 = [];
		for(i = 0; i < $scope.dataInfoImages2.length; i++) {
			if(str1.indexOf($scope.dataInfoImages2[i]) < 0) {
				str1.push($scope.dataInfoImages2[i])
			}
		}
		$scope.dataInfoImages2 = str1;
		$scope.loadData();
		//$scope.okInfoImages($scope.dataInfoImages,$scope.dataInfoImages2);
		imgPath = [];
		$scope.dialog.close();
	}

	//点击规格属性名称列表显示货品信息
	$scope.specsName = "";
	$scope.clickSpecAttr = function(id, specAttrName, specsName) {
		$scope.specAttrIds = id;
		$scope.specAttrName = specAttrName;
		$scope.specsName = specsName;
		$scope.dataProductEntity = {
			"costPrice": 1,
			"salesWebPrice": 1,
			"salesWapPrice": 1,
			"salesAppPrice": 1,
			"basePrice": 1,
			"actualSales": 0
		};
		if($scope.originalData == $scope.dataEntity.isSpec) {
			if($scope.dataEntity.goodsInfoProduct.length > 0) {
				$scope.addProduct = false; //显示详细信息
				for(var i = 0; i < $scope.dataEntity.goodsInfoProduct.length; i++) {
					if($scope.dataEntity.goodsInfoProduct[i].specAttrId == id) {
						$scope.dataProductEntity = $scope.dataEntity.goodsInfoProduct[i];
					}
				}
			} else {
				$scope.addProduct = false; //隐藏详细信息
			}
		} else {
			$scope.addProduct = false; //显示详细信息
			$scope.dataProductEntity = {
				"costPrice": 1,
				"salesWebPrice": 1,
				"salesWapPrice": 1,
				"salesAppPrice": 1,
				"basePrice": 1,
				"actualSales": 0
			};
		}
	};
	//删除规格下面 属性
	$scope.specAttrsSpliceId = []; //用于存储  已经选中得规格  的属性
	$scope.specAttrsSplice = function(id) {
			if($scope.specAttrsSpliceId.contains(id)) {
				$scope.specAttrsSpliceId.remove(id);
			} else {
				$scope.specAttrsSpliceId.push(id);
			}
		}
		//提交货品信息
	$scope.okProduct = function(dataProductEntity, isSpec, specAttrName, specAttrIds) {
		if($scope.okModalDisabled == true) {
			return false;
		}
		$scope.okModalDisabled = true;
		$scope.okModalDisabled = false;

		var res = new Array();
		if($scope.dataEntity.isSpec == 2) { //启用规格时
			res = clone($scope.selectedGoods);
			for(var i = 0; i < res.length; i++) {
				var attr = clone(res[i].specAttrs);
				for(var m = attr.length - 1; m >= 0; m--) {
					for(k = 0; k < $scope.specAttrsSpliceId.length; k++) {
						if($scope.specAttrsSpliceId[k] == attr[m].id) {
							attr.splice(m, 1);
							break;
						}
					}
				}
				var attr2 = clone(res[i].specAttrs);
				for(var m = attr2.length - 1; m >= 0; m--) {
					for(var k = 0; k < attr.length; k++) {
						if(attr2[m].id == attr[k].id) {
							attr2.splice(m, 1);
							break;
						}
					}
				}
				res[i].specAttrs = attr2;
			}
			for(var n = 0; n < res.length; n++) {
				if(res[n].specAttrs.length == 0) {
					$rootScope.showAlert(goodsReminder.goodsinfoSpecG);
					$scope.okModalDisabled = false;
					return false;
				}
			}
		}

		GoodsInfoService
			.editProduct(res, $scope.dataId)
			.then(
				function(result) { //保存成功
					if(result.data.enable == undefined) {
						if(result.data.add == undefined && result.data.delete == undefined && result.data.disable == undefined) {
							$rootScope.showAlert("保存成功！");
						} else if(result.data.add == undefined && result.data.delete != undefined && result.data.disable == undefined) {
							$rootScope.showAlert("保存成功！删除了" + result.data.delete + "个货品！");
						} else if(result.data.add != undefined && result.data.delete == undefined && result.data.disable == undefined) {
							$rootScope.showAlert("保存成功！新增了" + result.data.add + "个货品！");
						} else if(result.data.add == undefined && result.data.delete == undefined && result.data.disable != undefined) {
							$rootScope.showAlert("保存成功！禁用了" + result.data.disable + "个货品！");
						} else if(result.data.add != undefined && result.data.delete != undefined && result.data.disable == undefined) {
							$rootScope.showAlert("保存成功！新增了" + result.data.add + "个货品！删除了" + result.data.delete + "个货品！");
						} else if(result.data.add != undefined && result.data.delete == undefined && result.data.disable != undefined) {
							$rootScope.showAlert("保存成功！新增了" + result.data.add + "个货品！禁用了" + result.data.disable + "个货品！");
						} else if(result.data.add == undefined && result.data.delete != undefined && result.data.disable != undefined) {
							$rootScope.showAlert("保存成功！删除了" + result.data.add + "个货品！禁用了" + result.data.delete + "个货品！");
						} else {
							$rootScope.showAlert("保存成功！新增了" + result.data.add + "个货品！删除了" + result.data.delete + "个货品！禁用了" + result.data.disable + "个货品！");
						}
					} else {
						if(result.data.add == undefined && result.data.delete == undefined && result.data.disable == undefined) {
							$rootScope.showAlert("保存成功！启用了" + result.data.enable + "个货品！");
						} else if(result.data.add == undefined && result.data.delete != undefined && result.data.disable == undefined) {
							$rootScope.showAlert("保存成功！删除了" + result.data.delete + "个货品！启用了" + result.data.enable + "个货品！");
						} else if(result.data.add != undefined && result.data.delete == undefined && result.data.disable == undefined) {
							$rootScope.showAlert("保存成功！新增了" + result.data.add + "个货品！启用了" + result.data.enable + "个货品！");
						} else if(result.data.add == undefined && result.data.delete == undefined && result.data.disable != undefined) {
							$rootScope.showAlert("保存成功！禁用了" + result.data.disable + "个货品！启用了" + result.data.enable + "个货品！");
						} else if(result.data.add != undefined && result.data.delete != undefined && result.data.disable == undefined) {
							$rootScope.showAlert("保存成功！新增了" + result.data.add + "个货品！删除了" + result.data.delete + "个货品！启用了" + result.data.enable + "个货品！");
						} else if(result.data.add != undefined && result.data.delete == undefined && result.data.disable != undefined) {
							$rootScope.showAlert("保存成功！新增了" + result.data.add + "个货品！禁用了" + result.data.disable + "个货品！启用了" + result.data.enable + "个货品！");
						} else if(result.data.add == undefined && result.data.delete != undefined && result.data.disable != undefined) {
							$rootScope.showAlert("保存成功！删除了" + result.data.add + "个货品！禁用了" + result.data.delete + "个货品！启用了" + result.data.enable + "个货品！");
						} else {
							$rootScope.showAlert("保存成功！新增了" + result.data.add + "个货品！删除了" + result.data.delete + "个货品！禁用了" + result.data.disable + "个货品！启用了" + result.data.enable + "个货品！");
						}
					}
					$scope.okModalDisabled = false;
					$scope.loadData();
				},
				function(result) {
					$scope.okModalDisabled = false;
				}
			)
	};

	//图片提交
	$scope.okInfoImages = function(dataInfoImages, dataInfoImages2) {
		for(var i = 0; i < dataInfoImages; i++) {
			if(dataInfoImages[i] < 1) {
				return false;
			}
		}
		for(var i = 0; i < dataInfoImages2; i++) {
			if(dataInfoImages2[i] < 1) {
				return false;
			}
		}
		if(undefined != dataInfoImages2) {
			dataInfoImages = dataInfoImages.concat(dataInfoImages2); //数组合并
		}
		GoodsInfoService
			.editImage(dataInfoImages)
			.then(
				function(result) {
					$scope.initEntity();
					$scope.onClickTab('customType.html');
					$scope.loadData();
				}
			)
	};

	//类型属性
	$scope.okModalType = function() {
		$scope.okModalDisabled = true;
		GoodsInfoService
			.editType($scope.selectList)
			.then(
				function(result) {
					//alert("保存成功");
					$scope.initEntity();
					$scope.onClickTab('goodsBrandIds.html');
					$scope.okModalDisabled = false;
					$scope.loadData();
					//$uibModalInstance.close("ok");
				},
				function(result) {
					$scope.okModalDisabled = false;
				}
			)
	}

	/**
	 * 类型属性定义方法
	 */
	$scope.change = function(selectValue, id, name, type) {
		var ids = "";
		if($scope.selectList.length == 0) {
			for(var m = 0; m < $scope.dataEntity.goodsInfoAttr.length; m++) {
				if($scope.dataEntity.goodsInfoAttr[m].goodsTypeAttrId == id) {
					ids = $scope.dataEntity.goodsInfoAttr[m].id;
				}
			}
			$scope.selectList[0] = {
				'id': ids,
				'goodsId': $scope.dataEntity.id,
				'goodsTypeAttrId': id,
				'name': name,
				'value': selectValue,
				'type': type
			};
		} else {
			for(var i = 0; i < $scope.selectList.length; i++) {
				if(id == $scope.selectList[i].goodsTypeAttrId) { //如果goodsTypeAttrId存在了
					$scope.selectList[i].value = selectValue;
					return 0;
				}
			}
			for(var j = 0; j < $scope.dataEntity.goodsInfoAttr.length; j++) {
				if($scope.dataEntity.goodsInfoAttr[j].goodsTypeAttrId == id) {
					ids = $scope.dataEntity.goodsInfoAttr[j].id;
				}
			}
			$scope.selectList.push({
				'id': ids,
				'goodsId': $scope.dataEntity.id,
				'goodsTypeAttrId': id,
				'name': name,
				'value': selectValue,
				'type': type
			});
		}
	};

	//存值                 propsSeclectedOkmodaldata       为保存准备     goodsId goodsPropId  goodsPropAttrId goodsPropAttrValue
	$scope.radioClick = function(id, obj, radioid) { //属性的 radio  输入类型：1 单选输入 attrType==1){//筛选属性  attrType==2){//自定义属性

		obj.idid = id;
	};

	$scope.checkboxClick = function(id, obj) { //属性的 checkbox  输入类型：2 多选输入
		if(obj.idid == undefined) {
			obj.idid = id;
		} else {
			obj.idid += "";
			id += "";
			if(isContains(obj.idid, id)) {
				if(obj.idid.split(',').contains(id)) {
					var a = '';
					for(var i = 0; i < obj.idid.split(',').length; i++) {
						if(obj.idid.split(',')[i] != id) {
							if(a == '') {
								a += obj.idid.split(',')[i];
							} else {
								a += "," + obj.idid.split(',')[i];
							}

						}
					}
					obj.idid = a;
				}
			} else {
				if(obj.idid == id) {
					obj.idid = '';
				} else {
					obj.idid += ',' + id;
				}
			}
		}
	};
	$scope.goodsPropAttrValueChange = function(obj, inputType) { //属性的   输入类型：3 单行输入、4 多行输入、5 数字输入、6 日期输入、7 金额输入    inputType

		obj.value = obj.goodsPropAttrValue;
	}

	/**
	 * 类型属性      保存
	 * @param {Object} obj
	 */
	$scope.propsSeclectedDisabled = false; //按钮 Disabled
	$scope.propsSeclectedOkmodal = function(obj) {

		$scope.propsSeclectedDisabled = true;

		//返回所有未验证通过的表单元素，并标记
		ngVerify.check('myformsp', function(errEls) {

			if(errEls.length == 0) {
				$scope.propsSeclectedOkmodaldata = [];
				////属性的   输入类型：1 单选输入  2 多选输入 3 单行输入、4 多行输入、5 数字输入、6 日期输入、7 金额输入    inputType
				for(var m = 0; m < $scope.propertiesSelectedAttrList.length; m++) {
					if($scope.propertiesSelectedAttrList[m].inputType == 2) {
						var str = $scope.propertiesSelectedAttrList[m].idid + '';
						if(str.indexOf(',') >= 0) {
							for(var q = 0; q < str.split(",").length; q++) {
								$scope.propsSeclectedOkmodaldata.push({
									'id': null,
									'classifyId': $scope.changePropertiesId,
									'goodsId': $scope.dataId,
									'goodsPropId': $scope.propertiesSelectedAttrList[m].propId,
									'goodsPropAttrId': Number(str.split(",")[q]),
									'goodsPropAttrValue': ''
								});
							}
						} else {
							if($scope.propertiesSelectedAttrList[m].idid == undefined) {
								$scope.propertiesSelectedAttrList[m].idid = '';
							}
							$scope.propsSeclectedOkmodaldata.push({
								'id': null,
								'classifyId': $scope.changePropertiesId,
								'goodsId': $scope.dataId,
								'goodsPropId': $scope.propertiesSelectedAttrList[m].propId,
								'goodsPropAttrId': Number($scope.propertiesSelectedAttrList[m].idid),
								'goodsPropAttrValue': ''
							});
						}
					} else if($scope.propertiesSelectedAttrList[m].inputType == 1) {
						if($scope.propertiesSelectedAttrList[m].idid == undefined) {
							$scope.propertiesSelectedAttrList[m].idid = '';
						}
						$scope.propsSeclectedOkmodaldata.push({
							'id': null,
							'classifyId': $scope.changePropertiesId,
							'goodsId': $scope.dataId,
							'goodsPropId': $scope.propertiesSelectedAttrList[m].propId,
							'goodsPropAttrId': Number($scope.propertiesSelectedAttrList[m].idid),
							'goodsPropAttrValue': ''
						});
					} else {
						if($scope.propertiesSelectedAttrList[m].goodsPropAttrValue == undefined) {
							$scope.propertiesSelectedAttrList[m].goodsPropAttrValue = '';
						}
						$scope.propsSeclectedOkmodaldata.push({
							'id': null,
							'classifyId': $scope.changePropertiesId,
							'goodsId': $scope.dataId,
							'goodsPropId': $scope.propertiesSelectedAttrList[m].propId,
							'goodsPropAttrId': '',
							'goodsPropAttrValue': $scope.propertiesSelectedAttrList[m].goodsPropAttrValue,
						});
					}
				}
				for(var i = 0; i < $scope.propsSeclectedOkmodaldata.length; i++) {
					$scope.propsSeclectedOkmodaldata[i].classifyId = $scope.changePropertiesId;
				}
				if($scope.goodsinfoPropId == $scope.changePropertiesId) {
					//$scope.initDataGoodsPropsOkmodel  回显时的值
					for(var i = 0; i < $scope.propsSeclectedOkmodaldata.length; i++) {
						for(var m = 0; m < $scope.initDataGoodsPropsOkmodel.length; m++) {

							if($scope.initDataGoodsPropsOkmodel[m].goodsPropId == $scope.propsSeclectedOkmodaldata[i].goodsPropId && $scope.initDataGoodsPropsOkmodel[m].goodsPropAttrId == $scope.propsSeclectedOkmodaldata[i].goodsPropAttrId) {

								$scope.propsSeclectedOkmodaldata[i].id = $scope.initDataGoodsPropsOkmodel[m].id;
							}
						}
					}
				}

				for(var i = 0; i < $scope.propsSeclectedOkmodaldata.length; i++) {

					if($scope.propsSeclectedOkmodaldata[i].goodsPropAttrId == 0 || $scope.propsSeclectedOkmodaldata[i].goodsPropAttrId == '') {
						$scope.propsSeclectedOkmodaldata[i].goodsPropAttrId = null;
					}
					if($scope.propsSeclectedOkmodaldata[i].goodsPropAttrValue == 0 || $scope.propsSeclectedOkmodaldata[i].goodsPropAttrValue == '') {
						$scope.propsSeclectedOkmodaldata[i].goodsPropAttrValue = null;
					}
				}
				//修改商品属性信息       保存
				GoodsInfoService
					.editprops($scope.propsSeclectedOkmodaldata)
					.then(
						function(result) {
							$scope.initEntity();
							$scope.onClickTab("goodsBrandIds2.html");
							$scope.propsSeclectedDisabled = false;
						},
						function(result) {
							$scope.initEntity();
							$scope.onClickTab("goodsBrandIds2.html");
							$scope.propsSeclectedDisabled = false;
						});
			}
		});
	};

	/**
	 * 归类下拉框    归类改变的时候
	 * @param {Number} id
	 */

	$scope.changeProperties = function(id) {
		if(id == undefined || id == null || id == '') {
			id = 0;
		}
		if(id == 0) {
			return false; //选择请选择时   无反应
		} else {
			$scope.changePropertiesId = id;
			//查找归类下的属性信息
			GoodsInfoService
				.findprops(id)
				.then(
					function(result) {
						$scope.propertiesSelectedAttrList = result.data;
						if($scope.varcishu == 0) {
							$scope.varcishu = 1;
							for(var i = 0; i < $scope.propertiesSelectedAttrList.length; i++) {
								for(var m = 0; m < $scope.initDataGoodsProps.length; m++) {
									if($scope.propertiesSelectedAttrList[i].propId == $scope.initDataGoodsProps[m].goodsPropId) {
										if($scope.propertiesSelectedAttrList[i].inputType == 1) {
											$scope.propertiesSelectedAttrList[i].idid = $scope.initDataGoodsProps[m].goodsPropAttrId;
										} else if($scope.propertiesSelectedAttrList[i].inputType == 2) {
											if($scope.propertiesSelectedAttrList[i].idid == undefined || $scope.propertiesSelectedAttrList[i].idid == null || $scope.propertiesSelectedAttrList[i].idid == '') {
												$scope.propertiesSelectedAttrList[i].idid = $scope.initDataGoodsProps[m].goodsPropAttrId + "";
											} else {
												$scope.propertiesSelectedAttrList[i].idid += "," + $scope.initDataGoodsProps[m].goodsPropAttrId;
											}
										} else if($scope.propertiesSelectedAttrList[i].inputType == 5) {
											$scope.propertiesSelectedAttrList[i].goodsPropAttrValue = Number($scope.initDataGoodsProps[m].goodsPropAttrValue);
										} else if($scope.propertiesSelectedAttrList[i].inputType == 7) {
											$scope.propertiesSelectedAttrList[i].goodsPropAttrValue = Number($scope.initDataGoodsProps[m].goodsPropAttrValue);
										} else {
											$scope.propertiesSelectedAttrList[i].goodsPropAttrValue = $scope.initDataGoodsProps[m].goodsPropAttrValue;
										}
									}
								}
							}
						}
					},
					function(result) {

					});
		}

	};
	//-------------------------------------------------------------
	//单击选中的
	$scope.selectedGoodsClick = [];
	//右边的   单击选中的
	$scope.removeGoodsClick = [];
	//右边的已经选中的
	$scope.selectedGoods = [];
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
		value.name = res.name;
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
	//-------------------------------------------------------------------------------------

	// 标签页click事件
	$scope.imgHide = false; //隐藏图片上传
	$scope.onClickTab = function(url) {
		$scope.currentTab = url;
		if('customType.html' == url) {
			$scope.imgHide = true;
		} else {
			$scope.imgHide = false;
		}
		if('goodsSpecIds.html' == url) { //规格
			GoodsInfoService
				.allspecs($scope.selectList)
				.then(
					function(result) {
						$scope.goodsSpecIdsList = result.data;
						if($scope.selectedGoodsidInit.length > 0) {
							for(var p = 0; p < $scope.goodsSpecIdsList.length; p++) {
								if($scope.selectedGoodsidInit.contains($scope.goodsSpecIdsList[p].id)) {
									$scope.selected($scope.goodsSpecIdsList[p]);
								}
							}
						}

					},
					function(result) {

					}
				)
		}
		if('goodsBrandIds2.html' == url) { //类型属性2
			$scope.goodsBrandList = []; //归类  的下拉框
			$scope.propertiesSelectedAttrList = []; //属性名称 的选中的属性名称列
			$scope.propertiesSelectedAttrListId = []; //属性名称 的选中的属性名称列  的ID
			//获取可用归类列表
			GoodsInfoService
				.availableclassifies()
				.then(
					function(result) {
						$scope.goodsBrandList = result.data;
						//查找商品属性信息
						GoodsInfoService
							.findgoodsprops($scope.dataId)
							.then(
								function(result) {
									$scope.initDataGoodsProps = result.data;
									$scope.initDataGoodsPropsOkmodel = clone($scope.initDataGoodsProps); //用于保存时做对比

									if(result.data.length > 0) {
										$scope.changeProperties($scope.initDataGoodsProps[0].classifyId, 1);
										$scope.goodsPropertiesObjId = $scope.initDataGoodsProps[0].classifyId; //归类回显
										$scope.goodsinfoPropId = $scope.initDataGoodsProps[0].classifyId;
										$scope.listcontains = [];
										for(var i = 0; i < $scope.initDataGoodsProps.length; i++) {
											var str = $scope.initDataGoodsProps[i].goodsPropId + '-' + $scope.initDataGoodsProps[i].goodsPropAttrId + '-' + $scope.initDataGoodsProps[i].classifyId;
											$scope.listcontains.push(str);
										}
										$scope.varcishu = 0;
									} else {
										$scope.changeProperties(0, 1);
										$scope.goodsPropertiesObjId = null; //归类回显
									}

								},
								function(result) {

								});
					},
					function(result) {

					});

			$scope.propsSeclectedOkmodaldata = [];
		}
	}

	$scope.initEntity();
}

/**
 * OSS图片上传  弹出框
 * @param $scope
 * @param $filter
 * @param GoodsInfoService
 */
function goodsInfoOssFormModalController($scope, $filter, GoodsInfoService) {
	if($scope.dataIdOss != null && $scope.dataIdOss != undefined && $scope.dataIdOss != "") {
		$scope.idData = imgPathGoods + '/' + $scope.dataIdOss + '/rotation'; //轮播图
	} else {
		$rootScope.showAlert("出错了！");
	}

}

/**
 * 规格 图片上传 List 弹出框
 * @param $scope
 * @param GoodsInfoService
 */
function goodsInfoSpecOssFormModalListController($scope, GoodsInfoService, ngDialog) {
	/**
	 * 弹出 规格图片上传 模态框
	 * @param {Object} id
	 */
	$scope.openModalSpecOss = function(id) {
		$scope.dataIdSpecOss = id.split(';')[1];
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsInfoSpecOssModal.html',
			className: 'ngdialog-theme-default',
			controller: 'goodsInfoSpecOssFormModalController',
			scope: $scope,
			width: 1150
		});
	};

	/**
	 * 数据回显  初始化   
	 * 查找需要上传主图的规格信息
	 */
	$scope.initDataEntity = function() {
		//查找需要上传主图的规格信息
		GoodsInfoService
			.findneedimagespecs($scope.dataId)
			.then(
				function(result) {
					$scope.specInfoList = [];
					for(var key in result.data) {
						$scope.specInfoList.push({
							'id': key,
							'value': result.data[key]
						})
					}

					//$scope.specInfoList = result.data;
				},
				function(result) {

				});
	}
	$scope.initDataEntity();
}
/**
 * 规格 图片上传  弹出框
 * @param $scope
 * @param GoodsInfoService
 */
function goodsInfoSpecOssFormModalController($scope, GoodsInfoService, $rootScope) {
	if($scope.dataIdSpecOss != null && $scope.dataIdSpecOss != undefined && $scope.dataIdSpecOss != "") {
		$scope.idData = imgPathGoods + '/' + $scope.dataId + '/spec/' + $scope.dataIdSpecOss; //规格 主图 图片
	} else {
		$rootScope.showAlert("规格图片上传出错了,请联系管理员！");
	}

	//关闭弹窗
	$scope.cancelModal2 = function() {
		$scope.dialog.close();
	};
	//上传货品主图   保存到数据库
	$scope.okModalOssSpec = function() {
		if($scope.okModalOssSpecDisabled == true) {
			return false;
		}
		$scope.okModalOssSpecDisabled = true;
		if(imgPathSpec.length < 1) {
			$rootScope.showAlert("请上传图片！");
			$scope.okModalOssSpecDisabled = false;
			return false;
		}
		GoodsInfoService
			.updatemasterimage($scope.dataIdSpecOss, imgPathSpec[0], $scope.dataId)
			.then(
				function(result) {
					$scope.cancelModal2();
					$scope.initDataEntity();
					$scope.okModalOssSpecDisabled = false;
					imgPathSpec = [];
				},
				function(result) {
					$scope.okModalOssSpecDisabled = false;
				});
	}
}

var imgPath = [];

function disabled() {
	var piclist = document.getElementsByClassName("pic_list");
	var bool = true;
	for(var i = 0; i < piclist.length; i++) {
		if($(".progress").width() == 160) {

		} else {
			bool = false;
		}
	}
	if(bool) {
		document.getElementById("ifSucessShow").disabled = false;
	} else {
		document.getElementById("ifSucessShow").disabled = true;
	}
}

function setImgInfoPath(res) {
	imgPath.push(res);
	disabled();
}

var imgPathSpec = [];

function setImgGoodsSpecPath(res) {
	imgPathSpec.push(res);
	$("#ossbrandimg").removeAttr("disabled");
	if(listattr.length == 1) {} else {
		var img = document.getElementsByClassName('pic_list');
		for(var i = 0; i < img.length; i++) {
			if(i != 0) {
				img[i].style.display = 'none';
			}
		}
	}
}

function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
}

angular
	.module('managerApp')
	.controller('GoodsInfoController', GoodsInfoController)
	.controller('goodsInfoFormModalController', goodsInfoFormModalController)
	.controller('goodsInfoOssFormModalController', goodsInfoOssFormModalController)
	.controller('goodsInfoSpecOssFormModalController', goodsInfoSpecOssFormModalController)
	.controller('goodsInfoSpecOssFormModalListController', goodsInfoSpecOssFormModalListController)