/**
 * 购物车controller定义
 */
function cartController($scope,$rootScope, $q, $timeout, cartService, constPageSize, ngDialog) {
	$scope.member = getCookie("loginManager"); //获取登录信息
	if ($scope.member != "") {
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
	}
	$scope.hasGoods = true; //判断是否有商品
	$scope.ossPublic = publicUrlMall;
	//商品推荐位
	$scope.goodsrecommend = function() {
		var defer = $q.defer();		//生成异步对象
		cartService
			.recommend()
			.then(function(result) {
				$scope.goodsinleft = result.data;
				defer.resolve(result);	//执行到这里时，改变defer状态为执行成功，返回result为从后台取到的数据
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;	//起到保护作用，不允许函数外部改变函数内的defer状态
	}
	//拦截器弹出框
	$rootScope.showAlert = function(message) {
		var dialog = ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default',
			height:174,
			controller: ['$scope', function($scope) {
				$scope.promptMessage = message;
			}],
		});

		$timeout(function() {
			dialog.close();
		}, 1500);
	}
	//价格
	$scope.getGoodsPrice = function(goodsList) {
		goodsList = String(goodsList)
		cartService
			.getGoodsPrice($scope.memberId, goodsList, 1, 0, 0)
			.then(function(result) {
				defer.resolve(result);
			}, function(result) {
				$scope.priceList = result.data;
				for (var i = 0; i < $scope.priceList.length; i++) {
					for (var j = 0; j < $scope.priceList[i].productPriceList.length; j++) {
						for (var n = 0; n < $scope.goodsList.length; n++) {
							if ($scope.goodsList[n].productId == $scope.priceList[i].productPriceList[j].productId) {
								$scope.goodsList[n].salesPrice = $scope.priceList[i].productPriceList[j].salesPrice;
							}
						}
					}
				}
			});
	}
	$scope.find = function() {
		var defer = $q.defer();
		cartService
			.find($scope.memberId)
			.then(
				function(result) {
					console.log(result)
					$scope.goodsList = result.data;
					if ($scope.goodsList == "" || $scope.goodsList == null) { //没有商品则显示空购物车
						$scope.hasGoods = false;
						return;
					}
					$scope.allSelectJudge = 0;		//用来计算全选
					$scope.goodsIdString = "";		//将goodsId拼接获取价格
					$scope.goodsListLen = 0;
					for (var i = 0; i < $scope.goodsList.length; i++) { //登录情况下需要得到最新加入购物车的商品
						//将goodsId变为字符串
						$scope.goodsIdString += $scope.goodsList[i].goodsId;
						if (i < $scope.goodsList.length - 1) {	//最后一个不拼接“，”
							$scope.goodsIdString += ","
						}
						if ($scope.goodsList[i].flag == 1) { 	//将最新添加的商品赋值给状态值，显示是否勾选复选框
							$scope.goodsList[i].status = true;
							if($scope.goodsList[i].stock > 0 && $scope.goodsList[i].goodsState == 6){	//有库存并且处于在售才会去计算全选
								$scope.allSelectJudge++;	
								$scope.goodsListLen++;
							}
						} else {
							$scope.goodsList[i].status = false;
						}
						if ($scope.goodsList[i].count > $scope.goodsList[i].stock && $scope.goodsList[i].stock >= 1) {
							$scope.goodsList[i].count = $scope.goodsList[i].stock	//判断库存是否小于之前加入购物车的数量
							$scope.joinCart($scope.goodsList[i].id,$scope.goodsList[i].stock, $scope.goodsList[i].productId);
						} else if ($scope.goodsList[i].stock == 0) {	//库存为0时不标记，数量显示为1
							$scope.goodsList[i].count = 1;		//库存为0时默认显示1，但数量不可进行改变
							$scope.goodsList[i].status = false;		//库存为0的情况不进行勾选
						}
						if ($scope.goodsList[i].goodsState != 6) {	//下架的状态也不标记
							$scope.goodsList[i].status = false;
						}
						$scope.goodsList[i].readonly = false;	//每个商品输入框不允许输入

						if ($scope.allSelectJudge == $scope.goodsList.length) { //判断是否所有的商品是否都选中
							$scope.allSelect = true;
						} else {
							$scope.allSelect = false;
						}
						//以下三句代码目前不用，如果重新启用输入框改变数量时再恢复
//						$scope.saveMessage = {}; //存储数据，修改数量不成功时会恢复到修改前的状态
//						$scope.saveMessage.productId = $scope.goodsList[i].productId;
//						$scope.saveProvideMessage.push($scope.saveMessage)
					}
					
					$scope.getGoodsPrice($scope.goodsIdString)
					$scope.selectChange = selectOne; //初始化选择复选框
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	}
	/**
	 * 搜索数据(未登陆)
	 */
	$scope.getCookieGoods = function() {
		$scope.allSelect = true; //未登录时所有的商品默认选中状态
		$scope.status = true;
		$scope.cookieIdArr = []; //存取cookie所有商品productid
		$scope.getCookieAllGoods = getCookie("cartManager");
		if ($scope.getCookieAllGoods == "" || $scope.getCookieAllGoods == "[]") { //cookie中没有商品则显示空购物车
			$scope.hasGoods = false;
			$scope.goodsList = [];
			return;
		}
		$scope.getCookieAllGoods = JSON.parse($scope.getCookieAllGoods);
		for (var i = 0; i < $scope.getCookieAllGoods.length; i++) {		//将cookie中数据存储
			$scope.cookieIdArr.push($scope.getCookieAllGoods[i].id);	//将cookie中货品Id取出存储
			
			//以下代码目前不用，如果重新启用输入框改变数量时再恢复
//			$scope.saveMessage = {};
//			$scope.saveMessage.productId = $scope.getCookieAllGoods[i].id;
//			$scope.saveMessage.count = Number($scope.getCookieAllGoods[i].num);
//			$scope.saveProvideMessage.push($scope.saveMessage)	
		}
		$scope.cookieIdArr = String($scope.cookieIdArr)
		var defer = $q.defer();
		cartService
			.findCookieGoods($scope.cookieIdArr)	//根据货品Id查询数据并进行展示
			.then(
				function(result) {
					console.log(result)
					$scope.goodsList = result.data;
					$scope.goodsIdString = "";	//用来拼接id
					$scope.allSelectJudge = 0;
					for (var i = 0; i < $scope.goodsList.length; i++) {
						for(var j = 0; j < $scope.getCookieAllGoods.length; j++){
							if($scope.getCookieAllGoods[j].id == $scope.goodsList[i].productId){
								$scope.goodsList[i].count = $scope.getCookieAllGoods[j].num;
								 if($scope.goodsList[i].stock > 0 && $scope.goodsList[i].goodsState == 6){
								 	 $scope.allSelectJudge ++;
								 	 $scope.goodsListLen++;
								 }
							}
						}
						$scope.goodsIdString += $scope.goodsList[i].goodsId;
						if (i < $scope.goodsList.length - 1) {
							$scope.goodsIdString += ","
						}
						if ($scope.goodsList[i].stock == 0 || $scope.goodsList[i].goodsState != 6) {
							$scope.goodsList[i].count = 1;
							$scope.goodsList[i].status = false;
						}
					}
					$scope.getGoodsPrice($scope.goodsIdString)
					$scope.selectChange = selectOne; //初始化选择复选框
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	}
	//调取存入购物车
	$scope.joinCart = function(cartId, goodsCount, productId) {
		var defer = $q.defer();
		if ($scope.member != "") { //登陆了才去调接口
			cartService
				.put(cartId, Number(goodsCount))
				.then(
					function(result) {
						defer.resolve(result);
					},
					function(result) {
						defer.reject(result);
					})
			return defer.promise;
		} else { //否则修改cookie
			changeCartGoods(productId, Number(goodsCount));
		}
	}
	//手动输入数量,以下代码用作数量框输入限制，不可删
//	$scope.limitNum = function(num) {
//		if (num > 200) {
//			this.goods.readonly = true;
//		}
//	}
//		$scope.inputNum = function(cartId, goodsNum, productId, goodStock,goodsState) {
//			if(goodsState!=6 || goodStock == 0){
//				this.goods.count = 1;
//				return;
//			}
//			var that = this;
//			this.goods.readonly = false;
//			that.goods.count = that.goods.count.replace(/\D/g, ''); //只能为数字
//			that.goods.totalPrice = that.goods.count * that.goods.salesPrice;
//			that.goods.totalPrice = priceFilter(that.goods.totalPrice)
//			if(goodsNum > goodStock || goodsNum > 200 || goodsNum == 0) { //输入不可超过库存或者200
//				for(var i = 0; i < $scope.saveProvideMessage.length; i++) {
//					if($scope.saveProvideMessage[i].productId == productId) {
//						$scope.index_input = i;
//						if(goodsNum != 0)promptBox("库存不足！");
//						$timeout(function() { //1s如果不更改则回复到上次保存的数据
//						}, 800).then(function() {
//							that.goods.count = Number($scope.saveProvideMessage[$scope.index_input].count); //超过则显示上次输入的数量
//							that.goods.totalPrice = that.goods.count * that.goods.salesPrice;
//							that.goods.totalPrice = priceFilter(that.goods.totalPrice)
//						})
//					}
//				}
//				return;
//			} else {
//				$scope.saveMessage = {};
//				$scope.saveMessage.productId = productId;
//				$scope.saveMessage.count = Number(goodsNum);
//				$scope.isTrue = 0;
//				for(var j = 0; j < $scope.saveProvideMessage.length; j++) {
//					if($scope.saveProvideMessage[j].productId == $scope.saveMessage.productId) {
//						$scope.saveProvideMessage[j].count = $scope.saveMessage.count;
//						if($scope.member != "" && goodsNum == that.goods.count) { //只有输入 正确的数字时才会调取接口存取数量
//							$scope.goodsNum = goodsNum.replace(/\D/g, ''); //只能为数字
//							that.goods.count = Number($scope.goodsNum);
//							$scope.joinCart(cartId, Number(that.goods.count));
//							$scope.goodsList.forEach(function(goods) { //让当前变动的商品选中
//								if(goods.productId == productId) {
//									if(that.goods.stock >= 1 && that.goods.goodsState == 6){
//										that.goods.status = true;
//										selectOne(); //判断是否变为全选
//									}
//								}
//							});
//						} else if($scope.member == "" && $scope.saveProvideMessage[j].count != that.goods.count) { //如果没登陆并且数量有改变
//							var goodsNum = goodsNum.replace(/\D/g, '');
//							that.goods.count = Number(goodsNum);
//							changeCartGoods(productId, Number(goodsNum))
//						}
//					} else {
//						$scope.isTrue++;
//					}
//				}
//				if($scope.isTrue == $scope.saveProvideMessage.length) { //判断是否为新数据									//用来存取改变的数量
//					$scope.saveProvideMessage.push($scope.saveMessage);
//				}
//			}
//			if($scope.member != "") {
//				$scope.goodsNum = goodsNum.replace(/\D/g, '');
//				that.goods.count = Number($scope.goodsNum);
//				$scope.joinCart(cartId, Number(that.goods.count));
//				$scope.goodsList.forEach(function(goods) { //让当前变动的商品选中
//					if(goods.productId == productId) {
//						that.goods.status = true;
//						selectOne(); //判断是否变为全选
//					}
//				});
//			} else {
//				var goodsNum = goodsNum.replace(/\D/g, '');
//				that.goods.count = Number(goodsNum);
//				changeCartGoods(productId, goodsNum)
//			}
//		}
	//改变数量阻尼
	$scope.provideClick = 0; //存放上一次点击的时间戳
	$scope.nextClick = 0; //存放当前点击的时间戳
	$scope.countNum = 0; //用来存放点击的次数
	$scope.endTime = ""; //最近两次点击的时间差
	$scope.changeInputCount = function(cartId, goodsNum, productId, count1) {
		$timeout(function() {}, 1000).then(function() {
			if ($scope.countNum == count1) {
				$scope.joinCart(cartId, Number(goodsNum), productId);
				$scope.countNum = 0;
				$scope.nextClick = 0;
				$scope.provideClick = 0;
				$scope.notAllowPay = false;
			}
		});
	}
	$scope.changeNum = function(cartId, goodsNum, productId, goodStock) {
		if (goodsNum > goodStock) {	//如果增加数量时数量大于库存值则不让加
			$rootScope.showAlert(zhecDisplayMessage.cartUnderStock)
			$scope.countNum = 0;
			this.goods.count = Number(goodsNum) - 1;
			$scope.changeInputCount(cartId, Number(goodsNum)-1, productId, Number($scope.countNum))
			return;
		}
		$scope.notAllowPay = true;
		var that = this;
		//计算使用数学公式计算，以防有误差
		that.goods.totalPrice = that.goods.count * that.goods.salesPrice;	
		that.goods.totalPrice = Math.round(parseFloat(that.goods.totalPrice) * 1000) / 1000;
		$scope.goodsList.forEach(function(goods) {	//如果改变的是当前某个商品，则将其勾选
			if (goods.productId == productId) {
				that.goods.status = true;
				selectOne();
			}
		});
		$scope.countNum++; //每次点击数量加1
		var date = new Date();	
		$scope.provideClick = $scope.nextClick;	//点击后将上一次的点击时间赋值给$scope.provideClick
		$scope.nextClick = date.getTime();	//$scope.nextClick获取最新的时间
		$scope.endTime = $scope.nextClick - $scope.provideClick;	//两次时间做时间差
		if ($scope.endTime <= 1000 || $scope.provideClick == 0) {	//如果时间差小于1s或者只有一次点击
			$scope.changeInputCount(cartId, Number(goodsNum), productId, Number($scope.countNum))
		}
	}
	//全选、反选
	$scope.selectAll = function() {
		$scope.goodsList.forEach(function(goods) {
			if (goods.stock != 0 && goods.goodsState == 6) {
				goods.status = $scope.allSelect;
			}
		});
	}
	//改变单个商品复选框
	function selectOne() { //先执行一次对代码进行一次处理
		var flag = true;
		$scope.goodsList.forEach(function(goods) {
			if (!goods.status) {
				flag = false;
			}
		});
		$scope.allSelect = flag;
	}
	//总价
	$scope.totalPrice = function() {
		var sum = 0;
		if ($scope.goodsList.length >= 1) {
			$scope.goodsList.forEach(function(goods) {
				if (goods.status) {
					sum += goods.salesPrice * goods.count;
				}
			});
		}
		return sum;
	}
	//选择商品总数
	$scope.allSelectNum = function() {
		var allNum = 0;
		if ($scope.goodsList.length >= 1) {
			$scope.goodsList.forEach(function(goods) {
				if (goods.status) {
					allNum += Number(goods.count)
				}
			});
		}
		return allNum;
	}
	//购物车中所有商品总量
	function allCartNum() {
		var allCartNumber = 0;
		if ($scope.goodsList.length >= 1) {
			$scope.goodsList.forEach(function(goods) {
				allCartNumber += Number(goods.count);
			});
		}
		return allCartNumber;
	}
	$scope.allCartNum = allCartNum;
	//删除商品
	$scope.delete = function(index, cartId, goodsId) {
		$scope.goodsListLen = 0;
		$scope.goodsList.forEach(function(goods) { //在删除多个商品时判断是否有选择商品
			if (goods.status) {
				$scope.goodsListLen++;
			}
		});
		if ($scope.goodsListLen < 1 && index == 1) {		//删除多个并且有商品被选中
			$rootScope.showAlert(zhecDisplayMessage.cartSelectGoods)
		} else {
			$scope.dialog = jDialog.confirm(zhecDisplayMessage.cartDeleteGoods, {
				handler: function(button, dialog) {
					$scope.confirmDelData(index, cartId, goodsId); //确认删除商品
				}
			}, {
				handler: function(button, dialog) {
					$scope.dialog.close();
				}
			});
		}
	}
	$scope.confirmDelData = function(index, cartId, goodsId) {
		if ($scope.member != "" && index == 0) { //登录并且删除单个
			cartService
				.delete(cartId)
				.then(
					function(result) {
						$scope.dialog.close();
						$scope.find();
					});
		} else if ($scope.member == "" && index == 0) { //未登录并且删除单个
			if (deleteCartGoods(goodsId)) { //删除成功
				$scope.dialog.close();
				$scope.getCookieGoods();
			}
		} else if ($scope.member != "" && index == 1) { //登录并且删除多个
			$scope.goodsArr = [];
			$scope.goodsList.forEach(function(goods) {	//删除多个需要每个购物车商品的id
				if (goods.status) {
					$scope.goodsArr.push(goods.id)
				}
			});
			$scope.goodsArr = String($scope.goodsArr);
			cartService
				.deleteMore($scope.goodsArr)
				.then(
					function(result) {
						$scope.dialog.close();
						$scope.find();
					});
		} else if ($scope.member == "" && index == 1) { //未登录并且删除多个
			var goodsArr = [];
			$scope.goodsList.forEach(function(goods) {
				if (goods.status) {
					var goodsdeleteMessage = {};
					goodsdeleteMessage.productId = goods.productId;
					goodsArr.push(goodsdeleteMessage)
				}
			});
			if (deleteMultipleGoods(goodsArr)) {//删除成功
				$scope.dialog.close();
				$scope.getCookieGoods();
			}
		}
	}
	//移入收藏
	$scope.membercollection = function(index, cartId, goodsId, productId) {
		$scope.joinCollection = function() {
			$scope.dialog1 = jDialog.confirm(zhecDisplayMessage.cartRemoveCollection, {
				handler: function(button, dialog) {
					cartService
						.membercollection($scope.saveCollectionMessage)
						.then(
							function(result) {
								$scope.dialog1.close();
								$scope.find();
							})
				}
			}, {
				handler: function(button, dialog) {
					$scope.dialog1.close();
				}
			});
		}
		$scope.goodsListLen = 0;
		$scope.goodsList.forEach(function(goods) { //判断是否有商品选中
			if (goods.status) {
				$scope.goodsListLen++;
			}
		});
		if (checkLogin() && index == 0) {	//单个移入收藏夹
			$scope.saveCollectionMessage = [];
			$scope.collectionGoods = {};
			$scope.collectionGoods.memberId = String($scope.member.id);
			$scope.collectionGoods.cartId = cartId;
			$scope.collectionGoods.goodsId = goodsId;
			$scope.collectionGoods.productId = productId;
			$scope.saveCollectionMessage.push($scope.collectionGoods)
			$scope.joinCollection()
				
		} else if (checkLogin() && index == 1) {	//多个移入收藏夹
			$scope.saveCollectionMessage = [];
			$scope.goodsList.forEach(function(goods) {
				if (goods.status) {
					$scope.collectionGoods = {};
					$scope.collectionGoods.cartId = goods.id;
					$scope.collectionGoods.productId = goods.productId;
					$scope.collectionGoods.goodsId = goods.goodsId;
					$scope.collectionGoods.memberId = String($scope.member.id);
					$scope.saveCollectionMessage.push($scope.collectionGoods)
				}
			});
			if ($scope.goodsListLen < 1) { //没有选择商品
				$rootScope.showAlert(zhecDisplayMessage.cartSelectGoods)
			} else {
				$scope.joinCollection()
			}
		}
	}
	//结算
	$scope.payCart = function() {
		if(!checkLogin()){
			return;
		}
		if($scope.okModalDisabled == true) {	
			return 0;
		}
		$scope.okModalDisabled = true;
		$scope.saveAllPayMessage = [];
		$scope.goodsList.forEach(function(goods) {	//查看所有购物车中选中的商品
			if (goods.status) {
				$scope.saveMessage = {};
				$scope.saveMessage.masterImg = goods.masterImg
				$scope.saveMessage.goodsName = goods.goodsName
				$scope.saveMessage.specName = goods.specName
				$scope.saveMessage.specAttrName = goods.specAttrName
				$scope.saveMessage.salesPrice = goods.salesPrice
				$scope.saveMessage.memberId = String($scope.member.id);
				$scope.saveMessage.id = goods.id;
				$scope.saveMessage.productId = goods.productId
				$scope.saveMessage.count = goods.count;
				$scope.saveAllPayMessage.push($scope.saveMessage)
			}
		});
		$scope.goodsListLen = 0;
		$scope.goodsList.forEach(function(goods) { //在删除多个商品时判断是否有选择商品
			if (goods.status) {
				$scope.goodsListLen++;
			}
		});
		if ($scope.goodsListLen < 1 && checkLogin()) { //结算时先判断 是否选择商品
			$scope.okModalDisabled = false;
			$rootScope.showAlert(zhecDisplayMessage.cartSelectGoods)
		} else if ($scope.goodsListLen >= 1 && checkLogin()) { //已登陆
			console.log($scope.saveAllPayMessage)
			cartService
				.pay($scope.saveAllPayMessage)
				.then(
					function(result) {
						$scope.joinFailGoods = result.data;
						if (result.code == 0) {		//允许提交订单
							window.location.href = "order.html?type=2";
							delCookie("consultantId"); 
						} else if (result.code == -1 || result.code == -2) {	//此时有商品下架或者无货
							if (result.data != "" || result.data != null) {
								$scope.noStockGoodsId = result.data.productId;
								for (var i = 0; i < $scope.goodsList.length; i++) {
									if ($scope.goodsList[i].productId == $scope.noStockGoodsId) {
										$scope.joinFailGoods = result.data;
										if (result.code == -2) $scope.joinFailGoods.status = false
										$scope.closeModalMessage = ngDialog.open({	//展示下架或者没有库存的商品
											template: 'views/cart/cartMessage.html',
											className: 'ngdialog-theme-default',
											scope: $scope,
											width: 900
										})
										$scope.find()
									}
								}

							}
						}
						$scope.okModalDisabled = false;
					},function(result){
						$scope.okModalDisabled = false;
					})
		}
	}
	//关闭弹窗框
	$scope.closeModal = function() {
		$scope.closeModalMessage.close()
	}
	//判断是否登陆
	$scope.ifLogin = getCookie("formToken");
	if ($scope.ifLogin != "" && $scope.ifLogin != null && $scope.ifLogin != undefined) {
		$scope.goodsList = "";
		$scope.saveProvideMessage = []; //存取初始化数据
		$scope.find();
		$scope.goodsrecommend();
		$(".carthasGoods").show();
		
	} else {
		$scope.saveProvideMessage = []; //存取初始化数据
		$scope.goodsList = "";
		$scope.getCookieGoods()
		$scope.goodsrecommend();
		$(".carthasGoods").show();
	}
}
angular
	.module('CartApp')
	.controller('cartController', cartController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.directive('search', search)
	.directive('navigationBar', navigationBar)
	.factory('HttpInterceptor', ['$q', HttpInterceptor]) //定义一个 Service，作为 Interceptors 的处理函数
	.config(['$httpProvider', function($httpProvider) { //添加对应的 Interceptors
		$httpProvider.interceptors.push(HttpInterceptor);
	}]);
