//  查询收藏列表
function collectController($rootScope, $scope, $http, $window, $q, collectionService, constPageSize, CommonService) {
	$scope.dataId = "";
	$scope.member = getCookie("loginManager");
	$scope.display = true;
	$scope.goodsType = "";
	$scope.currentPage = 1;
	$scope.allPage = 0;
	$scope.collectchoose = true;
	$scope.collectList = [];
	if ($scope.member != "") {
		$scope.member = JSON.parse($scope.member);
		$scope.loginId = $scope.member.loginId;
		$scope.memberId = $scope.member.id;
	}

	checkLogin();

	$scope.cellectIfGoods = true; //判断是否有商品
	//获取我的收藏列表
	$scope.find = function(currentShowPage) {
		if ($scope.goodsType == '' || $scope.goodsType == null || $scope.goodsType == undefined) {
			$scope.goodsType = 2;
		}
		var goodsType = $scope.goodsType;
		/* 请求不能为空的参数  menberID,pageSize,pageNo*/
		var defer = $q.defer();
		collectionService
			.find($scope.memberId, constPageSize, currentShowPage, goodsType)
			.then(
				function(result) {
					$scope.goodsList = result.data;


					$scope.allPage = result.totalSize / constPageSize;
					var re = /\d+\.[0-9]/g; //判断数字是否为小数
					if (re.test($scope.allPage)) {
						$scope.allPage = Number($scope.allPage.toString().split(".")[0]) + 1
					}
					if ($scope.goodsList == "" || $scope.goodsList == undefined || $scope.goodsList == null) {
						$scope.cellectIfGoods = false;
						return 0;
					}
					for (var i = 0; i < $scope.goodsList.length; i++) { //
						$scope.collectList.push($scope.goodsList[i]) //拼接数据
					}

					for (var i = 0; i < $scope.goodsList.length; i++) {
						$scope.goodsList[i].status = false
					}
					// if ($scope.collectList == "") {
					// 	$scope.cellectIfGoods = false;
					// 	console.log($scope.cellectIfGoods)
					// }
					if ($scope.collectList != "") {
						$scope.cellectIfGoods = true;
					}
					for (var i = 0; i < $scope.goodsList.length; i++) {
						$scope.goodsList[i].price = priceFilter($scope.goodsList[i].price)
					}
					//对商品数据做处理提取出来ID
					var goodsIds = '';
					var temp = result.data;

					for (var i = 0; i < temp.length; i++) {
						goodsIds = goodsIds + temp[i].goodsId;
						if (i < temp.length - 1) {
							goodsIds = goodsIds + ',';
						}
					}
					CommonService.getGoodsPriceByGoodsId($scope.memberId, goodsIds, 1, 0, 0, $scope.goodsList);

					console.log($scope.collectList);
					defer.resolve(result);
					$scope.allSelect = false;
				},
				function(result) {
					defer.reject(result);
				})

		return defer.promise;


	};


	//显示收藏、删除
	$scope.showHideBtn = false;
	$scope.showBtn = function() {
		$scope.showHideBtn = true;
	}
	$scope.closeBtn = function() {
		$scope.showHideBtn = false;
	}

	//  删除收藏商品
	$scope.collectDeldata = function() {
		$scope.deleteConfirm = function() {
				$scope.dialog = jDialog.confirm('确认删除？', {
					handler: function(button, dialog) {
						collectionService
							.delete($scope.deleteArr)
							.then(
								function(result) {
									$scope.dialog.close()
									promptBox("商品已删除");
									$scope.reloadRoute();
								});
					}
				}, {
					handler: function(button, dialog) {
						$scope.dialog.close();
					}
				});
			}
			//删除商品
		$scope.collectListLen = 0;
		$scope.collectList.forEach(function(collect) { //判断是否有商品选中
			if (collect.status) {
				console.log(collect.status)
				$scope.collectListLen++;
			}
		});
		if ($scope.collectListLen < 1) { //没有选择商品
			promptBox("请先选择要删除的商品！")
		} else {
			$scope.deleteArr = [];
			$scope.collectList.forEach(function(collect) { //在删除多个商品时判断是否有选择商品
				if (collect.status) {
					$scope.saveGoodsId = {};
					$scope.saveGoodsId.id = collect.id
					$scope.deleteArr.push($scope.saveGoodsId)
				}
			});
			$scope.deleteConfirm()
		}



	}


	// 加入 购物车
	$scope.membercart = function() {

		$scope.joinCollection = function() {
			$scope.dialog1 = jDialog.confirm('确认移入购物车？', {
				handler: function(button, dialog) {
					collectionService
						.cart($scope.saveCollectionMessage)
						.then(
							function(result) {
								$scope.dialog1.close();
								promptBox("加入购物车成功");
								$scope.reloadRoute();
							})
				}
			}, {
				handler: function(button, dialog) {
					$scope.dialog1.close();
				}
			});
		}
		$scope.saveCollectionMessage = [];
		$scope.collectList.forEach(function(collect) {
			if (collect.status) {
				$scope.collectionGoods = {};
				$scope.collectionGoods.id = collect.id;
				$scope.collectionGoods.productId = collect.productId;
				$scope.collectionGoods.goodsId = collect.goodsId;
				$scope.collectionGoods.name1 = collect.name1;
				$scope.collectionGoods.masterImg = collect.masterImg;
				$scope.collectionGoods.loginId = $scope.loginId;
				$scope.collectionGoods.goodsType = collect.goodsType;
				$scope.collectionGoods.memberId = String($scope.member.id);
				$scope.saveCollectionMessage.push($scope.collectionGoods)
			}
		});
		$scope.collectListLen = 0;
		$scope.collectList.forEach(function(collect) { //判断是否有商品选中
			if (collect.status) {
				$scope.collectListLen++;
			}
		});
		if ($scope.collectListLen < 1) { //没有选择商品
			promptBox("请先选择要移入购物车的商品！")
		} else {
			$scope.saveCollectionMessage = JSON.stringify($scope.saveCollectionMessage);
			$scope.saveCollectionMessage = JSON.parse($scope.saveCollectionMessage);
			$scope.joinCollection()
		}




	}
	$scope.allSelect = false;
	//全选、反选
	$scope.selectAll = function() {
		$scope.collectList.forEach(function(goods) {
			goods.status = $scope.allSelect;
		});
	}

	function selectOne() { //先执行一次对代码进行一次处理
		var flag = true;
		$scope.collectList.forEach(function(goods) {
			if (!goods.status) flag = false;
		});
		$scope.allSelect = flag;
	}
	$scope.selectChange = selectOne; //初始化选择复选框

	//判断是否登陆
	$scope.ifLogin = getCookie("formToken");

	if ($scope.ifLogin != "" && $scope.ifLogin != null && $scope.ifLogin != undefined) {
		$scope.collectList = [];
		$scope.saveProvideMessage = []; //存取初始化数据
		$scope.find($scope.currentPage);
		$(window).scroll(function() {　　
			var scrollTop = $(this).scrollTop();　　
			var scrollHeight = $(document).height();　　
			var windowHeight = $(this).height();
			//		console.log(scrollTop + windowHeight,scrollHeight)
			　　
			if (scrollTop + windowHeight + 1 >= scrollHeight) {　　　　
				$scope.currentPage++;
				if ($scope.allPage != 0 && $scope.currentPage <= $scope.allPage) {
					$scope.loadding = true;

					// $timeout(function() {
					$scope.find($scope.currentPage)
						// }, 1000);

					$scope.scrollFoot = false;
				} else {
					$scope.loadding = false;
				}　　
			}
			if ($scope.currentPage >= $scope.allPage) {
				$scope.scrollFoot = true;
			}
		});
		$(".carthasGoods").show();

	} else {
		$scope.saveProvideMessage = []; //存取初始化数据
		$scope.collectList = "";
		$scope.getCookieGoods()
		$(".carthasGoods").show();
	}



	$scope.Drugs = function(goodsType, event) {
		$scope.collectchoose = true;
		$scope.display = true;
		$scope.goodsType = goodsType;
		$scope.collectList = [];
		$scope.find(1);

	};
	$scope.Prescription = function(goodsType, event) {
		$scope.collectchoose = false;
		$scope.display = false;
		$scope.goodsType = goodsType;
		$scope.collectList = [];
		$scope.find(1);


	};
	$scope.reloadRoute = function() {
		$window.location.reload();
	};

}



app
	.controller('collectController', collectController)
