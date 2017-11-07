/**
 * 品牌管理
 */
function GoodsBrandController($rootScope, $scope, $http, $q, constPageSize, GoodsBrandService, ngDialog) {
	$scope.modalType = ""; //模态框类型：edit、add
	$scope.dataId = ""; //当前操作的数据id
	$scope.brandNameSearch = "";
	$scope.imgHid = true; //图片上传模块隐藏
	$scope.okModalDisabled = false; //保存按钮的disabled
	
	/**
	 * 搜索
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
			var defer = $q.defer();
			var brandName = $scope.brandNameSearch;
			GoodsBrandService
				.find(brandName, currentPaseSize, currentPageNo)
				.then(function(result) {
						$scope.brandList = result.data;
						defer.resolve(result);
					},
					function(result) {
						//alert("该用户不存在");
						defer.reject(result);
					})
			return defer.promise;
		}
		/**
		 * 弹出修改数据模态框
		 */
	$scope.openModal = function(dataId, bolle) {
		$scope.dataId = dataId;
		if(bolle == false) {
			$scope.imgHid = false;
		} else {
			$scope.imgHid = true;
		}
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsBrandFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'GoodBrandFormModalController',
			scope: $scope,
			width: 650
		})
	};

}

/**
 * 系统用户修改弹出页面controller定义
 */
function GoodBrandFormModalController($scope, GoodsBrandService) {
	$scope.initEntity = function() {
		if($scope.imgHid == false) {
			$scope.imgHid = false;
		} else {
			$scope.imgHid = true;
		}

		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") {
			
			$scope.idData = imgPathBrands;
		} else {
			
		}

		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
			GoodsBrandService
				.get($scope.dataId)
				.then(function(result) {
					$scope.dataEntity = result.data;
				});
		} else { //如果参数dataId为空，说明是新增数据，设置默认值
			$scope.dataEntity = {
				"state": 1
			};
		}
	}
	$scope.okModal = function() {
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") {
			if(imgPath.length > 0) {
				$scope.previewHide = true; //上传前的预览隐藏
				$scope.dataEntity.image = imgPath[0];

			}
			GoodsBrandService
				.edit($scope.dataEntity)
				.then(function(result) {
					imgPath = [];
					$scope.okModalDisabled = false;
					$scope.loadData();
					$scope.dialog.close();
				},
				function(result) {
					$scope.okModalDisabled = false;
					$scope.dialog.close();
				});
		} else {
			GoodsBrandService
				.add($scope.dataEntity)
				.then(function(result) {
					$scope.loadData();
					$scope.okModalDisabled = false;
					$scope.dialog.close();
				},
				function(result) {
					$scope.okModalDisabled = false;
					$scope.dialog.close();
				});
		}
	};
	/**
	 * 状态转换
	 */
	$scope.check = function(n) {
		$scope.dataEntity.state = n;
	}

	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
	$scope.initEntity();

}
var imgPath = [];

function setImgBrandPath(res) {
	imgPath.push(res);
	$("#ossbrandimg").removeAttr("disabled");
	if(listattr.length == 1) {
	} else {
		var img = document.getElementsByClassName('pic_list');
		for(var i = 0; i < img.length; i++) {
			if(i != 0) {
				img[i].style.display = 'none';
			}
		}
	}
}

angular
	.module('managerApp')
	.controller('GoodsBrandController', GoodsBrandController)
	.controller('GoodBrandFormModalController', GoodBrandFormModalController)