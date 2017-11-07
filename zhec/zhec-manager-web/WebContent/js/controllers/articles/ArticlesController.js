angular
	.module('managerApp')
	.controller('ArticlesController', ArticlesController)
	.controller('SysArticleFormModalController', SysArticleFormModalController)

//oss图片富文本
var imgPathEditorOss = imgPathArticles;

function ArticlesController($rootScope, $scope, $http, $q, constPageSize, ArticlesService, ngDialog) {

	$scope.dataId = ""; //当前操作的数据id
	$scope.articleTitle = ""; //搜索关键词
	$scope.articleType1 = ""; //搜索关键词
	$scope.articleType2 = ""; //搜索关键词
	$scope.infoContainer = true; //数据列表
	$scope.editorModel = false; //富文本
	$scope.expOrDes = ''; //文章内容
	$scope.okModalDisabled = false; //保存按钮的disabled
	$scope.play = true;

	$scope.find = function(currentPageNo, currentPaseSize) {
			var defer = $q.defer();
			var articleTitle = $scope.articleTitle;
			var articleType1 = $scope.articleType1;
			var articleType2 = $scope.articleType2;

			ArticlesService.find(articleTitle, articleType1, articleType2, currentPaseSize, currentPageNo).then(
				function(result) {
					$scope.articleList = result.data;
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				})
			return defer.promise;
		}
		//初始化搜索控件，一级分类
	$scope.articleType1Init = function() {
		ArticlesService.findArticleTypeByPid(0).then(
			function(result) {
				$scope.articleTypeList1 = result.data;
			},
			function(result) {})
	}

	//一级分类下拉控件的change事件方法，用于实现级连
	$scope.articleTypeChange1 = function(typeId) {
		if (typeId !== null && typeId !== undefined && typeId !== '') {
			$scope.articleType1 = typeId;
			ArticlesService.findArticleTypeByPid(typeId).then(
				function(result) {
					$scope.articleTypeList2 = result.data;

				},
				function(result) {})
		} else {
			ArticlesService.findArticleTypeByPid(999).then(
				function(result) {
					$scope.articleTypeList2 = result.data;

				},
				function(result) {})
		}
	}
	$scope.articleTypeChange2 = function(typeId) {
		$scope.articleType2 = typeId;

	}

	// // 新增修改 初始化搜索控件，一级分类
	$scope.articleType3Init = function() {
			ArticlesService.findArticleTypeByPid(0).then(
				function(result) {
					$scope.articleTypeList3 = result.data;
				},
				function(result) {})
		}
		//一级分类下拉控件的change事件方法，用于实现级连
	$scope.articleTypeChange3 = function(typeId) {
		$scope.articleType3 = typeId;
		ArticlesService.findArticleTypeByPid(typeId).then(
			function(result) {
				$scope.articleTypeList4 = result.data;
			},
			function(result) {})
	}
	$scope.articleTypeChange4 = function(typeId) {
		$scope.articleType4 = typeId;
	}



	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.play = false;
		$scope.dialog = ngDialog.open({
			template: 'views/articles/ArticlesFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'SysArticleFormModalController',
			scope: $scope,
			width: 650
		})
	};


	$scope.openModal1 = function(dataId) {
		$scope.dataId = dataId;
		$scope.play = true;
		$scope.dialog = ngDialog.open({
			template: 'views/articles/ArticlesFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'SysArticleFormModalController',
			scope: $scope,
			width: 650
		})
	};

	//根据id查找分类
	$scope.findByTypeId = function(cateId) { // 接收点击id
		ArticlesService
			.findByTypeId(cateId)
			.then(
				function(result) {
					$scope.articleList = result.data;
				},
				function(result) {
					//alert("搜索用户失败！");
				}
			)
	}

	$scope.openArticlesDetailsModal = function(dataId) {
		$scope.dataId = dataId;
		//oss图片富文本
		imgPathEditorOss = imgPathArticles + '/' + dataId + '/detail';
		$scope.infoContainer = false;
		$scope.editorModel = true;
		ArticlesService
			.get($scope.dataId)
			.then(
				function(result) {
					setContent(false, result.data.content);
				}
			);

	};
	//初始化搜索控件，一级分类
	$scope.articleType1Init();
	//初始化搜索控件，一级分类
	$scope.articleType3Init();
	/**
	 * 获取富文本内容----------------保存
	 */
	$scope.getContentAngular = function() {
			var arr = [];

			arr.push(UM.getEditor('myEditor').getContent());
			//alert(arr.join("\n"));
			var res;
			//文章内容
			res = {
				id: $scope.dataId,
				content: arr.join("\n")
			};
			ArticlesService
				.description(res)
				.then(
					function(result) {}
				);
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

}

/**
 * 系统用户修改弹出页面controller定义
 */
function SysArticleFormModalController($scope, ArticlesService) {

	$scope.initEntity = function() {
		if ($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
			ArticlesService
				.get($scope.dataId)
				.then(
					function(result) {
						$scope.dataEntity = result.data;
						$scope.dataEntity.typeId = $scope.cateId;

					}
				);
		} else { //如果参数dataId为空，说明是新增数据，设置默认值

			$scope.dataEntity = {
				"isTop": 1,
				"status": 1
			};
			$scope.dataEntity.typeId = $scope.cateId;

		}
		//$scope.roleid = 4;
	}

	$scope.okModal = function() {
		if ($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		if ($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //修改数据
			$scope.dataEntity.typeId = $scope.articleType4
			ArticlesService
				.edit($scope.dataEntity)
				.then(
					function(result) {
						//alert(1)
						$scope.okModalDisabled = false;
						$scope.loadData();
						$scope.dialog.close();
					}
				)
		} else { //新增数据
			$scope.dataEntity.typeId = $scope.articleType4
			ArticlesService
				.add($scope.dataEntity)
				.then(
					function(result) {
						$scope.okModalDisabled = false;
						$scope.loadData();
						$scope.dialog.close();

					}
				)
		}
	};
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
	$scope.initEntity();
}
