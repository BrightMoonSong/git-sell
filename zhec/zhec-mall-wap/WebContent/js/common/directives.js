app
	.directive('invoicechoose', invoicechoose)
	.directive('areachoose', areachoose)
	.directive('searching', searching)
	.directive('findcommenddata', findcommenddata)
	.directive('repeatDone', repeatDone)
//angular repeat for swiper
function repeatDone() {
	return {
		restrict: 'E',
		scope: false,
		link: function(scope, element, attrs) {
			if (scope.$last) { // 这个判断意味着最后一个 OK
				scope.$eval(attrs.repeatDone) // 执行绑定的表达式
			}
		}
	}
}
/**
 * searching 搜索中页面指令
 */

function searching() {

	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'views/common/search.html',
		scope: false,
		controller: function($scope, $element, CommonService) {
			$scope.searchKeyWord = '';
			if ($scope.keyWordShow != undefined && $scope.keyWordShow != null && $scope.keyWordShow != '') {
				$scope.searchKeyWord = $scope.keyWordShow;
			}
			//获取热搜
			$scope.findHotKeyWord = function() {
				CommonService
					.findcommenddata()
					.then(
						function(result) {
							$scope.hotKeyWordList = result.data.text;
						},
						function(result) {}
					);
			};

			//点击取消箭头
			$scope.onCancel = function() {
				$scope.searchCancel();
			};

			//搜索
			$scope.goSearch = function(str) {
				if (str) { //str不为空，点击推荐热词进入搜索页
					$scope.saveCurrentUrl();
					window.open(constWapLocation + "/index.html#/info/search-" + str + "-0-0-0-0-0", "_self");
				} else if ($scope.searchKeyWord != '') { //点击搜索按钮，搜索条件为搜索框输入内容
					$scope.saveCurrentUrl();
					window.open(constWapLocation + "/index.html#/info/search-" + $scope.searchKeyWord + "-0-0-0-0-0", "_self");
				}
			};

			$scope.saveCurrentUrl = function() {
				$scope.currentUrl = window.location.href; //获取当前路径
				if ($scope.currentUrl.indexOf('/index.html#/info/search-') < 0) { //当前页不是搜索页
					delCookie("saveUrl");
					setCookie("saveUrl", "" + $scope.currentUrl, "1")
				}
			};

			//初始化数据
			$scope.findHotKeyWord();
		}


	};
}
//  商品推荐位
function findcommenddata() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'views/common/findcommenddata.html',
		scope: false,
		controller: function($scope, $element, CommonService) {
			//获取列表
			$scope.findcommenddata = function(applyType, commendId, size) {
				CommonService
					.findGoodsRecommend(applyType, commendId, size)
					.then(
						function(result) {
							console.log(result)
							$scope.findcommenddata = result.data;
							console.log($scope.findcommenddata)
							for (var i = 0; i < $scope.findcommenddata.length; i++) {
								$scope.findcommenddata[i].price = priceFilter($scope.findcommenddata[i].price)
							}
							//对商品数据做处理提取出来ID
							var goodsIds = '';
							var temp = result.data;

							for (var i = 0; i < temp.length; i++) {
								goodsIds = goodsIds + temp[i].id;
								if (i < temp.length - 1) {
									goodsIds = goodsIds + ',';
								}
							}
							CommonService.getGoodsPriceByGoodsId($scope.memberId, goodsIds, 1, 0, 0, $scope.findcommenddata);
						},
						function(result) {}
					);
			};

			//初始化数据
			$scope.findcommenddata(1, 16, 6);
		}


	};
}

/**
 * areachoose 省市区地区选择指令
 */
