/**
 * Created by shy on 2016/12/12.
 */
/**
 * 系统用户controller定义
 */
function GoodsStateController($scope, $q, constPageSize, goodsReminder, $rootScope, GoodsStateService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.stateNameSearch = ""; //搜索关键词
	$scope.WdatePicker = {}; //WdatePicker时间
	$scope.userId = localStorage.userId;
	$scope.showorhide = false;
	$scope.okModalDisabled = false; //保存按钮的disabled

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var name1 = $scope.stateNameSearch;
		GoodsStateService.find(name1, currentPaseSize, currentPageNo).then(
			function(result) {
				$scope.stateList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			});
		return defer.promise;
	};

	//跳转预览页面
	$scope.gotoGoodsDetail = function(goodsId) {
		if(goodsId !== null && goodsId !== undefined) {
			window.open(constMallLocation + "/goodsPreview.html?id=" + goodsId, "_blank");
		}
	};

	$scope.passByValue = function(id) {
		GoodsStateService.findgoodsinfoauditbyid(id).then(
			function(result) {
				$scope.priceList = result.data;
				if($scope.priceList.length > 0) {
					$scope.showorhide = true;
				} else {
					$scope.showorhide = false;
				}
			});
	};

	/**
	 * 启用
	 * @param id
	 */
	$scope.enable = function(id) {
		var reminder; //提示语
		reminder = goodsReminder.goodsState.enable;
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
			var res = {
				'id': id
			};
			GoodsStateService.enabled(res).then(
				function(result) {
					$scope.loadData();
				});
		}, function(reason) {

		});
	};
	/**
	 * 禁用
	 * @param id
	 */
	$scope.forbidden = function(id) {
		var reminder; //提示语
		reminder = goodsReminder.goodsState.forbidden;
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
			var res = {
				'id': id
			};
			GoodsStateService.goodsbystate(res).then(
				function(result) {
					$scope.loadData();
				});
		}, function(reason) {

		});
	};
	/**
	 * 维护
	 * @param id
	 */
	$scope.safeguard = function(id) {
		var reminder; //提示语
		reminder = goodsReminder.goodsState.repair;
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
			var res = {
				'id': id
			};
			GoodsStateService.repairgoodsbyid(res).then(
				function(result) {
					$scope.loadData();
				});
		}, function(reason) {});
	};
	/**
	 * 上架
	 * @param id
	 */
	$scope.putaway = function(id,goodsBrandId,goodsCateId) {
		$('html, body').animate({
			scrollTop: 0
		}, 'fast');
		$scope.dataId = id;
		$scope.dataGoodsBrandId = goodsBrandId;
		$scope.dataGoodsCateId = goodsCateId;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsStateAddModal.html',
			className: 'ngdialog-theme-default',
			controller: 'GoodsStateAddModalController',
			scope: $scope,
			width: 1024
		})
	};

	/**
	 * 弹出修改数据模态框
	 */
	$scope.openModal = function(dataId, goodsName) {
		$('html, body').animate({
			scrollTop: 0
		}, 'fast');
		$scope.dataId = dataId;
		$scope.goodsId = dataId;
		$scope.goodsName = goodsName;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsStateModal.html',
			className: 'ngdialog-theme-default',
			controller: 'GoodsStateModalController',
			scope: $scope,
			width: 1124
		})
	};

	/**
	 * 弹出 审核列表  模态框
	 */
	$scope.auditlist = function(dataId, name1) {
		$('html, body').animate({
			scrollTop: 0
		}, 'fast');
		$scope.dataId = dataId;
		$scope.name1 = name1;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsAuditModalList.html',
			className: 'ngdialog-theme-default',
			controller: 'GoodsAuditListController',
			scope: $scope,
			width: 1024
		})
	};

	//取消
	$scope.cancelModal = function() {
		//$scope.loadData();
		$scope.dialog.close();
	};

};
/**
 * 用户修改弹出页面controller定义
 */
