angular
	.module('managerApp')
	.controller('GoodsCateController', GoodsCateController)
	.controller('GoodsCateModalController', GoodsCateModalController)

function GoodsCateController($rootScope, $scope, $http, $q, constPageSize, GoodsCateService, ngDialog) {
	$scope.isShowEdit = false; //当点击修改及添加时显示信息框
	$scope.isShowBtn = true; //默认显示编辑按钮
	$scope.isShowBtn1 = false;
	$scope.saveMessage = {}; //用来存储修改或者添加的数据
	$scope.MessageInfo = ""; //存储提示信息，如选择分类
//	$scope.initType = ""; //select下拉框默认显示相应类型
	$scope.status = 1;
	$scope.thirdShow = false;	//四种比例是否显示
	$scope.data = {};
	//获取所有列表
	$scope.find = function() {
		var defer = $q.defer();
		GoodsCateService
			.find(2)
			.then(
				function(result) {
					//树形结构图进行配置
					$scope.treeConfig = {
						'plugins': ['types', 'dnd'],
						'types': {
							'default': {
								'icon': 'glyphicon glyphicon-file'
							}
						},
						version: 1
					};
					$scope.treeData = result.data; //将获取到的数据进行赋值，与DOM进行数据绑定
				}
			)
	}
	//刷新树形数据
	$scope.loadTree = function() {
		this.treeConfig.version++;
	}
	//弹出框
	$scope.promptDialog = function() {
		$scope.dialog = ngDialog.open({
			template: 'modalDialogId',
			className: 'ngdialog-theme-default',
			scope: $scope,
			width: 240

		})
	}
	//点击确定关闭弹出框
	$scope.closeThisDialog = function() {
		$scope.dialog.close()
	}
	//获取所有类型
//	$scope.findAllType = function() {
//		GoodsCateService
//			.findAllType()
//			.then(
//				function(result) {
//					$scope.allType = result.data;
//				}
//			)
//	}
	//根据typeId查取分类类型
//	$scope.findType = function(typeId) { // 接收点击id
//		GoodsCateService
//			.findType(typeId)
//			.then(
//				function(result) {
//					$scope.initType = result.data.goodsType.id;
//				}
//			)
//	}
	//根据id查找分类
	$scope.findId = function(index) { // 接收点击id
		GoodsCateService
			.findId(index)
			.then(
				function(result) {
//					$scope.findType(result.data.typeId)
					$scope.isShowEdit = true;
					$scope.isShowBtn = true;
					$scope.isShowBtn1 = false;
					$scope.isShowBtn2 = false;
					$scope.currentNode = result.data; //获取当前点击节点;
					//获取父节点名字
					if($scope.currentNode.pid == 0) {
						$scope.parentName = "";
					} else {
						for(var i = 0; i < $scope.treeData.length; i++) { //点击的id查询数据库，取到父节点名字
							if($scope.currentNode.pid == $scope.treeData[i].id) {
								$scope.parentName = $scope.treeData[i].text;
							}
						}
					}
					$scope.currentNodeName = $scope.currentNode.name;
					$scope.id = $scope.currentNode.id;
					$scope.pid = $scope.currentNode.pid;
					$scope.sort = $scope.currentNode.sort;
					$scope.status = $scope.currentNode.status;
					$scope.data.basepriceProportion = $scope.currentNode.basepriceProportion;
					$scope.data.prescriptionCommission = $scope.currentNode.prescriptionCommission;
					$scope.data.nonprescriptionCommission = $scope.currentNode.nonprescriptionCommission;
					$scope.data.othersCommission = $scope.currentNode.othersCommission;
					$scope.path = $scope.currentNode.path.split("/")[0];
					if($scope.path == 3) {
						angular.element("#disabledShow").addClass("disabled");
						$scope.ifShowThird = true;
						$scope.thirdShow = true;
					} else {
						$scope.ifShowThird = false;
//						$scope.initType = "";
						$scope.thirdShow = false;
						angular.element("#disabledShow").removeClass("disabled");
					}

				}
			)
	}
	//选择类型
//	$scope.changeType = function(typeIdChange) {
//		$scope.currentNode.typeId = typeIdChange;
//	}
	//点击进行修改后的保存
	$scope.saveEditNode = function() {
		//这里是将写入输入框的内容存起来
		if($scope.path == 3) {
			$scope.saveMessage.basepriceProportion = $scope.data.basepriceProportion;
			$scope.saveMessage.prescriptionCommission = $scope.data.prescriptionCommission;
			$scope.saveMessage.nonprescriptionCommission = $scope.data.nonprescriptionCommission;
			$scope.saveMessage.othersCommission = $scope.data.othersCommission
		} else {
			$scope.saveMessage.basepriceProportion = 0;
			$scope.saveMessage.prescriptionCommission = 0;
			$scope.saveMessage.nonprescriptionCommission = 0;
			$scope.saveMessage.othersCommission = 0;
		}
		$scope.saveMessage.id = $scope.id;
		$scope.saveMessage.name = $scope.currentNodeName;
		$scope.saveMessage.path = "1";
		$scope.saveMessage.pid = $scope.pid;
		$scope.saveMessage.sort = $scope.sort;
		$scope.saveMessage.status = $scope.status;
//		$scope.saveMessage.typeId = $scope.currentNode.typeId;
		
		GoodsCateService
			.edit($scope.saveMessage)
			.then(
				function(result) {
					$scope.find();
					$scope.loadTree();
					$scope.isShowEdit = false;
				}
			)

	}
	//添加同级节点
	$scope.addFriendGoods = function() {
		//添加之前判断是否选择了分类
		if($scope.cateId == undefined) {
			$scope.MessageInfo = "请先选择分类";
			$scope.promptDialog()
		}
		if($scope.currentNode.pid == 0) { //判断是否为根节点
			$scope.parentName = "";
		} else {
			for(var i = 0; i < $scope.treeData.length; i++) { //点击的id查询数据库，取到父节点名字
				if($scope.currentNode.pid == $scope.treeData[i].id) {
					$scope.parentName = $scope.treeData[i].text;
				}
			}
		}
		
		//添加时先将所有输入框中的内容清除
		$scope.currentNodeName = "";
		$scope.id = "";
		$scope.pid = "";
		$scope.sort = "";
		$scope.saveMessage.basepriceProportion = "";
		$scope.saveMessage.prescriptionCommission = "";
		$scope.saveMessage.nonprescriptionCommission = "";
		$scope.saveMessage.othersCommission = "";
//		$scope.initType = "";
		$scope.status = 1;
		$scope.pid = "";
		$scope.isShowBtn = false; //显示添加按钮，隐藏修改按钮
		$scope.isShowEdit = true;
		$scope.isShowBtn1 = true;
		$scope.isShowBtn2 = false;
	}
	//添加子级节点
	$scope.addSonGoods = function() {
		if($scope.cateId == undefined) { //添加之前判断是否选择了分类
			$scope.MessageInfo = "请先选择分类";
			$scope.promptDialog()
		}
		if($scope.path == 2) {
			$scope.thirdShow = true;
		} else {
			$scope.thirdShow = false;	
		}
		//添加时先将所有输入框中的内容清除
		$scope.currentNodeName = "";
		$scope.id = "";
		$scope.pid = "";
		$scope.sort = "";
		$scope.commission = "";
//		$scope.initType = "";
		$scope.status = 1;
		$scope.parentName = $scope.currentNode.name; //添加子级点时，父节点为点击分类名
		$scope.isShowBtn = false; //显示添加按钮，隐藏修改按钮
		$scope.isShowEdit = true;
		$scope.isShowBtn1 = false;
		$scope.isShowBtn2 = true;
	}
	//保存添加同级节点
	$scope.saveAddFriendNode = function() {
		//这里是将写入输入框的内容存起来
		if($scope.path == 3) {
			$scope.saveMessage.basepriceProportion = $scope.data.basepriceProportion;
			$scope.saveMessage.prescriptionCommission = $scope.data.prescriptionCommission;
			$scope.saveMessage.nonprescriptionCommission = $scope.data.nonprescriptionCommission;
			$scope.saveMessage.othersCommission = $scope.data.othersCommission
		} else {
			$scope.saveMessage.basepriceProportion = 0;
			$scope.saveMessage.prescriptionCommission = 0;
			$scope.saveMessage.nonprescriptionCommission = 0;
			$scope.saveMessage.othersCommission = 0;
		}
		$scope.saveMessage.id = $scope.id;
		$scope.saveMessage.name = $scope.currentNodeName;
		$scope.saveMessage.path = "1";
		$scope.saveMessage.pid = $scope.currentNode.pid; //只保留父节点
		$scope.saveMessage.sort = $scope.sort;
		$scope.saveMessage.status = $scope.status;
//		$scope.saveMessage.typeId = $scope.currentNode.typeId;
		
		GoodsCateService
			.postGoods($scope.saveMessage)
			.then(
				function(result) {
					$scope.isShowEdit = false; //隐藏展示信息区域
					$scope.find();
					$scope.loadTree()
						//添加成功后清空信息
					$scope.currentNodeName = "";
					$scope.path = "";
					$scope.id = "";
					$scope.pid = "";
//					$scope.typeID = "";
					$scope.sort = "";
					$scope.status = "";
					$scope.saveMessage.basepriceProportion = "";
					$scope.saveMessage.prescriptionCommission = "";
					$scope.saveMessage.nonprescriptionCommission = "";
					$scope.saveMessage.othersCommission = "";
//					$scope.initType = "";
				}
			)
	}
	//选择筛选属性
	$scope.showAttrSelect = function(){

//		$scope.dataId = dataId;
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
			template: 'views/goods/GoodsCateModal.html',
            className: 'ngdialog-theme-default',
            controller: 'GoodsCateModalController',
            scope: $scope,
            width: 1200
        })
	}
