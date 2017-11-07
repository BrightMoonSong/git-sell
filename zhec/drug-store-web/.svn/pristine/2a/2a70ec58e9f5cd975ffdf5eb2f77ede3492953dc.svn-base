function topicController($scope, $rootScope, $q, $http, constPageSize, topicService, ngDialog, goodsReminder) {
	$scope.topicId = '' //操做当前ID
	$scope.name = '' //专题名称
	$scope.addTime = '' //	添加时间
	//	$scope.imghide=''//操作图片

	//搜索操作
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		topicService
			.find($scope.nameSearch, $scope.addTimeSearch, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.topics = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}
	//弹出  专题推荐商品  弹窗
	$scope.openTopicModal = function(id) {
		$scope.dataId = id;
		$scope.dialog = ngDialog.open({
			template: 'views/topic/topicGoodsFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'topicGoodsFormModelController',
			scope: $scope,
			width: 1150
		})
	};
	//弹出添加弹窗
	$scope.openModal = function(id) {
		$scope.dataId = id;
		$scope.dialog = ngDialog.open({
			template: 'views/topic/topicFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'topicFormModelController',
			scope: $scope,
			width: 850
		})
	};
	//启禁用操作
	$scope.enable = function(id, status) {
		var chainstouses;
		if(status == 1) {
			//0禁1启
			chainstouses = goodsReminder.goodsState.enable;
		} else {
			chainstouses = goodsReminder.goodsState.forbidden;
		}
		ngDialog.openConfirm({
			template: '<p>' + chainstouses + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			topicService
				.enable(id, status)
				.then(function(result) {
					$scope.loadData()
				}),
				function(reason) {}
		})
	}
	//删除操作
	$scope.detelateById = function(id) {
		var deleteIdPrompt;
		deleteIdPrompt = goodsReminder.goodsbranddelete;
		ngDialog.openConfirm({
			template: '<p>' + deleteIdPrompt + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(result) {
			topicService
				.delete(id)
				.then(function(result) {
					$scope.loadData();
				}),
				function(reson) {

				}
		})
	}

	//操纵状态
	$scope.check = function(n) {
		$scope.topicEntity.status = n;
	}
	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}

}
//操纵弹窗方法
function topicFormModelController($scope, topicService, $rootScope) {
	if(!$scope.imghide) {
		$scope.idData = imgPathTopic;
	}

	$scope.intier = function() {
		if($scope.dataId) { //修改
			topicService
				.detail($scope.dataId)
				.then(function(result) {
					$scope.topicEntity = result.data;
				})
		} else { //新增
			$scope.topicEntity = {
				'status': 1,
				'sort': 1,
				'mainImg': ''
			}
		}

		//保存
		$scope.okModal = function() {
			if($scope.okModalDisabled) {
				return false;
			}
			$scope.okModalDisabled = true;
			if($scope.dataId) { //修改
				if(imgPath.length > 0) {
					$scope.topicEntity.mainImg = imgPath[0];
				}
				topicService
					.edit($scope.topicEntity)
					.then(function(result) {
						if(result.code >= 0) {
							$scope.cancelModal();
							$scope.loadData();
							$scope.okModalDisabled = false;
						}
					}, function(reason) {
						$scope.okModalDisabled = false;
					})
			} else { //添加
				if(imgPath.length == 0) {
					$rootScope.showAlert("请上传图片！");
					return false;
				}
				$scope.topicEntity.mainImg = imgPath[0];
				topicService
					.add($scope.topicEntity)
					.then(function(result) {
						if(result.code >= 0) {
							$scope.okModalDisabled = false;
							$scope.cancelModal();
							$scope.loadData();
						}
					}, function(reason) {
						$scope.okModalDisabled = false;
					})
			}
		}
	}
	//初始化
	$scope.intier();
}

