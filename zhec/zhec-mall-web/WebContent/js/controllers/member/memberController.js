function memberController($rootScope,$scope, memberservice, $q, $timeout, CommonService,ngDialog) {

  //头部欢迎语
  $scope.welcomeBeerDoctor=zhecDisplayMessage.welcomeBeerDoctor;

  //拦截器
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

	//获取用户积分余额，头像等一些基本信息
	$scope.memberInformation = getCookie("loginManager");
	if ($scope.memberInformation != "") {
		$scope.memberInformation = JSON.parse($scope.memberInformation);
		$scope.loginID = $scope.memberInformation.loginId;
		$scope.memberID = $scope.memberInformation.id;
	}
//再次点击侧边栏刷新
  $scope.renovate=function(sideIndex){
    $scope.$broadcast('sideIndex',sideIndex);
  };
	$scope.findmemberproinfo = function(memberID) {
		var defer = $q.defer();
		memberservice
			.findmemberproinfo(memberID)
			.then(function(result) {
				$scope.memberproinfo = result.data;
				$scope.balance = $scope.memberproinfo.balance;

				/*$scope.likelyName = $scope.memberproinfo.name;
				if ($scope.likelyName == "" || $scope.likelyName == undefined) {
					$scope.likelyName = $scope.memberproinfo.loginId
				}*/
				//处理图片的路径
				var res = /\/.+/;
				if($scope.memberproinfo.image_path!=""&&$scope.memberproinfo.image_path!=null&&$scope.memberproinfo.image_path!=null){
					$scope.image_path = res.exec($scope.memberproinfo.image_path)[0];
				}
				$scope.integral = $scope.memberproinfo.integral;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	};
	//$scope.getmemberspentdate($scope.memberID);
	$scope.findmemberproinfo($scope.memberID);
	//左側商品推薦位
	$scope.findgoodsinleft = function() {
		var defer = $q.defer();
		memberservice
			.findgoodsinleft()
			.then(function(result) {
				$scope.goodsinleft = result.data;
				//对商品数据做处理提取出来ID
				var goodsIds = '';
				var temp = result.data;

				for (var i = 0; i < temp.length; i++) {
					goodsIds = goodsIds + temp[i].id;
					if (i < temp.length - 1) {
						goodsIds = goodsIds + ',';
					}
				}
				CommonService.getGoodsPrice($scope.memberId, goodsIds, 1, 0, 0, $scope.goodsinleft);

				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			})
			.then(
				function(result) {
					var defer = $q.defer();
					$scope.allGoodsIds = "";
					defer.reject(result);
				}
			)
		return defer.promise;
	};
	$scope.findgoodsinleft();
	//下方大家都在看商品
	$scope.findgoodsindown = function() {
		var defer = $q.defer();
		memberservice
			.findgoodsindown()
			.then(function(result) {
				$scope.goodsindown = result.data;
                //对商品数据做处理提取出来ID
				var goodsIds = '';
				var temp = result.data;

				for (var i = 0; i < temp.length; i++) {
					goodsIds = goodsIds + temp[i].id;
					if (i < temp.length - 1) {
						goodsIds = goodsIds + ',';
					}
				}
				CommonService.getGoodsPrice($scope.memberId, goodsIds, 1, 0, 0, $scope.goodsindown);

				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			})
			.then(
				function(result) {
					var defer = $q.defer();
					$scope.downGoodsIds = "";
					defer.reject(result);
				}
			);
		return defer.promise;
	};
	$scope.findgoodsindown();
	//不同狀態的数量
	$scope.findordersnum = function(memberID) {
		var defer = $q.defer();
		memberservice
			.findordersnum(memberID)
			.then(function(result) {
				$scope.ordersnum = result.data;

				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	};
	$scope.findordersnum($scope.memberID);
	//订单调用加入购物车的方法定义
	$scope.addOrderToCar = function(products) {
		var defer = $q.defer();
		if (products.length == 1) {
			addGoodsToCart(products[0].productId, products[0].productNumber, products[0].consultantId)
		} else {
			var orderGoods = [];
			var orderGood = {};
			for (var i = 0; i < products.length; i++) {
				orderGood = {};
				orderGood.productId = products[i].productId;
				orderGood.count = products[i].productNumber;
				orderGood.loginId = $scope.loginID;
				orderGood.memberId = $scope.memberID;
				orderGood.consultantId = products[i].consultantId;
				orderGoods.push(orderGood)
			}
			batchAddGoodsToCart(orderGoods, 2,$scope.memberInformation);
		}
	};
	//价格过滤
	$scope.priceFilterM = function(price) {
		$scope.priceRevise = priceFilter(price);
	}

}
app
	.controller('memberController', memberController)
  .factory('HttpInterceptor', ['$q', HttpInterceptor]) //定义一个 Service，作为 Interceptors 的处理函数
  .config(['$httpProvider', function($httpProvider) { //添加对应的 Interceptors
    $httpProvider.interceptors.push(HttpInterceptor);
  }]);
