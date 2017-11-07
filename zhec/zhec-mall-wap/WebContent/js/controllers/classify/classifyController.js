/**
 * 系统用户controller定义
 */
function classifyController($rootScope, $scope, $q, classifyService) {
	$rootScope.clickPage = 1;
	$scope.isLogin = null;
	if (getCookie('formToken')) {
		$scope.isLogin = true;
	} else {
		$scope.isLogin = false;
	}

	$scope.json = [{
		"name": "常见疾病",
		"id": 1,
		"childrenList": [{
			"id": 13,
			"name": "呼吸道疾病"
		}, {
			"id": 6,
			"name": "消化科"
		}, {
			"id": 14,
			"name": "五官科"
		}]
	}, {
		"name": "慢病三高",
		"id": 2,
		"childrenList": [{
			"id": 2,
			"name": "心脑血管科"
		}, {
			"id": 3,
			"name": "内分泌科"
		}, {
			"id": 5,
			"name": "肝胆科"
		}, {
			"id": 7,
			"name": "神经精神科"
		}]
	}, {
		"name": "消肿去瘤",
		"id": 3,
		"childrenList": [{
			"id": 4,
			"name": "肿瘤科"
		}]
	}, {
		"name": "专用人群",
		"id": 4,
		"childrenList": [{
			"id": 10,
			"name": "儿科"
		}, {
			"id": 9,
			"name": "妇科"
		}, {
			"id": 8,
			"name": "男科"
		}]
	}, {
		"name": "风湿骨痛",
		"id": 5,
		"childrenList": [{
			"id": 12,
			"name": "风湿骨科"
		}]
	}, {
		"name": "皮肤用药",
		"id": 6,
		"childrenList": [{
			"id": 11,
			"name": "皮肤科"
		}]
	}, {
		"name": "补益用药",
		"id": 7,
		"childrenList": [{
			"id": 15,
			"name": "滋补调养"
		}]
	}, {
		"name": "清热消炎",
		"id": 8,
		"childrenList": [{
			"id": 168,
			"name": "抗菌消炎"
		}]
	}];
	/**
	 * 搜索数据
	 */
	$scope.find = function() {
		$scope.result = "";
		var defer = $q.defer();
		classifyService
			.find()
			.then(function(result) {
				// console.log("result.datajf;gkljfdkgjkdfjgkldfjglk");
				// console.log(result.data);
				// $scope.goodslist = result.data[0].childrenList;
				// console.log($scope.goodslist)
				// $scope.result = result;
				//为简版分类添加三级分类，数据从数据库中得到
				var temp = result.data[0].childrenList;
				for (var i = 0; i < $scope.json.length; i++) {
					for (var j = 0; j < $scope.json[i].childrenList.length; j++) {
						for (var n = 0; n < temp.length; n++) {
							if ($scope.json[i].childrenList[j].id == temp[n].id) {
								$scope.json[i].childrenList[j].childrenList = temp[n].childrenList;
							}
						}
					}
				}

				$scope.headseversa = $scope.json;
				console.log($scope.headseversa)
				$scope.opens(1, 1);
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});
		return defer.promise;
	}


	//外层的swiper
	$scope.myFvpSwiper = new Swiper('.swiper-container-fvp', {
		// noSwiping: true,
		// autoHeight: true, //enable auto height
		observer: true,
		observeParents: true,
	});

	$scope.myFvpSwiper.detachEvents() //阻止swiper滑动

	$scope.slideTo = function(num) {
		$scope.myFvpSwiper.slideTo(num);
		$("body,html").animate({
			scrollTop: 0
		}, 0);
	};

	//点击搜索框
	$scope.gotoSearch = function() {
		$scope.myFvpSwiper.slideTo(2, 0);
		$(".ng-pristine").focus();
	};

	//取消搜索
	$scope.searchCancel = function() {
		$scope.slideTo(0, 0);
	};
	$scope.gotoLogin = function() {
		$scope.currentUrl = window.location.href; //获取当前路径
		delCookie("prePage");
		setCookie("prePage", "" + $scope.currentUrl, "1");
		window.open(constWapLocation + "/index.html#/info/login", "_self");
	};

	$scope.gotoMine = function() {
		window.open(constWapLocation + "/index.html#/main/mine", "_self");
	};
	$scope.opens = function(event, n) {
		$scope.currentSelect = n;
		$scope.goodslists = $scope.headseversa[n - 1].childrenList;

		console.log($scope.goodslists)
	}
	$scope.find();

}


app
	.controller('classifyController', classifyController)