//	$scope.showAttrSelect()
	//保存添加子级节点
	$scope.saveAddSonNode = function() {
		//先获取输入内容
		if($scope.path == 2) {
			$scope.saveMessage.basepriceProportion = $scope.data.basepriceProportion;
			$scope.saveMessage.prescriptionCommission = $scope.data.prescriptionCommission;
			$scope.saveMessage.nonprescriptionCommission = $scope.data.nonprescriptionCommission;
			$scope.saveMessage.othersCommission = $scope.data.othersCommission
		} else {
			$scope.saveMessage.basepriceProportion = 0;
			$scope.saveMessage.prescriptionCommission = 0;
			$scope.saveMessage.nonprescriptionCommission = 0;
			$scope.saveMessage.othersCommission = 0;
		}
		$scope.saveMessage.name = $scope.currentNodeName;
		$scope.saveMessage.id = $scope.id;
		$scope.saveMessage.pid = $scope.currentNode.id;
//		$scope.saveMessage.typeId = $scope.currentNode.typeId;
		
		$scope.saveMessage.sort = $scope.sort;
		$scope.saveMessage.status = $scope.status;
		$scope.saveMessage.path = "1";
		GoodsCateService
			.postGoods($scope.saveMessage)
			.then(
				function(result) {
					$scope.isShowEdit = false; //隐藏展示信息区域
					$scope.find();
					$scope.loadTree();
					//添加成功后清空信息
					$scope.currentNodeName = "";
					$scope.id = "";
					$scope.pid = "";
					$scope.sort = "";
					$scope.saveMessage.basepriceProportion = "";
					$scope.saveMessage.prescriptionCommission = "";
					$scope.saveMessage.nonprescriptionCommission = "";
					$scope.saveMessage.othersCommission = "";
					$scope.status = "";
				}
			)
	}
	//取消保存
	$scope.cancleSave = function() {
		$scope.isShowEdit = false; //隐藏展示信息区域
	}
	//初始化菜单
	$scope.find();
	//初始化所有类型
	$scope.nodeclickCB = function(e) {
		$scope.checkArray = $scope.treeInstance.jstree(true).get_selected(); //获取点击菜单的id，为数组形式
		$scope.cateId = $scope.checkArray[0];
		if($scope.cateId != undefined) { //判断取到的id是否为undifined，不为undifined则再进行操作
			$scope.findId($scope.cateId);
		}
	};
}
function GoodsCateModalController($rootScope, $scope, $q, constPageSize, GoodsCateService, ngDialog,goodsReminder ){
	//弹窗 分页
	$scope.propName = ""
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		GoodsCateService
			.search(currentPaseSize, currentPageNo,$scope.propName)
			.then(
				function(result) {
					console.log(result)
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
			if($scope.selectedGoods[i].propId != undefined && $scope.selectedGoods[i].propId != null && $scope.selectedGoods[i].propId != ""){
				$scope.selectedGoodsid.push($scope.selectedGoods[i].propId);
			}else{
				$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
			}
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);
		if($.inArray(res.propId, $scope.removeGoodsClickid) == 0) {
			$scope.removeGoodsClickid.remove(res.propId);
		}else if($.inArray(res.id, $scope.removeGoodsClickid) == 0){
			$scope.removeGoodsClickid.remove(res.id);
		}
	};
	//右边的  去除商品的  单击  点击事件
	$scope.remove1 = function(res) {
		if(res.propId != undefined && res.propId != null && res.propId != ""){
			if($.inArray(res.propId, $scope.removeGoodsClickid) < 0) {
				$scope.removeGoodsClick.push(res);
				$scope.removeGoodsClickid.push(res.propId);
			}else {
				$scope.removeGoodsClick.remove(res);
				$scope.removeGoodsClickid.remove(res.propId);
			}
		}else{
			if($.inArray(res.id, $scope.removeGoodsClickid) < 0){
				$scope.removeGoodsClick.push(res);
				$scope.removeGoodsClickid.push(res.id);
			}else {
				$scope.removeGoodsClick.remove(res);
				$scope.removeGoodsClickid.remove(res.id);
			}
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
			if($scope.selectedGoods[i].propId != undefined && $scope.selectedGoods[i].propId != null && $scope.selectedGoods[i].propId != ""){
				$scope.selectedGoodsid.push($scope.selectedGoods[i].propId);
			}else{
				$scope.selectedGoodsid.push($scope.selectedGoods[i].id);
			}
		}
		//数组去重
		$scope.selectedGoodsid = unique($scope.selectedGoodsid);

		$scope.removeGoodsClickid = [];
		$scope.removeGoodsClick = [];
	};

	//回显数据
	$scope.innit = function() {
		GoodsCateService
			.init($scope.cateId)
			.then(
				function(result) {
					$scope.selectedGoods = result.data;
					if($scope.selectedGoods == null || $scope.selectedGoods == undefined) $scope.selectedGoods = [];
					for(var i = 0; i < $scope.selectedGoods.length; i++) {
						$scope.selectedGoodsid.push($scope.selectedGoods[i].propId);
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
			if($scope.selectedGoods[i].propId != "" && $scope.selectedGoods[i].propId != undefined && $scope.selectedGoods[i].propId != null){
				attr.push($scope.selectedGoods[i].propId);
			}else{
				attr.push($scope.selectedGoods[i].id);
			}
			
		}
		 
		
		var res = $scope.res;
		$scope.propIds = "";
		for(var m = 0; m < attr.length; m++) {
			$scope.propIds+=attr[m];
			if(m < attr.length-1){
				$scope.propIds+=","
			}
		}
		GoodsCateService
			.addAttr($scope.cateId,$scope.propIds)
			.then(
				function(result) {
					if(result.code == 0){
						$rootScope.showPrompt(goodsReminder.goodsEditSuccess)
					}
					console.log(result)
					$scope.okmodaldis = false;
					$scope.dialog.close()
				},
				function(result) {
					$scope.okmodaldis = false;
				});
	};
	$scope.cancelModal = function(){
		$scope.dialog.close()
	}
}