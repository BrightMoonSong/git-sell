/**
 * Created by Administrator on 2017/1/16.
 */

/**
 * Created by like on 2016/12/26.
 */
function returnOrderController($rootScope, $scope, returnOrderService,$window, $q, $http, $timeout, constPageSize, ngDialog) {
	$scope.member = getCookie("loginManager");
	$scope.memberLoginId = "";
	$scope.currentPage = 1;
	$scope.allPage = 0;
	$scope.orderLists = [];
	$scope.orderListPlay = true;
	if ($scope.member != "") {
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
	}
	/* //搜索框的订单名字
	 $scope.parmValue="";
	 //订单列表的分类 （所有订单，待付款，代发货）
	 $scope.orderState=0;*/


	//获取我的订单列表
	$scope.find = function(currentShowPage) {
		var defer = $q.defer();

		returnOrderService
			.find($scope.memberId, constPageSize, currentShowPage)
			.then(
				function(result) {
					$scope.order_totalSize = result.totalSize;
					$scope.goodsList = result.data;
					if ($scope.goodsList == "" || $scope.goodsList == undefined || $scope.goodsList == null) {
						$scope.orderListPlay = false;
						return 0;
					}
					console.log($scope.goodsList)
					$scope.allPage = result.totalSize / constPageSize;
					var re = /\d+\.[0-9]/g; //判断数字是否为小数
					if (re.test($scope.allPage)) {
						$scope.allPage = Number($scope.allPage.toString().split(".")[0]) + 1
					}
					for (var i = 0; i < $scope.goodsList.length; i++) { //
						$scope.orderLists.push($scope.goodsList[i]) //拼接数据
					}
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});

		return defer.promise;
	};
	/*//确认订单putConfirm
	$scope.confirmOrder = function(id,orderSn,orderStatus,memberId){
	  $scope.operationalNotes="";
	  $scope.confirmObj={
	    id:id,
	    orderSn:orderSn,
	    orderStatus:orderStatus,
	    memberId:memberId,
	    memberLoginId:$scope.loginID,
	    operationalNotes:$scope.operationalNotes
	  };
	  centerService.putConfirm($scope.confirmObj)
	    .then(
	    function(result) {
	      $scope.find();
	      //defer.resolve(result);
	    }, function(result) {
	      // defer.reject(result);
	    });

	};*/


	//根据退单的状态展现退单不同的状态
	$scope.returnOrderStatues = function(statue) {
		switch (statue) {
			case 1:
				$scope.sentenceStatus = "待审核退单";
				break;
			case 2:
				$scope.sentenceStatus = "退单审核通过";
				break;
			case 3:
				$scope.sentenceStatus = "买家已发货退单";
				break;
			case 4:
				$scope.sentenceStatus = "卖家已收货退单";
				break;
			case 5:
				$scope.sentenceStatus = "已退款退单";
				break;
			case 6:
				$scope.sentenceStatus = "已中止退单";
				break;
		}
	};

	//判断是否登陆
	$scope.ifLogin = getCookie("formToken");

	if ($scope.ifLogin != "" && $scope.ifLogin != null && $scope.ifLogin != undefined) {
		$scope.orderLists = [];
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
		$scope.orderLists = "";
		// $scope.getCookieGoods()
		$(".carthasGoods").show();
	}

	//点击查看详情
	$scope.clickShowDetail = function(){
		$scope.showDetail = !$scope.showDetail;
	}
	//取消订单的申请
	$scope.cancleReturn = false;
	//
	// $scope.cancleApplys = function(orderId) {
	// 	console.log(orderId)
	// 	checkLogin()
	// 	var defer = $q.defer();
	// 	if ($scope.cancleReturn == true) {
	// 		return 0;
	// 	}
	// 	$scope.cancleReturn = true;
	// 	returnOrderService
	// 		.cancleApply(orderId)
	// 		.then(
	// 			function(result) {
	// 				$scope.loadData(true);
	// 				$scope.cancleReturn = false;
	// 				defer.resolve(result);
	// 			},
	// 			function(result) {
	// 				$scope.cancleReturn = false;
	// 				defer.reject(result);
	// 			});
	//
	// 	return defer.promise;
	// };
	//取消申请的弹窗
	$scope.cancleApply = function(orderId) {
		console.log(orderId)
		$scope.dialog1 = jDialog.confirm(zhecDisplayMessage.cancleOrderApply, {
			handler: function(button, dialog) {
				/*collectService
				  .delete($scope.deleteArr)
				  .then(
				  function(result) {
				    $scope.dialog.close()
				    $scope.loadData(true)
				    promptBox("商品已删除");
				  });*/
				var defer = $q.defer();
				returnOrderService
					.cancleApply(orderId, $scope.memberId)
					.then(
						function(result) {

							promptBox(zhecDisplayMessage.cancleOrderApplySuccess);
							$scope.dialog1.close();
							$scope.reloadRoute();

						});

			}
		}, {
			handler: function(button, dialog) {
				$scope.dialog1.close();
			}
		});

	}
	$scope.reloadRoute = function() {
		$window.location.reload();

	}

}


app.controller('returnOrderController', returnOrderController);