//弹出  专题推荐商品  弹窗
function topicGoodsFormModelController($scope, topicService, $rootScope, $q) {
	$scope.selectGoodsList = []; //保存给后台的数据  回显的数据
	$scope.selectGoodsListClone = []; //回显的数据  克隆数据
	$scope.selectGoodsIdList = []; //保存给后台的数据ID  回显的数据ID

	$scope.initEntity = function() { //回显
		$scope.storeId = localStorage.drugstoreId;
		//获取专题推荐商品列表 
		topicService
			.findrecommendgoods($scope.dataId, $scope.storeId)
			.then(
				function(result) {
					$scope.selectGoodsList = result.data;
					$scope.selectGoodsList.forEach(function(ele) {
						$scope.selectGoodsIdList.push(ele.goodsId);
					})
					$scope.selectGoodsListClone = clone(result.data);
				},
				function(result) {

				});
	}
	//弹窗 分页 //获取在售商品列表
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var thirdCateObj = $scope.thirdCateObj;
		var cateId = '';
		if(thirdCateObj) {
			cateId = thirdCateObj.cateId;
		} else {
			cateId = '';
		}
		$scope.drugstoreIdSearch = localStorage.drugstoreId; //	分店ID取登录时获得的  分店ID
		var drugstoreIdSearch = $scope.drugstoreIdSearch;
		if(!drugstoreIdSearch) {
			drugstoreIdSearch = '';
		}
		topicService.findonsale(currentPageNo, currentPaseSize, $scope.infoNameSearch, cateId, drugstoreIdSearch).then(
			function(result) {
				$scope.goodsList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			});
		return defer.promise;
	};

	/**
	 * 获取树形分类列表，返回全部分类数据
	 */
	$scope.findallCate = function() {
		topicService
			.findall()
			.then(
				function(result) {
					$scope.allCateList = result.data;
				},
				function(result) {

				});
	}
	$scope.findallCate();
	//右边的搜索
	$scope.loadDataRight = function(id) {
		$scope.filterRightLoopId = id;
	}

	/**
	 * 根据PID获取子分类列表
	 */
	$scope.findinfosbypid = function(id, n) {
		if(!id) {
			switch(n) {
				case 1: //一级选中的
					$scope.secCateList = [];
					$scope.thirdCateList = [];
					break;
				case 2: //二级选中的
					$scope.thirdCateList = [];
					break;
			}
			return false;
		}
		topicService
			.findinfosbypid(id)
			.then(
				function(result) {
					switch(n) {
						case 1: //一级选中的
							$scope.secCateList = result.data;
							$scope.thirdCateList = [];
							break;
						case 2: //二级选中的
							$scope.thirdCateList = result.data;
							break;
					}
				},
				function(result) {
				});

	}

	//左边双击选中
	$scope.singleClick = function(res) {
		if($scope.selectGoodsIdList.contains(res.goodsId)) { //已经点击过的直接返回不处理
			return false;
		} else {
			$scope.selectGoodsIdList.push(res.goodsId);
			//判断是否是回显时的商品，是的话把 recommendId 专题商品推荐ID 拼接上，否则recommendId：null
			var loopNum = 1;
			$scope.selectGoodsListClone.forEach(function(value, index, array) {
				if(value.goodsId == res.goodsId) {
					$scope.selectGoodsList.push(value);
					loopNum = 2;
				}
			});
			if(loopNum == 1) {
				$scope.selectGoodsList.push({
					"drugstoreId": res.storeId,
					"goodsId": res.goodsId,
					"recommendId": null,
					"sort": 1,
					"goodsName": res.name1,
					"topicId": $scope.dataId
				});
			}
		}
	}
	//右边边双击移除
	$scope.singleClickRemove = function(goodsId) {
		$scope.selectGoodsIdList.remove(goodsId);
		$scope.selectGoodsList.forEach(function(value, index, array) {
			if(value.goodsId == goodsId) {
				$scope.selectGoodsList.splice(index, 1);
			}
		});
	}

	//保存
	$scope.okModal = function() {
		if($scope.okModalDisabled) {
			return false;
		}
		$scope.okModalDisabled = true;

		$scope.selectGoodsList.forEach(function(value, index, array) {
			if(!value.sort) {
				$rootScope.showAlert("请填写商品ID为 " + value.goodsId + " 的商品排序号!");
				$scope.okModalDisabled = false;
			}
		})
		if($scope.okModalDisabled == false) {
			return false;
		}
		topicService
			.addrecommendgoods($scope.selectGoodsList, $scope.dataId)
			.then(
				function(result) {
					if(result.code >= 0) {
						$scope.cancelModal();
						$scope.loadData();
					}
					$scope.okModalDisabled = false;
				},
				function(result) {
					$scope.okModalDisabled = false;
				});
	}
	//初始化
	$scope.initEntity();
}

var imgPath = [];

function setImgTopicPath(res) {
	imgPath.push(res);
	$("#osstopicimg").removeAttr("disabled");
	if(listattr.length != 1) {
		var img = document.getElementsByClassName('pic_list');
		for(var i = 0; i < img.length; i++) {
			if(i != 0) {
				img[i].style.display = 'none';
			}
		}
	}
}

angular
	.module("managerApp")
	.controller("topicController", topicController)
	.controller("topicFormModelController", topicFormModelController)
	.controller("topicGoodsFormModelController", topicGoodsFormModelController)