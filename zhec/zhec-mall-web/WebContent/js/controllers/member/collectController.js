angular
	.module('memberApp')
	.controller('collectController', collectController)
	.directive('datalistpager', datalistpager)
	//  查询收藏列表
function collectController($rootScope, $scope, $http, $window, $q, collectService, constPageSize, CommonService) {
	$scope.dataId = "";
	$scope.member = getCookie("loginManager");
	// $scope.list = [];
	// $scope.list1 = [];
	// $scope.list2 = [];
	$scope.display = true;
	$scope.goodsType = "";

	if ($scope.member != "") {
		$scope.member = JSON.parse($scope.member);
		$scope.loginId = $scope.member.loginId;
		$scope.memberId = $scope.member.id;
	}


	$scope.cellectIfGoods = true; //判断是否有商品
	//左侧菜单的样式
	$scope.$parent.sideIndex = 4;
	$rootScope.memberTitle = "用户收藏-鹿医生";
	//获取我的收藏列表
	$scope.find = function(constPageNo) {
		if ($scope.goodsType == '' || $scope.goodsType == null || $scope.goodsType == undefined) {
			$scope.goodsType = 2;
		}
		var goodsType = $scope.goodsType;
		/* 请求不能为空的参数  menberID,pageSize,pageNo*/
		var defer = $q.defer();
		collectService
			.find($scope.memberId, constPageSize, constPageNo, goodsType)
			.then(
				function(result) {
					$scope.collectList = result.data;

					for (var i = 0; i < $scope.collectList.length; i++) {
						$scope.collectList[i].status = false
					}
					if ($scope.collectList == "") {
						$scope.cellectIfGoods = false;
					}
					if ($scope.collectList != "") {
						$scope.cellectIfGoods = true;
					}
					for (var i = 0; i < $scope.collectList.length; i++) {
						// $scope.collectList[i].price = priceFilter($scope.collectList[i].price)
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
					CommonService.getGoodsPriceByGoodsId($scope.memberId, goodsIds, 1, 0, 0, $scope.collectList);

					// for (var i = 0; i < $scope.collectList.length; i++) {
					// 	if ($scope.collectList[i].goodsType == 1) {
					// 		$scope.list.push($scope.collectList[i])
					//
					// 	} else if ($scope.collectList[i].goodsType != 1) {
					// 		$scope.list1.push($scope.collectList[i]);
					// 		$scope.list2.push($scope.collectList[i]);
					// 	}
					// }

					defer.resolve(result);
					$scope.allSelect = false;
				},
				function(result) {
					defer.reject(result);
				})

		return defer.promise;


	};
	//点击相同的侧边栏 重新刷新数据
	$scope.$on('sideIndex', function(e, data) { //data我们接受到的数据
		if ($scope.$parent.sideIndex == data) {
			$scope.loadData(true);
		}
	});
	//  删除收藏商品
	$scope.collectDeldata = function(index, collectId, goodsId) {
			$scope.deleteConfirm = function() {
					$scope.dialog = jDialog.confirm('确认删除？', {
						handler: function(button, dialog) {
							collectService
								.delete($scope.deleteArr)
								.then(
									function(result) {
										$scope.dialog.close()
										$scope.loadData(true)
										promptBox("商品已删除");
									});
						}
					}, {
						handler: function(button, dialog) {
							$scope.dialog.close();
						}
					});
				}
				//删除商品
			$scope.saveMessage = {};
			if (index == 0) {
				$scope.deleteArr = [];
				$scope.saveMessage.id = collectId;
				$scope.deleteArr.push($scope.saveMessage);
				$scope.deleteConfirm()
			} else if (index == 1) {
				$scope.collectListLen = 0;
				$scope.collectList.forEach(function(collect) { //判断是否有商品选中
					if (collect.status) {
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

		}
		// 加入 购物车
	$scope.membercart = function(index, id, productId, goodsId, name1, masterImg, goodsType) {

		$scope.joinCollection = function() {
			$scope.dialog1 = jDialog.confirm('确认移入购物车？', {
				handler: function(button, dialog) {
					collectService
						.cart($scope.saveCollectionMessage)
						.then(
							function(result) {
								$scope.dialog1.close();
								$scope.loadData(true)
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
		if (index == 0) {
			$scope.saveCollectionMessage = [];
			$scope.collectionGoods = {};
			$scope.collectionGoods.id = id;
			$scope.collectionGoods.productId = productId;
			$scope.collectionGoods.goodsId = goodsId;
			$scope.collectionGoods.name1 = name1;
			$scope.collectionGoods.masterImg = masterImg;
			$scope.collectionGoods.goodsType = goodsType;
			$scope.collectionGoods.loginId = $scope.loginId;
			$scope.collectionGoods.memberId = String($scope.member.id);
			$scope.saveCollectionMessage.push($scope.collectionGoods)

			$scope.collectListLen = 0;
			$scope.collectList.forEach(function(collect) { //判断是否有商品选中
				if (collect.status) {
					$scope.collectListLen++;
				}
			});
			$scope.saveCollectionMessage = JSON.stringify($scope.saveCollectionMessage);
			$scope.saveCollectionMessage = JSON.parse($scope.saveCollectionMessage);
			$scope.joinCollection()

		} else if (index == 1) {
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


	}

	//判断是否登陆
	$scope.joinCart = function(productId, goodsNum) {
		if (checkLogin()) {
			addGoodsToCart(productId, goodsNum);
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

	$scope.reloadRoute = function() {
		$window.location.reload();
	};


	$scope.Drugs = function(goodsType, event) {
		angular.element(".recent_goods_cf li").removeClass("recent_goods_cf_xz")
		angular.element(event.target).addClass("recent_goods_cf_xz");
		$scope.display = true;
		$scope.goodsType = goodsType;
		$scope.loadData(1);

	};
	$scope.Prescription = function(goodsType, event) {
		angular.element(".recent_goods_cf li").removeClass("recent_goods_cf_xz")
		angular.element(event.target).addClass("recent_goods_cf_xz");
		$scope.display = false;
		$scope.goodsType = goodsType;
		$scope.loadData(1);


	};




}
