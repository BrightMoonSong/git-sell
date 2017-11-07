/**
 * 购物车controller定义
 */
function oderDetailController($scope,$rootScope,$q,$timeout,orderDetailService,constPageSize,ngDialog){
	$scope.locationUrl=window.location.href;
    if(/orderId=\d+/g.test($scope.locationUrl)){
        $scope.orderId=parseInt($scope.locationUrl.match(/orderId=\d+/g)[0].replace("orderId=",""));
    }
    var memberCurrent = getCookie("loginManager");
    if(memberCurrent!=""){
    	memberCurrent = JSON.parse(memberCurrent)
	    $scope.memberId = memberCurrent.id
    }
    $scope.showLogistic = true; 
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
    $scope.getPrice = function(){
    	var defer = $q.defer();
    	orderDetailService
		.getPrice($scope.memberId,$scope.goodsIds,1,1,1)
		.then(
			function(result) {
				console.log(result)
				if(result.code == 0){
					for(var n = 0; n < result.data.length; n++){
						for(var j = 0; j < $scope.orderList.length; j++){
							if(result.data[n].goodsId == $scope.orderList[j].goodsId){
								$scope.orderList[j].couponsPromotionList = result.data[n].couponsPromotionList
								$scope.orderList[j].goodsPromotionList = result.data[n].goodsPromotionList
								$scope.orderList[j].ordersPromotionList = result.data[n].ordersPromotionList
								$scope.orderList[j].productPriceList = result.data[n].productPriceList
							}
							for(var i = 0; i < result.data[n].productPriceList.length; i++){
								if($scope.orderList[j].productId == result.data[n].productPriceList[i].productId){
									$scope.orderList[j].productPrice = result.data[n].productPriceList[i].salesPrice;
								}
							}
						}
					}
					
					
				}
				defer.resolve(result);
			},function(result){
				defer.resolve(result);
			})
		CommonService.getGoodsPriceByGoodsId
		return defer.promise;
    }
	$scope.getMemberOrder = function(){

		orderDetailService
		.findMemberOrder($scope.orderId)
		.then(
			function(result) {
				console.log(result)
				$(".showLogistic").show()
				$scope.showLogistic = false;
				if(result.data == null){
					window.open("error.html","_self")
				}
				$scope.progressBar = true;										//默认进度条显示
				$scope.memberOrder = result.data;
				$scope.orderList = result.data.ordersProduct;
				$scope.discountList = result.data.ordersDiscount;
				$scope.ifGoodsPromption();	//判断有无商品促销
				$scope.ifOrderPromption();	//判断有无订单、优惠券促销
				$scope.receivedStime = result.data.receivedStime;
				$scope.goodsIds = "";
				for(var i = 0; i < $scope.orderList.length; i++){
					$scope.goodsIds += $scope.orderList[i].goodsId;
					if(i < $scope.orderList.length-1){
						$scope.goodsIds += ","
					}
					if($scope.orderList[i].productSpecInfo == "null:null"){
						$scope.orderList[i].productSpecInfo = "";
					}
				}
//				 $scope.getPrice()
				$scope.memberOrderStatus = orderStatus($scope.memberOrder.orderStatus)
				if($scope.memberOrder.payStatus == 0){//未支付
					if($scope.orderStatus == 7){				//已取消
						$scope.progressBar = false;
					}
				}else{															//已支付
					$scope.getGoodsAddress()
					$scope.paidTime = $scope.memberOrder.paidTime
					//金额
					$scope.moneyProduct = Number($scope.memberOrder.ordersProduct[0].productTotalPrice);
					$scope.moneyDiscount = $scope.memberOrder.moneyDiscount
					$scope.moneyLogistics = $scope.memberOrder.moneyLogistics
					$scope.moneyOrder = $scope.memberOrder.moneyOrder
					if($scope.orderStatus == 1 || $scope.orderStatus == 2){
					}else if($scope.orderStatus == 3 || $scope.orderStatus == 4 || $scope.orderStatus  ==  5){				//已发货
						$scope.payTime = $scope.memberOrder.paidTime;
						$scope.confirmTime = "";
						$scope.sendTime = $scope.orderList[0].updateSTime;
					}else if($scope.orderStatus == 6){				//待取消
						$scope.progressBar = true;
					}else if($scope.orderStatus == 7){				//已取消
						$scope.progressBar = true;
					}else if($scope.orderStatus == 8){				//已完成
						$scope.sendTime = $scope.orderList[0].updateSTime;
					}else if($scope.orderStatus == 9){				//待退款
						$scope.progressBar = true;
					}
				}
				
			}, function(result) {
				console.log(result)
			});
		
	}
	if(checkLogin()){
		$scope.getMemberOrder()
	}
	//收货地址
	$scope.getGoodsAddress = function(){
		$scope.logisticsName = $scope.memberOrder.logisticsName			//物流公司
		$scope.logisticsNumber = $scope.memberOrder.logisticsNumber;	//物流单号	
		$scope.getlogistics($scope.memberOrder.logisticsCode,$scope.logisticsNumber)
	}
	$scope.getlogistics = function(logisticCode,logisticsNumber){
		var defer = $q.defer();
		orderDetailService
		.getlogistics(logisticCode,logisticsNumber)
		.then(
			function(result) {
				$scope.logisticsMessage = angular.fromJson(result.data);
				if(angular.fromJson(result.data).success == false){
					$scope.addressMessageArr = "";
				}else{
					$scope.addressMessageArr = angular.fromJson(result.data).Traces;
				}
				$scope.orderAddress = JSON.parse(result.data);
				
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	}
	//判断货品无商品促销
	$scope.ifGoodsPromptionFlag = true;
	$scope.ifGoodsPromption = function(){
		for(var i = 0; i < $scope.orderList.length; i++){
			if($scope.discountList.length != 0){
				console.log($scope.discountList)
				for(var n = 0; n < $scope.discountList.length; n++){
				
					if($scope.discountList[n].promotionType == 1 && $scope.orderList[i].productId == $scope.discountList[n].productIds){
						$scope.ifGoodsPromptionFlag = false;
						return ;
					}
				}
			}
		}
	}
	//判断有无订单、优惠券促销
	$scope.ifOrderPromptionFlag = true;
	$scope.ifOrderPromption = function(){
		for(var i = 0; i < $scope.orderList.length; i++){
			if($scope.discountList.length != 0){
				console.log($scope.discountList)
				for(var n = 0; n < $scope.discountList.length; n++){
					if($scope.discountList[n].promotionType == 2 || $scope.discountList[n].promotionType == 3 && $scope.orderList[i].productId == $scope.discountList[n].productIds){
						$scope.ifOrderPromptionFlag = false;
						return ;
					}
				}
			}
		}
	}
}
angular
    .module('oderDetailApp')
    .controller('oderDetailController', oderDetailController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.factory('HttpInterceptor', ['$q', HttpInterceptor]) //定义一个 Service，作为 Interceptors 的处理函数
	.config(['$httpProvider', function($httpProvider) { //添加对应的 Interceptors
		$httpProvider.interceptors.push(HttpInterceptor);
	}]);