function GoodsStateModalController($scope, $rootScope, GoodsStateService, ngDialog) {
	$scope.dataEntity = new Array();
	$scope.originalValue = new Array();
	$scope.ifShowSpec2 = false;
	$scope.ifShowSelected = false; //货品信息
	$scope.isIf = false;
	$scope.index = 0;
	$scope.basePriceRadio = false;

	$scope.initEntity = function() {
		GoodsStateService.get($scope.dataId)
			.then(
				function(result) {
					if(result.data.length == 0) {
						$rootScope.showAlert("该货品信息没有填写");
						$scope.dialog.close();
					}

					if(result.data.length > 0) {
						$scope.originalValue = clone(result.data);
						$scope.dataEntity = clone(result.data);

						$scope.isSpec = result.data[0].isSpec;
						$scope.isSpecName = result.data[0].name;

						if(result.data[0].costPrice != 0) {
							$scope.isIf = true;
							$scope.checkedRadio(result.data[0].priceStatus, $scope.isIf);
						} else {
							$scope.isIf = false;
							$scope.checkedRadio(result.data[0].priceStatus, $scope.isIf);
							//$scope.checkedRadio(1, $scope.isIf);
						}
						if($scope.isSpec == 2) { //启用规格时
							$scope.ifShowSpec2 = true;
						} else { //未启用规格时
							$scope.ifShowSpec2 = false;
							//$scope.ifShowSelected = true;
							$scope.ifShowData(0);
						}
					}
				});
	};

	/**
	 * 输入WEB价格后，自动添加导后两个价格（WAP APP）
	 */
	$scope.blurChange = function() {
		if($scope.dataProductEntity.salesWapPrice == 0) {
			$scope.dataProductEntity.salesWapPrice = $scope.dataProductEntity.salesWebPrice;
		}
		if($scope.dataProductEntity.salesAppPrice == 0) {
			$scope.dataProductEntity.salesAppPrice = $scope.dataProductEntity.salesWebPrice;
		}
	};

	/**
	 * 输入成本价后，如果销售底价计算规则    dataProductEntity.priceStatus =='1'"    系统计算
	 */
	$scope.costPriceBlurChange = function() {
		$scope.checkedRadio($scope.dataProductEntity.priceStatus, $scope.isIf);
	};
	//防止火狐的时候  ng-verify 验证出错 自己覆盖掉做一次验证
	$scope.firefoxVerifyChange = function() {
		if($scope.isIf) { //不是第一次填写价格  数据在 $scope.dataProductEntitys
			if($scope.dataProductEntitys.salesWebPrice > 0 &&
				$scope.dataProductEntitys.salesWapPrice > 0 &&
				$scope.dataProductEntitys.salesAppPrice > 0 &&
				$scope.dataProductEntitys.costPrice > 0 &&
				$scope.dataProductEntitys.basePrice > 0) {
				//alert("不是第一次填写价格  数据在 $scope.dataProductEntitys");
				setTimeout(function() {
					$("#firefoxVerifyChange").removeAttr("disabled");
				}, 500); //500毫秒后执行test()函数，只执行一次。要在ng-verify之后执行
			}
		} else { //第一次填写价格  数据在 $scope.dataProductEntity
			if($scope.dataProductEntity.salesWebPrice > 0 &&
				$scope.dataProductEntity.salesWapPrice > 0 &&
				$scope.dataProductEntity.salesAppPrice > 0 &&
				$scope.dataProductEntity.costPrice > 0 &&
				$scope.dataProductEntity.basePrice > 0) {
				setTimeout(function() {
					$("#firefoxVerifyChange").removeAttr("disabled");
				}, 500); //500毫秒后执行test()函数，只执行一次。
			}
		}
	};

	$scope.checkedRadio = function(n, isIf) {
		if(n == 1) {
			$scope.basePriceRadio = true;
			if(isIf) {
				$scope.originalValue[$scope.index].basePrice = $scope.originalValue[$scope.index].basepriceProportion.mul($scope.originalValue[$scope.index].costPrice).toFixed(2);

			} else {
				$scope.dataEntity[$scope.index].basePrice = $scope.dataEntity[$scope.index].basepriceProportion.mul($scope.dataEntity[$scope.index].costPrice).toFixed(2);

			}
		} else {
			$scope.basePriceRadio = false;
		}

		if($scope.dataProductEntity != undefined) {
			$scope.dataProductEntity.priceStatus = n;
		}

		if(isIf) {
			$scope.originalValue[$scope.index].priceStatus = n;
		} else {
			$scope.dataEntity[$scope.index].priceStatus = n;
		}
	};

	//选择 radio
	$scope.ifShowData = function(n) {
		$scope.index = n;
		$scope.ifShowSelected = true; //货品信息
		$scope.dataProductEntity = $scope.dataEntity[n];
		$scope.dataProductEntitys = $scope.originalValue[n];
		if($scope.isIf) {
			$scope.checkedRadio($scope.originalValue[$scope.index].priceStatus, $scope.isIf);
		} else {
			$scope.checkedRadio($scope.dataEntity[$scope.index].priceStatus, $scope.isIf);
		}
	}
	//提交审核
	$scope.okModal = function() {
		$scope.okModalDisabled = true;
		$scope.updateName = localStorage.userName;
		$scope.updateId = localStorage.userId;
		//提交审核人的ID
		for(var i = 0; i < $scope.originalValue.length; i++) {
			$scope.originalValue[i].userId = $scope.userId;
		}
		for(var i = 0; i < $scope.dataEntity.length; i++) {
			$scope.dataEntity[i].userId = $scope.userId;
		}

		if(!$scope.isIf) {
			var dataisIf = clone($scope.dataEntity); //防止提交的一瞬间用户看到  另一个规格消失的情况（多规格商品）
			for(var i = 0; i < dataisIf.length; i++) {
				if(dataisIf[i].costPrice == 0) { //
					dataisIf.remove22(i); //删除下标为i的对象 
					i--;
				}
			}
			//goods_name，goods_id update_name update_id
			/*$scope.goodsId = dataId;
			$scope.goodsName = goodsName;*/
			for(var i = 0; i < dataisIf.length; i++) {
				if(PriceVerify(dataisIf[i])) {
					$rootScope.showAlert("销售价必须大于等于销售低价，销售低价必须大于等于成本价，销售价必须大于成本价！");
					$scope.okModalDisabled = false;
					return 0;
				}
			}
			GoodsStateService.auditgoods(dataisIf, $scope.goodsName, $scope.goodsId, $scope.updateName, $scope.updateId)
				.then(
					function(result) {
						$scope.dialog.close();
						$scope.loadData();
						$scope.okModalDisabled = false;
					},
					function(result) {
						$scope.dialog.close();
						$scope.okModalDisabled = false;
					});
		} else {
			var a = 0;
			for(var i = 0; i < $scope.dataEntity.length; i++) {
				$scope.dataEntity[i].userId = $scope.userId;
				if(compareObject($scope.dataEntity[i], $scope.originalValue[a])) {
					$scope.originalValue.splice(a, 1);
					a--;
				}
				a++;
			}
			a = 0;
			for(var i = 0; i < $scope.originalValue.length; i++) {
				if($scope.originalValue[i].costPrice == 0) { //
					$scope.originalValue.remove22(i); //删除下标为i的对象 
					i--;
				}
			}

			if($scope.originalValue.length == 0) {
				$rootScope.showAlert("数据没有做更改，提交失败！");
				$scope.okModalDisabled = false;
				//$scope.dialog.close();
				//初始化
				$scope.initEntity();
				//$scope.openModal($scope.dataId,$scope.goodsName);
				return 0;
			} //(dataisIf, $scope.goodsName, $scope.goodsId, $scope.updateName, $scope.updateId)
			for(var i = 0; i < $scope.originalValue.length; i++) {
				if(PriceVerify($scope.originalValue[i])) {
					$rootScope.showAlert("销售价必须大于等于销售低价，销售低价必须大于等于成本价，销售价必须大于成本价！");
					$scope.okModalDisabled = false;
					return 0;
				}
			}
			GoodsStateService.auditgoods($scope.originalValue, $scope.goodsName, $scope.goodsId, $scope.updateName, $scope.updateId)
				.then(
					function(result) {
						$scope.loadData();
						$scope.okModalDisabled = false;
						$scope.dialog.close();
					},
					function(result) {
						$scope.dialog.close();
						$scope.okModalDisabled = false;
					});
		}
	}
	//初始化
	$scope.initEntity();

}
/**
 * 弹出页面controller定义    上架时间
 */
