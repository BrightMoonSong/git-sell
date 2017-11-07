/**
 * 购物车controller定义
 */
function cartController($rootScope,$scope, $http, $q, $timeout, cartService,constPageSize,ngDialog) {
	$rootScope.clickPage = 2;
	$scope.member = getCookie("loginManager"); //获取登录信息
	if ($scope.member != "") {
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
	}
	$scope.ossPublic = publicUrlMall;
	$scope.loadding = true;
	$scope.hasGoods = true; //判断是否有商品
	$scope.currentPage = 1;
	$scope.allPage = 0;
	//返回上一页
	$scope.goBack = function(){
		history.back(-1)
	}
	$scope.openModal = function() {
		$scope.dialog = ngDialog.open({
			template: '../../../views/common/promptBox.html',
            className: 'ngdialog-theme-default',
//          controller: 'submitMoreController',
            scope: $scope,
            width: 150,
            closeByDocument:false
        })
	};
//	$scope.openModal()
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
	/**
	 * 搜索数据
	 */
		$scope.find = function(currentShowPage) {
		var defer = $q.defer();
		cartService
			.find($scope.memberId,currentShowPage,constPageSize)
			.then(
				function(result) {
					console.log(result)
					$scope.goodsList1 = result.data;
					if ($scope.goodsList1 == "" || $scope.goodsList1 == null) { //没有商品则显示空购物车
						$scope.hasGoods = false;
						$scope.loadding = false;
						return;
					}
					$scope.allPage = result.totalSize/constPageSize;
					var re = /\d+\.[0-9]/g;   						//判断数字是否为小数
					if(re.test($scope.allPage)){
						$scope.allPage = Number($scope.allPage.toString().split(".")[0]) + 1
					}
					$scope.allSelectJudge = 0;		//用来计算全选
					$scope.goodsIdString = "";		//将goodsId拼接获取价格
					$scope.goodsListLen = 0;
					for (var i = 0; i < $scope.goodsList1.length; i++) { //登录情况下需要得到最新加入购物车的商品
						$scope.goodsList.push($scope.goodsList1[i])		//拼接数据
					}
					for (var i = 0; i < $scope.goodsList1.length; i++) { //登录情况下需要得到最新加入购物车的商品
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
					}
					$scope.loadding = false;
					$(".showHide").show()
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
			$scope.loadding = false;
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
					$(".showHide").show();
					$scope.loadding = false;
					$scope.selectChange = selectOne; //初始化选择复选框
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	}
	
	//显示收藏、删除
	$scope.showHideBtn = false;
	$scope.showBtn = function(){
		$scope.showHideBtn = true;
	}
	$scope.closeBtn = function(){
		$scope.showHideBtn = false;
	}
	//调取存入购物车
	$scope.joinCart = function(cartId, goodsCount, productId) {
		var defer = $q.defer();
		if($scope.member != "") { //登陆了才去调接口
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
	//显示收藏、删除
	$scope.showHideBtn = false;
	$scope.showBtn = function(){
		$scope.showHideBtn = true;
	}
	$scope.closeBtn = function(){
		$scope.showHideBtn = false;
	}
	//手动输入数量
	$scope.limitNum = function(num){
		if(num > 200){
			this.goods.readonly = true;
		}
	}
	$scope.inputNum = function(cartId, goodsNum, productId, goodStock) {
		var that = this;
		this.goods.readonly = false;
		that.goods.count = that.goods.count.replace(/\D/g, ''); //只能为数字
		that.goods.totalPrice = that.goods.count * that.goods.salesPrice;
		that.goods.totalPrice = priceFilter(that.goods.totalPrice)
		if(goodsNum > goodStock || goodsNum > 200 || goodsNum == 0) { //输入不可超过库存或者200
			for(var i = 0; i < $scope.saveProvideMessage.length; i++) {
				if($scope.saveProvideMessage[i].productId == productId) {
					$scope.index_input = i;
					if(goodsNum != 0)promptBox("库存不足！");
					$timeout(function() { //1s如果不更改则回复到上次保存的数据
					}, 800).then(function() {
						that.goods.count = Number($scope.saveProvideMessage[$scope.index_input].count); //超过则显示上次输入的数量
						that.goods.totalPrice = that.goods.count * that.goods.salesPrice;
						that.goods.totalPrice = priceFilter(that.goods.totalPrice)
					})
				}
			}
			return;
		} else {
			$scope.saveMessage = {};
			$scope.saveMessage.productId = productId;
			$scope.saveMessage.count = Number(goodsNum);
			$scope.isTrue = 0;
			for(var j = 0; j < $scope.saveProvideMessage.length; j++) {
				if($scope.saveProvideMessage[j].productId == $scope.saveMessage.productId) {
					$scope.saveProvideMessage[j].count = $scope.saveMessage.count;
					if($scope.member != "" && goodsNum == that.goods.count) { //只有输入 正确的数字时才会调取接口存取数量
						$scope.goodsNum = goodsNum.replace(/\D/g, ''); //只能为数字
						that.goods.count = Number($scope.goodsNum);
						$scope.joinCart(cartId, Number(that.goods.count));
						$scope.goodsList.forEach(function(goods) { //让当前变动的商品选中
							if(goods.productId == productId) {
								if(that.goods.stock >= 1 && that.goods.goodsState == 6){
									that.goods.status = true;
									selectOne(); //判断是否变为全选
								}
							}
						});
					} else if($scope.member == "" && $scope.saveProvideMessage[j].count != that.goods.count) { //如果没登陆并且数量有改变
						var goodsNum = goodsNum.replace(/\D/g, '');
						that.goods.count = Number(goodsNum);
						changeCartGoods(productId, Number(goodsNum))
					}
				} else {
					$scope.isTrue++;
				}
			}
			if($scope.isTrue == $scope.saveProvideMessage.length) { //判断是否为新数据									//用来存取改变的数量
				$scope.saveProvideMessage.push($scope.saveMessage);
			}
		}
		if($scope.member != "") {
			$scope.goodsNum = goodsNum.replace(/\D/g, '');
			that.goods.count = Number($scope.goodsNum);
			$scope.joinCart(cartId, Number(that.goods.count));
			$scope.goodsList.forEach(function(goods) { //让当前变动的商品选中
				if(goods.productId == productId) {
					that.goods.status = true;
					selectOne(); //判断是否变为全选
				}
			});
		} else {
			var goodsNum = goodsNum.replace(/\D/g, '');
			that.goods.count = Number(goodsNum);
			changeCartGoods(productId, goodsNum);
		}
	}
	//改变数量阻尼
	$scope.provideClick = 0; //存放上一次点击的时间戳
	$scope.nextClick = 0; //存放当前点击的时间戳
	$scope.countNum = 0; //用来存放点击的次数
	$scope.endTime = ""; //最近两次点击的时间差
	$scope.changeInputCount = function(cartId, goodsNum, productId, count1) {
		$timeout(function() {}, 1000).then(function() {
			if($scope.countNum == count1) {
				$scope.joinCart(cartId, Number(goodsNum), productId);
				$scope.countNum = 0;
				$scope.nextClick = 0;
				$scope.provideClick = 0;
			}
		});
	}
	$scope.changeNum = function(cartId, goodsNum, productId, goodStock) {
		if(goodsNum > goodStock){
			promptBox("库存不足！");
			$scope.countNum = 0;
			this.goods.count = Number(goodsNum) - 1;
			return;
		}
		var that = this;
		that.goods.totalPrice = that.goods.count * that.goods.salesPrice;
		that.goods.totalPrice = Math.round(parseFloat(that.goods.totalPrice) * 1000) / 1000;
		that.goods.totalPrice = priceFilter(that.goods.totalPrice)
		$scope.goodsList.forEach(function(goods) {
			if(goods.productId == productId) {
				that.goods.status = true;
				selectOne();
			}
		});
		$scope.countNum++; //每次点击数量加1
		var date = new Date();
		$scope.provideClick = $scope.nextClick;
		$scope.nextClick = date.getTime();
		$scope.endTime = $scope.nextClick - $scope.provideClick;
		$scope.count1 = Number($scope.countNum);
		if($scope.endTime <= 1000 || $scope.provideClick == 0) {
			$scope.changeInputCount(cartId, Number(goodsNum), productId, $scope.count1);
		}
	}
	//全选、反选
	$scope.selectAll = function() {
		$scope.goodsList.forEach(function(goods) {
			if(goods.stock != 0 && goods.goodsState == 6){
				goods.status = $scope.allSelect;
			}
		});
	}
	function selectOne() { //先执行一次对代码进行一次处理
		var flag = true;
		$scope.goodsList.forEach(function(goods) {
			if(!goods.status) flag = false;
		});
		$scope.allSelect = flag;
	}
	//总价
	$scope.totalPrice = function() {
		var sum = 0;
		if($scope.goodsList.length >= 1) {
			$scope.goodsList.forEach(function(goods) {
				if(goods.status) {
					sum += goods.salesPrice * goods.count;
				}
			});
		}
		sum = priceFilter(sum);
		return sum;
	}
	//选择商品总数
	$scope.allSelectNum = function() {
		var allNum = 0;
		if($scope.goodsList.length >= 1) {
			$scope.goodsList.forEach(function(goods) {
				if(goods.status) {
					allNum += Number(goods.count)
				}
			});
		}
		return allNum;
	}
	function allCartNum() {
		var allCartNumber = 0;
		if($scope.goodsList.length >= 1) {
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
			if(goods.status) {
				$scope.goodsListLen++;
			}
		});
		if($scope.goodsListLen < 1 && index == 1) {
			promptBox("请先选择要删除的商品！")
		} else {
			$scope.dialog = jDialog.confirm('确认删除商品？', {
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
		if($scope.member != "" && index == 0) { //登录并且删除单个
			cartService
				.delete(cartId)
				.then(
					function(result) {
						$scope.dialog.close();
						$scope.currentPage = 1;
						$scope.goodsList=[];
						$scope.find(1);
					});
		} else if($scope.member == "" && index == 0) { //未登录并且删除单个
			if(deleteCartGoods(goodsId)) { //删除成功
				$scope.dialog.close();
				$scope.goodsList=[];
				$scope.getCookieGoods();
			}
		} else if($scope.member != "" && index == 1) { //登录并且删除多个
			$scope.goodsArr = [];
			$scope.goodsList.forEach(function(goods) {
				if(goods.status) {
					$scope.goodsArr.push(goods.id)
				}
			});
			$scope.goodsArr = String($scope.goodsArr);
			cartService
				.deleteMore($scope.goodsArr)
				.then(
					function(result) {
						$scope.dialog.close();
						$scope.currentPage = 1;
						$scope.goodsList=[];
						$scope.find(1);
					});
		} else if($scope.member == "" && index == 1) { //未登录并且删除多个
			var goodsArr = [];
			$scope.goodsList.forEach(function(goods) {
				if(goods.status) {
					var goodsdeleteMessage = {};
					goodsdeleteMessage.productId = goods.productId;
					goodsArr.push(goodsdeleteMessage)
				}
			});
			if(deleteMultipleGoods(goodsArr)) {
				$scope.dialog.close();
				$scope.goodsList=[];
				$scope.getCookieGoods();
			}
		}
	}
	//移入收藏
	$scope.membercollection = function(index, cartId, goodsId, productId) {
		$scope.joinCollection = function() {
			$scope.dialog1 = jDialog.confirm('确认移入收藏？', {
				handler: function(button, dialog) {
					cartService
						.membercollection($scope.saveCollectionMessage)
						.then(
							function(result) {
								console.log(result)
								$scope.dialog1.close();
								$scope.currentPage = 1;
								$scope.goodsList=[];
								$scope.find(1);
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
			if(goods.status) {
				$scope.goodsListLen++;
			}
		});
		if(checkLogin() && index == 0) {
			$scope.saveCollectionMessage = [];
			$scope.collectionGoods = {};
			$scope.collectionGoods.memberId = String($scope.member.id);
			$scope.collectionGoods.cartId = cartId;
			$scope.collectionGoods.goodsId = goodsId;
			$scope.collectionGoods.productId = productId;
			$scope.saveCollectionMessage.push($scope.collectionGoods)
			if($scope.goodsListLen < 1) { //没有选择商品
				promptBox("请先选择要移入收藏的商品！")
			} else {
				
				$scope.joinCollection()
			}
		} else if(checkLogin() && index == 1) {
			$scope.saveCollectionMessage = [];
			$scope.goodsList.forEach(function(goods) {
				if(goods.status) {
					$scope.collectionGoods = {};
					$scope.collectionGoods.cartId = goods.id;
					$scope.collectionGoods.productId = goods.productId;
					$scope.collectionGoods.goodsId = goods.goodsId;
					$scope.collectionGoods.memberId = $scope.member.id;
					$scope.saveCollectionMessage.push($scope.collectionGoods)
				}
			});
			if($scope.goodsListLen < 1) { //没有选择商品
				promptBox("请先选择要移入收藏的商品！")
			} else {
				$scope.joinCollection()
			}
		}
	}
	//结算
	$scope.payCart = function() {
		$scope.saveAllPayMessage = [];
		$scope.goodsList.forEach(function(goods) {
			if(goods.status) {
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
			if(goods.status) {
				$scope.goodsListLen++;
			}
		});
		if($scope.goodsListLen < 1 && checkLogin()) { //结算时先判断 是否选择商品
			promptBox("请先选择商品！")
		} else if($scope.goodsListLen >= 1 && checkLogin()) { //已登陆
			cartService
				.pay($scope.saveAllPayMessage)
				.then(
					function(result) {
						$scope.joinFailGoods = result.data;
						if(result.code == 0){
							window.location.href = constWapLocation + "/index.html#/info/submitorder-2";
							delCookie("consultantId");
						}else if(result.code == -1 || result.code == -2){
							if(result.data != "" || result.data != null){
								$scope.noStockGoodsId = result.data.productId;
								for(var i = 0; i < $scope.goodsList.length; i++){
									if($scope.goodsList[i].productId == $scope.noStockGoodsId){
										$scope.joinFailGoods = result.data
										if(result.code == -2) $scope.joinFailGoods.status = false
										$scope.closeModalMessage = ngDialog.open({
											template: 'views/cart/cartMessage.htm',
								            className: 'ngdialog-theme-default',
								            scope: $scope,
								            width: 900
								        })
										$scope.currentPage = 1;
										$scope.goodsList = []
										$scope.find(1)
									}
								}

							}
						}
					})
		}
	}
	//关闭弹窗框
	$scope.closeModal = function(){
		$scope.closeModalMessage.close()
	}
	//判断是否登陆
	$scope.ifLogin = getCookie("formToken");
	if ($scope.ifLogin != "" && $scope.ifLogin != null && $scope.ifLogin != undefined) {
		$scope.goodsList = [];
		$scope.saveProvideMessage = []; //存取初始化数据
		$scope.find($scope.currentPage);
		$(window).scroll(function(){
	　　	   var scrollTop = $(this).scrollTop();
		　　var scrollHeight = $(document).height();
		　　var windowHeight = $(this).height();
	//		console.log(scrollTop + windowHeight,scrollHeight)
		　　if(scrollTop + windowHeight +1  >= scrollHeight ){
		　　　　	$scope.currentPage++;
				if($scope.allPage != 0 && $scope.currentPage <= $scope.allPage){	
					$scope.loadding = true;

					// $timeout(function() {
						$scope.find($scope.currentPage)
					// }, 1000);
					
					$scope.scrollFoot = false;
				}else{
					$scope.loadding = false;
				}
		　　}
			if($scope.currentPage >= $scope.allPage){
				$scope.scrollFoot = true;
			}
		});
		$(".carthasGoods").show();
		
	} else {
		$scope.saveProvideMessage = []; //存取初始化数据
		$scope.goodsList = "";
		$scope.getCookieGoods()
		$(".carthasGoods").show();
	}
}
	//判断是否登陆
	

app
	.controller('cartController', cartController)
