//oss图片富文本
var imgPathEditorOss = imgPathHomeBannerType;

function carouselController($scope, $q, $rootScope, $http, constPageSize, carouselService, ngDialog, goodsReminder) {
	$scope.carId = "" //操作当前id
	$scope.homeListType = false;

	$scope.statusList = [{
			"id": 0,
			"name": '禁用'
		},
		{
			"id": 1,
			"name": '启用'
		}
	]
	$scope.typeList = [{
			"id": 1,
			"name": '链接地址'
		},
		{
			"id": 2,
			"name": ' 详情页面'
		}
	]

	//首页搜素操作
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var carsId = $scope.carId;
		if($scope.statusObj==undefined||$scope.statusObj==null||$scope.statusObj==""&&$scope.statusObj!=0){
			$scope.statusObj=""
		}
		if($scope.typeobj) {
			var typeId = $scope.typeobj

		} else {
			var typeId = ""
		}
		carouselService
			.find(typeId, $scope.statusObj, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.banList = result.data
				defer.resolve(result)
			}, function(result) {
				defer.reject(result)
			})
		return defer.promise;
	}
	//弹窗
	$scope.openModal = function(id, boller) {
		$scope.carId = id;
		$scope.datared = boller;
		$scope.dialog = ngDialog.open({
			template: 'views/homemanagement/carouselFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'carouselFormModelController',
			scope: $scope,
			width: 1150
		})
	};

	//删除操作
	$scope.deleteId = function(id) {
		var chainstouses;
		chainstouses = goodsReminder.goodsbranddelete;
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
			carouselService
				.delete(id)
				.then(function(result) {
					$scope.loadData(true)
				}),
				function(reason) {}
		})
	}
	//启禁用操作
	$scope.enableId = function(stautsid, status) {
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
			carouselService
				.enable(stautsid, status)
				.then(function(result) {
					$scope.loadData()
				}),
				function(reason) {}
		})
	}
	//打开 详情页面  操作
	$scope.banerType2 = function(id) {
		$scope.homeListType = true;
		carouselService
			.get(id)
			.then(function(result) {
				$scope.homeListType2 = result.data;
				//设置富文本内容
				if(!result.data.detail){
					 result.data.detail="";
				}
				setContent(false, result.data.detail);
			}, function(result) {

			})
	}

	// 详情页面  返回  操作
	$scope.goBack = function() {
		$scope.homeListType = false;
	}
	//保存 详情页面  操作
	$scope.getContentAngular = function() {
		var arr = [];
		arr.push(UM.getEditor('myEditor').getContent());
		$scope.homeListType2.detail = arr.join("\n");
		if($scope.homeListType2.type == 2) {
			if(!$scope.homeListType2.detail) {
				$rootScope.showAlert("详情页面内容为空，不能保存！");
				return 0;
			}
		}
		carouselService
			.edit($scope.homeListType2)
			.then(function(result) {
				if(result.code >= 0) {
					$scope.loadData();
					$scope.homeListType = false;
				}
			}, function(reason) {

			})
	}
	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
}

//弹窗Controller操作

function carouselFormModelController($scope, carouselService,$rootScope) {
	imgPathHomeBan = [];
	//上传图片路径
	if(!$scope.carId) {
		$scope.idData = imgPathHomeBanner + "/add";
	} else {
		$scope.idData = imgPathHomeBanner + "/" + $scope.carId;
	}

	$scope.innter = function() {
		if($scope.carId) { //根据Id判断添加或修改，如果Id为空则为添加，反之为修改
			carouselService
				.get($scope.carId)
				.then(function(result) {
					$scope.homeList = result.data;
					//setContent(false, result.data.detail);
				}, function(result) {

				})
		} else {
			$scope.homeList = {
				"status": 1,
				"type": 1,
				"imgUrl": ''
			}
		}
	}
	//保存操作
	$scope.okModal = function() {
		if($scope.carId) {
			if(imgPathHomeBan.length != 0) {
				$scope.homeList.imgUrl = imgPathHomeBan[0];
			}
			if($scope.homeList.type == 2 && !$scope.homeList.detail) {
				$scope.homeList.detail = " ";
			}
			carouselService
				.edit($scope.homeList)
				.then(function(result) {
					$scope.cancelModal()
					$scope.loadData(true)
				}, function(reason) {
					$scope.loadData(true)
				})
		} else {
			if(imgPathHomeBan.length == 0) {
				$rootScope.showAlert("请上传图片！");
				return 0;
			}
			$scope.homeList.imgUrl = imgPathHomeBan[0];
	
			if($scope.homeList.type == 2) {
				$scope.homeList.detail = " ";
			}
			carouselService
				.add($scope.homeList)
				.then(function(result) {
					if(result.code >= 0) {
						$scope.cancelModal()
						$scope.loadData(true)
					}

				}, function(reson) {
					//					$scope.loadData(true)
				})
		}
	}
	$scope.innter();
	//状态切换
	$scope.check = function(n) {
		$scope.homeList.status = n
	}
	//类型切换
	$scope.checksType = function(j) {
		$scope.homeList.type = j;
		if(j == 2) {
			$rootScope.showAlert("亲，别忘了填写详情页面内容!");
		}
	}

}
var imgPathHomeBan = [];

//oss上传图片
function setImgHomeBannerPath(res) {
	imgPathHomeBan.push(res);
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
	.controller("carouselController", carouselController)
	.controller("carouselFormModelController", carouselFormModelController)