function GoodsStateAddModalController($scope, $rootScope, GoodsStateService, ngDialog) {
	$scope.WdatePicker.minDateTime = "";
	$scope.okModal = function() {
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		if(undefined == $scope.WdatePicker.minDateTime) {
			$scope.WdatePicker.minDateTime = "";
		}
		if(undefined == $scope.WdatePicker.dataTime) {
			$scope.WdatePicker.dataTime = "";
		}
		$scope.res = {
			'id': $scope.dataId,
			'addTime': $scope.WdatePicker.minDateTime,
			'downDate': $scope.WdatePicker.dataTime,
			'upUserId': localStorage.userId,
			'goodsBrandId': $scope.dataGoodsBrandId,
			'goodsCateId': $scope.dataGoodsCateId
		};
		if($scope.res.addTime == "") {
			$rootScope.showAlert("上架时间不能为空");
			$scope.okModalDisabled = false;
			return 0;
		}
		if($scope.res.downDate != "") {
			if($scope.res.downDate.comps($scope.res.addTime)) {

			} else {
				$rootScope.showAlert("下架时间必须大于上架时间！");
				$scope.okModalDisabled = false;
				return 0;
			}
		}

		GoodsStateService.salegoodsbyid($scope.res)
			.then(
				function(result) {
					$scope.loadData();
					$scope.okModalDisabled = false;
					$scope.dialog.close();
				},
				function(result) {
					$scope.dialog.close();
					$scope.okModalDisabled = false;
				});
	}
}
/**
 * 弹出页面    审核列表   controller定义  
 */