function areachoose() {
	return {
		scope: false, // 默认值，共享父级作用域
		restrict: 'E',
		replace: true,
		templateUrl: 'views/common/areaChoose.html',
		// scope: {
		// 	setAreaValue: '@',
		// 	getAreaValue: '=',
		// },
		controller: function($scope, $element, CommonService) {

			$scope.pacEntity = {};
			$scope.pacEntity.province = {};
			$scope.pacEntity.city = {};
			$scope.pacEntity.area = {};
			$scope.areaFlag = 1; //标记省市区头部是否显示信息，1为省，2为市，3为区，大于等于该值就显示
			$scope.currntListFlag = 1; //标记当前列表显示的数据，1为省，2为市，3为区，4为邮编
			$scope.isAddressCommit = false; //防止重复提交
			$scope.defaultTip = '请选择';

			//给地址选择器赋值
			$scope.setAreaValue = function(pca, proId, cityId, areaId) {
				if (pca === undefined || pca === null || pca === '') {
					//没有已选的省市区数据
					$scope.pacEntity.province.name = '';
					$scope.pacEntity.city.name = '';
					$scope.pacEntity.area.name = '';
					$scope.pacEntity.province.id = null;
					$scope.pacEntity.city.id = null;
					$scope.pacEntity.area.id = null;
					//初始化标记位
					$scope.areaFlag = 1;
					$scope.currntListFlag = 1;
					//获取省级列表数据
					$scope.findtoplevelareas();
				} else {
					//有已选的省市区数据
					var temp = pca.split(' ');
					$scope.pacEntity.province.name = temp[0];
					$scope.pacEntity.city.name = temp[1];
					$scope.pacEntity.area.name = temp[2];
					$scope.pacEntity.province.id = proId;
					$scope.pacEntity.city.id = cityId;
					$scope.pacEntity.area.id = areaId;

					$scope.areaFlag = 3;
					$scope.currntListFlag = 3;
					//获取区级列表的数据
					$scope.findareasbypid($scope.pacEntity.city.id);
				}
			};

			//获取省级下拉栏数据
			$scope.findtoplevelareas = function() {
				CommonService
					.findtoplevelareas()
					.then(
						function(result) {
							$scope.isAddressCommit = false;
							$scope.areaList = result.data;
						},
						function(result) {
							$scope.isAddressCommit = false;
						}
					);
			};

			//根据ID获取下级分类数据
			$scope.findareasbypid = function(id) {
				CommonService
					.findareasbypid(id)
					.then(
						function(result) {
							$scope.isAddressCommit = false;
							$scope.areaList = result.data;
						},
						function(result) {
							$scope.isAddressCommit = false;
						}
					);
			};


			//点击省市区Tab
			$scope.clickTab = function(id) {
				if (!$scope.isAddressCommit) {
					$scope.isAddressCommit = !$scope.isAddressCommit;
					switch (id) {
						case 1:
							//获取省级数据
							$scope.findtoplevelareas();
							break;
						case 2:
							//获取市级数据
							$scope.findareasbypid($scope.pacEntity.province.id);
							break;
						case 3:
							//获取区级数据
							$scope.findareasbypid($scope.pacEntity.city.id);
							break;
						default:
					}

					$scope.currntListFlag = id;
				}
			};


			//选择一个省市区
			$scope.selectItem = function(name, id, zipCode) {
				if (!$scope.isAddressCommit) {
					$scope.isAddressCommit = !$scope.isAddressCommit;
					switch ($scope.currntListFlag) {
						case 1: //选择的是省
							//赋值
							$scope.pacEntity.province.name = name;
							$scope.pacEntity.province.id = id;
							//清空市、区信息
							$scope.pacEntity.city.name = '';
							$scope.pacEntity.city.id = '';
							$scope.pacEntity.area.name = '';
							$scope.pacEntity.area.id = '';
							//改变标记位
							$scope.currntListFlag = 2;
							$scope.areaFlag = 2;
							//获取市级数据
							$scope.findareasbypid($scope.pacEntity.province.id);
							break;
						case 2: //选择的是市
							//赋值
							$scope.pacEntity.city.name = name;
							$scope.pacEntity.city.id = id;
							//清空区信息
							$scope.pacEntity.area.name = '';
							$scope.pacEntity.area.id = '';
							//改变标记位
							$scope.currntListFlag = 3;
							$scope.areaFlag = 3;
							//获取区级数据
							$scope.findareasbypid($scope.pacEntity.city.id);
							break;
						case 3: //选择的是区
							//赋值
							$scope.pacEntity.area.name = name;
							$scope.pacEntity.area.id = id;
							$scope.pacEntity.zipCode = zipCode;

							$scope.isAddressCommit = false;
							//回调
							$scope.getAreaValue($scope.pacEntity);
							break;
						default:
					}
				}
			};

			//点击取消箭头
			$scope.onCancel = function() {
				$scope.areaChooseCancel();
			};


		}
	};
}




/**
 * invoicechoose 头指令
 */
function invoicechoose() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'views/goods/invoice.html',
		scope: {},
		controller: function($scope, $element) {
			//发票信息swiper
			$scope.invoiceDetail = new Swiper('#invoiceDetail', {

			});
			$scope.invoiceDetail.detachEvents() //阻止swiper滑动
			$scope.confirmType = 0;
			// $scope.middleType = 0;
			// $scope.middleTitle = "";
			// $scope.middleDetail = "";
			$scope.confirmTitle = "";
			$scope.confirmDetail = "";
			// $scope.currentTitle = "个人"
			//发票
			$scope.middleType = 1;
			$scope.middleTitle = "个人";
			$scope.middleDetail = "明细";
			$scope.currentTitle = "个人"
			//发票tab
			$scope.invoiceTitleTab = 1;


			//发票选项卡
			$scope.changeInvoiceType = function(n) {
				$scope.middleType = n;
				if (n == 1 || n == 2) {
					$scope.middleTitle = "个人"
					$scope.middleDetail = "明细";
					$scope.invoiceTitleTab = n;
					$scope.invoiceDetail.slideTo(n - 1, 300, false);
				}
			}
			$scope.openInvoiceDetail = function() {
				$(".all_billDetail").show()
			}
			//选择发票内容
			$scope.chooseDetail = function(invoiceDetail) {
				$scope.middleDetail = invoiceDetail;
			}
			$scope.changeInvoiceTitle = function() {
				// $(".all_billTitle").show()
				$(".all_billTitle").slideDown(1000);
			}
			$scope.chooseConfirm = function() {
				$(".all_billTitle").hide()
				$(".all_billDetail").hide()
			}
			//改变发票抬头
			$scope.titleType = 1;
			$scope.chooseTitle = function(n) {
				$scope.titleType = n;
				if (n == 1) {
					$scope.middleTitle = "个人";
				} else {
					$scope.middleTitle = $scope.inputTitle;
					$scope.currentTitle = "单位"
				}
			}

		}
	}
}
//返回上一页
function goback() {
	window.history.go(-1);
}