function GoodsAuditListController($scope, $q, $rootScope, constPageSize, GoodsStateService) {
	//弹窗 分页
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		GoodsStateService
			.findgoodsinfoaudit($scope.dataId, currentPaseSize, currentPageNo)
			.then(
				function(result) {
					$scope.infoauditList = result.data;
					if(result.data.length == 0) {
						//$scope.dialog.close();
						return 0;
					}
					$scope.passByValue($scope.infoauditList[0].id);
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
	.controller('GoodsStateController', GoodsStateController)
	.controller('GoodsStateModalController', GoodsStateModalController)
	.controller('GoodsAuditListController', GoodsAuditListController)
	.controller('GoodsStateAddModalController', GoodsStateAddModalController);

//判断object是否相等
/*function equals(x, y) {
	var in1 = x instanceof Object;
	var in2 = y instanceof Object;
	if(!in1 || !in2) {
		return x === y;
	}
	if(Object.keys(x).length !== Object.keys(y).length) {
		return false;
	}
	for(var p in x) {
		var a = x[p] instanceof Object;
		var b = y[p] instanceof Object;
		if(a && b) {
			return equals(x[p], y[p]);
		} else if(x[p] !== y[p]) {
			return false;
		}
	}

	return true;
}*/

//alert(equals([{a:1,b:2}],[{a:1,b:2}]));//true

/** 
 *删除数组指定下标或指定对象 
 */
Array.prototype.remove22 = function(obj) {
	for(var i = 0; i < this.length; i++) {
		var temp = this[i];
		if(!isNaN(obj)) {
			temp = i;
		}
		if(temp == obj) {
			for(var j = i; j < this.length; j++) {
				this[j] = this[j + 1];
			}
			this.length = this.length - 1;
		}
	}
}

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch(e) {}
	try {
		m += s2.split(".")[1].length
	} catch(e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function(arg) {
	return accMul(arg, this);
};

cmp = function(x, y) {
	// If both x and y are null or undefined and exactly the same 
	if(x === y) {
		return true;
	}

	// If they are not strictly equal, they both need to be Objects 
	if(!(x instanceof Object) || !(y instanceof Object)) {
		return false;
	}

	//They must have the exact same prototype chain,the closest we can do is
	//test the constructor. 
	if(x.constructor !== y.constructor) {
		return false;
	}

	for(var p in x) {
		//Inherited properties were tested using x.constructor === y.constructor
		if(x.hasOwnProperty(p)) {
			// Allows comparing x[ p ] and y[ p ] when set to undefined 
			if(!y.hasOwnProperty(p)) {
				return false;
			}

			// If they have the same strict value or identity then they are equal 
			if(x[p] === y[p]) {
				continue;
			}

			// Numbers, Strings, Functions, Booleans must be strictly equal 
			if(typeof(x[p]) !== "object") {
				return false;
			}

			// Objects and Arrays must be tested recursively 
			if(!Object.equals(x[p], y[p])) {
				return false;
			}
		}
	}

	for(p in y) {
		// allows x[ p ] to be set to undefined 
		if(y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
			return false;
		}
	}
	return true;
};

function compareObject(x, y) {
	try {
		if(x.salesWebPrice != y.salesWebPrice) {
			return false;
		}
		if(x.salesWapPrice != y.salesWapPrice) {
			return false;
		}
		if(x.salesAppPrice != y.salesAppPrice) {
			return false;
		}
		if(x.basePrice != y.basePrice) {
			return false;
		}
		if(x.costPrice != y.costPrice) {
			return false;
		}
		if(x.stockWarning != y.stockWarning) {
			return false;
		}
		if(x.weight != y.weight) {
			return false;
		}
		/*if(x.priceStatus != y.priceStatus) {//是否系统计算
			return false;
		}*/
		return true;
	} catch(e) {
		return false;
	}
}

function PriceVerify(obj) {
	try {
		if(Number(obj.salesWebPrice) < Number(obj.basePrice)) {
			return true;
		}
		if(Number(obj.salesWapPrice) < Number(obj.basePrice)) {
			return true;
		}
		if(Number(obj.salesAppPrice) < Number(obj.basePrice)) {
			return true;
		}
		if(Number(obj.basePrice) < Number(obj.costPrice)) {
			return true;
		}
		if(Number(obj.salesWebPrice) == Number(obj.costPrice)) {
			return true;
		}
		if(Number(obj.salesWapPrice) == Number(obj.costPrice)) {
			return true;
		}
		if(Number(obj.salesAppPrice) == Number(obj.costPrice)) {
			return true;
		}
		return false;
	} catch(e) {
		return true;
	}
}